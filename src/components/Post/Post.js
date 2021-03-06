import React from "react";
import PropTypes from "prop-types";

import Article from "../Main/Article";
import PostHeader from "./PostHeader";
import Content from "../Main/Content";
import PostFooter from "./PostFooter";
import CastImage from './CastImage'

const Post = props => {
  const { post, author, slug, facebook, html, date } = props;

  const title = ((post || {}).frontmatter || {}).title;
  const subTitle = ((post || {}).frontmatter || {}).subTitle;
  const hashtag = ((post || {}).frontmatter || {}).hashtag;
  const castImage = ((post || {}).frontmatter || {}).castImage;

  //const htmlAst = (html || {}).htmlAst;
  // const frontmatter = (post || {}).frontmatter;




  return (
    <Article>
      <PostHeader title={title} subTitle={subTitle} hashtag={hashtag} date={date} post={post} slug={slug} />
      <CastImage castImage={castImage} />
      <Content html={html} />
      <PostFooter author={author} post={post} slug={slug} facebook={facebook} />
    </Article>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired
};

export default Post;
