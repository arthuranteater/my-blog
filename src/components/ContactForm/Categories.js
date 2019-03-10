import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Button from "@material-ui/core/Button";
import { navigateTo } from "gatsby-link";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";





const styles = theme => ({
    select: {
        backgroundColor: theme.main.colors.link,
        margin: "3em 0"
        //width: "100%"
    },
    button: {

    }
});

class Categories extends React.Component {

    state = {
        Name: '',
        Email: '',
        Categories: 'all',
        Passcode: ''
    }

    select = e => {
        this.show = !this.show
    }

    createCode = () => {
        var code = ''
        var val = this.props.values

        for (var i = 0; i < 6; i++) {
            code += val.charAt(Math.floor(Math.random() * val.length));
        }
        console.log(code)
        this.setState({
            Passcode: code
        })
    }

    handleChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        if (this.state.Passcode === '') {
            this.createCode()
        }
        this.setState({ [name]: value })
    }

    handleNetworkError = e => {
        this.submitError = 'There was a network error!'
    }



    handleSubmit = e => {
        const devUrl = `http://localhost:4000/${this.props.api}`
        const jshaun = JSON.stringify(this.state)
        console.log(jshaun)
        fetch(devUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        }).then(res => {
            console.log("Success", res.json())
            navigateTo("/success")
        }).catch(err => {
            console.error("Error:", err);
            this.handleNetworkError();
        })
    };

    render() {
        const { classes } = this.props
        const { Email, Name } = this.state
        let word = <span>All</span>
        console.log(this.show)
        if (this.show === false) {
            word = <span>Select</span>

        }

        return (
            <ValidatorForm
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
                name="contact"
                ref={f => (this.form = f)}
                data-netlify="true"
                data-netlify-honeypot="bot-field"
            >
                {this.submitError && <p className={classes.submitError}>{this.submitError}</p>}
                <TextValidator
                    id="name"
                    name="Name"
                    label="Name"
                    value={Name}
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
                    value={Email}
                    onChange={this.handleChange}
                    validators={["required", "isEmail"]}
                    errorMessages={["this field is required", "email is not valid"]}
                    fullWidth
                    margin="normal"
                    className={classes.singleLineInput}
                />
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                        <FormControlLabel
                            value="disabled"
                            disabled
                            control={<Radio />}
                            label="(Disabled option)"
                        />
                    </RadioGroup>
                </FormControl>
                <input name="bot-field" style={{ display: "none" }} />
                <Button
                    variant="raised"
                    color="primary"
                    size="large"
                    type="submit"
                    className={classes.submit}
                >
                    Subscribe
        </Button>
            </ValidatorForm>
        );
    }
}

ContactForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Categories);
