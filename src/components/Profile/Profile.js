import React from "react";
import classes from "./Profile.module.css";
import UserProfileInfor from "./UserProfileInfor";
import VideoProfileList from "./VideoProfileList";

function Profile({ user, videos }) {
    const sumLikeCount = videos.reduce((acc, cur) => {
        return acc + cur.likeCount.length;
    }, 0);

    return (
        <React.Fragment>
            <div className={classes.spacing} />
            <div className={classes["profile-container"]}>
                <UserProfileInfor user={user} sumLikeCount={sumLikeCount} />
                <VideoProfileList videos={videos} />
            </div>
        </React.Fragment>
    );
}

export default Profile;
