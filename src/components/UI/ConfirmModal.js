import ReactDOM from "react-dom";
import React from "react";
import classes from "./NavigateModal.module.css";
import Card from "./Card";

function Backdrop() {
    return <div className={classes.backdrop} />;
}

function Modal(props) {
    return (
        <Card className={classes["navigate-modal"]}>
            <header className={classes.header}>
                <p className={classes.message}>{props.message}</p>
            </header>
            <div
                className={`${classes.button} ${classes.danger}`}
                onClick={props.onConfirm}
            >
                {props.confirm}
            </div>
            <div className={classes.button} onClick={props.onCancel}>
                {props.cancel}
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
                <Modal
                    message={props.message}
                    confirm={props.confirm}
                    cancel={props.cancel}
                    onCancel={props.onCancel}
                    onConfirm={props.onConfirm}
                />,
                document.getElementById("modal")
            )}
        </React.Fragment>
    );
};

export default NavigateModal;
