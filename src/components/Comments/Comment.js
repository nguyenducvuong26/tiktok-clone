import React from "react";
import classes from "./Comment.module.css";
import { deleteDocument } from "../../firebase/service";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import ReplyComment from "./ReplyComment";

function Comment(props) {
    const replyComments = useSelector(
        (state) => state.comment.replyComments
    ).filter((comment) => comment.replyTo === props.commentId);

    const deleteCommentHandler = () => {
        deleteDocument("comments", props.commentId);
    };

    return (
        <React.Fragment>
            <div className={classes["comment-wrapper"]}>
                <div className={classes.comment}>
                    <div className={classes.avatar}>
                        <Link to={`/users/${props.idComment}`}>
                            <img src={props.photoURL} alt={props.displayName} />
                        </Link>
                    </div>
                    <div>
                        <Link
                            to={`/users/${props.idComment}`}
                            className={classes["username-wrapper"]}
                        >
                            <span className={classes.username}>
                                {props.displayName}
                            </span>
                            {props.uidComment === props.userUidPostVideo && (
                                <>
                                    <>&bull;</>
                                    <span
                                        className={classes["username-helper"]}
                                    >
                                        Tác giả
                                    </span>
                                </>
                            )}
                        </Link>
                        <p className={classes.content}>{props.content}</p>
                        <div className={classes["sub-content"]}>
                            <span>{props.createdAt}</span>
                            <span
                                className={classes["reply-btn"]}
                                onClick={() =>
                                    props.inputFormFocusReplyHandler(
                                        props.commentId
                                    )
                                }
                            >
                                Trả lời
                            </span>
                        </div>
                    </div>
                </div>
                <div className={classes.setting}>
                    <IoEllipsisHorizontalSharp />
                    <div className={classes["delete-wrapper"]}>
                        <div
                            className={classes.delete}
                            onClick={deleteCommentHandler}
                        >
                            Xoá
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.reply}>
                {replyComments.map((comment) => {
                    return (
                        <ReplyComment
                            key={comment.id}
                            replyCommentId={comment.id}
                            displayName={comment.displayName}
                            uidComment={comment.uid}
                            idComment={comment.idComment}
                            userUidPostVideo={props.userUidPostVideo}
                            photoURL={comment.photoURL}
                            content={comment.content}
                            createdAt={comment.createdAt}
                        />
                    );
                })}
            </div>
        </React.Fragment>
    );
}

export default Comment;
