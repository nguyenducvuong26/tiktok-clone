import React, { useState } from "react";
import classes from "./UploadActions.module.css";
import Button from "../UI/Button";
import ConfirmModal from "../UI/ConfirmModal";

function UploadActions(props) {
    const [caption, setCaption] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const captionChangeHandler = (e) => {
        setCaption(e.target.value);
    };

    const videoUploadHandler = () => {
        props.videoUpload(caption, setCaption);
    };

    const openConfirmModalHandler = () => {
        setShowConfirmModal(true);
    };

    const closeConfirmModalHandler = () => {
        setShowConfirmModal(false);
    };

    const cancelVideoFileHandler = () => {
        props.setKey(Math.random());
        props.setVideoFile(null);
        setCaption("");
        setShowConfirmModal(false);
    };

    return (
        <React.Fragment>
            {showConfirmModal && (
                <ConfirmModal
                    message="Huỷ bỏ bài đăng này? Video và tất cả chỉnh sửa sẽ bị huỷ bỏ."
                    confirm="Huỷ bỏ"
                    cancel="Tiếp tục chỉnh sửa"
                    onConfirm={cancelVideoFileHandler}
                    onCancel={closeConfirmModalHandler}
                />
            )}
            <div className={classes.actions}>
                <div className={classes.caption}>
                    <label>Chú thích</label>
                    <input
                        type="text"
                        value={caption}
                        onChange={captionChangeHandler}
                    />
                </div>
                <div className={classes.buttons}>
                    <Button
                        className={`${classes.btn} ${
                            props.videoFile ? classes.active : classes.disable
                        }`}
                        onClick={openConfirmModalHandler}
                    >
                        Huỷ bỏ
                    </Button>
                    <Button
                        className={`${classes.btn} ${
                            props.videoFile && caption
                                ? classes.submit
                                : classes.disable
                        }`}
                        onClick={videoUploadHandler}
                    >
                        Đăng
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UploadActions;
