const Yoga = require("../models/Yoga");
const User = require("../models/User");

// ✅ Log a Yoga Session
const logYogaSession = async (req, res) => {
  try {
    const { userId, asanasCompleted, difficulty } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "❌ User not found" });
    }

    // Create Yoga session
    const yogaSession = await Yoga.create({
      userId,
      asanasCompleted,
      difficulty,
    });

    // Update totalAsanas count in User model
    user.totalAsanas += asanasCompleted;
    await user.save();

    res.status(201).json({ message: "✅ Yoga session logged successfully", yogaSession });
  } catch (err) {
    res.status(500).json({ error: `❌ Error logging yoga session: ${err.message}` });
  }
};

// ✅ Get All Yoga Sessions (For admin/debugging)
const getAllYogaSessions = async (req, res) => {
  try {
    const sessions = await Yoga.find().populate("userId", "name");
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: `❌ Error fetching yoga sessions: ${err.message}` });
  }
};

// ✅ Get Yoga Sessions by User ID (For progress tracking)
const getUserYogaSessions = async (req, res) => {
  try {
    const userId = req.params.userId;
    const sessions = await Yoga.find({ userId }).sort({ createdAt: -1 });

    if (!sessions.length) {
      return res.status(404).json({ error: "❌ No yoga sessions found for this user" });
    }

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: `❌ Error fetching yoga sessions: ${err.message}` });
  }
};

// ✅ Update a Yoga Session
const updateYogaSession = async (req, res) => {
  try {
    const { asanasCompleted, difficulty } = req.body;
    const sessionId = req.params.id;

    const session = await Yoga.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "❌ Yoga session not found" });
    }

    // Adjust user's totalAsanas count
    const user = await User.findById(session.userId);
    if (user) {
      user.totalAsanas += asanasCompleted - session.asanasCompleted;
      await user.save();
    }

    // Update session details
    session.asanasCompleted = asanasCompleted;
    session.difficulty = difficulty;
    await session.save();

    res.status(200).json({ message: "✅ Yoga session updated successfully", session });
  } catch (err) {
    res.status(500).json({ error: `❌ Error updating yoga session: ${err.message}` });
  }
};

// ✅ Delete a Yoga Session
const deleteYogaSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await Yoga.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "❌ Yoga session not found" });
    }

    // Adjust user's totalAsanas count
    const user = await User.findById(session.userId);
    if (user) {
      user.totalAsanas -= session.asanasCompleted;
      await user.save();
    }

    await Yoga.findByIdAndDelete(sessionId);
    res.status(200).json({ message: "✅ Yoga session deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: `❌ Error deleting yoga session: ${err.message}` });
  }
};

module.exports = {
  logYogaSession,
  getAllYogaSessions,
  getUserYogaSessions,
  updateYogaSession,
  deleteYogaSession,
};
