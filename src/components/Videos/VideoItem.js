import React from "react";
import classes from "./VideoItem.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../stores/ui";
import { BsPlayFill } from "react-icons/bs";
import { IoIosPause } from "react-icons/io";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import VideoInfor from "./VideoInfor";
import VideoActions from "./VideoActions";

function VideoItem(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const videoRef = useRef();
    const mainInforRef = useRef();
    const [showTooltip, setShowTooltip] = useState(false);
    const [paused, setPaused] = useState(true);
    const { volume, muted } = useSelector((state) => state.ui);
    const { id, uid, following } = useSelector((state) => state.auth);
    const comments = useSelector((state) => state.comment.comments);
    const replyComments = useSelector((state) => state.comment.replyComments);
    const users = useSelector((state) => state.user.users);

    const videoComments = comments.filter(
        (comment) => comment.videoId === props.videoId
    );

    const videoReplyComments = replyComments.filter(
        (comment) => comment.videoId === props.videoId
    );

    const followData = {
        users,
        following,
        followId: id,
        followUid: uid,
        isFollowedUid: props.uid,
    };

    const toggleFollowHandler = useFollow(followData);

    useEffect(() => {
        mainInforRef.current.mouseEnter();
        mainInforRef.current.mouseLeave();
    }, []);

    // video play when scrolled into view
    useEffect(() => {
        let options = {
            rootMargin: "0px",
            threshold: 1,
        };

        let handlePlay = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then((_) => {
                                setPaused(false);
                            })
                            .catch((error) => {
                                console.log("error");
                            });
                    }
                } else {
                    videoRef.current.pause();
                    setPaused(true);
                }
            });
        };

        let observer = new IntersectionObserver(handlePlay, options);

        observer.observe(videoRef.current);
        return () => {
            observer.disconnect();
        };
    }, []);

    const videoPauseHandler = (e) => {
        e.stopPropagation();
        setPaused((prevState) => !prevState);
        if (videoRef.current.paused === false) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };

    // handle volumn change
    const muteVideoHandler = (e) => {
        e.stopPropagation();
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
        <div className={classes["video-item"]}>
            <VideoInfor
                userId={props.userId} // id of user pust video
                showTooltip={showTooltip}
                photoURL={props.photoURL}
                displayName={props.displayName}
                caption={props.caption}
                following={following}
                uid={props.uid} // uid of user post video
                currentUid={uid} // uid of current loggedin user
                toggleFollowHandler={toggleFollowHandler}
                ref={mainInforRef}
                setShowTooltip={setShowTooltip}
            />
            <div className={classes["video-wrapper"]}>
                <div
                    className={classes.video}
                    onClick={() => {
                        if (props.openVideoDetailModal) {
                            props.openVideoDetailModal();
                        } else {
                            navigate(`/videos/${props.videoId}`);
                        }
                    }}
                >
                    <video
                        ref={videoRef}
                        preload="auto"
                        autoPlay
                        type="video/mp4"
                        muted={muted}
                        loop
                    >
                        <source src={props.videoURL} />
                    </video>
                    <div className={classes["video-actions"]}>
                        <div
                            className={`${classes["video-actions-icon"]} ${classes.play}`}
                            onClick={videoPauseHandler}
                        >
                            <div>
                                {paused ? <BsPlayFill /> : <IoIosPause />}
                            </div>
                        </div>
                        <div className={classes["video-actions-icon"]}>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={volume}
                                onChange={volumeChangeHandler}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            />
                            <div onClick={muteVideoHandler}>
                                {muted ? <HiVolumeOff /> : <HiVolumeUp />}
                            </div>
                        </div>
                    </div>
                </div>
                <VideoActions
                    uid={uid}
                    videoId={props.videoId}
                    videoComments={videoComments}
                    videoReplyComments={videoReplyComments}
                    likeCount={props.likeCount}
                    toggleLikeVideoHandler={props.toggleLikeVideoHandler}
                    openVideoDetailModal={props.openVideoDetailModal}
                />
            </div>
        </div>
    );
}

export default VideoItem;
