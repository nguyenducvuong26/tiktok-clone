import React, { useEffect } from "react";
import UploadForm from "../components/Upload/UploadForm";

function UploadPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <UploadForm />;
}

export default UploadPage;
