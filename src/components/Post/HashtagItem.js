import React from 'react';
import injectSheet from "react-jss";
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    chip: {
        margin: ".2em",
        color: theme.main.colors.background,
        backgroundColor: theme.main.colors.link,
        "&:hover": {
            backgroundColor: theme.main.colors.link
        }
    }
});



const HashtagItem = ({ item, classes, addToState }) => (
    <Chip
        label={`#${item}`}
        className={classes.chip}
        component="a"
        href="/search/"
        clickable
        onClick={addToState}
    />

)

HashtagItem.propTypes = {
    classes: PropTypes.object.isRequired
};


export default injectSheet(styles)(HashtagItem)


