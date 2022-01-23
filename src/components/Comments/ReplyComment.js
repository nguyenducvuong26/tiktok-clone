import React from "react";
import { deleteDocument } from "../../firebase/service";
import classes from "./ReplyComment.module.css";
import { Link } from "react-router-dom";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

function ReplyComment(props) {
    const deleteReplyCommentHandler = () => {
        deleteDocument("replyComments", props.replyCommentId);
    };

    return (
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
                                <span className={classes["username-helper"]}>
                                    Tác giả
                                </span>
                            </>
                        )}
                    </Link>
                    <p className={classes.content}>{props.content}</p>
                    <div className={classes["sub-content"]}>
                        <span>{props.createdAt}</span>
                    </div>
                </div>
            </div>
            <div className={classes.setting}>
                <IoEllipsisHorizontalSharp />
                <div className={classes["delete-wrapper"]}>
                    <div
                        className={classes.delete}
                        onClick={deleteReplyCommentHandler}
                    >
                        Xoá
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyComment;
