import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from "react-jss"
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from "@material-ui/core/Button"


const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: '1em',
    },
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

class CatList extends React.Component {
    constructor(props) {
        super(props)
        this.cats = ['redux', 'pi', 'gatsby']
        this.catO = {}
        this.cats.map(cat => {
            this.catO[`${cat}`] = true
        })
        this.state = this.catO
        this.noSelect = ''
    }


    handleChange = name => event => {
        this.noSelect = ''
        this.setState({ [name]: event.target.checked })
    }

    resetNone = () => {
        this.setState({ None: false })
    }

    getChecked = () => {
        let keys = []
        for (var key in this.state) {
            if (this.state[key] == true) {
                keys.push(key)
                console.log(key)
            }
        }
        if (keys.length == 0) {
            this.setState({ None: true })
            this.noSelect = 'Please select categories!'
        } else {
            this.props.add(keys)
        }

    }

    render() {
        const { classes } = this.props
        const { redux, pi, gatsby } = this.state


        return (
            <div className={classes.root} onClick={this.resetNone}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Categories</FormLabel>
                    <FormHelperText>Click on boxes to select</FormHelperText>
                    {this.noSelect && <p className={classes.submitError}>{this.noSelect}</p>}
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={redux} onChange={this.handleChange('redux')} value="redux" />
                            }
                            label="redux"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={pi} onChange={this.handleChange('pi')} value="pi" />
                            }
                            label="pi"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={gatsby}
                                    onChange={this.handleChange('gatsby')}
                                    value="gatsby"
                                />
                            }
                            label="gatsby"
                        />
                    </FormGroup>
                </FormControl>
                <Button
                    variant="raised"
                    color="primary"
                    size="large"
                    type="submit"
                    className={classes.submit}
                    onClick={this.getChecked}
                >
                    Subscribe
                </Button>
            </div>
        )
    }
}

CatList.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default injectSheet(styles)(CatList)