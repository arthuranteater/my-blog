import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Obfuscate from "react-obfuscate";
import ContactForm from "../components/ContactForm"
import Main from "../components/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";
import Content from "../components/Main/Content";
import config from "../../content/meta/config";

const styles = theme => ({});

const SubscribePage = props => {
  const { data } = props
  const meta = data.pass.siteMetadata
  const edges = data.cat.edges
  console.log('edges', edges)
  const filtEdges = edges.filter((edge, i) => {
    let cat = edge.node.frontmatter.category
    return cat != null
  })

  return (
    <Main>
      <Article>
        <PageHeader title="Subscribe" />
        <Content>
          Enter your email below to subscribe!
        </Content>
        <br></br>
        <ContactForm api={meta.addSub} values={meta.values} edges={filtEdges} />
      </Article>
    </Main>
  );
};

SubscribePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(SubscribePage);

export const query = graphql`
  query subQuery {
    pass: site {
      siteMetadata {
        addSub
        values
      }
    }
    cat: allMarkdownRemark(
      filter: { id: { regex: "//posts//" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            category
            title
            subTitle
          }
        }
      }
    }
  }
`;
