import React, { useState, useEffect } from "react";
import classes from "../App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../stores/ui";
import { useParams } from "react-router-dom";
import useFollow from "../hooks/useFollow";
import { getSingleDocument, updateDocument } from "../firebase/service";
import { formatDate } from "../utilities/formatDate";
import SideBar from "../components/Sidebar/SideBar";
import VideoItem from "../components/Videos/VideoItem";
import VideoDetailModalContainer from "../components/Detail/VideoDetailModal";

function DetailPage() {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const {
        uid: currentUid,
        id,
        following,
    } = useSelector((state) => state.auth);
    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();

    const followData = {
        users,
        following,
        followId: id,
        followUid: currentUid,
        isFollowedUid: video?.uid,
    };

    const toggleFollowHandler = useFollow(followData);

    const toggleLikeVideoHandler = (currentUid) => {
        if (!currentUid) {
            dispatch(uiActions.openLoginModal());
        } else {
            const prevVideo = video;
            let updatedLikeCount;
            if (prevVideo.likeCount.includes(currentUid)) {
                updatedLikeCount = prevVideo.likeCount.filter(
                    (uid) => uid !== currentUid
                );
                setVideo({
                    ...prevVideo,
                    likeCount: updatedLikeCount,
                });
            } else {
                updatedLikeCount = [...prevVideo.likeCount, currentUid];
                setVideo({
                    ...prevVideo,
                    likeCount: updatedLikeCount,
                });
            }
            updateDocument("videos", videoId, "likeCount", updatedLikeCount);
        }
    };

    useEffect(() => {
        async function getVideo() {
            let video = await getSingleDocument("videos", videoId);
            console.log(video);
            video = {
                ...video,
                createdAt: formatDate(video.createdAt.seconds),
            };
            setVideo(video);
        }
        getVideo();
    }, [videoId]);

    useEffect(() => {
        setShowDetail(true);
    }, []);

    const closeVideoDetailModal = () => {
        setShowDetail(false);
    };

    const openVideoDetailModal = () => {
        setShowDetail(true);
    };

    return (
        <div className={classes["main-body"]}>
            <div className={classes["main-body-helper"]}>
                {video && showDetail && (
                    <VideoDetailModalContainer
                        videoId={videoId}
                        fileName={video.fileName}
                        userId={video.userId} // id of user post video
                        uid={video.uid} // uid of user post video
                        currentUid={currentUid} // uid of current logged in user
                        currentId={id} // id of current loggedin user
                        displayName={video.displayName}
                        photoURL={video.photoURL}
                        caption={video.caption}
                        videoURL={video.videoURL}
                        likeCount={video.likeCount}
                        createdAt={video.createdAt}
                        following={following}
                        closeVideoDetailModal={closeVideoDetailModal}
                        toggleFollowHandler={toggleFollowHandler}
                        toggleLikeVideoHandler={toggleLikeVideoHandler}
                    />
                )}
                <SideBar />
                <div style={{ width: "356px" }} />
                <div
                    style={{
                        padding: "24px 0",
                        margin: "0 16px",
                        width: "692px",
                        maxWidth: "692px",
                    }}
                >
                    {video && !showDetail && (
                        <VideoItem
                            videoId={videoId}
                            userId={video.userId}
                            uid={video.uid}
                            displayName={video.displayName}
                            photoURL={video.photoURL}
                            caption={video.caption}
                            videoURL={video.videoURL}
                            likeCount={video.likeCount}
                            createdAt={video.createdAt}
                            openVideoDetailModal={openVideoDetailModal}
                            toggleLikeVideoHandler={toggleLikeVideoHandler}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
