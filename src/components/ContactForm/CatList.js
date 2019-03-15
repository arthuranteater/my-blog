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
        this.cats = { All: true }
        this.props.edges.map(edge => {
            let cat = edge.node.frontmatter.category
            this.cats[cat] = true
        })
        this.state = this.cats
        this.noSelect = ''
    }


    handleChange = name => event => {
        console.log('name', name)
        console.log('after', event.target.checked)
        this.noSelect = ''
        this.setState({ [name]: event.target.checked })
    }

    resetNone = () => {
        this.setState({ none: false })
    }

    getChecked = () => {
        let keys = []
        for (var key in this.state) {
            if (this.state[key] == true) {
                keys.push(key)
            }
        }
        if (keys.length == 0) {
            this.setState({
                none: true
            })
            this.noSelect = 'Please select categories!'
        } else {
            this.props.add(keys)
        }

    }

    render() {
        const { classes } = this.props
        const state = this.state
        console.log('state', state)


        return (
            <div className={classes.root} onClick={this.resetNone}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Categories</FormLabel>
                    <FormHelperText>Click on boxes to select</FormHelperText>
                    {this.noSelect && <p className={classes.submitError}>{this.noSelect}</p>}
                    <FormGroup>
                        {state && Object.keys(state).map(cat => (cat !== 'none') ?
                            <FormControlLabel
                                control={
                                    <Checkbox checked={state[cat]} onChange={this.handleChange(cat)} value={cat} />
                                }
                                label={cat}
                                className={classes.item}
                            /> : <div></div>
                        )}
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