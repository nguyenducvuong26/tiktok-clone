import React from "react";
import classes from "../App.module.css";
import SideBar from "../components/Sidebar/SideBar";

function LivePage() {
    return (
        <div className={classes["main-body"]}>
            <div className={classes["main-body-helper"]}>
                <SideBar />
                <div>Coming soon</div>
            </div>
        </div>
    );
}

export default LivePage;
