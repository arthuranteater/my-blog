import React from "react"
import PropTypes from "prop-types"
import injectSheet from "react-jss"
import { navigateTo } from "gatsby-link"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator"
import Button from "@material-ui/core/Button"
import HmacSHA256 from 'crypto-js/hmac-sha256'
import EncBase64 from 'crypto-js/enc-base64'
import Aes from 'crypto-js/aes'
import CatList from './CatList'
import Countdown from 'react-countdown-now'

const dev = 'http://localhost:4000/site/'

const styles = theme => ({
  vbutton: {
    backgroundColor: theme.main.colors.link,
    margin: "3em 0"
  },
  singleLineInput: {
    lineHeight: 1.4,
    fontSize: "1.2em",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      width: "47%",
      marginLeft: "3%",
      "&:first-child": {
        marginRight: "3%",
        marginLeft: 0
      }
    }
  },
  err: {
    color: "red",
  },
  success: {
    background: theme.main.colors.link,
    color: "white",
    padding: '.3em',
    textAlign: 'center',
    borderRadius: '25px'
  },
  blink: {
    color: theme.main.colors.link
  },
  rlink: {
    color: 'red'
  }
})

class ContactForm extends React.Component {

  state = {
    sub: {
      Name: '', Email: '', Categories: ''
    }, send: {
      err: '', success: '', cats: false, sent: 0, next: false
    }, verify: {
      err: '', id: '', attempts: 0,
    }, salt: {
      key: '', token: '', rts: false
    }
  }

  startTimer = () => {
    console.log('started timer')
    setTimeout(() => {
      this.setState(prevState => ({
        sub: {
          ...prevState.sub,
          Name: '',
          Email: '',
          Categories: ''
        },
        send: {
          ...prevState.send,
          err: 'You were timed out.',
          success: '',
          cats: false
        },
        verify: {
          ...prevState.verify,
          err: '',
          id: ''
        },
        salt: {
          ...prevState.salt,
          key: '',
          rts: false
        }
      }))
    }, 600000)
  }

  stopTimer = () => {
    console.log('stopped timer')
    clearTimeout(this.startTimer)
  }

  createSalt = () => {
    let salt = ''
    const val = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 10; i++) {
      salt += val.charAt(Math.floor(Math.random() * val.length))
    }
    return salt
  }

  encryptSalt = salt => {
    return Aes.encrypt(salt, this.props.meta.secret).toString()
  }

  createToken = (value, salt) => {
    const hash = HmacSHA256(value, salt)
    return EncBase64.stringify(hash)
  }


  handleName = e => {
    const value = e.target.value
    this.setState(prevState => ({
      sub: {
        ...prevState.sub,
        Name: value
      },
      send: {
        ...prevState.send,
        cats: false
      }
    }))
    this.stopTimer()
    this.startTimer()
  }

  handleEmail = e => {
    const value = e.target.value
    const salt = this.createSalt()
    const key = this.encryptSalt(salt)
    const token = this.createToken(value, salt)
    this.setState(prevState => ({
      sub: {
        ...prevState.sub,
        Email: value
      },
      send: {
        ...prevState.send,
        cats: false
      },
      salt: {
        ...prevState.salt,
        key: key,
        token: token,
        rts: true
      }
    }))
    this.stopTimer()
    this.startTimer()
  }

  addCats = selected => {
    console.log('cats added')
    const { Name, Email } = this.state.sub
    if (Name === '' || Email === '') {
      this.setState(prevState => ({
        send: {
          ...prevState.send,
          err: 'Please fill in missing fields',
          cats: false
        }
      }))
    } else if (selected.length == 0) {
      this.setState(prevState => ({
        send: {
          ...prevState.send,
          err: 'Please select a category',
          cats: false
        }
      }))
    } else {
      let strCats = selected.join(' ')
      this.setState(prevState => ({
        send: {
          ...prevState.send,
          cats: true,
          next: false,
          err: ''
        },
        sub: {
          ...prevState.sub,
          Categories: strCats
        }
      }))
    }
  }


  handleWel = e => {
    console.log('handling wel req')
    e.preventDefault()
    this.stopTimer()
    this.startTimer()
    const { server, welcome } = this.props.meta
    const { send, sub, salt } = this.state
    console.log('state', this.state)
    if (salt.rts && send.cats) {
      console.log('sending wel')
      const welApi = dev + welcome
      const welPkg = { ...sub, ...salt }
      console.log('api', welApi)
      fetch(welApi, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${salt.token}`
        },
        body: JSON.stringify(welPkg)
      }).then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          this.setState(prevState => ({
            send: {
              ...prevState.send,
              sent: prevState.send.sent + 1,
              err: `Connection error (${res.StatusText})`,
              cats: false
            },
            verify: {
              ...prevState.verify,
              err: ''
            }
          }))
        }
      }).then(res => {
        const r = res.Response
        if (r.includes('No')) {
          this.setState(prevState => ({
            send: {
              ...prevState.send,
              err: r,
              sent: prevState.send.sent + 1,
              cats: false
            },
            verify: {
              ...prevState.verify,
              err: ''
            }
          }))
        } else {
          this.setState(prevState => ({
            send: {
              ...prevState.send,
              success: r,
              sent: prevState.send.sent + 1,
              next: true
            },
            verify: {
              ...prevState.verify,
              err: '',
              attempts: 0
            }
          }))
        }
      }).catch(err => {
        this.setState(prevState => ({
          send: {
            ...prevState.send,
            err: `Connection error (${err.toString()})`,
            cats: false
          },
          verify: {
            ...prevState.verify,
            err: ''
          }
        }))
      })
    }
  }

  countDown = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <span>Please request new ID.</span>
    } else {
      return <span>{minutes}:{seconds}</span>
    }
  }

  handleId = e => {
    let value = e.target.value
    const salt = this.createSalt()
    const key = this.encryptSalt(salt)
    const token = this.createToken(value, salt)
    this.setState(prevState => ({
      verify: {
        ...prevState.verify,
        id: value
      },
      salt: {
        ...prevState.salt,
        key: key,
        token: token,
        rts: true
      }
    }))
    this.stopTimer()
    this.startTimer()
  }

  handleVer = e => {
    console.log('handle ver req')
    e.preventDefault()
    this.stopTimer()
    this.startTimer()
    const { server, addSub } = this.props.meta
    const { verify, salt } = this.state
    if (salt.rts) {
      const verApi = dev + addSub
      const verPkg = { ...verify, ...salt }
      fetch(verApi, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${salt.token}`
        },
        body: JSON.stringify(verPkg)
      }).then(res => {
        if (res.status == 200) {
          return res.json()
        } else {
          this.setState(prevState => ({
            verify: {
              ...prevState.verify,
              attempts: prevState.verify.attempts + 1,
              err: `Connection error (${res.StatusText})`
            },
            salt: {
              ...prevState.salt,
              rts: false
            }
          }))
        }
      }).then(res => {
        const r = res.Response
        if (r === 'success') {
          navigateTo("/subscribed")
        } else {
          this.setState(prevState => ({
            verify: {
              ...prevState.verify,
              err: r,
              attempts: prevState.verify.attempts + 1
            },
            salt: {
              ...prevState.salt,
              rts: false
            }
          }))
        }
      }).catch(err => {
        this.setState(prevState => ({
          verify: {
            ...prevState.verify,
            err: `Connection error (${err.toString()})`
          },
          salt: {
            ...prevState.salt,
            rts: false
          }
        }))
      })
    }
  }


  render() {
    const { classes, edges } = this.props
    const { sub, send, verify } = this.state

    return (
      <div>
        <h2>Step 1 - Get ID</h2>
        <div>{(send.sent < 3) ?
          <ValidatorForm
            onSubmit={this.handleWel}
            onError={errs => console.log(errs)}
            name="send"
          >
            {send.err && <p className={classes.err}><strong>{send.err}</strong></p>}
            <TextValidator
              id="name"
              name="Name"
              label="Name"
              value={sub.Name}
              onChange={this.handleName}
              validators={["required"]}
              errorMessages={["this field is required"]}
              fullWidth
              margin="normal"
              className={classes.singleLineInput}
            />
            <TextValidator
              id="email"
              name="Email"
              label="E-mail"
              value={sub.Email}
              onChange={this.handleEmail}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
              fullWidth
              margin="normal"
              className={classes.singleLineInput}
            />
            {send.cats ? <Button
              variant="raised"
              color="primary"
              size="large"
              type="submit"
              className={classes.vbutton}
              disabled={send.next}
            >
              Get ID
                </Button> : <CatList add={this.addCats} edges={edges} />}
            {send.next ? (<div className={classes.success}><p>Check inbox and spam of <strong>{send.success}</strong> for email from <strong>no-reply@huntcodes.co</strong></p><p>Copy <strong>Subscriber ID</strong> from email and paste below to complete subscription.</p>
              <div>{<Countdown date={Date.now() + 420000} renderer={this.countDown} />}</div></div>) : <div></div>}
          </ValidatorForm>
          : <p className={classes.err}>We are unable to handle your request at this time. Please <a className={classes.rlink} href='https://www.huntcodes.co/#contact' target='_blank'>contact us</a></p>}</div>
        <h2>Step 2 - Verify ID</h2>
        <div> {(verify.attempts < 3) ?
          <ValidatorForm
            onSubmit={this.handleVer}
            onError={errs => console.log(errs)}
            name="verify"
          >
            {verify.err && <p className={classes.err}><strong>{verify.err}</strong></p>}
            <TextValidator
              id="id"
              name="id"
              label="Subscriber ID"
              value={verify.id}
              onChange={this.handleId}
              validators={["required"]}
              errorMessages={["this field is required"]}
              fullWidth
              margin="normal"
              className={classes.singleLineInput}
            />
            <Button
              variant="raised"
              color="primary"
              size="large"
              type="submit"
              className={classes.vbutton}
            >
              Verify ID
                </Button>
          </ValidatorForm>
          : <p className={classes.err}>We are unable to handle your request at this time. Please <a className={classes.rlink} href='https://www.huntcodes.co/#contact' target='_blank'>contact us</a></p>}</div>
        <p>arthuranteater uses hashed auth tokens, SSL encryption, database encryption, and passkeys on all requests. If you have any concerns or issues signing up, please <a className={classes.blink} href='https://www.huntcodes.co/#contact' target='_blank'>contact us</a>.</p>
      </div>
    )
  }
}

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(ContactForm)