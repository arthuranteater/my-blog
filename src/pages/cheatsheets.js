import React from 'react';
import Main from "../components/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";
import Cheatsheet from "../components/Cheatsheet";



export default class Cheatsheets extends React.Component {

  render() {
    const { data } = this.props
    return (
      <Main>
        <Article>
          <PageHeader title="Cheatsheets" />
          <Cheatsheet data={data.cheatsheets.edges} />
        </Article>
      </Main>
    )
  }
}


export const query = graphql`
  query CheatsheetQuery {
    cheatsheets: allMarkdownRemark(filter: { id: { regex: "//cheatsheets//" } }) {
        edges {
          node {
            html
            frontmatter {
              title
            }
          }
        }
    }
}
`
