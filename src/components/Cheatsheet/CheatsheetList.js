import React from 'react';
import CheatsheetListItem from './CheatsheetListItem'




const CheatsheetList = ({ data }) => {
    return (
        <div>
            {data.map((item, i) => <CheatsheetListItem item={item} key={i} />)}
        </div>
    )
}

export default CheatsheetList
