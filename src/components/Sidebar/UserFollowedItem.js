import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./UserFollowedItem.module.css";

function UserFollowedItem(props) {
    const navigate = useNavigate();

    return (
        <div
            className={classes.account}
            onClick={() => navigate(`/users/${props.userId}`)}
        >
            <div className={classes.avatar}>
                <img src={props.photoURL} alt={props.displayName} />
            </div>
            <div className={classes.username}>
                <span>{props.displayName}</span>
            </div>
        </div>
    );
}

export default UserFollowedItem;
