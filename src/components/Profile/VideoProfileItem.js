import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./VideoProfileItem.module.css";
import Grid from "@mui/material/Grid";

function VideoProfileItem({ video }) {
    const videoRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        videoRef.current.addEventListener("mouseenter", () => {
            videoRef.current.play();
        });
        videoRef.current.addEventListener("mouseleave", () => {
            videoRef.current.pause();
        });
    }, []);

    return (
        <Grid key={video.videoId} item xs={6} md={4}>
            <div>
                <div
                    className={classes["video-item"]}
                    onClick={() => navigate(`/videos/${video.videoId}`)}
                >
                    <video ref={videoRef} muted>
                        <source src={video.videoURL} />
                    </video>
                </div>
                <div className={classes.caption}>{video.caption}</div>
            </div>
        </Grid>
    );
}

export default VideoProfileItem;
