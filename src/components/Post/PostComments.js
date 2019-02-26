import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import FacebookProvider, { Comments } from "react-facebook";
require("core-js/fn/array/find");

import config from "../../../content/meta/config";

const styles = theme => ({
  postComments: {
    padding: "1em 0 0",
  },
  label: {
    fontSize: "1.2em",
    paddingTop: "1em",
    margin: "0 1em 1em",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 1em"
    }
  },
  container: {
    marginTop: "1em",
    paddingTop: ".8em",
    justifyContent: "left"
  }
});

const PostComments = props => {
  const { classes, slug, facebook } = props;

  return (
    <div className={classes.container}>
      <span className={classes.label}>COMMENT</span>
      <div id="post-comments" className={classes.postComments}>
        <FacebookProvider appId={facebook}>
          <Comments
            href={`${config.siteUrl}${slug}`}
            width="100%"
            colorScheme={props.theme.main.colors.fbCommentsColorscheme}
          />
        </FacebookProvider>
      </div>
    </div>
  );
};

PostComments.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  facebook: PropTypes.object.isRequired
};

export default injectSheet(styles)(PostComments);
