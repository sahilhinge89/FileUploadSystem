const fileModel = require("../models/fileModel");
const s3 = require("../config/aws");

// Cloudinary is no longer required because we are using AWS S3
// const cloudinary = require("cloudinary").v2;


// Import PutObjectCommand
// PutObjectCommand is used to upload an object/file to AWS S3
const { PutObjectCommand } = require("@aws-sdk/client-s3");


// ==========================================
// LOCAL FILE UPLOAD
// ==========================================

// This function uploads a file to the local server.
//
// NOTE:
// This function is independent of Cloudinary and AWS.
// So we don't need to change it during the migration.

exports.localFileUpload = async (req, res) => {
    try {

        // Check if file exists
        if (!req.files || !req.files.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }


        // Get uploaded file
        const file = req.files.file;

        console.log("File received:", file.name);


        // Create local file path
        const path =
            __dirname +
            "/files/" +
            Date.now() +
            "-" +
            file.name;


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

// This function checks whether the uploaded file
// has an allowed file extension.
//
// This function is NOT specific to Cloudinary or AWS.
// Therefore we keep it unchanged.

function isFileTypeSupported(type, supportedTypes) {

    return supportedTypes.includes(type);

}



// ==========================================
// UPLOAD FILE TO AWS S3
// ==========================================

// This is the new common AWS upload function.
//
// It receives:
// 1. file   -> uploaded file from express-fileupload
// 2. folder -> folder name inside S3 bucket
//
// Example:
//
// images/photo.jpg
// videos/demo.mp4

async function uploadFileToS3(file, folder) {

    async function uploadFileToS3(file, folder) {

    console.log("File size:", file.size);
    console.log("File data:", file.data ? "available" : "missing");

    const fileKey =
        `${folder}/${Date.now()}-${file.name}`;

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
        Body: file.data,
        ContentType: file.mimetype
    });

    await s3.send(command);

    return fileKey;
}

    // Create a unique file name
    // Date.now() helps prevent duplicate file names.

    const fileKey =
        `${folder}/${Date.now()}-${file.name}`;


    // Create S3 upload command

    const command = new PutObjectCommand({

        // Name of your S3 bucket
        Bucket: process.env.AWS_BUCKET_NAME,

        // File path/name inside bucket
        Key: fileKey,

        // Actual file data
        Body: file.data,

        // File MIME type
        // Example:
        // image/jpeg
        // image/png
        // video/mp4

        ContentType: file.mimetype

    });


    // Send upload request to AWS S3

    await s3.send(command);


    // Return file key
    // Example:
    // images/1725123456-photo.jpg

    return fileKey;

}



// ==========================================
// IMAGE UPLOAD
// ==========================================

exports.imageUpload = async (req, res) => {

    try {

        // ------------------------------------------
        // 1. Get data from request
        // ------------------------------------------

        const {
            name,
            tags,
            email
        } = req.body;


        console.log("Name:", name);
        console.log("Tags:", tags);
        console.log("Email:", email);



        // ------------------------------------------
        // 2. Check if image exists
        // ------------------------------------------

        if (
            !req.files ||
            !req.files.imagefiles
        ) {

            return res.status(400).json({

                success: false,

                message: "Image file is required"

            });

        }



        // ------------------------------------------
        // 3. Get uploaded image
        // ------------------------------------------

        const file = req.files.imagefiles;

        console.log(
            "File received:",
            file.name
        );



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


        console.log(
            "File type:",
            fileType
        );


        // Check whether file type is supported

        if (
            !isFileTypeSupported(
                fileType,
                supportedTypes
            )
        ) {

            return res.status(400).json({

                success: false,

                message: "File format not supported"

            });

        }



        // ------------------------------------------
        // 5. Upload image to AWS S3
        // ------------------------------------------

        // We use the same uploadFileToS3()
        // function for both image and video.

        const fileKey = await uploadFileToS3(
            file,
            "images"
        );


        console.log(
            "Image uploaded to S3:",
            fileKey
        );



        // ------------------------------------------
        // 6. Create S3 file URL
        // ------------------------------------------

        const imageUrl =
            `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;


        console.log(
            "Image URL:",
            imageUrl
        );



        // ------------------------------------------
        // 7. Save data in database
        // ------------------------------------------

        // We will use this later when your
        // fileModel is ready.

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

            imageUrl: imageUrl,

            fileKey: fileKey

        });


    } catch (error) {

        console.error(
            "Image upload error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Something went wrong while uploading image",

            error: error.message

        });

    }

};



// ==========================================
// VIDEO UPLOAD
// ==========================================

exports.videoUpload = async (req, res) => {

    try {

        // ------------------------------------------
        // 1. Get data from request
        // ------------------------------------------

        const {
            name,
            tags,
            email
        } = req.body;


        console.log("Name:", name);
        console.log("Tags:", tags);
        console.log("Email:", email);



        // ------------------------------------------
        // 2. Check if video exists
        // ------------------------------------------

        if (
            !req.files ||
            !req.files.videoFile
        ) {

            return res.status(400).json({

                success: false,

                message: "Video file is required"

            });

        }



        // ------------------------------------------
        // 3. Get uploaded video
        // ------------------------------------------

        const video = req.files.videoFile;

        console.log(
            "Video received:",
            video.name
        );



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


        console.log(
            "Video type:",
            videoType
        );


        // Check video format

        if (
            !isFileTypeSupported(
                videoType,
                supportedTypes
            )
        ) {

            return res.status(400).json({

                success: false,

                message: "Video format not supported"

            });

        }



        // ------------------------------------------
        // 5. Upload video to AWS S3
        // ------------------------------------------

        // Same upload function is used here.
        //
        // S3 does not need:
        // resource_type: "video"
        //
        // because S3 stores the file as an object.

        const fileKey = await uploadFileToS3(
            video,
            "videos"
        );


        console.log(
            "Video uploaded to S3:",
            fileKey
        );



        // ------------------------------------------
        // 6. Create S3 video URL
        // ------------------------------------------

        const videoUrl =
            `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;


        console.log(
            "Video URL:",
            videoUrl
        );



        // ------------------------------------------
        // 7. Send response
        // ------------------------------------------

        return res.status(200).json({

            success: true,

            message: "Video successfully uploaded",

            videoUrl: videoUrl,

            fileKey: fileKey

        });


    } catch (error) {

        console.error(
            "Video upload error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Something went wrong while uploading video",

            error: error.message

        });

    }

};