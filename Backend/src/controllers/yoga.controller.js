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
    const sessions = await Yoga.find({ userId }).sort({ date : -1 });

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

// ✅ Update a Yoga Session
const updateYogaSession = async (req, res) => {
  try {
    const { asanasCompleted, difficulty } = req.body;
    const userId = req.user.userId;
    
    // Get today's start time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's session
    const session = await Yoga.findOne({ userId, date: { $gte: today } });

    if (!session) {
      return res.status(404).json({ message: "❌ No session found for today" });
    }

    // Store previous asanas count for accurate update
    const prevAsanas = session.asanasCompleted;

    // Update session details
    session.asanasCompleted = asanasCompleted;
    session.difficulty = difficulty;
    await session.save();

    // Update user totalAsanas correctly
    const user = await User.findById(userId);
    if (user) {
      user.totalAsanas += asanasCompleted - prevAsanas; // Ensure correct increment/decrement
      await user.save();
    }

    res.status(200).json({ message: "✅ Yoga session updated successfully", session });
  } catch (err) {
    res.status(500).json({ error: `❌ Error updating yoga session: ${err.message}` });
  }
};


module.exports = {
  logYogaSession,
  getAllYogaSessions,
  getUserYogaSessions,
  updateYogaSession,
};
