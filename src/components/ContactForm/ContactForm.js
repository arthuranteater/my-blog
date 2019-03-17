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
    borderRadius: '50px'
  },
  wlink: {
    color: theme.main.colors.background
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

  pass = ''

  createPass = () => {
    var val = this.props.values
    for (var i = 0; i < 6; i++) {
      this.pass += val.charAt(Math.floor(Math.random() * val.length));
    }
  }

  addCats = (selected) => {
    if (this.state.sub.Name === '' || this.state.sub.Email === '') {
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
    if (this.state.verify.id === this.state.sub.Passcode) {
      const devUrl = `http://localhost:4000/${this.props.addSub}`
      const addSub = { ...this.state.sub }
      fetch(devUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addSub)
      }).then(res => {
        if (res.status == 200) {
          return res.json()
        } else {
          throw new Error(res.statusText)
        }
      }).then(res => {
        if (res.Response === 'subscriber added') {
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
        console.log('test')
        console.error("Err:", err)
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
      console.log('sending welcome email')
      const welUrl = `http://localhost:4000/${this.props.welcome}`
      const welPkg = { ...this.state.sub }
      const node = this.props.edges[0].node
      const latest = {
        title: node.frontmatter.title, subTitle: node.frontmatter.subTitle,
        slug: node.fields.slug
      }
      welPkg['post'] = latest
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
          throw new Error(res.statusText)
        }
      }).then(res => {
        if (res.Response.includes('Grid')) {
          this.setState(prevState => ({
            send: {
              ...prevState.send,
              err: res.Response,
              sent: prevState.send.sent + 1
            }
          }))
        } else {
          this.setState(prevState => ({
            send: {
              ...prevState.send,
              success: res.Response,
              sent: prevState.send.sent + 1,
              hide: true
            }
          }))
        }
      }).catch(err => {
        console.error(err.toString())
        this.setState(prevState => ({
          send: {
            ...prevState.send,
            err: 'No response from server'
          }
        }))
      })
    }
  }

  render() {
    const { classes, edges } = this.props
    const state = this.state

    return (
      <div>
        <h2>Step 1 - Get ID</h2>
        <div>{(state.send.sent < 3) ?
          <ValidatorForm
            onSubmit={this.handleSend}
            onError={errs => console.log(errs)}
            name="send"
          >
            {state.send.err && <p className={classes.err}><strong>{state.send.err}</strong></p>}
            <TextValidator
              id="name"
              name="Name"
              label="Name"
              value={state.sub.Name}
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
              value={state.sub.Email}
              onChange={this.handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
              fullWidth
              margin="normal"
              className={classes.singleLineInput}
            />
            {state.send.hide ? (<div className={classes.success}><p><strong>{state.send.success}</strong></p><p><strong> Please check your inbox and spam for email from no-reply@huntcodes.co</strong></p><p><strong> If you did not receive an email, please <a className={classes.wlink} href='https://www.huntcodes.co/#contact' target='_blank'>contact us</a></strong></p></div>) : <CatList add={this.addCats} edges={edges} />}
          </ValidatorForm>
          : <p className={classes.err}>We are unable to handle your request at this time. Please <a className={classes.blink} href='https://www.huntcodes.co/#contact' target='_blank'>contact us</a></p>}</div>
        <h2>Step 2 - Verify ID</h2>
        <div> {(state.verify.attempts < 3) ?
          <ValidatorForm
            onSubmit={this.handleVerify}
            onError={errs => console.log(errs)}
            name="verify"
          >
            {state.verify.err && <p className={classes.err}>{state.verify.err}</p>}
            {state.verify.success && <p className={classes.success}>{state.verify.success}</p>}
            <TextValidator
              id="id"
              name="id"
              label="Subscriber ID"
              value={state.verify.id}
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