import React from "react";
import classes from "./VideoActions.module.css";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { RiShareForwardFill } from "react-icons/ri";

function VideoActions(props) {
    const navigate = useNavigate();

    return (
        <div className={classes.actions}>
            <div className={classes.action}>
                <div
                    className={`${classes.icon} ${
                        props.likeCount.includes(props.uid) && classes.liked
                    }`}
                    onClick={() =>
                        props.toggleLikeVideoHandler(props.videoId, props.uid)
                    }
                >
                    <AiFillHeart />
                </div>
                <span>{props.likeCount.length}</span>
            </div>
            <div className={classes.action}>
                <div
                    className={classes.icon}
                    onClick={() => {
                        if (props.openVideoDetailModal) {
                            props.openVideoDetailModal();
                        } else {
                            navigate(`/videos/${props.videoId}`);
                        }
                    }}
                >
                    <FaCommentDots />
                </div>
                <span>
                    {props.videoComments.length +
                        props.videoReplyComments.length}
                </span>
            </div>
            <div className={classes.action}>
                <div className={classes.icon}>
                    <RiShareForwardFill />
                </div>
                <span>10</span>
            </div>
        </div>
    );
}

export default VideoActions;
