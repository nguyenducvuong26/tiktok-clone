import React from "react";
import classes from "./SkeletonLoader.module.css";

function SkeletonLoader() {
    return (
        <div className={classes["skeleton-loader"]}>
            <div className={classes["avatar-loader"]} />
            <div className={classes["name-loader"]} />
        </div>
    );
}

export default SkeletonLoader;
