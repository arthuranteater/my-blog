import React from "react";
import PropTypes from "prop-types";

import Article from "../Main/Article";
import PostHeader from "./PostHeader";
import Content from "../Main/Content";
import PostFooter from "./PostFooter";
import CastImage from './CastImage'

const Post = props => {
  const { post, author, slug, facebook } = props;
  const frontmatter = (post || {}).frontmatter;
  const title = ((post || {}).frontmatter || {}).title;
  const subTitle = ((post || {}).frontmatter || {}).subTitle;
  const date = ((post || {}).fields || {}).prefix;
  const html = (post || {}).html;
  const htmlAst = (post || {}).htmlAst;
  const hashtag = ((post || {}).frontmatter || {}).hashtag;
  const castImage = ((post || {}).frontmatter || {}).castImage;

  //console.log(htmlAst);
  console.log(castImage)
  console.log(typeof (castImage))

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
