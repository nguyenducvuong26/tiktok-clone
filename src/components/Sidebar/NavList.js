import React from "react";
import classes from "./NavList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../stores/ui";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { RiLiveFill } from "react-icons/ri";

function NavList() {
    const dispatch = useDispatch();
    const uid = useSelector((state) => state.auth.uid);

    const openLoginModalHandler = (e) => {
        e.preventDefault();
        dispatch(uiActions.openLoginModal());
    };

    return (
        <div className={classes["nav-list"]}>
            <div className={classes["nav-item"]}>
                <NavLink
                    style={({ isActive }) => ({
                        color: isActive ? "#fe2c55" : "#161823",
                    })}
                    to="/"
                >
                    <AiFillHome />
                    <h3>Dành cho bạn</h3>
                </NavLink>
            </div>
            <div className={classes["nav-item"]}>
                {uid && (
                    <NavLink
                        style={({ isActive }) => ({
                            color: isActive ? "#fe2c55" : "#161823",
                        })}
                        to="/following"
                    >
                        <BsPeopleFill />
                        <h3>Đang Follow</h3>
                    </NavLink>
                )}
                {!uid && (
                    <a href="/" onClick={openLoginModalHandler}>
                        <BsPeopleFill />
                        <h3>Đang Follow</h3>
                    </a>
                )}
            </div>
            <div className={classes["nav-item"]}>
                <NavLink
                    style={({ isActive }) => ({
                        color: isActive ? "#fe2c55" : "#161823",
                    })}
                    to="/live"
                >
                    <RiLiveFill />
                    <h3>LIVE</h3>
                </NavLink>
            </div>
        </div>
    );
}

export default NavList;
