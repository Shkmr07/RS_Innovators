const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://shkmr07:${process.env.DB}@gamifywellness.j53tk.mongodb.net/Gamify_wellness`);
    console.log("✅ Connected to Db.");
  } catch (err) {
    console.log("❌ Error connecting to mongoDB.");
    process.exit(1);
  }
};

module.exports = connectDB;
