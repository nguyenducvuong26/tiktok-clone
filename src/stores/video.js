import { createSlice } from "@reduxjs/toolkit";

const initialVideoState = {
    videos: [],
    followedVideos: [],
    allVideos: [],
};

const videoSlice = createSlice({
    name: "video",
    initialState: initialVideoState,
    reducers: {
        // getting all videos
        getAllVideos: (state, action) => {
            state.allVideos = action.payload;
        },
        // getting batch of videos
        getVideos: (state, action) => {
            if (action.payload.length !== 0) {
                state.videos = [...state.videos, ...action.payload];
            }
            return;
        },
        removeVideos: (state) => {
            state.videos = [];
        },
        uploadVideo: (state, action) => {
            state.videos = [...state.videos, action.payload];
        },

        // followed videos
        getFollowedVideos: (state, action) => {
            if (action.payload.length !== 0) {
                state.followedVideos = [
                    ...state.followedVideos,
                    ...action.payload,
                ];
            }
        },
        removeFollowedVideos: (state) => {
            state.followedVideos = [];
        },
        updateVideoLikeCount: (state, action) => {
            const videoIsLikedIndex = state.videos.findIndex(
                (video) => video.id === action.payload.videoId
            );

            const videoIsLiked = state.videos[videoIsLikedIndex];
            let videoIsLikedChanged;
            if (videoIsLiked.likeCount.includes(action.payload.uid)) {
                videoIsLikedChanged = {
                    ...videoIsLiked,
                    likeCount: videoIsLiked.likeCount.filter(
                        (uidLiked) => uidLiked !== action.payload.uid
                    ),
                };
            } else {
                videoIsLikedChanged = {
                    ...videoIsLiked,
                    likeCount: [...videoIsLiked.likeCount, action.payload.uid],
                };
            }

            state.videos[videoIsLikedIndex] = videoIsLikedChanged;
        },
        updateFollowedVideoLikeCount: (state, action) => {
            // followedVideos
            const followedVideoIsLikedIndex = state.followedVideos.findIndex(
                (video) => video.id === action.payload.videoId
            );
            const followedVideoIsLiked =
                state.followedVideos[followedVideoIsLikedIndex];
            let followedVideoIsLikedChanged;
            if (followedVideoIsLiked.likeCount.includes(action.payload.uid)) {
                followedVideoIsLikedChanged = {
                    ...followedVideoIsLiked,
                    likeCount: followedVideoIsLiked.likeCount.filter(
                        (uidLiked) => uidLiked !== action.payload.uid
                    ),
                };
            } else {
                followedVideoIsLikedChanged = {
                    ...followedVideoIsLiked,
                    likeCount: [
                        ...followedVideoIsLiked.likeCount,
                        action.payload.uid,
                    ],
                };
            }
            state.followedVideos[followedVideoIsLikedIndex] =
                followedVideoIsLikedChanged;
        },
    },
});

export const videoActions = videoSlice.actions;

const videoReducer = videoSlice.reducer;

export default videoReducer;
