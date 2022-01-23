import React from "react";
import classes from "./Tooltip.module.css";

function Tooltip(props) {
    return (
        <div
            className={`${classes.tooltip} ${
                props.className ? props.className : ""
            }`}
        >
            {props.children}
        </div>
    );
}

export default Tooltip;
