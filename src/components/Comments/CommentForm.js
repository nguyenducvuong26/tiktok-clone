import React, { useState, useRef, useImperativeHandle } from "react";
import classes from "./CommentForm.module.css";

function CommentForm(props, ref) {
    const inputRef = useRef();
    const [isReplying, setIsReplying] = useState(false);
    const [parentId, setParentId] = useState(null);
    const [comment, setComment] = useState("");

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
        focusReply: (parentId) => {
            inputRef.current.focus();
            setIsReplying(true);
            setParentId(parentId);
        },
    }));

    const commentChangeHandler = (e) => {
        setComment(e.target.value);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!comment) {
            return;
        } else {
            props.onAddComment({ comment, parentId, isReplying });
        }
        setComment("");
        setIsReplying(false);
        setParentId(null);
    };

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Thêm bình luận..."
                value={comment}
                onChange={commentChangeHandler}
            />
            <button type="submit" className={`${comment && classes.active}`}>
                Đăng
            </button>
        </form>
    );
}

export default React.forwardRef(CommentForm);
