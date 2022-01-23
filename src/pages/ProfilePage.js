import React, { useState, useEffect } from "react";
import { getSingleDocument } from "../firebase/service";
import { getDocs, where, query, collection, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import classes from "../App.module.css";
import { useParams } from "react-router-dom";
import { formatDate } from "../utilities/formatDate";
import SideBar from "../components/Sidebar/SideBar";
import Profile from "../components/Profile/Profile";

function ProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        // get all video of current user
        async function getAllVideos() {
            const q = query(
                collection(db, "videos"),
                where("userId", "==", userId),
                orderBy("createdAt", "desc")
            );

            const videoSnapshots = await getDocs(q);
            const videos = videoSnapshots.docs
                .map((video) => ({
                    ...video.data(),
                    videoId: video.id,
                }))
                .map((video) => ({
                    ...video,
                    createdAt: formatDate(video.createdAt.seconds),
                }));
            setVideos(videos);
        }
        getAllVideos();
    }, [userId]);

    useEffect(() => {
        async function getUserInformation() {
            const userInfor = await getSingleDocument("users", userId);
            setUser({
                ...userInfor,
                createdAt: formatDate(userInfor.createdAt.seconds),
            });
        }

        getUserInformation();
    }, [userId]);

    return (
        <div className={classes["main-body"]}>
            <div className={classes["main-body-helper"]}>
                <SideBar />
                {user && <Profile user={user} videos={videos} />}
            </div>
        </div>
    );
}

export default ProfilePage;
