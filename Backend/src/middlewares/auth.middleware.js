const jwt = require("jsonwebtoken");
const Blacklist = require("../models/Blacklist");
const sendResponse = require("../../utils/sendResponse");

const auth = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  // Ensure authorization header exists and follows "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "❌ Invalid token format. Please login again." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part safely

  try {
    const isBlacklist = await Blacklist.findOne({ token });
    if (isBlacklist) {
      return sendResponse(res, 401, false, "Token blacklisted");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "❌ Token expired, please login again." });
    }
    return res.status(401).json({ message: "❌ Invalid token." });
  }
};

module.exports = auth;
