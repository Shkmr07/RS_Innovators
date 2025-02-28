const User = require("../models/User");

// ✅ Create User
const createUser = async (req, res) => {
  const payload = req.body;
  try {
    await User.create(payload);
    res.status(201).json({ message: "✅ User created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: `❌ Error creating the user profile ${err.message}` });
  }
};

// ✅ Get All Users (For leaderboard or listing)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalAsanas: -1 }); // Sorting by asanas completed
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: `❌ Error fetching users: ${err.message}` });
  }
};

// ✅ Get a Single User (By ID)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "❌ User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: `❌ Error fetching user: ${err.message}` });
  }
};

// ✅ Update User (Modify name)
const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true } // Returns updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "❌ User not found" });
    }

    res
      .status(200)
      .json({ message: "✅ User updated successfully", updatedUser });
  } catch (err) {
    res.status(500).json({ error: `❌ Error updating user: ${err.message}` });
  }
};

// ✅ Delete User (Remove from database)
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "❌ User not found" });
    }

    res.status(200).json({ message: "✅ User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: `❌ Error deleting user: ${err.message}` });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
