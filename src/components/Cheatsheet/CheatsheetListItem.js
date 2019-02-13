import React from 'react';
import injectSheet from "react-jss";
import PropTypes from 'prop-types';

const styles = theme => ({
    title: {
        color: theme.main.colors.title
    },
    content: {
        color: theme.main.colors.content
    }
});


const CheatsheetListItem = ({ item, classes }) => (
    <div className={classes.list} id={item.node.frontmatter.title}>
        <h1 className={classes.title}>{item.node.frontmatter.title}</h1>
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: item.node.html }}></div>
        <hr></hr>
    </div>
)

CheatsheetListItem.propTypes = {
    classes: PropTypes.object.isRequired
};


export default injectSheet(styles)(CheatsheetListItem)