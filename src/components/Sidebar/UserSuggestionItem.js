import React, { useState, useEffect, useRef } from "react";
import classes from "./UserSuggestionItem.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserTooltip from "../UI/UserTooltip";
import useFollow from "../../hooks/useFollow";

function UserSuggestionItem(props) {
    const navigate = useNavigate();
    const accountRef = useRef();
    const [showTooltip, setShowTooltip] = useState(false);
    const users = useSelector((state) => state.user.users);

    const { followers } = users.find((user) => user.uid === props.uid);

    // when user trigger follow others
    const followData = {
        users: props.users,
        following: props.following,
        followId: props.id,
        followUid: props.followUid,
        isFollowedUid: props.uid,
    };

    const toggleFollowHandler = useFollow(followData);

    useEffect(() => {
        accountRef.current.addEventListener("mouseenter", () => {
            setShowTooltip(true);
        });

        accountRef.current.addEventListener("mouseleave", () => {
            setShowTooltip(false);
        });
    }, []);

    return (
        <div
            ref={accountRef}
            className={classes.account}
            onClick={() => navigate(`/users/${props.userId}`)}
        >
            <div className={classes.avatar}>
                <img src={props.photoURL} alt={props.displayName} />
            </div>
            <div className={classes.username}>
                <span>{props.displayName}</span>
            </div>
            <UserTooltip
                className={classes["user-tooltip-custom"]}
                userId={props.userId}
                showTooltip={showTooltip}
                photoURL={props.photoURL}
                displayName={props.displayName}
                following={props.following}
                uid={props.uid}
                followers={followers}
                toggleFollowHandler={toggleFollowHandler}
            />
        </div>
    );
}

export default UserSuggestionItem;
