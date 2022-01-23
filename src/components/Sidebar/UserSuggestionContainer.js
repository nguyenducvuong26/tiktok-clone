import React, { useState, useEffect, useCallback } from "react";
import classes from "./UserContainer.module.css";
import { useSelector } from "react-redux";
import UserSuggestionItem from "./UserSuggestionItem";
import SkeletonLoader from "../UI/SkeletonLoader";

function UserSuggestionContainer() {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const { uid, id, following } = useSelector((state) => state.auth);
    const users = useSelector((state) => state.user.users);

    const getSuggestedUsersHanlder = useCallback(() => {
        const userPromise = new Promise((resolve) => {
            setIsLoading(true);
            setTimeout(() => {
                const filterdUsers = users.filter(
                    (user) => ![...following, uid].includes(user.uid)
                );
                // get 5 suggeted random user if the list is more than 5
                if (filterdUsers.length > 5) {
                    const randomIndexes = [];
                    const randomUsers = [];
                    while (randomIndexes.length < 5) {
                        const randomIndex = Math.floor(
                            Math.random() * filterdUsers.length
                        );
                        if (randomIndexes.indexOf(randomIndex) === -1) {
                            randomIndexes.push(randomIndex);
                            randomUsers.push(filterdUsers[randomIndex]);
                        }
                    }
                    resolve(randomUsers);
                } else {
                    resolve(filterdUsers);
                }
            }, 800);
        });
        userPromise.then((users) => {
            setIsLoading(false);
            setSuggestedUsers(users);
        });
    }, [uid, following, users]);

    useEffect(() => {
        getSuggestedUsersHanlder();
    }, [getSuggestedUsersHanlder]);

    return (
        <div className={classes["user-container"]}>
            <p>Tài khoản được đề xuất</p>
            {isLoading ? (
                <SkeletonLoader />
            ) : (
                suggestedUsers.length > 0 &&
                suggestedUsers.map((user) => {
                    return (
                        <UserSuggestionItem
                            key={user.uid}
                            userId={user.id}
                            displayName={user.displayName}
                            uid={user.uid}
                            followUid={uid}
                            id={id} // id of the current logged in user
                            photoURL={user.photoURL}
                            following={following}
                            users={users}
                        />
                    );
                })
            )}
            {suggestedUsers.length === 0 && (
                <p className={classes["empty-hint"]}>
                    Những tài khoản bạn follow sẽ xuất hiện tại đây.
                </p>
            )}
        </div>
    );
}

export default UserSuggestionContainer;
