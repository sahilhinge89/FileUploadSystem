const fileModel = require("../models/fileModel");
// const cloudinary = require("cloudinary").v2;

// ==========================================
// LOCAL FILE UPLOAD
// ==========================================

exports.localFileUpload = async (req, res) => {
    try {
        // Check if file exists
        if (!req.files || !req.files.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        // Get file
        const file = req.files.file;

        console.log("File received:", file.name);

        // File path
        const path =
            __dirname + "/files/" + Date.now() + "-" + file.name;

        // Move file to local folder
        file.mv(path, (error) => {
            if (error) {
                console.log("Upload error:", error);

                return res.status(500).json({
                    success: false,
                    message: "File upload failed"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Local file uploaded successfully"
            });
        });

    } catch (error) {
        console.log("Server error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


// ==========================================
// CHECK FILE TYPE
// ==========================================

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}


// ==========================================
// UPLOAD FILE TO CLOUDINARY
// ==========================================

// async function uploadFileToCloudinary(file, folder) {
//     const options = {
//         folder: folder
//     };

//     const response = await cloudinary.uploader.upload(
//         file.tempFilePath,
//         options
//     );

//     return response;
// }


// ==========================================
// IMAGE UPLOAD
// ==========================================

exports.imageUpload = async (req, res) => {
    try {

        // ------------------------------------------
        // 1. Get data from request
        // ------------------------------------------

        const { name, tags, email } = req.body;

        console.log("Name:", name);
        console.log("Tags:", tags);
        console.log("Email:", email);


        // ------------------------------------------
        // 2. Check if file exists
        // ------------------------------------------

        if (!req.files || !req.files.imagefiles) {
            return res.status(400).json({
                success: false,
                message: "Image file is required"
            });
        }


        // ------------------------------------------
        // 3. Get uploaded file
        // ------------------------------------------

        const file = req.files.imagefiles;

        console.log("File received:", file.name);


        // ------------------------------------------
        // 4. Validate file type
        // ------------------------------------------

        const supportedTypes = [
            "jpg",
            "jpeg",
            "png"
        ];

        const fileType = file.name
            .split(".")
            .pop()
            .toLowerCase();

        console.log("File type:", fileType);


        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }


        // ------------------------------------------
        // 5. Upload file to Cloudinary
        // ------------------------------------------

        const response = await uploadFileToCloudinary(
            file,
            "FileUpload"
        );

        console.log("Cloudinary response:", response);


        // ------------------------------------------
        // 6. Get Cloudinary URL
        // ------------------------------------------

        const imageUrl = response.secure_url;

        console.log("Image URL:", imageUrl);


        // ------------------------------------------
        // 7. Save data in database
        // ------------------------------------------

        // Later you can uncomment this after
        // creating your fileModel properly.

        /*
        const fileData = await fileModel.create({
            name: name,
            tags: tags,
            email: email,
            imageUrl: imageUrl
        });
        */

 
        // ------------------------------------------
        // 8. Send response
        // ------------------------------------------

        return res.status(200).json({
            success: true,
            message: "Image successfully uploaded",
            imageUrl: imageUrl
        });

    } catch (error) {

        console.error("Image upload error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while uploading image",
            error: error.message
        });
    }
};


// ==========================================
// VIDEO UPLOAD TO CLOUDINARY
// ==========================================

exports.videoUpload = async (req, res) => {
    try {

        // ------------------------------------------
        // 1. Get data from request
        // ------------------------------------------

        const { name, tags, email } = req.body;

        console.log("Name:", name);
        console.log("Tags:", tags);
        console.log("Email:", email);


        // ------------------------------------------
        // 2. Check if video exists
        // ------------------------------------------

        if (!req.files || !req.files.videoFile) {
            return res.status(400).json({
                success: false,
                message: "Video file is required"
            });
        }


        // ------------------------------------------
        // 3. Get video file
        // ------------------------------------------

        const video = req.files.videoFile;

        console.log("Video received:", video.name);


        // ------------------------------------------
        // 4. Validate video type
        // ------------------------------------------

        const supportedTypes = [
            "mp4",
            "mov",
            "mkv",
            "avi"
        ];

        const videoType = video.name
            .split(".")
            .pop()
            .toLowerCase();

        console.log("Video type:", videoType);


        if (!isFileTypeSupported(videoType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "Video format not supported"
            });
        }


        // ------------------------------------------
        // 5. Upload video to Cloudinary
        // ------------------------------------------

        const response = await cloudinary.uploader.upload(
            video.tempFilePath,
            {
                folder: "FileUpload",
                resource_type: "video"
            }
        );


        console.log("Cloudinary response:", response);


        // ------------------------------------------
        // 6. Get video URL
        // ------------------------------------------

        const videoUrl = response.secure_url;

        console.log("Video URL:", videoUrl);


        // ------------------------------------------
        // 7. Send response
        // ------------------------------------------

        return res.status(200).json({
            success: true,
            message: "Video successfully uploaded",
            videoUrl: videoUrl
        });

    } catch (error) {

        console.error("Video upload error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while uploading video",
            error: error.message
        });
    }
};