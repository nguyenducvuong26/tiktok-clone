import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../stores/auth";
import { uiActions } from "../stores/ui";
import { updateDocument } from "../firebase/service";

export default function useFollow({
    users,
    following, // following list of user follow
    followId, // id from the firestore of user follow
    followUid, // uid of user follow
    isFollowedUid, // uid of user is followed
}) {
    const [toggleFollow, setToggleFollow] = useState(false);
    const [follow, setFollow] = useState(null);
    const dispatch = useDispatch();

    const toggleFollowHandler = (e) => {
        if (e) {
            e.stopPropagation();
        }
        if (!followUid) {
            dispatch(uiActions.openLoginModal());
        } else {
            if (following.includes(isFollowedUid)) {
                setToggleFollow(true);
                setFollow(false);
                dispatch(authActions.unfollowUser(isFollowedUid));
            } else {
                setToggleFollow(true);
                setFollow(true);
                dispatch(authActions.followUser(isFollowedUid));
            }
        }
    };

    useEffect(() => {
        // get user is followed infor
        const userIsFollowed = users.find((user) => user.uid === isFollowedUid);
        if (toggleFollow && followId && userIsFollowed) {
            // update following list of current logged in user
            updateDocument("users", followId, "following", following);
            // update the follower list of user is followed
            let updateFollowers;
            if (follow) {
                updateFollowers = [...userIsFollowed.followers, followUid];
            } else {
                updateFollowers = userIsFollowed.followers.filter(
                    (follower) => follower !== followUid
                );
            }
            updateDocument(
                "users",
                userIsFollowed.id,
                "followers",
                updateFollowers
            );
            setToggleFollow(false);
            setFollow(null);
        }
        return;
    }, [
        followId,
        following,
        followUid,
        isFollowedUid,
        toggleFollow,
        users,
        follow,
    ]);

    return toggleFollowHandler;
}
