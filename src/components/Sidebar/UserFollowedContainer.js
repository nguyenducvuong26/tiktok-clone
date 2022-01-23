import React, { useState, useMemo, useEffect, useCallback } from "react";
import classes from "./UserContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../stores/user";
import { getDocumentsWithCondition } from "../../firebase/service";
import { formatDate } from "../../utilities/formatDate";
import UserFollowedItem from "./UserFollowedItem";
import SkeletonLoader from "../UI/SkeletonLoader";

function UserFollowedContainer() {
    const [firstLatestUser, setFirstLatestUser] = useState(null);
    const [latestUser, setLatestUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { uid, following } = useSelector((state) => state.auth);
    const followedUsers = useSelector((state) => state.user.followedUsers);
    const dispatch = useDispatch();

    const usersCondition = useMemo(() => {
        return {
            fieldPath: "uid",
            operator: "in",
            value: following,
            orderBy: "createdAt",
            sortBy: "desc",
            limit: 5,
        };
    }, [following]);

    const getFirstFollowedUserBatch = useCallback(async () => {
        setIsLoading(true);
        const userSnapshots = await getDocumentsWithCondition(
            "users",
            usersCondition
        );
        setIsLoading(false);
        if (!userSnapshots) {
            return;
        } else {
            setLatestUser(userSnapshots[userSnapshots.length - 1]);
            setFirstLatestUser(userSnapshots[userSnapshots.length - 1]);

            const users = userSnapshots
                .map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                .map((user) => ({
                    ...user,
                    createdAt: formatDate(user.createdAt),
                }))
                .filter((user) => user.uid !== uid);

            if (users.length === 0) {
                setHasMore(false);
            }
            dispatch(userActions.getFollowedUsers(users));
        }
    }, [uid, dispatch, usersCondition]);

    const getNextFollowedUserBatch = async (latestUser) => {
        setIsLoading(true);
        const userSnapshots = await getDocumentsWithCondition(
            "users",
            usersCondition,
            latestUser
        );
        setIsLoading(false);
        if (!userSnapshots) {
            return;
        } else {
            setLatestUser(userSnapshots[userSnapshots.length - 1]);
            const users = userSnapshots
                .map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                .map((user) => ({
                    ...user,
                    createdAt: formatDate(user.createdAt),
                }))
                .filter((user) => user.uid !== uid);

            if (users.length === 0) {
                setHasMore(false);
            }
            dispatch(userActions.getFollowedUsers(users));
        }
    };

    useEffect(() => {
        if (following.length > 0) {
            getFirstFollowedUserBatch();
        }
        return () => {
            dispatch(userActions.removeFollowedUsers());
        };
    }, [following, dispatch, getFirstFollowedUserBatch]);

    const seeLessHandler = () => {
        dispatch(userActions.seeLessFollowedUsers());
        setHasMore(true);
        setLatestUser(firstLatestUser);
    };

    return (
        <div className={classes["user-container"]}>
            <p>Các tài khoản đang follow</p>
            {isLoading ? (
                <SkeletonLoader />
            ) : (
                followedUsers.map((user) => {
                    return (
                        <UserFollowedItem
                            userId={user.id}
                            key={user.uid}
                            uid={user.uid}
                            displayName={user.displayName}
                            photoURL={user.photoURL}
                        />
                    );
                })
            )}
            {followedUsers.length > 0 ? (
                <div className={classes["more-button"]}>
                    {hasMore ? (
                        <p
                            className={classes["more-text"]}
                            onClick={() => getNextFollowedUserBatch(latestUser)}
                        >
                            Xem thêm
                        </p>
                    ) : (
                        <p
                            className={classes["more-text"]}
                            onClick={seeLessHandler}
                        >
                            Ẩn bớt
                        </p>
                    )}
                </div>
            ) : (
                <p className={classes["empty-hint"]}>
                    Những tài khoản bạn follow sẽ xuất hiện tại đây.
                </p>
            )}
        </div>
    );
}

export default UserFollowedContainer;
