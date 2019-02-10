import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Link from "gatsby-link";

const styles = theme => ({
  infoMenu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    width: "100%"
  },
  link: {
    padding: ".5em",
    fontWeight: 300,
    textTransform: "lowercase",
    color: theme.info.colors.menuLink,
    "&:hover": {
      color: theme.info.colors.menuLinkHover
    }
  }
});

const InfoMenu = props => {
  const { cheatsheets, classes, pages, linkOnClick } = props;
  console.log(cheatsheets)

  return (
    <nav className={classes.infoMenu}>
      <Link to="/subscribe/" onClick={linkOnClick} className={classes.link} data-shape="closed">
        Subscribe
      </Link>
      <Link cheatsheats={cheatsheets} to="/cheatsheets/" onClick={linkOnClick} className={classes.link} data-shape="closed">
        cheatsheets
      </Link>
      {pages.map((page, i) => {
        const { fields, frontmatter } = page.node;
        return (
          <Link
            key={fields.slug}
            to={fields.slug}
            onClick={linkOnClick}
            className={classes.link}
            data-shape="closed"
          >
            {frontmatter.menuTitle ? frontmatter.menuTitle : frontmatter.title}
          </Link>
        );
      })}
      <a className={classes.link} href="https://www.huntcodes.co/#about" target="_blank" >about me</a>
      <a className={classes.link} href="https://www.huntcodes.co/#projects" target="_blank">my projects</a>
      <a className={classes.link} href="https://www.huntcodes.co/#contact" target="_blank" >contact me</a>

    </nav>
  );
};

InfoMenu.propTypes = {
  pages: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  linkOnClick: PropTypes.func.isRequired
};

export default injectSheet(styles)(InfoMenu);
