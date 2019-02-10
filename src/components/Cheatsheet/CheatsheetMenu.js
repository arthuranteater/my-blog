import React from 'react';
import CheatsheetMenuItem from './CheatsheetMenuItem'




const CheatsheetMenu = ({ data }) => {
    return (
        <ul>
            {data.map((item, i) => <CheatsheetMenuItem item={item} key={i} />)}
        </ul>
    )
}

export default CheatsheetMenu
