import React from "react";
import './display.css';

function Display({ value }) {
    return (
        <div className="display">
            <p className="display-value">
                {value}
            </p>
        </div>
    );
}

export default Display;