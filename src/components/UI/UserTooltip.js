import React from "react";
import classes from "./UserTooltip.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Tooltip from "./Tooltip";
import Button from "./Button";

function UserTooltip(props) {
    const userVideos = useSelector((state) => state.video.allVideos).filter(
        (video) => video.uid === props.uid
    );

    const likeCountSum = userVideos.reduce((acc, cur) => {
        return acc + cur.likeCount.length;
    }, 0);

    return (
        <CSSTransition
            in={props.showTooltip}
            timeout={500}
            classNames={{
                enter: classes["user-tooltip-wrapper-enter"],
                enterActive: classes["user-tooltip-wrapper-enter-active"],
                exit: classes["user-tooltip-wrapper-exit"],
                exitActive: classes["user-tooltip-wrapper-exit-active"],
            }}
            mountOnEnter
            unmountOnExit
        >
            <Tooltip
                className={`${classes["user-tooltip"]} ${
                    props.className ? props.className : ""
                }`}
            >
                <div className={classes["tooltip-header"]}>
                    <Link
                        className={classes.image}
                        to={`users/${props.userId}`}
                    >
                        <img src={props.photoURL} alt={props.displayName} />
                    </Link>
                    <div
                        className={`${classes["follow-btn"]} ${
                            props?.following.includes(props.uid) &&
                            "followed-btn"
                        }`}
                    >
                        <Button
                            className={classes["tooltip-button"]}
                            onClick={props.toggleFollowHandler}
                        >
                            {props.following.includes(props.uid)
                                ? "Đang Follow"
                                : "Follow"}
                        </Button>
                    </div>
                </div>
                <div className={classes["tooltip-body"]}>
                    <Link to={`users/${props.userId}`}>
                        {props.displayName}
                    </Link>
                    <div className={classes["social-infor"]}>
                        <span className={classes.number}>
                            {props?.followers?.length}
                        </span>
                        <span className={classes.hint}>Follower</span>
                        <span className={classes.number}>{likeCountSum}</span>
                        <span className={classes.hint}>Thích</span>
                    </div>
                </div>
            </Tooltip>
        </CSSTransition>
    );
}

export default UserTooltip;
