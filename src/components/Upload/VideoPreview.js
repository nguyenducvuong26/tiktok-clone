import React from "react";
import classes from "./VideoPreview.module.css";

function VideoPreview(props) {
    return (
        <video
            className={classes.video}
            src={props.source}
            autoPlay
            loop
            controls
        />
    );
}

export default React.memo(VideoPreview);
