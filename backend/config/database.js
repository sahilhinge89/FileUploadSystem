const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = async() => {
    try {
      await  mongoose.connect(process.env.MONGODB_URL)
       console.log("MongoDB connected Sucessfully");

    } catch (error) {
        console.error("Mongodb connection failed ", error.message);
        process.exit(1);
    }
}