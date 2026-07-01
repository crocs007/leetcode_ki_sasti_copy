const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("database connected successfully");
        })
        .catch((err) => {
            console.log("error in connecting to database");
            process.exit(1);
        });
};

module.exports = connectDB;