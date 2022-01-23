import { createSlice } from "@reduxjs/toolkit";

const initialUISlice = {
    showLoginModal: false,
    volume: 0,
    muted: true,
};

const uiSlice = createSlice({
    name: "ui",
    initialState: initialUISlice,
    reducers: {
        openLoginModal: (state) => {
            state.showLoginModal = true;
        },
        closeLoginModal: (state) => {
            state.showLoginModal = false;
        },
        volumeChange: (state, action) => {
            state.volume = action.payload;
            if (action.payload > 0) {
                state.muted = false;
            } else {
                state.muted = true;
            }
        },
        muteVideo: (state) => {
            if (state.volume > 0) {
                state.volume = 0;
                state.muted = true;
            } else {
                state.volume = 50;
                state.muted = false;
            }
        },
    },
});

export const uiActions = uiSlice.actions;

const uiReducer = uiSlice.reducer;

export default uiReducer;
