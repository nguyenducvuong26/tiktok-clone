import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    users: [],
    followedUsers: [],
    suggestedUsers: [],
};

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        getAllUsers: (state, action) => {
            state.users = action.payload;
        },
        removeAllUsers: (state) => {
            state.users = [];
        },
        // followed users
        getFollowedUsers: (state, action) => {
            const listFollowedUid = state.followedUsers.map((user) => user.uid);
            const listPayloadUid = action.payload.map((user) => user.uid);
            for (let index in listPayloadUid) {
                if (!listFollowedUid.includes(listPayloadUid[index])) {
                    state.followedUsers.push(action.payload[index]);
                }
            }
        },
        removeFollowedUsers: (state) => {
            if (state.followedUsers.length > 0) {
                state.followedUsers = [];
            }
        },
        seeLessFollowedUsers: (state) => {
            state.followedUsers = state.followedUsers.slice(0, 5);
        },
    },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
