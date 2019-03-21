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
        email: '',
        err: '',
        attempts: 0
    }

    handleEmail = e => {
        const value = e.target.value
        this.setState(prevState => ({
            ...prevState,
            email: value
        }))
    }

    handleSubmit = e => {
        e.preventDefault()
        const { server, delSub } = this.props.data.site.siteMetadata
        const devUrl = server + delSub
        const pkg = { ...this.state }
        fetch(devUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pkg)
        }).then(res => {
            if (res.status == 200) {
                return res.json()
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    attempts: prevState.attempts + 1,
                    err: `Connection error (${res.statusText})`
                }))
            }
        }).then(res => {
            if (res.Response === 'Subscriber removed') {
                navigateTo("/unsubscribed")
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    err: res.Response,
                    attempts: prevState.attempts + 1
                }))
            }
        }).catch(err => {
            this.setState(prevState => ({
                ...prevState,
                err: `Connection error (${err.toString()})`
            }))
        })
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
      }
    }
  }
`;