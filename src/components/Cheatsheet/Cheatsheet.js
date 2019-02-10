import React from 'react';
import CheatsheetMenu from './CheatsheetMenu'
import CheatsheetList from './CheatsheetList'





const Cheatsheet = ({ data }) => {
    return (
        <div>
            <CheatsheetMenu data={data} />
            <br></br>
            <CheatsheetList data={data} />
        </div>
    )
}

export default Cheatsheet
