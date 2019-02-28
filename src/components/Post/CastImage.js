import React from 'react';
import injectSheet from "react-jss";
import PropTypes from 'prop-types';
import garf from '../../../content/post-cast-images/blink3.gif'

const images = { 1: garf }


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
    return (<div>
        {Object.keys(images).map((num, i) => (num == castImage) ? (<div key={i} className={classes.background}><img className={classes.image} alt="image" src={images[num]} /></div>) : (<div key={i}></div>))}
    </div>)
}

CastImage.propTypes = {
    classes: PropTypes.object.isRequired
};


export default injectSheet(styles)(CastImage)