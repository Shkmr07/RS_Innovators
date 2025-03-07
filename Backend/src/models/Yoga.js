const mongoose = require("mongoose");
const User = require("./User");

const YogaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    yogaName : {type : String, required : true},
    duration : {type: Number, required : true, default : 0, min : 0},
    date: { type: Date, default: Date.now },
    asanasCompleted: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    description : String
  },
  { timestamps: true, versionKey: false }
);

YogaSchema.post("save", async (doc, next) => {
  try {
    await User.updateOne(
      { _id: doc.userId },
      { $inc: { totalAsanas: doc.asanasCompleted } }
    );
  } catch (err) {
    console.error(`❌ Error during update user totalAasan ${err.message}`);
    return next(err);
  }
});

module.exports = mongoose.model("Yoga", YogaSchema);
