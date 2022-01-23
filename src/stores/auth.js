import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    id: "",
    uid: "",
    displayName: "",
    photoURL: "",
    email: "",
    following: [],
    followers: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        getUserInformation: (state, action) => {
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.email = action.payload.email;
        },
        removeUserInformation: (state) => {
            state.id = null;
            state.uid = null;
            state.displayName = null;
            state.photoURL = null;
            state.email = null;
            state.following = [];
            state.followers = [];
        },
        getUserSubInformation: (state, action) => {
            state.id = action.payload.id;
            state.following = action.payload.following;
            state.followers = action.payload.followers;
        },
        followUser: (state, action) => {
            state.following.push(action.payload);
        },
        unfollowUser: (state, action) => {
            state.following = state.following.filter(
                (uid) => uid !== action.payload
            );
        },
    },
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
