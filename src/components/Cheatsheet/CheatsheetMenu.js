import React from 'react';
import CheatsheetMenuItem from './CheatsheetMenuItem'
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});




const CheatsheetMenu = ({ data, classes }) => {
    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                {data.map((item, i) => <CheatsheetMenuItem item={item} key={i} />)}
            </Grid>
        </div>
    )
}

CheatsheetMenu.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(CheatsheetMenu)
