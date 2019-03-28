import React from "react"
import PropTypes from "prop-types"
import injectSheet from "react-jss"
import { navigateTo } from "gatsby-link"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator"
import Main from "../components/Main"
import Article from "../components/Main/Article"
import PageHeader from "../components/Page/PageHeader"
import Content from "../components/Main/Content"
import Button from "@material-ui/core/Button"
import HmacSHA256 from 'crypto-js/hmac-sha256'
import EncBase64 from 'crypto-js/enc-base64'

const testApi = 'http://localhost:4000/site/'

const styles = theme => ({
    submit: {
        backgroundColor: theme.main.colors.link
    },
    err: {
        color: "red"
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
    rlink: {
        color: 'red'
    }
})

class UnsubscribePage extends React.Component {
    state = {
        send: {
            email: '',
            passcode: '',
            err: '',
            success: '',
            hide: false,
            sent: 0
        },
        verify: {
            id: '',
            err: '',
            attempts: 0
        }
    }

    token

    encrypt = (code) => {
        this.token = ''
        const hash = HmacSHA256(code, this.props.data.site.siteMetadata.secret)
        this.token = EncBase64.stringify(hash)
    }

    refresh

    startTimer = () => {
        this.refresh = setTimeout(() => {
            alert("You've been timed out")
            window.location.reload()
        }, 300000)
    }

    stopTimer = () => {
        clearTimeout(this.refresh)
    }


    handleEmail = e => {
        const value = e.target.value
        this.setState(prevState => ({
            send: {
                ...prevState.send,
                email: value
            }
        }))
        this.stopTimer()
        this.startTimer()
    }

    handleId = e => {
        const value = e.target.value
        this.setState(prevState => ({
            verify: {
                ...prevState.verify,
                id: value
            }
        }))
        this.stopTimer()
        this.startTimer()
    }

    handleSend = e => {
        e.preventDefault()
        this.stopTimer()
        this.startTimer()
        const { server, bye } = this.props.data.site.siteMetadata
        const { send, verify } = this.state
        const devUrl = testApi + bye
        const byePkg = { ...send }
        fetch(devUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(byePkg)
        }).then(res => {
            if (res.status == 200) {
                return res.json()
            } else {
                this.setState(prevState => ({
                    send: {
                        ...prevState.send,
                        sent: prevState.attempts + 1,
                        err: `Connection error (${res.statusText})`
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
                        hide: true,
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

    handleVerify = e => {
        e.preventDefault()
        this.stopTimer()
        this.startTimer()
        const { server, delSub } = this.props.data.site.siteMetadata
        const { send, verify } = this.state
        this.encrypt(verify.id)
        const devUrl = testApi + delSub
        const delPkg = { ...send }
        fetch(devUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(delPkg)
        }).then(res => {
            if (res.status == 200) {
                return res.json()
            } else {
                this.setState(prevState => ({
                    verify: {
                        ...prevState.verify,
                        attempts: prevState.attempts + 1,
                        err: `Connection error (${res.statusText})`
                    }
                }))
            }
        }).then(res => {
            const r = res.Response
            if (r === 'success') {
                navigateTo("/unsubscribed")
            } else {
                this.setState(prevState => ({
                    verify: {
                        ...prevState.verify,
                        err: r,
                        attempts: prevState.attempts + 1
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
        const { classes } = this.props
        const { send, verify } = this.state

        return (
            <Main>
                <Article>
                    <PageHeader title="Unsubscribe" />
                    <Content>
                        Enter your email below to unsubscribe.
                        </Content>
                    <br></br>
                    <div>{send.sent < 3 ?
                        <ValidatorForm
                            onSubmit={this.handleSend}
                            onError={errs => console.log(errs)}
                            name="unsubscribe"
                        >
                            {send.err && <p className={classes.err}>{send.err}</p>}
                            <TextValidator
                                id="email"
                                name="Email"
                                label="E-mail"
                                value={send.email}
                                onChange={this.handleEmail}
                                validators={["required", "isEmail"]}
                                errorMessages={["this field is required", "email is not valid"]}
                                fullWidth
                                margin="normal"
                                className={classes.singleLineInput}
                            />
                            <Button
                                variant="raised"
                                color="primary"
                                size="large"
                                type="submit"
                                className={classes.submit}
                                disabled={send.hide}
                            >Unsubscribe</Button>
                            {send.hide ? (<div className={classes.success}><p>Check inbox and spam of <strong>{send.success}</strong> for email from <strong>no-reply@huntcodes.co</strong></p><p>Copy <strong>Subscriber ID</strong> from email and paste below to complete subscription.</p></div>) : <div></div>}
                        </ValidatorForm> : <p className={classes.err}>We are unable to handle your request at this time. Please <a className={classes.rlink} href='https://www.huntcodes.co/#contact' target='_blank'>contact us</a></p>}</div>
                    <div>{verify.attempts < 3 ?
                        <ValidatorForm
                            onSubmit={this.handleVerify}
                            onError={errs => console.log(errs)}
                            name="verify"
                        >
                            {verify.err && <p className={classes.err}>{verify.err}</p>}
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
                                className={classes.submit}
                                disabled={!send.hide}
                            >Verify</Button>
                        </ValidatorForm> : <p className={classes.err}>We are unable to handle your request at this time. Please <a className={classes.rlink} href='https://www.huntcodes.co/#contact' target='_blank'>contact us</a></p>}</div>
                </Article>
            </Main>
        )
    }
}

UnsubscribePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(UnsubscribePage)


export const query = graphql`
  query delSubQuery {
    site {
      siteMetadata {
        delSub
        server
        bye
        secret
      }
    }
  }
`;