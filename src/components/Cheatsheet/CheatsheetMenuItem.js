import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    paper: {
        padding: ".5em",
        textAlign: 'center',
        fontSize: "14px"
    },
    link: {
        color: theme.main.colors.link
    }
});



const CheatsheetMenuItem = ({ item, classes }) => (
    <Grid item xs={3}>
        <Paper className={classes.paper}><a className={classes.link} href={'#' + item.node.frontmatter.title}>{item.node.frontmatter.title}</a></Paper>
    </Grid>


)

CheatsheetMenuItem.propTypes = {
    classes: PropTypes.object.isRequired
};


export default injectSheet(styles)(CheatsheetMenuItem)