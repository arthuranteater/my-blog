import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'


const styles = theme => ({
    item: {
        color: theme.main.colors.link
    }
})


const CatItem = ({ cat, change, classes }) => (
    <FormControlLabel
        control={
            <Checkbox checked={cat} onChange={change(cat)} value={cat} />
        }
        label={cat}
        className={classes.item}
    />
)


CatItem.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(CatItem);
