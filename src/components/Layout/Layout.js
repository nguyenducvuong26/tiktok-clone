import React from "react";
import classes from "./Layout.module.css";

function Layout(props) {
    return <main className={classes.main}>{props.children}</main>;
}

export default Layout;
