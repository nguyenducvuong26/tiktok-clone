import React from "react";
import { useSelector } from "react-redux";
import useFollow from "../../hooks/useFollow";
import classes from "./UserProfileInfor.module.css";
import Button from "../../components/UI/Button";

function UserProfileInfor({ user, sumLikeCount }) {
    const { id, uid, following } = useSelector((state) => state.auth);
    const users = useSelector((state) => state.user.users);

    const followData = {
        users,
        following,
        followId: id,
        followUid: uid,
        isFollowedUid: user.uid,
    };

    const toggleFollowHandler = useFollow(followData);

    return (
        <div className={classes["user-infor"]}>
            <div className={classes.user}>
                <div className={classes.avatar}>
                    <img src={user.photoURL} alt={user.displayName} />
                </div>
                <div className={classes["sub-infor"]}>
                    <div className={classes.username}>
                        <h4>{user.displayName}</h4>
                    </div>
                    {user.uid !== uid && (
                        <div
                            className={`${classes["follow-btn"]} ${
                                following.includes(user.uid)
                                    ? "followed-btn"
                                    : ""
                            }`}
                        >
                            <Button onClick={toggleFollowHandler}>
                                {following.includes(user.uid)
                                    ? "Đang Follow"
                                    : "Follow"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className={classes["count-infor"]}>
                <div className={classes.count}>
                    <strong>{user.following.length}</strong>
                    <span>Đang Follow</span>
                </div>
                <div className={classes.count}>
                    <strong>{user.followers.length}</strong>
                    <span>Follower</span>
                </div>
                <div className={classes.count}>
                    <strong>{sumLikeCount}</strong>
                    <span>Thích</span>
                </div>
            </div>
        </div>
    );
}

export default UserProfileInfor;
