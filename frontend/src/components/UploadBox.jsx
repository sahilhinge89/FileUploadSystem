import { useState } from "react";
import axios from "axios";

function UploadBox() {

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage("");
    };

    const handleUpload = async () => {

        if (!file) {
            setMessage("please select a file");
            return;
        }

        try {

            setUploading(true);
            setMessage("");

            const formData = new FormData();

            formData.append("imagefiles", file);
            formData.append("name", file.name);
            formData.append("tags", "upload");
            formData.append("email", "sahil89@gmail.com");

            const response = await axios.post(
                "http://localhost:4000/api/v1/upload/imageUpload",
                formData
            );

            console.log(response.data);

            setMessage("file uploaded successfully");

            setFile(null);

        } catch (error) {

            console.log(error);

            setMessage("upload failed");

        } finally {

            setUploading(false);

        }
    };

    return (
        <div className="upload-section">

            <div className="upload-box">

                <div className="upload-icon">
                    ↑
                </div>

                <h2>
                    upload your file
                </h2>

                <p>
                    drag and drop your file here
                    or choose a file
                </p>

                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                />

                <label
                    htmlFor="fileInput"
                    className="choose-btn"
                >
                    choose file
                </label>

                {file && (
                    <div className="selected-file">
                        <span>{file.name}</span>
                        <span>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                    </div>
                )}

                <button
                    className="upload-btn"
                    onClick={handleUpload}
                    disabled={uploading}
                >
                    {uploading ? "uploading..." : "upload file"}
                </button>

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

            </div>

        </div>
    );
}

export default UploadBox;