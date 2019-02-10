import React from 'react';



const CheatsheetListItem = ({ item }) => (
    <div id={item.node.frontmatter.title}>
        <h1>{item.node.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: item.node.html }}></div>
    </div>
)


export default CheatsheetListItem