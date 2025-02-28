const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Gamify_Wellness");
    console.log("✅ Connected to Db.");
  } catch (err) {
    console.log("❌ Error connecting to mongoDB.");
    process.exit(1);
  }
};

module.exports = connectDB;
