import React from "react";
import './buttons.css';

function Index({ action ,value, type }) {
    return (
        <p onClick={action} className={`buttons ${type ? type : ''}`}>
            {value}
        </p>
    );
}

export default Index;