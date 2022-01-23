import React from "react";
import classes from "./CommentList.module.css";
import Comment from "./Comment";

function CommentList(props) {
    return (
        <div className={classes["comment-list"]}>
            {props.videoComments.map((comment) => {
                return (
                    <Comment
                        key={comment.id}
                        commentId={comment.id}
                        userUidPostVideo={props.userUidPostVideo} // uid of user posted video
                        uidComment={comment.uid} // uid of user comment
                        idComment={comment.idComment} // id of user comment
                        displayName={comment.displayName}
                        photoURL={comment.photoURL}
                        content={comment.content}
                        createdAt={comment.createdAt}
                        inputFormFocusReplyHandler={
                            props.inputFormFocusReplyHandler
                        }
                    />
                );
            })}
        </div>
    );
}

export default CommentList;
