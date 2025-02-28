const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalAsanas: { type: Number, default: 0 }, // Total completed asanas
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
