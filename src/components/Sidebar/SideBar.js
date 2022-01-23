import React from "react";
import classes from "./SideBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../stores/ui";
import Button from "../UI/Button";
import NavList from "./NavList";
import UserSuggestionContainer from "./UserSuggestionContainer";
import UserFollowedContainer from "./UserFollowedContainer";

function SideBar() {
    const uid = useSelector((state) => state.auth.uid);
    const dispatch = useDispatch();

    const openLoginModalHandler = () => {
        dispatch(uiActions.openLoginModal());
    };

    return (
        <div className={classes["side-bar"]}>
            <div className={classes["side-bar-wrapper"]}>
                <NavList />
                {!uid && (
                    <div className={classes["sign-in-hint"]}>
                        <p className={classes.hint}>
                            Đăng nhập để follow các tác giả, thích video và xem
                            bình luận.
                        </p>
                        <Button
                            className={classes["sign-in-btn"]}
                            onClick={openLoginModalHandler}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                )}
                <UserSuggestionContainer />
                {uid && <UserFollowedContainer />}
                <div style={{ height: "100px" }} />
            </div>
        </div>
    );
}

export default React.memo(SideBar);
