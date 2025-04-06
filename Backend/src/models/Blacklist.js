const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema({
  token: String,
  expireAt: { type: Date, default: Date.now, expires: process.env.BL_TK },
});

module.exports = mongoose.model("Blacklist",BlacklistSchema)