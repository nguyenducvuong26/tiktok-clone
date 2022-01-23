import React, { useEffect } from "react";
import useLike from "../../hooks/useLike";
import classes from "./VideoList.module.css";
import { useDispatch } from "react-redux";
import { videoActions } from "../../stores/video";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoItem from "./VideoItem";
import Loader from "../../components/UI/Loader";

function VideoList({
    getFirstVideosBatch,
    getNextVideosBatch,
    latestVideo,
    hasMore,
    videos,
}) {
    const dispatch = useDispatch();

    const toggleLikeVideoHandler = useLike();

    useEffect(() => {
        if (getFirstVideosBatch) {
            getFirstVideosBatch();
        }
        return () => {
            if (getFirstVideosBatch) {
                dispatch(videoActions.removeVideos());
            }
        };
    }, [dispatch, getFirstVideosBatch]);

    return (
        <React.Fragment>
            <div className={classes.spacing} />
            <div className={classes["video-list"]}>
                <InfiniteScroll
                    style={{ overflow: "none" }}
                    dataLength={videos.length}
                    next={() => {
                        getNextVideosBatch(latestVideo);
                    }}
                    hasMore={hasMore}
                    loader={
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Loader />
                        </div>
                    }
                    endMessage={
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: "1.6rem",
                                padding: "16px 0",
                            }}
                        >
                            <b>Đăng video mới đi đừng cố kéo nữa =))</b>
                        </p>
                    }
                >
                    {videos.map((video) => {
                        return (
                            <VideoItem
                                key={video.id}
                                videoId={video.id}
                                userId={video.userId}
                                uid={video.uid} // uid of user posting video
                                displayName={video.displayName}
                                photoURL={video.photoURL}
                                caption={video.caption}
                                videoURL={video.videoURL}
                                likeCount={video.likeCount}
                                createdAt={video.createdAt}
                                toggleLikeVideoHandler={toggleLikeVideoHandler}
                            />
                        );
                    })}
                </InfiniteScroll>
            </div>
        </React.Fragment>
    );
}

export default VideoList;
