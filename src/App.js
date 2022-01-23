import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./stores/auth";
import { userActions } from "./stores/user";
import { commentActions } from "./stores/comment";
import { videoActions } from "./stores/video";
import useFirestore from "./hooks/useFirestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout.js";
import Header from "./components/Header/Header.js";
import LoginModal from "./components/Login/LoginModal.js";
import HomePage from "./pages/HomePage";
import FollowingPage from "./pages/FollowingPage";
import LivePage from "./pages/LivePage";
import UploadPage from "./pages/UploadPage";
import MessagePage from "./pages/MessagePage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    const dispatch = useDispatch();
    const uid = useSelector((state) => state.auth.uid);
    const showLoginModal = useSelector((state) => state.ui.showLoginModal);

    // getting all videos
    const videosCondition = useMemo(
        () => ({
            sortBy: "desc",
        }),
        []
    );

    const allVideos = useFirestore("videos", videosCondition);
    useEffect(() => {
        if (allVideos.length) {
            dispatch(videoActions.getAllVideos(allVideos));
        }
    }, [dispatch, allVideos]);

    // getting all comments and reply comments
    const commentsCondition = useMemo(
        () => ({
            sortBy: "desc",
        }),
        []
    );

    const comments = useFirestore("comments", commentsCondition);

    useEffect(() => {
        dispatch(commentActions.getAllComments(comments));
    }, [dispatch, comments]);

    const replyCommentsCondition = useMemo(
        () => ({
            sortBy: "desc",
        }),
        []
    );
    const replyComments = useFirestore("replyComments", replyCommentsCondition);
    useEffect(() => {
        dispatch(commentActions.getAllReplyComments(replyComments));
    }, [dispatch, replyComments]);

    // when user login
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    authActions.getUserInformation({
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        email: user.email,
                    })
                );
            }
        });
        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    // get list of user to update the id and following list of the current logged-in user
    const usersCondition = useMemo(
        () => ({
            sortBy: "desc",
        }),
        []
    );

    const users = useFirestore("users", usersCondition);

    useEffect(() => {
        if (users.length > 0) {
            dispatch(userActions.getAllUsers(users));
            const currentUser = users.find((user) => user.uid === uid);
            if (currentUser) {
                dispatch(
                    authActions.getUserSubInformation({
                        id: currentUser.id,
                        following: currentUser.following,
                        followers: currentUser.followers,
                    })
                );
            }
        }
    }, [dispatch, uid, users]);

    return (
        <div className="App">
            {showLoginModal && <LoginModal />}
            <Layout>
                <Header />
                <div style={{ height: "60px" }} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/videos">
                        <Route path=":videoId" element={<DetailPage />} />
                    </Route>
                    {uid && (
                        <Route path="/following" element={<FollowingPage />} />
                    )}
                    {uid && (
                        <Route path="/users">
                            <Route path=":userId" element={<ProfilePage />} />
                        </Route>
                    )}
                    {uid && <Route path="/live" element={<LivePage />} />}
                    {uid && <Route path="/upload" element={<UploadPage />} />}
                    {uid && <Route path="/message" element={<MessagePage />} />}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
