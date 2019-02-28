import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Link from "gatsby-link";

const styles = theme => ({
  link: {
    padding: ".5em 0 1em 1em",
    position: "relative",
    fontSize: "1.2em",
    display: "block",
    width: "100%",
    color: "#666",
    "&::before": {
      content: `"•"`,
      position: "absolute",
      top: ".5em",
      left: ".1em",
      color: theme.base.colors.accent
    },
    "& span": {
      fontWeight: 300,
      display: "block",
      fontSize: ".9em",
      margin: ".2em 0 0 0"
    }
  }
});

const Hit = props => {
  const { classes, hit } = props;
  const slug = hit.fields.slug
  const link = slug.split('/')[1]
  const step = slug.split('/')[2]
  const split = step.match(/[a-zA-Z]+|[0-9]+/g)
  let string = ''
  let upper = ''
  let num = ''
  if (split !== null) {
    num = split[1]
    string = split.join(' ')
    upper = string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <Link to={`/${link}/#${num}`} className={classes.link}>
      {hit.frontmatter.title}
      {upper && <span>{upper}</span>}
      {hit.frontmatter.subTitle && <span>{hit.frontmatter.subTitle}</span>}
    </Link>
  );
};

Hit.propTypes = {
  classes: PropTypes.object.isRequired,
  hit: PropTypes.object.isRequired
};

export default injectSheet(styles)(Hit);
