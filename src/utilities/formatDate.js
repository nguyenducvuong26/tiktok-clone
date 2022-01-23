export const formatDate = (seconds) => {
    let formattedDate = "";
    const currentTime = Math.floor(new Date().getTime() / 1000);
    if (!seconds) {
        formattedDate = "1 phút trước";
        return formattedDate;
    }
    const calculateTime = currentTime - seconds;
    if (calculateTime < 60) {
        formattedDate = `${calculateTime} giây trước`;
    } else if (60 <= calculateTime && calculateTime < 3600) {
        formattedDate = `${Math.floor(calculateTime / 60)} phút trước`;
    } else if (3600 <= calculateTime && calculateTime < 86400) {
        formattedDate = `${Math.floor(calculateTime / 3600)} giờ trước`;
    } else if (86400 <= calculateTime && calculateTime < 604800) {
        formattedDate = `${Math.floor(calculateTime / 86400)} ngày trước`;
    } else {
        formattedDate = new Date(seconds * 1000);
    }

    return formattedDate;
};
