// Create App
const express = require("express");
const cors = require("cors");

const app = express();


// Find out port
require("dotenv").config();

const PORT = process.env.PORT || 3000;


// Add middlewares
app.use(express.json());

// Allow frontend to connect with backend
app.use(cors());

const fileupload = require("express-fileupload");

app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp/"
    })
);


// Connect database
const connectDB = require("./config/database");

connectDB.connect();


// Connect Cloudinary
const cloudinary = require("./config/cloudinary");

cloudinary.cloudinaryConnect();


// Mount API route
const Upload = require("./routes/fileRoutes");

app.use("/api/v1/upload", Upload);


// Activate server
app.listen(PORT, () => {
    console.log(`App is running successfully ${PORT}`);
});