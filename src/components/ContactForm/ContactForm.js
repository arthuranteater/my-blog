import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Button from "@material-ui/core/Button";
import { navigateTo } from "gatsby-link";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";



function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const styles = theme => ({
  submit: {
    backgroundColor: theme.main.colors.link,
    margin: "3em 0"
    //width: "100%"
  },
  multilineInput: {
    lineHeight: 1.4,
    fontSize: "1.2em"
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
  submitError: {
    background: "red",
    color: "white"
  },
  button: {

  }
});

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitError = '';
  }

  state = {
    Name: "",
    Email: "",
    Categories: ''
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  handleNetworkError = e => {
    this.submitError = `Error!`
  };

  handleSubmit = e => {
    const devUrl = `http://localhost:4000/${this.props.api.addSub}`
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
    const { classes } = this.props;
    const { Email, Name } = this.state;

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

export default injectSheet(styles)(ContactForm);


{/* <TextValidator
          id="message"
          name="message"
          label="Message"
          value={message}
          onChange={this.handleChange}
          errorMessages={["this field is required"]}
          multiline
          fullWidth
          margin="normal"
          className={classes.multilineInput}
        /> */}