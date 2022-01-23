import React, { useState, useEffect, useRef } from "react";
import classes from "./Video.module.css";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../stores/ui";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";

function Video(props) {
    const dispatch = useDispatch();
    const videoRef = useRef();
    const [paused, setPaused] = useState(false);
    const { volume, muted } = useSelector((state) => state.ui);

    // handle pause or play video
    const videoPauseHandler = () => {
        setPaused((prevState) => !prevState);
        if (videoRef.current.paused === false) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };

    // handle volumn change
    const muteVideoHandler = () => {
        dispatch(uiActions.muteVideo());
    };

    const volumeChangeHandler = (e) => {
        dispatch(uiActions.volumeChange(e.target.value));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            videoRef.current.volume = volume / 100;
        }, 200);
        return () => {
            clearTimeout(timer);
        };
    }, [volume]);

    return (
        <div className={classes["video-container"]}>
            <div
                className={`${classes["close-btn"]} ${classes["modal-btn"]}`}
                onClick={props.closeDetailModalHandler}
            >
                <AiOutlineClose />
            </div>
            <div className={classes.video}>
                <video
                    ref={videoRef}
                    onClick={videoPauseHandler}
                    src={props.videoURL}
                    type="video/mp4"
                    autoPlay
                    muted={muted}
                    loop
                />
                <div
                    className={classes["video-play"]}
                    onClick={videoPauseHandler}
                >
                    {paused && <BsPlayFill />}
                </div>
            </div>
            <div className={classes.volume}>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={volume}
                    muted={muted}
                    onChange={volumeChangeHandler}
                />
                <div
                    className={`${classes["modal-btn"]}`}
                    onClick={muteVideoHandler}
                >
                    {muted ? <HiVolumeOff /> : <HiVolumeUp />}
                </div>
            </div>
        </div>
    );
}

export default Video;
