import React from "react"
import PropTypes from "prop-types"
import injectSheet from "react-jss"
import { navigateTo } from "gatsby-link"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator"
import Button from "@material-ui/core/Button"
import HmacSHA256 from 'crypto-js/hmac-sha256'
import EncBase64 from 'crypto-js/enc-base64'
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
      Name: '', Email: '', Categories: '',
    }, send: {
      hide: false, err: '', rts: false, success: '', sent: 0,
    }, verify: {
      err: '', id: '', attempts: 0
    }
  }

  token

  encrypt = (code) => {
    this.token = ''
    const hash = HmacSHA256(code, this.props.meta.secret)
    this.token = EncBase64.stringify(hash)
  }

  refresh

  startTimer = () => {
    this.reset = setTimeout(() => {
      this.setState(prevState => ({
        sub: {
          ...prevState.sub,
          Name: '',
          Email: ''
        },
        send: {
          ...prevState.send,
          err: 'You were timed out.',
          success: '',
          hide: false,
          rts: false
        },
        verify: {
          ...prevState.verify,
          err: '',
          id: ''
        }
      }))
    }, 600000)
  }

  stopTimer = () => {
    clearTimeout(this.reset)
  }

  countDown = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <span>Please request new ID.</span>
    } else {
      return <span>{minutes}:{seconds}</span>
    }
  }

  handleCh = e => {
    const value = e.target.value
    const name = e.target.name
    this.setState(prevState => ({
      sub: {
        ...prevState.sub,
        [name]: value
      },
      send: {
        ...prevState.send,
        hide: false
      },
    }))
    this.stopTimer()
    this.startTimer()
  }

  addCats = selected => {
    const { Name, Email } = this.state.sub
    if (Name === '' || Email === '') {
      this.setState(prevState => ({
        send: {
          ...prevState.send,
          err: 'Please fill in missing fields',
          rts: false
        }
      }))
    } else if (selected.length == 0) {
      this.setState(prevState => ({
        send: {
          ...prevState.send,
          err: 'Please select a category',
          rts: false
        }
      }))
    } else {
      let strCats = selected.join(' ')
      this.setState(prevState => ({
        send: {
          ...prevState.send,
          rts: true,
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
    e.preventDefault()
    this.stopTimer()
    this.startTimer()
    const { server, welcome } = this.props.meta
    const { send, sub } = this.state
    this.encrypt(sub.Email)
    if (send.rts) {
      const welApi = dev + welcome
      const welPkg = { ...sub }
      fetch(welApi, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${this.token}`
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
              err: `Connection error (${res.StatusText})`
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
              sent: prevState.send.sent + 1
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
              hide: true
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
            err: `Connection error (${err.toString()})`
          },
          verify: {
            ...prevState.verify,
            err: ''
          }
        }))
      })
    }
  }

  handleId = e => {
    let value = e.target.value
    this.setState(prevState => ({
      verify: {
        ...prevState.verify,
        id: value
      }
    }))
    this.stopTimer()
    this.startTimer()
  }

  handleVer = e => {
    e.preventDefault()
    this.stopTimer()
    this.startTimer()
    const { server, addSub } = this.props.meta
    const { verify } = this.state
    this.encrypt(verify.id)
    const verApi = dev + addSub
    const verPkg = { ...verify }
    fetch(verApi, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${this.token}`
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
          }
        }))
      }
    }).catch(err => {
      this.setState(prevState => ({
        verify: {
          ...prevState.verify,
          err: `Connection error (${err.toString()})`
        }
      }))
    })
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
              onChange={this.handleCh}
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
              onChange={this.handleCh}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
              fullWidth
              margin="normal"
              className={classes.singleLineInput}
            />
            {send.hide ? (<div className={classes.success}><p>Check inbox and spam of <strong>{send.success}</strong> for email from <strong>no-reply@huntcodes.co</strong></p><p>Copy <strong>Subscriber ID</strong> from email and paste below to complete subscription.</p>
              <div>{<Countdown date={Date.now() + 420000} renderer={this.countDown} />}</div></div>) : <CatList add={this.addCats} edges={edges} />}
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