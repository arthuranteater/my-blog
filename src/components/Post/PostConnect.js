import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import GithubIcon from "!svg-react-loader!../../images/svg-icons/github.svg?name=GithubIcon";
import FacebookIcon from "!svg-react-loader!../../images/svg-icons/facebook.svg?name=FacebookIcon";
import TwitterIcon from "!svg-react-loader!../../images/svg-icons/twitter.svg?name=TwitterIcon";


import config from "../../../content/meta/config";

const styles = theme => ({
    connect: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // padding: ".5em 0 0",
        [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
            flexDirection: "row"
        }
    },
    links: {
        display: "flex",
        flexDirection: "row",
        "& .SocialMediaShareButton": {
            margin: "0 .8em",
            cursor: "pointer"
        }
    },
    label: {
        fontSize: "1.2em",
        margin: "0 1em 1em",
        [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
            margin: "0 1em"
        }
    }
});

class PostConnect extends React.Component {
    render() {
        const items = config.authorSocialLinks;
        const icons = {
            twitter: TwitterIcon,
            facebook: FacebookIcon,
            github: GithubIcon
        };

        return (
            <div className={classes.connect}>
                <span className={classes.label}>CONNECT</span>
                <div className={classes.links}>
                    {items.map(item => {
                        const Icon = icons[item.name];
                        return (
                            <a
                                href={item.url}
                                key={item.name}
                                className={classes.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={item.name}
                            >
                                <Icon className={classes.svg} />
                            </a>
                        );
                    })}
                </div>
            </div>
        );
    }
}

PostConnect.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(PostConnect);