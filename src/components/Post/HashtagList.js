import React from 'react';
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import HashtagItem from './HashtagItem'
import { setHashtagClicked } from "../../state/store";

const styles = theme => ({
    list: {
        marginTop: "1em",
    }
})


class HashtagList extends React.Component {
    hashtag = ''

    addToState = (e) => {
        console.log(e.target.innerText)
        this.hashtag = this.props.setHashtagClicked(e.target.innerText)
    }


    render() {
        const { classes, data } = this.props
        let narray = data.split(" ")

        return (
            <div className={classes.list}>
                {narray.map((item, i) => <HashtagItem addToState={this.addToState} item={item} key={i} />)}
            </div>
        )
    }
}

HashtagList.propTypes = {
    classes: PropTypes.object.isRequired,
    hashtagClicked: PropTypes.string.isRequired,
    setHashtagClicked: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        hashtagClicked: state.hashtagClicked
    };
};

const mapDispatchToProps = {
    setHashtagClicked
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectSheet(styles)(HashtagList));

