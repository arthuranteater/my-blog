import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const styles = theme => ({
    container: {
    }
})


const ContentCollection = props => {
    const { classes, html, children } = props;

    if (html) {
        return <div className={classes.ContentCollection} dangerouslySetInnerHTML={{ __html: html }} />;
    } else {
        return <div className={classes.ContentCollection}>{children}</div>;
    }
};



export default injectSheet(styles)(ContentCollection)