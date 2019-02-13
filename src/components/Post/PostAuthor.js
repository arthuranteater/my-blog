import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Avatar from "@material-ui/core/Avatar";

import config from "../../../content/meta/config";
import avatar from "../../images/jpg/avatar.png";


import GithubIcon from "!svg-react-loader!../../images/svg-icons/github.svg?name=GithubIcon";
import FacebookIcon from "!svg-react-loader!../../images/svg-icons/facebook.svg?name=FacebookIcon";
import TwitterIcon from "!svg-react-loader!../../images/svg-icons/twitter.svg?name=TwitterIcon";

const styles = theme => ({
  author: {
    padding: "2em 0 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& a": {
      color: theme.base.colors.link
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      flexDirection: "row",
      justifyContent: "center"
    }
  },
  avatar: {
    margin: "0 1em 1em",
    borderRadius: "75% 65%",
    width: "60px",
    height: "60px",
    border: "1px solid #ddd",
    flexShrink: 0,
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 1em 0"
    }
  },
  box: {
    display: "flex",
    flexDirction: "column",
    minHeight: "50px",
    alignItems: "center"
  },
  social: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    fontSize: "1.2em",
    font: "Lato",
    margin: "1em 0 0"
  },
  link: {
    display: "inline-block",
    padding: "5px",
    "&:hover": {
      "& svg": {
        fill: theme.info.colors.socialIconsHover
      }
    }
  },
  svg: {
    width: "40px",
    height: "40px",
    fill: theme.main.colors.link,
    transition: "all .5s"
  },
  connect: {
    padding: ".7em"
  },
  border: {
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    margin: "1em 0 0"
  }
});

const PostAuthor = props => {
  const { classes, author } = props;
  const items = config.authorSocialLinks;
  const icons = {
    twitter: TwitterIcon,
    facebook: FacebookIcon,
    github: GithubIcon
  };

  return (
    <div className={classes.border}>
      <div className={classes.author}>
        <Avatar src={avatar} className={classes.avatar} alt={config.authorName} />
        <div className={classes.box} dangerouslySetInnerHTML={{ __html: author.html }} />
      </div>

      <div className={classes.social}>
        <span className={classes.connect}>CONNECT</span>
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
};

PostAuthor.propTypes = {
  classes: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired
};



export default injectSheet(styles)(PostAuthor);



