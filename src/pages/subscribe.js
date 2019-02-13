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

const SubscribePage = () => {
  return (
    <Main>
      <Article>
        <PageHeader title="Subscribe" />
        <Content>
          Enter your email below to subscribe!
        </Content>
        <br></br>
        <ContactForm />
      </Article>
    </Main>
  );
};

SubscribePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(SubscribePage);
