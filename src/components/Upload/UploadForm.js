import React, { useState } from "react";
import classes from "./UploadForm.module.css";
import cloudUpLoadFaded from "../../assets/images/cloud_upload_faded.svg";
import { useSelector } from "react-redux";
import { addDocument } from "../../firebase/service";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Card from "../UI/Card";
import VideoPreview from "./VideoPreview";
import UploadActions from "./UploadActions";
import NavigateModal from "../UI/NavigateModal";

function UploadForm() {
    const [showNavigateModal, setShowNavigateModal] = useState(false);
    const { displayName, uid, photoURL, id } = useSelector(
        (state) => state.auth
    );
    const [videoFile, setVideoFile] = useState();
    const [key, setKey] = useState(null);

    const closeNavigateModalHandler = () => {
        setShowNavigateModal(false);
    };

    const videoFileChangeHandler = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const videoUploadHandler = (caption, setCaptionCallback) => {
        if (!caption) {
            return;
        }
        setKey(Math.random());
        const metadata = {
            contentType: "video/mp4",
        };

        // Upload file and metadata to the object 'video/name.mp4';
        const storageRef = ref(storage, "videos/" + videoFile.name);
        const uploadTask = uploadBytesResumable(
            storageRef,
            videoFile,
            metadata
        );

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + " % done");
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log("File available at: ", downloadURL);
                        addDocument("videos", {
                            userId: id,
                            uid,
                            displayName,
                            photoURL,
                            videoURL: downloadURL,
                            caption: caption,
                            likeCount: [],
                            fileName: videoFile.name,
                        });
                    })
                    .then(() => {
                        setVideoFile(null);
                        setCaptionCallback("");
                        setShowNavigateModal(true);
                    });
            }
        );
    };

    return (
        <React.Fragment>
            {showNavigateModal && (
                <NavigateModal closeModal={closeNavigateModalHandler} />
            )}
            <div className={classes["form-layout"]}>
                <div className={classes["form-wrapper"]}>
                    <Card className={classes.upload}>
                        <div className={classes["form-content"]}>
                            <div className={classes.header}>
                                <h2>Tải video lên</h2>
                                <p>Đăng video vào tài khoản của bạn</p>
                            </div>
                            <div className={classes["main-form"]}>
                                <div className={classes.file}>
                                    <div
                                        className={`${classes.preview} ${
                                            videoFile
                                                ? classes["preview-background"]
                                                : ""
                                        }`}
                                    >
                                        {videoFile ? (
                                            <VideoPreview
                                                source={URL.createObjectURL(
                                                    videoFile
                                                )}
                                            />
                                        ) : (
                                            <React.Fragment>
                                                <img
                                                    src={cloudUpLoadFaded}
                                                    alt="upload"
                                                />
                                                <p>Chọn video để tải lên</p>
                                            </React.Fragment>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        key={key}
                                        accept="video/mp4"
                                        onChange={videoFileChangeHandler}
                                    />
                                </div>
                                <UploadActions
                                    videoFile={videoFile}
                                    setKey={setKey}
                                    setVideoFile={setVideoFile}
                                    videoUpload={videoUploadHandler}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UploadForm;
