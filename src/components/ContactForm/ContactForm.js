import React from "react"
import PropTypes from "prop-types"
import injectSheet from "react-jss"
import { navigateTo } from "gatsby-link"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator"
import Button from "@material-ui/core/Button"
import CatList from './CatList'


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
      Name: '', Email: '', Categories: '', Passcode: '',
    }, send: {
      hide: false, err: '', rts: false, success: '', sent: 0,
    }, verify: {
      err: '', id: '', attempts: 0
    }
  }

  pass

  createPass = () => {
    this.pass = ''
    var val = this.props.values
    for (var i = 0; i < 6; i++) {
      this.pass += val.charAt(Math.floor(Math.random() * val.length));
    }
  }

  addCats = (selected) => {
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
      this.createPass()
      let strCats = selected.join(' ')
      this.setState(prevState => ({
        send: {
          ...prevState.send,
          rts: true,
          err: ''
        },
        sub: {
          ...prevState.sub,
          Passcode: this.pass,
          Categories: strCats
        }
      }))
    }
  }

  handleID = e => {
    let value = e.target.value
    this.setState(prevState => ({
      verify: {
        ...prevState.verify,
        id: value
      }
    }))
  }

  handleChange = e => {
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
  }


  handleVerify = e => {
    e.preventDefault()
    const { verify, sub } = this.state
    const { server, addSub } = this.props
    if (verify.id === sub.Passcode) {
      const devUrl = server + addSub
      const nsub = { ...sub }
      fetch(devUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nsub)
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
        if (res.Response === 'Subscriber added') {
          navigateTo("/subscribed")
        } else {
          this.setState(prevState => ({
            verify: {
              ...prevState.verify,
              err: res.Response,
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
    } else {
      this.setState(prevState => ({
        verify: {
          ...prevState.verify,
          err: 'Invalid ID, please try again.',
          attempts: prevState.verify.attempts + 1
        }
      }))
    }
  }


  handleSend = e => {
    e.preventDefault()
    if (this.state.send.rts) {
      const welUrl = this.props.server + this.props.welcome
      const welPkg = { ...this.state.sub }
      fetch(welUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(welPkg)
      }).then(res => {
        if (res.status == 200) {
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
        if (res.Response.includes('Grid')) {
          this.setState(prevState => ({
            send: {
              ...prevState.send,
              err: res.Response,
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
              success: res.Response,
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

  render() {
    const { classes, edges } = this.props
    const { sub, send, verify } = this.state

    return (
      <div>
        <h2>Step 1 - Get ID</h2>
        <div>{(send.sent < 3) ?
          <ValidatorForm
            onSubmit={this.handleSend}
            onError={errs => console.log(errs)}
            name="send"
          >
            {send.err && <p className={classes.err}><strong>{send.err}</strong></p>}
            <TextValidator
              id="name"
              name="Name"
              label="Name"
              value={sub.Name}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
              fullWidth
              margin="normal"
              className={classes.singleLineInput}
            />
            {send.hide ? (<div className={classes.success}><p>Check inbox and spam of <strong>{send.success}</strong> for email from <strong>no-reply@huntcodes.co</strong></p><p>Copy <strong>Subscriber ID</strong> from email and paste below to complete subscription.</p></div>) : <CatList add={this.addCats} edges={edges} />}
          </ValidatorForm>
          : <p className={classes.err}>We are unable to handle your request at this time. Please <a className={classes.blink} href='https://www.huntcodes.co/#contact' target='_blank'>contact us</a></p>}</div>
        <h2>Step 2 - Verify ID</h2>
        <div> {(verify.attempts < 3) ?
          <ValidatorForm
            onSubmit={this.handleVerify}
            onError={errs => console.log(errs)}
            name="verify"
          >
            {verify.err && <p className={classes.err}>{verify.err}</p>}
            {verify.success && <p className={classes.success}>{verify.success}</p>}
            <TextValidator
              id="id"
              name="id"
              label="Subscriber ID"
              value={verify.id}
              onChange={this.handleID}
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
              disabled={!send.hide}
            >
              Verify ID
                </Button>
          </ValidatorForm>
          : <p className={classes.err}>We are unable to handle your request at this time. Please <a className={classes.rlink} href='https://www.huntcodes.co/#contact' target='_blank'>contact us</a></p>}</div>
        <p>arthuranteater uses SSL encryption on all requests, .env variables containing lengthy keys, and email verification to keep your information protected. If you have any concerns or issues signing up, please <a className={classes.blink} href='https://www.huntcodes.co/#contact' target='_blank'>contact us</a>.</p>
      </div>
    )
  }
}

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(ContactForm)