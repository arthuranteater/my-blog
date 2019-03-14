import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { navigateTo } from "gatsby-link";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import CatList from './CatList'



const styles = theme => ({
  submit: {
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
  submitError: {
    background: "red",
    color: "white"
  },
});

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitError = ''
    this.saved = false
    this.latest = {
      title: this.props.edges[0].node.frontmatter.title, subTitle: this.props.edges[0].node.frontmatter.subTitle,
      slug: this.props.edges[0].node.fields.slug
    }
  }

  state = {
    Name: '',
    Email: '',
    Categories: '',
    Passcode: '',
  }

  addCats = (selected) => {
    this.saved = true
    let strCats = selected.join(' ')
    console.log('cats added', strCats)
    this.setState({ Categories: strCats })
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

  handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    if (this.state.Passcode === '') {
      this.createCode()
    }
    this.setState({ [name]: value })
  }

  handleNetworkError = e => {
    this.submitError = 'There was a network error!'
  }

  handleNoSelect = e => {
    this.submitError = 'Please select categories and click save!'
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.saved == true) {
      const devUrl = `http://localhost:4000/${this.props.api}`
      const pkg = { ...this.state }
      pkg['post'] = this.latest
      fetch(devUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pkg)
      }).then(res => {
        console.log('Status', res.status)
        navigateTo("/subscribed")
      }).catch(err => {
        console.error("Error:", err)
        this.handleNetworkError()
      })
    }
  };

  render() {
    const { classes, edges } = this.props
    const { Email, Name } = this.state

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
        <CatList add={this.addCats} edges={edges} />
        <input name="bot-field" style={{ display: "none" }} />
      </ValidatorForm>
    );
  }
}

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(ContactForm)