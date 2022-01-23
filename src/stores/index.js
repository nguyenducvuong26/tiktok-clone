import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.js";
import uiReducer from "./ui.js";
import userReducer from "./user.js";
import videoReducer from "./video.js";
import commentReducer from "./comment.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        user: userReducer,
        video: videoReducer,
        comment: commentReducer,
    },
});

export default store;
