import { createSlice } from "@reduxjs/toolkit";

const initialCommentState = {
    comments: [],
    replyComments: [],
};

const commentSlice = createSlice({
    name: "comment",
    initialState: initialCommentState,
    reducers: {
        getAllComments: (state, action) => {
            state.comments = action.payload;
        },
        getAllReplyComments: (state, action) => {
            state.replyComments = action.payload;
        },
    },
});

export const commentActions = commentSlice.actions;

const commentReducer = commentSlice.reducer;

export default commentReducer;
