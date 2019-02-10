import React from 'react';




const CheatsheetMenuItem = ({ item }) => (
    <li><h3><a href={'#' + item.node.frontmatter.title}>{item.node.frontmatter.title}</a></h3></li>
)


export default CheatsheetMenuItem