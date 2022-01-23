import classes from "./VideoProfileList.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import VideoProfileItem from "./VideoProfileItem";

function VideoProfileList({ videos }) {
    return (
        <div className={classes["video-list-section"]}>
            <div className={classes["video-section-title"]}>
                <p>Video</p>
            </div>
            <div className={classes["video-list"]}>
                <Box sx={{ width: "100%" }}>
                    <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                    >
                        {videos.map((video) => {
                            return (
                                <VideoProfileItem
                                    key={video.videoId}
                                    video={video}
                                />
                            );
                        })}
                    </Grid>
                </Box>
            </div>
        </div>
    );
}

export default VideoProfileList;
