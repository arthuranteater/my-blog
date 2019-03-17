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
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: '1em',
    },
    gbutton: {
        backgroundColor: theme.main.colors.link,
        margin: "3em 0",
        marginLeft: "5em"
    },
    label: {
        color: theme.main.colors.link,
        "&:hover": {
            color: theme.main.colors.linkHover
        }
    },
    flabel: {
        marginTop: '.5em',
        marginBottom: '.5em'
    }
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
    }


    handleAll = e => {
        if (e.target.checked === true) {
            Object.keys(this.state).map(cat => {
                this.setState(prevState => ({
                    ...prevState,
                    [cat]: true
                }))
            })
        } else {
            this.setState(prevState => ({
                ...prevState,
                All: false
            }))
        }
    }

    handleChange = name => e => {
        if (e.target.checked === false) {
            this.setState(prevState => ({
                ...prevState,
                All: false,
                [name]: false
            }))
        } else {
            this.setState(prevState => ({
                ...prevState,
                [name]: true
            }))
        }
    }

    getSelected = () => {
        let selected = []
        for (var cat in this.state) {
            if (this.state[cat] == true) {
                selected.push(cat)
            }
        }
        this.props.add(selected)
    }

    render() {
        const { classes } = this.props
        const state = this.state


        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel className={classes.flabel} component="legend">Categories</FormLabel>
                    <FormGroup >
                        <FormControlLabel
                            control={
                                <Checkbox color='default' checked={state.All} onChange={this.handleAll} value='All' />
                            }
                            label={<Typography className={classes.label}>All</Typography>}
                            className={classes.item}
                        />
                        {state && Object.keys(state).map(cat => (cat !== 'All') ?
                            <FormControlLabel
                                control={
                                    <Checkbox color='default' checked={state[cat]} onChange={this.handleChange(cat)} value={cat} />
                                }
                                label={<Typography className={classes.label}>{cat}</Typography>}
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
                    className={classes.gbutton}
                    onClick={this.getSelected}
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