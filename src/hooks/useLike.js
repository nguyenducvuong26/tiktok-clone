import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../stores/ui";
import { videoActions } from "../stores/video";
import { updateDocument } from "../firebase/service";

export default function useLike(videoFromVideos = true) {
    const { videos, followedVideos } = useSelector((state) => state.video);
    const dispatch = useDispatch();

    const toggleLikeVideoHandler = (videoId, uid) => {
        if (!uid) {
            dispatch(uiActions.openLoginModal());
        } else {
            if (videoFromVideos) {
                dispatch(videoActions.updateVideoLikeCount({ videoId, uid }));
                const videoIsLiked = videos.find(
                    (video) => video.id === videoId
                );
                const likeCount = videoIsLiked.likeCount;
                let updatedLikeCount;
                if (likeCount.includes(uid)) {
                    updatedLikeCount = likeCount.filter(
                        (uidLiked) => uidLiked !== uid
                    );
                } else {
                    updatedLikeCount = [...likeCount, uid];
                }
                updateDocument(
                    "videos",
                    videoId,
                    "likeCount",
                    updatedLikeCount
                );
            } else {
                dispatch(
                    videoActions.updateFollowedVideoLikeCount({ videoId, uid })
                );
                const videoIsLiked = followedVideos.find(
                    (video) => video.id === videoId
                );
                const likeCount = videoIsLiked.likeCount;
                let updatedLikeCount;
                if (likeCount.includes(uid)) {
                    updatedLikeCount = likeCount.filter(
                        (uidLiked) => uidLiked !== uid
                    );
                } else {
                    updatedLikeCount = [...likeCount, uid];
                }
                updateDocument(
                    "videos",
                    videoId,
                    "likeCount",
                    updatedLikeCount
                );
            }
        }
    };
    return toggleLikeVideoHandler;
}
