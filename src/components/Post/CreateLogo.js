import React from 'react';
import injectSheet from "react-jss";
import PropTypes from 'prop-types';

const styles = theme => ({
    name: {
        fontSize: "14px",
        textDecoration: "none",
        // color: theme.main.colors.background,
        fontFamily: theme.typography.fontFamily
    },
    title: {
        fontSize: "12px",
        textDecoration: "none"
    },
    both: {
        textDecoration: "none"

    }
});

const name = `<Hunt Applegate />`

// href="http://www.huntcodes.co"

const CreateLogo = ({ classes }) => (
    <div className={classes.both}>
        <span className={classes.name}>{name}</span>
        {/* <span className={classes.title}>      Software Developer</span> */}
    </div>
)

CreateLogo.propTypes = {
    classes: PropTypes.object.isRequired
};


export default injectSheet(styles)(CreateLogo)