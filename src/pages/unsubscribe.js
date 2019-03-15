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
        backgroundColor: theme.main.colors.link,
        margin: "3em 0"
        //width: "100%"
    },
    submitError: {
        background: "red",
        color: "white"
    },
})

class UnsubscribePage extends React.Component {
    state = {
        Email: '',
        Error: '',
    }

    handleChange = e => {
        const value = e.target.value
        const name = e.target.name
        this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault()
        let api = this.props.data.site.siteMetadata.delSub
        const devUrl = `http://localhost:4000/${api}`
        const pkg = { ...this.state }
        delete pkg['Error']
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
                throw new Error(res.statusText)
            }
        }).then(res => {
            if (res.Response === 'Subscriber removed') {
                navigateTo("/unsubscribed")
            } else {
                this.setState({ Error: res.Response })
            }
        }).catch(err => {
            console.log('Network Error:', err)
            this.setState({ Error: 'There was a network error!' })
        })
    }

    render() {
        const { classes } = this.props
        const { Email } = this.state

        return (
            <Main>
                <Article>
                    <PageHeader title="Unsubscribe" />
                    <Content>
                        Enter your email below to unsubscribe.
                        </Content>
                    <br></br>
                    <ValidatorForm
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                        name="unsubscribe"
                        ref={f => (this.form = f)}
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                    >
                        {this.state.Error && <p className={classes.submitError}>{this.state.Error}</p>}
                        <TextValidator
                            id="email"
                            name="Email"
                            label="E-mail"
                            value={Email}
                            onChange={this.handleChange}
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
                    </ValidatorForm>
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
      }
    }
  }
`;