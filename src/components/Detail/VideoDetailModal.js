import ReactDOM from "react-dom";
import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./VideoDetailModal.module.css";
import { deleteDocument } from "../../firebase/service";
import { storage } from "../../firebase/config";
import { ref, deleteObject } from "firebase/storage";
import { useSelector } from "react-redux";
import { addDocument } from "../../firebase/service";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import Button from "../UI/Button";
import CommentList from "../Comments/CommentList";
import CommentForm from "../Comments/CommentForm";
import ConfirmModal from "../UI/ConfirmModal";
import Video from "./Video";

function VideoDetailModal(props) {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { photoURL, displayName } = useSelector((state) => state.auth);
    const comments = useSelector((state) => state.comment.comments);
    const replyComments = useSelector((state) => state.comment.replyComments);

    //for counting comment of video
    const videoComments = comments.filter(
        (comment) => comment.videoId === props.videoId
    );
    const videoReplyComments = replyComments.filter(
        (comment) => comment.videoId === props.videoId
    );

    const closeDetailModalHandler = () => {
        props.onClose();
    };

    // comment and reply comment
    const inputFormFocusHandler = () => {
        inputRef.current.focus();
    };

    const inputFormFocusReplyHandler = (parentCommentId) => {
        inputRef.current.focusReply(parentCommentId);
    };

    const addCommentHandler = useCallback(
        async ({ comment, parentId, isReplying }) => {
            if (comment && !isReplying) {
                const commentData = {
                    idComment: props.currentId, // id of current logged in user
                    uid: props.currentUid, // uid of current logged in user
                    content: comment,
                    videoId: props.videoId,
                    photoURL,
                    displayName,
                };
                await addDocument("comments", commentData);
            }
            if (comment && isReplying) {
                const commentData = {
                    idComment: props.currentId, // id of current logged in user
                    uid: props.currentUid, // uid of current logged in user
                    content: comment,
                    videoId: props.videoId,
                    replyTo: parentId, // parent commentId
                    photoURL,
                    displayName,
                };
                await addDocument("replyComments", commentData);
            }
        },
        [
            props.currentId,
            props.currentUid,
            props.videoId,
            photoURL,
            displayName,
        ]
    );

    // delete Video

    const openConfirmModalHandler = () => {
        setShowConfirmModal(true);
    };

    const closeConfirmModalHandler = () => {
        setShowConfirmModal(false);
    };

    const deleteVideoHandler = () => {
        const fileRef = ref(storage, `videos/${props.fileName}`);
        deleteObject(fileRef)
            .then(() => {
                deleteDocument("videos", props.videoId);
            })
            .then(() => {
                console.log("deleted");
                navigate(`/users/${props.userId}`);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <React.Fragment>
            {showConfirmModal && (
                <ConfirmModal
                    message="Bạn có chắc chắn muốn xoá video này?"
                    confirm="Xoá"
                    cancel="Huỷ"
                    onCancel={closeConfirmModalHandler}
                    onConfirm={deleteVideoHandler}
                />
            )}
            <div className={classes.container}>
                <Video
                    videoURL={props.videoURL}
                    closeDetailModalHandler={closeDetailModalHandler}
                />
                <div className={classes.infor}>
                    <div className={classes.user}>
                        <div className={classes["user-infor"]}>
                            <div className={classes.avatar}>
                                <Link to={`/users/${props.userId}`}>
                                    <img
                                        src={props.photoURL}
                                        alt={props.displayName}
                                    />
                                </Link>
                            </div>
                            <div>
                                <Link to={`/users/${props.userId}`}>
                                    <span className={classes.username}>
                                        {props.displayName}
                                    </span>
                                </Link>
                                <span className={classes["create-time"]}>
                                    {props.createdAt}
                                </span>
                            </div>
                        </div>
                        {props.currentUid !== props.uid ? (
                            <div
                                className={`${classes["follow-btn"]} ${
                                    props.following.includes(props.uid) &&
                                    "followed-btn"
                                }`}
                            >
                                <Button
                                    onClick={() => props.toggleFollowHandler()}
                                >
                                    {props.following.includes(props.uid)
                                        ? "Đang follow"
                                        : "Follow"}
                                </Button>
                            </div>
                        ) : (
                            <div className={classes.setting}>
                                <IoEllipsisHorizontalSharp />
                                <div className={classes["delete-wrapper"]}>
                                    <div
                                        className={classes.delete}
                                        onClick={openConfirmModalHandler}
                                    >
                                        Xoá
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={classes.caption}>
                        <p>{props.caption}</p>
                    </div>
                    <div className={classes.actions}>
                        <div className={classes.action}>
                            <div
                                className={`${classes["action-icon"]} ${
                                    props.likeCount.includes(
                                        props.currentUid
                                    ) && classes.liked
                                }`}
                                onClick={() =>
                                    props.toggleLikeVideoHandler(
                                        props.currentUid
                                    )
                                }
                            >
                                <AiFillHeart />
                            </div>
                            <span>{props.likeCount.length}</span>
                        </div>
                        <div className={classes.action}>
                            <div
                                className={classes["action-icon"]}
                                onClick={inputFormFocusHandler}
                            >
                                <FaCommentDots />
                            </div>
                            <span>
                                {videoComments.length +
                                    videoReplyComments.length}
                            </span>
                        </div>
                    </div>
                    <div className={classes["comment-section"]}>
                        <CommentList
                            videoComments={videoComments}
                            userUidPostVideo={props.uid}
                            inputFormFocusReplyHandler={
                                inputFormFocusReplyHandler
                            }
                        />
                    </div>
                    <div className={classes["comment-form"]}>
                        <CommentForm
                            ref={inputRef}
                            onAddComment={addCommentHandler}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default function VideoDetailModalContainer(props) {
    return ReactDOM.createPortal(
        <VideoDetailModal
            onClose={props.closeVideoDetailModal}
            fileName={props.fileName}
            videoId={props.videoId}
            userId={props.userId} // id of user post video
            uid={props.uid} // uid of user posted video
            currentUid={props.currentUid}
            currentId={props.currentId}
            displayName={props.displayName}
            photoURL={props.photoURL}
            caption={props.caption}
            videoURL={props.videoURL}
            likeCount={props.likeCount}
            createdAt={props.createdAt}
            following={props.following}
            toggleFollowHandler={props.toggleFollowHandler}
            toggleLikeVideoHandler={props.toggleLikeVideoHandler}
        />,
        document.getElementById("modal")
    );
}
