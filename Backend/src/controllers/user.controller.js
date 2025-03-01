const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// ✅ login

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "❌ No user found" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ message: "❌ Wrong creditials" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXP }
    );

    res.status(200).json({ message: "✅ Login Successful", accessToken });
  } catch (err) {
    res.status(500).json({ error: `❌ Error during login ${err.message}` });
  }
};

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

// ✅ updatePassword

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "❌ User not found" });
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "❌ Incorrect old password" });
    }

    // Update password (hashed automatically in pre middleware)
    user.password = newPassword;
    await user.save(); // Triggers pre-save middleware

    res.status(200).json({ message: "✅ Password updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: `❌ Error updating password: ${err.message}` });
  }
};

// ✅ Get All Users (For leaderboard or listing)
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find()
//       .sort({ totalAsanas: -1 })
//       .select("name email role totalAsanas"); // Sorting by asanas completed
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: `❌ Error fetching users: ${err.message}` });
//   }
// };

// ✅ Get a Single User (By ID)
// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "❌ User not found" });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: `❌ Error fetching user: ${err.message}` });
//   }
// };

// ✅ Update User (Modify name)
const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
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
    const deletedUser = await User.findByIdAndDelete(req.user.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "❌ User not found" });
    }

    await Yoga.deleteMany({ userId: req.user.userId });

    res.status(200).json({ message: "✅ User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: `❌ Error deleting user: ${err.message}` });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  login,
  updatePassword,
};
