const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/shopdb")
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;
