import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { navigateTo } from "gatsby-link";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Main from "../components/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";
import Content from "../components/Main/Content";
import Button from "@material-ui/core/Button"

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

    handleEmail = e => {
        const value = e.target.value
        this.setState(prevState => ({
            email: {
                ...prevState.send,
                email: value
            }
        }))
    }

    handleId = e => {
        const value = e.target.value
        this.setState(prevState => ({
            verify: {
                ...prevState.verify,
                id: value
            }
        }))
    }

    handleSend = e => {
        e.preventDefault()
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
            const p = res.Passcode
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
                        passcode: p
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
        const { server, delSub } = this.props.data.site.siteMetadata
        const { state } = this.state
        if (state.verify === state.passcode) {
            const devUrl = testApi + delSub
            const delPkg = { ...state }
            fetch(devUrl, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${state.passcode}`
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

    render() {
        const { classes } = this.props
        const { email, err, attempts } = this.state

        return (
            <Main>
                <Article>
                    <PageHeader title="Unsubscribe" />
                    <Content>
                        Enter your email below to unsubscribe.
                        </Content>
                    <br></br>
                    <div>{attempts < 3 ?
                        <ValidatorForm
                            onSubmit={this.handleSubmit}
                            onError={errs => console.log(errs)}
                            name="unsubscribe"
                        >
                            {err && <p className={classes.err}>{err}</p>}
                            <TextValidator
                                id="email"
                                name="Email"
                                label="E-mail"
                                value={email}
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
                            >Unsubscribe</Button>
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
      }
    }
  }
`;