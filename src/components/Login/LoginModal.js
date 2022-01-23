import React from "react";
import ReactDOM from "react-dom";
import classes from "./LoginModal.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../stores/ui";
import {
    signInWithPopup,
    FacebookAuthProvider,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { addDocument } from "../../firebase/service";
import GoogleIcon from "../../assets/images/gg_icon.png";
import CloseButton from "../../assets/images/close_button.svg";
import FacebookIcon from "../../assets/images/fb_icon.png";
import Card from "../UI/Card";

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

function Backdrop() {
    return <div className={classes.backdrop} />;
}

function ModalOverlay() {
    const dispatch = useDispatch();

    const closeLoginModalHandler = () => {
        dispatch(uiActions.closeLoginModal());
    };

    const loginWithFacebookHandler = async () => {
        try {
            const response = await signInWithPopup(auth, facebookProvider);
            const { _tokenResponse, user } = response;
            dispatch(uiActions.closeLoginModal());
            if (_tokenResponse.isNewUser) {
                addDocument("users", {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    following: [],
                    followers: [],
                });
            } else {
                return;
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const loginWithGoogleHandler = async () => {
        try {
            const response = await signInWithPopup(auth, googleProvider);
            const { _tokenResponse, user } = response;
            dispatch(uiActions.closeLoginModal());
            if (_tokenResponse.isNewUser) {
                addDocument("users", {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    following: [],
                    followers: [],
                });
            } else {
                return;
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Card className={classes.modal}>
            <div className={classes.close}>
                <span onClick={closeLoginModalHandler}>
                    <img src={CloseButton} alt="close" />
                </span>
            </div>
            <div className={classes["main-section"]}>
                <header className={classes["modal-header"]}>
                    <h2>Đăng nhập vào TikTok</h2>
                </header>
                <section className={classes.body}>
                    <div
                        className={classes["sign-in-method"]}
                        onClick={loginWithFacebookHandler}
                    >
                        <div className={classes.icon}>
                            <img src={FacebookIcon} alt="facebook" />
                        </div>
                        <div className={classes.text}>
                            Tiếp tục với Facebook
                        </div>
                    </div>
                    <div
                        className={classes["sign-in-method"]}
                        onClick={loginWithGoogleHandler}
                    >
                        <div className={classes.icon}>
                            <img src={GoogleIcon} alt="google" />
                        </div>
                        <div className={classes.text}>Tiếp tục với Google</div>
                    </div>
                </section>
            </div>
        </Card>
    );
}

export default function LoginModal(props) {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById("backdrop")
            )}
            {ReactDOM.createPortal(
                <ModalOverlay />,
                document.getElementById("modal")
            )}
        </React.Fragment>
    );
}
