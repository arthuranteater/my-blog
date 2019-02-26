import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip';
import CreateLogo from './CreateLogo'

import config from "../../../content/meta/config";
import jshaun22 from "../../images/jpg/jshaun22.png";
import jshaun22s from "../../images/jshaun/jshaun22-small.png"
import noshaun from "../../images/jshaun/noshaun.png"

import GithubIcon from "!svg-react-loader!../../images/svg-icons/github.svg?name=GithubIcon";
import FacebookIcon from "!svg-react-loader!../../images/svg-icons/facebook.svg?name=FacebookIcon";
import TwitterIcon from "!svg-react-loader!../../images/svg-icons/twitter.svg?name=TwitterIcon";

const styles = theme => ({
  author: {
    margin: "1em 0 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    "& a": {
      color: theme.base.colors.link
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      flexDirection: "row",
      justifyContent: "left"
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
    justifyContent: "left",
    flexWrap: "wrap",
    font: "Lato"
  },
  contributors: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "1em"
  },
  link: {
    display: "inline-block",
    paddingTop: "10px",
    margin: "0 .8em",
    cursor: "pointer",
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
    fontSize: "1.2em",
    paddingTop: "1em",
    margin: "0 1em 1em",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 1em"
    }
  },
  name: {
    color: theme.main.colors.background

  },
  title: {
    color: theme.main.colors.background,
    fontSize: "12px"
  },
  logo: {
    backgroundColor: theme.main.colors.link
  },
  chip: {
    marginTop: "1em",
    margin: "0 .8em",
    color: theme.main.colors.background,
    backgroundColor: theme.main.colors.link,
    "&:hover": {
      backgroundColor: theme.main.colors.link
    },
    "&:visited": {
      backgroundColor: theme.main.colors.link
    }
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
  const name = `<Hunt Applegate />`
  const title = <span>Software Engineer</span>

  return (
    <div className={classes.border}>
      <div className={classes.contributors}>
        <span className={classes.connect}>CONTRIBUTORS</span>
        <Chip
          label={<CreateLogo />}
          avatar={<Avatar src={noshaun} />}
          className={classes.chip}
          component="a"
          href="https://www.huntcodes.co"
          target="_blank"
          clickable
        />
        {/* <div className={classes.author}>
        <Avatar src={jshaun22} className={classes.avatar} alt={config.authorName} />

        <div className={classes.box} dangerouslySetInnerHTML={{ __html: author.html }} />
      </div> */}
      </div>

      <div className={classes.social}>
        <span className={classes.connect}>FOLLOW</span>
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



