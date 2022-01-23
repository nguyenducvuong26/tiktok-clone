import React from "react";
import classes from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../stores/ui";
import { userActions } from "../../stores/user";
import { authActions } from "../../stores/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import messageIcon from "../../assets/images/message_icon.svg";
import messageFillIcon from "../../assets/images/message_fill_icon.svg";
import noAvatar from "../../assets/images/no_avatar.png";
import tiktokLogo from "../../assets/images/logo.svg";
import {
    BsSearch,
    BsCloudArrowUp,
    BsCloudArrowUpFill,
    BsPerson,
} from "react-icons/bs";
import { HiOutlineChatAlt } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import Button from "../UI/Button";
import Tooltip from "../UI/Tooltip";

function Navigation() {
    const dispatch = useDispatch();
    const {
        id: userId,
        uid,
        displayName,
        photoURL,
    } = useSelector((state) => state.auth);
    const location = useLocation();

    const openLoginModalHandler = () => {
        dispatch(uiActions.openLoginModal());
    };

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            dispatch(authActions.removeUserInformation());
            dispatch(userActions.removeAllUsers());
            dispatch(userActions.removeFollowedUsers());
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <header className={classes.header}>
            <nav className={classes.navigation}>
                <div className={classes.logo}>
                    <Link to="/">
                        <img src={tiktokLogo} alt="tiktok-logo" />
                    </Link>
                </div>
                <div className={classes.search}>
                    <form className={classes.form}>
                        <input
                            placeholder="Tìm kiếm tài khoản và video"
                            autoComplete="off"
                        />
                        <span className={classes.split} />
                        <Button type="submit">
                            <BsSearch />
                        </Button>
                    </form>
                </div>
                {!uid && (
                    <div className={classes.auth}>
                        <Button onClick={openLoginModalHandler}>Tải lên</Button>
                        <Button onClick={openLoginModalHandler}>
                            Đăng nhập
                        </Button>
                    </div>
                )}
                {uid && (
                    <div className={classes.menu}>
                        <div className={classes.icon}>
                            <Link to="/upload">
                                {location.pathname === "/upload" ? (
                                    <BsCloudArrowUpFill />
                                ) : (
                                    <BsCloudArrowUp />
                                )}
                            </Link>
                            <Tooltip className={classes.custom}>
                                Tải video lên
                            </Tooltip>
                        </div>
                        <div className={classes.icon}>
                            <Link to="/message">
                                {location.pathname === "/message" ? (
                                    <img src={messageFillIcon} alt="message" />
                                ) : (
                                    <img src={messageIcon} alt="message" />
                                )}
                            </Link>
                            <Tooltip className={classes.custom}>
                                Tin nhắn
                            </Tooltip>
                        </div>
                        <div className={classes.icon}>
                            <HiOutlineChatAlt />
                            <Tooltip className={classes.custom}>
                                Hộp thư
                            </Tooltip>
                        </div>
                        <div className={classes.icon}>
                            <img
                                src={photoURL ? photoURL : noAvatar}
                                alt={displayName}
                            />
                            <Tooltip className={classes["sub-menu"]}>
                                <ul>
                                    <li>
                                        <Link to={`/users/${userId}`}>
                                            <i>
                                                <BsPerson />
                                            </i>
                                            <span>Xem hồ sơ</span>
                                        </Link>
                                    </li>
                                    <li onClick={logoutHandler}>
                                        <Link to="/">
                                            <i>
                                                <FiLogOut />
                                            </i>
                                            <span>Đăng xuất</span>
                                        </Link>
                                    </li>
                                </ul>
                            </Tooltip>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Navigation;
