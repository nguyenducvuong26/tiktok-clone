import ReactDOM from "react-dom";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./NavigateModal.module.css";
import Card from "./Card";

function Backdrop() {
    return <div className={classes.backdrop} />;
}

function Modal(props) {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.id);

    const closeModalHandler = () => {
        props.closeModal();
    };

    return (
        <Card className={classes["navigate-modal"]}>
            <header className={classes.header}>
                <p className={classes.message}>
                    Video của bạn đã được tải lên TikTok!
                </p>
            </header>
            <div
                className={`${classes.button} ${classes.danger}`}
                onClick={closeModalHandler}
            >
                Tải video khác lên
            </div>
            <div
                className={classes.button}
                onClick={() => {
                    navigate(`/users/${userId}`);
                }}
            >
                Xem hồ sơ
            </div>
        </Card>
    );
}

const NavigateModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById("backdrop")
            )}
            {ReactDOM.createPortal(
                <Modal closeModal={props.closeModal} />,
                document.getElementById("modal")
            )}
        </React.Fragment>
    );
};

export default NavigateModal;
