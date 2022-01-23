import React, { useState, useCallback, useEffect } from "react";
import classes from "../App.module.css";
import useLike from "../hooks/useLike";
import { useSelector, useDispatch } from "react-redux";
import { videoActions } from "../stores/video";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { formatDate } from "../utilities/formatDate";
import SideBar from "../components/Sidebar/SideBar";
import Following from "../components/Following/Following";

function FollowingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const following = useSelector((state) => state.auth.following);
    const followedVideos = useSelector((state) => state.video.followedVideos);
    const dispatch = useDispatch();

    const toggleLikeVideoHandler = useLike(false);

    // get videos of user that current logged in user is following
    const getFollowedVideosHandler = useCallback(async () => {
        try {
            setIsLoading(true);
            const queries = [];
            for (let i = 0; i < following.length; i += 10) {
                queries.push(
                    query(
                        collection(db, "videos"),
                        where("uid", "in", following.slice(i, i + 10)),
                        orderBy("createdAt", "desc")
                    )
                );
            }
            let videoSnapshots = [];
            for (let i = 0; i < queries.length; i++) {
                videoSnapshots.push(getDocs(queries[i]));
            }
            videoSnapshots = await Promise.all(videoSnapshots);
            setIsLoading(false);
            videoSnapshots = [
                ...new Set(
                    [].concat(
                        ...videoSnapshots.map((snapshot) => snapshot.docs)
                    )
                ),
            ];

            const videos = videoSnapshots
                .map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                .map((video) => ({
                    ...video,
                    createdAt: formatDate(video.createdAt.seconds),
                }));

            if (videos.length) {
                dispatch(videoActions.getFollowedVideos(videos));
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, following]);

    useEffect(() => {
        getFollowedVideosHandler();
        return () => {
            dispatch(videoActions.removeFollowedVideos());
        };
    }, [dispatch, getFollowedVideosHandler]);

    return (
        <div className={classes["main-body"]}>
            <div className={classes["main-body-helper"]}>
                <SideBar />
                <Following
                    isLoading={isLoading}
                    followedVideos={followedVideos}
                    toggleLikeVideoHandler={toggleLikeVideoHandler}
                />
            </div>
        </div>
    );
}

export default FollowingPage;
