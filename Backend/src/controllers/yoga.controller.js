const Yoga = require("../models/Yoga");
const User = require("../models/User");

// ✅ Log a Yoga Session
const logYogaSession = async (req, res) => {
  try {
    const payload = req.body;

    // Create Yoga session
    const yoga = new Yoga(payload);
    yoga.userId = req.user.userId;

    await yoga.save();

    res
      .status(201)
      .json({ message: "✅ Yoga session logged successfully", yoga });
  } catch (err) {
    res
      .status(500)
      .json({ error: `❌ Error logging yoga session: ${err.message}` });
  }
};

// ✅ Get All Yoga Sessions (For admin/debugging)
const getAllYogaSessions = async (req, res) => {
  try {
    const sessions = await Yoga.find()
      .populate("userId", "name email totalAsanas role")
      .select("date asanasCompleted difficulty");
    res.status(200).json(sessions);
  } catch (err) {
    res
      .status(500)
      .json({ error: `❌ Error fetching yoga sessions: ${err.message}` });
  }
};

// ✅ Get Yoga Sessions by User ID (For progress tracking)
const getUserYogaSessions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sessions = await Yoga.find({ userId }).populate("userId","name").sort({ date: -1 });

    if (!sessions.length) {
      return res
        .status(404)
        .json({ error: "❌ No yoga sessions found for this user" });
    }

    res.status(200).json(sessions);
  } catch (err) {
    res
      .status(500)
      .json({ error: `❌ Error fetching yoga sessions: ${err.message}` });
  }
};


// const leaderboard = async (req,res) => {
//   try{
//     const yogaList = await Yoga.find().populate("userId", "name email totalAsanas role").sort({asanasCompleted : -1})
//     if(yogaList.length === 0){
//       return res.status(404).json({message : "No yoga found"})
//     }
//     res.status(200).json({message : "✅ Yoga List", yogaList})
//   }catch(err){
//     res.status(500).json({error : `❌ Error to get leaderboard list ${err.message}`})
//   }
// }

// ✅ Update a Yoga Session
const updateYogaSession = async (req, res) => {
  try {
    const { asanasCompleted, difficulty } = req.body;
    const userId = req.user.userId;
    const { yogaId } = req.params;

    // Validate input
    if (typeof asanasCompleted !== "number") {
      return res
        .status(400)
        .json({ message: "❌ Invalid asanasCompleted value" });
    }

    // Get today's start time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's session
    const session = await Yoga.findOne({ _id: yogaId, date: { $gte: today } });

    if (!session) {
      return res.status(404).json({ message: "❌ No session found for today" });
    }

    const prevAsanas = session.asanasCompleted;

    // Update session details

    await Yoga.findByIdAndUpdate(yogaId, { asanasCompleted, difficulty });

    // Update user totalAsanas correctly
    await User.findByIdAndUpdate(userId, {
      $inc: { totalAsanas: asanasCompleted - prevAsanas },
    });

    res.status(201).json({ message: "✅ Yoga session updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: `❌ Error updating yoga session: ${err.message}` });
  }
};

module.exports = {
  logYogaSession,
  getAllYogaSessions,
  getUserYogaSessions,
  updateYogaSession,
  // leaderboard
};
