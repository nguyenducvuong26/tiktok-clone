import React, { useRef, useImperativeHandle } from "react";
import classes from "./VideoInfor.module.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import UserTooltip from "../UI/UserTooltip";

function VideoInfor(props, ref) {
    const mainInforRef = useRef();
    const location = useLocation();
    const users = useSelector((state) => state.user.users);

    // for rendering followers in usertooltip
    const userPostVideo = users.find((user) => user.uid === props.uid);

    useImperativeHandle(ref, () => ({
        mouseEnter: () => {
            mainInforRef.current.addEventListener("mouseenter", () => {
                props.setShowTooltip(true);
            });
        },
        mouseLeave: () => {
            mainInforRef.current.addEventListener("mouseleave", () => {
                props.setShowTooltip(false);
            });
        },
    }));

    return (
        <div className={classes["video-infor"]}>
            <div ref={mainInforRef} className={classes["main-infor"]}>
                <div className={classes.avatar}>
                    <Link to={`/users/${props.userId}`}>
                        <img src={props.photoURL} alt="avatar" />
                    </Link>
                </div>
                <div className={classes["username-container"]}>
                    <div className={classes["username-wrapper"]}>
                        <Link to={`/users/${props.userId}`}>
                            <p className={classes.username}>
                                {props.displayName}
                            </p>
                        </Link>
                        {props.uid === props.currentUid ? (
                            <span>(Bạn)</span>
                        ) : null}
                    </div>
                    <div className={classes["caption-wrapper"]}>
                        <p className={classes.caption}>{props.caption}</p>
                    </div>
                </div>
                {props.uid !== props.currentUid && (
                    <UserTooltip
                        showTooltip={props.showTooltip}
                        photoURL={props.photoURL}
                        displayName={props.displayName}
                        following={props.following}
                        userId={props.userId}
                        uid={props.uid}
                        toggleFollowHandler={props.toggleFollowHandler}
                        followers={userPostVideo?.followers}
                    />
                )}
            </div>
            {props.uid === props.currentUid ||
            location.pathname === "/following" ? null : (
                <div
                    className={`${classes["follow-btn"]} ${
                        props.following.includes(props.uid) && "followed-btn"
                    }`}
                >
                    <Button onClick={props.toggleFollowHandler}>
                        {props.following.includes(props.uid)
                            ? "Đang Follow"
                            : "Follow"}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default React.forwardRef(VideoInfor);
