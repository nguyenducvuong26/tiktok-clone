import classes from "../App.module.css";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videoActions } from "../stores/video";
import { getDocumentsWithNoCondition } from "../firebase/service";
import { formatDate } from "../utilities/formatDate";
import SideBar from "../components/Sidebar/SideBar";
import VideoList from "../components/Videos/VideoList";

function HomePage() {
    const [latestVideo, setLatestVideo] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const videos = useSelector((state) => state.video.videos);
    const dispatch = useDispatch();

    // for infinite scroll
    const getFirstVideosBatch = useCallback(async () => {
        const videoSnapshots = await getDocumentsWithNoCondition("videos");
        setLatestVideo(videoSnapshots.docs[videoSnapshots.docs.length - 1]);
        const videos = videoSnapshots.docs
            .map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            .map((video) => ({
                ...video,
                createdAt: formatDate(video.createdAt.seconds),
            }));
        if (videos.length === 0) {
            setHasMore(false);
            setLatestVideo(null);
            return;
        }
        dispatch(videoActions.getVideos(videos));
    }, [dispatch]);

    const getNextVideosBatch = useCallback(
        async (latestVideo) => {
            const videoSnapshots = await getDocumentsWithNoCondition(
                "videos",
                latestVideo
            );
            setLatestVideo(videoSnapshots.docs[videoSnapshots.docs.length - 1]);
            const videos = videoSnapshots.docs
                .map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                .map((video) => ({
                    ...video,
                    createdAt: formatDate(video.createdAt.seconds),
                }));
            if (videos.length === 0) {
                setHasMore(false);
                setLatestVideo(null);
                return;
            }
            dispatch(videoActions.getVideos(videos));
        },
        [dispatch]
    );

    useEffect(() => {
        return () => {
            dispatch(videoActions.removeVideos());
        };
    }, [dispatch]);

    return (
        <div className={classes["main-body"]}>
            <div className={classes["main-body-helper"]}>
                <SideBar />
                <VideoList
                    getFirstVideosBatch={getFirstVideosBatch}
                    getNextVideosBatch={getNextVideosBatch}
                    videos={videos}
                    latestVideo={latestVideo}
                    hasMore={hasMore}
                />
            </div>
        </div>
    );
}

export default HomePage;
