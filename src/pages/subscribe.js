import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Obfuscate from "react-obfuscate";
import ContactForm from "../components/ContactForm"

import Main from "../components/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";
import Content from "../components/Main/Content";
import Subscribe from "../components/Subscribe";
import config from "../../content/meta/config";

const styles = theme => ({});

const SubscribePage = props => {
  const { data } = props
  const meta = data.site.siteMetadata

  return (
    <Main>
      <Article>
        <PageHeader title="Subscribe" />
        <Content>
          Enter your email below to subscribe!
        </Content>
        <br></br>
        <ContactForm api={meta.addSub} values={meta.values} />
      </Article>
    </Main>
  );
};

SubscribePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(SubscribePage);

export const query = graphql`
  query postQuery {
    site {
      siteMetadata {
        addSub
        values
      }
    }
  }
`;
