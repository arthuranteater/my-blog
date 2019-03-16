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
    submitSuccess: {
        background: "green",
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
        this.state = { cats: this.cats, views: { error: '' } }
    }


    handleAll = e => {
        if (e.target.checked === true) {
            Object.keys(this.state.cats).map(cat => {
                this.setState(prevState => ({
                    cats: {
                        ...prevState.cats,
                        [cat]: true
                    }
                }))
            })
        } else {
            this.setState(prevState => ({
                cats: {
                    ...prevState.cats,
                    All: false
                }
            }))
        }
    }

    handleChange = name => e => {
        if (e.target.checked === false) {
            this.setState(prevState => ({
                cats: {
                    ...prevState.cats,
                    All: false,
                    [name]: false
                }
            }))
        } else {
            this.setState(prevState => ({
                cats: {
                    ...prevState.cats,
                    [name]: true
                },
                views: {
                    ...prevState.views,
                    error: ''
                }
            }))
        }
    }

    getChecked = () => {
        let selected = []
        for (var cat in this.state.cats) {
            if (this.state.cats[cat] == true) {
                selected.push(cat)
            }
        }
        if (selected.length == 0) {
            this.setState(prevState => ({
                views: {
                    ...prevState.views,
                    error: 'Please select a category!'
                }
            }))
        } else {
            this.props.add(selected)
        }
    }

    render() {
        const { classes } = this.props
        const state = this.state


        return (
            <div className={classes.root} onClick={this.resetNone}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Categories</FormLabel>
                    <FormHelperText>Click on boxes to select</FormHelperText>
                    {state.views.error && <p className={classes.submitError}>{state.views.error}</p>}
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.cats.All} onChange={this.handleAll} value='All' />
                            }
                            label='All'
                            className={classes.item}
                        />
                        {state.cats && Object.keys(state.cats).map(cat => (cat !== 'All') ?
                            <FormControlLabel
                                control={
                                    <Checkbox checked={state.cats[cat]} onChange={this.handleChange(cat)} value={cat} />
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
                    Get ID
                </Button>
            </div>
        )
    }
}

CatList.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default injectSheet(styles)(CatList)