import React from "react";
import classes from "./Following.module.css";
import { Link } from "react-router-dom";
import Loader from "../../components/UI/Loader";
import VideoItem from "../../components/Videos/VideoItem";

function Following(props) {
    return (
        <React.Fragment>
            <div className={classes.spacing} />
            <div className={classes["following-video-container"]}>
                {props.isLoading ? (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Loader />
                    </div>
                ) : (
                    <React.Fragment>
                        {props.followedVideos.map((video) => {
                            return (
                                <VideoItem
                                    key={video.uid}
                                    videoId={video.id}
                                    uid={video.uid}
                                    photoURL={video.photoURL}
                                    displayName={video.displayName}
                                    videoURL={video.videoURL}
                                    caption={video.caption}
                                    likeCount={video.likeCount}
                                    toggleLikeVideoHandler={
                                        props.toggleLikeVideoHandler
                                    }
                                />
                            );
                        })}
                    </React.Fragment>
                )}
                {!props.isLoading && props.followedVideos.length === 0 && (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "1.6rem",
                        }}
                    >
                        Bạn chưa follow người dùng nào!&nbsp;
                        <Link to="/" style={{ color: "rgb(254, 44, 85)" }}>
                            Trở về trang chủ
                        </Link>
                        &nbsp; để xem và follow người dùng khác.
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

export default Following;
