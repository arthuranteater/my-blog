import React from 'react';
import injectSheet from "react-jss";
import PropTypes from 'prop-types';
import zero from '../../../content/post-cast-images/blink3.gif'

const images = [zero]


const styles = theme => ({
    background: {
        backgroundColor: theme.main.colors.castImage,
        padding: "3em",
        marginBottom: "2em"
    },
    image: {
        display: "block",
        margin: "auto"
    }
});


const CastImage = ({ castImage, classes }) => {
    let match = images.filter(image => image = castImage)
    if (match) {
        return (
            <div className={classes.background}>
                <img className={classes.image} alt="image" src={match[0]} />
            </div>
        )
    }
}

CastImage.propTypes = {
    classes: PropTypes.object.isRequired
};


export default injectSheet(styles)(CastImage)