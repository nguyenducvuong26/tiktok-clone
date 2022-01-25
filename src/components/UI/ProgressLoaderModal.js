import ReactDOM from "react-dom";
import React from "react";
import classes from "./ProgressLoader.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const theme = createTheme({
    palette: {
        error: {
            main: "rgb(254, 44, 85)",
        },
    },
});

function Backdrop() {
    return <div className={classes.backdrop} />;
}

function Modal(props) {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    position: "absolute",
                    top: "40vh",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "inline-flex",
                    zIndex: 99999,
                }}
            >
                <CircularProgress
                    variant="determinate"
                    color="error"
                    thickness={4}
                    size={120}
                    {...props}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        variant="h3"
                        component="div"
                        sx={{ color: "#fff" }}
                    >
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function ProgressLoaderModal(props) {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById("backdrop")
            )}
            {ReactDOM.createPortal(
                <Modal value={props.value} />,
                document.getElementById("modal")
            )}
        </React.Fragment>
    );
}
