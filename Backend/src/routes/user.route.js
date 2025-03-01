const express = require("express");
const {
  createUser,
  login,
  updateUser,
  updatePassword,
  deleteUser,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const access = require("../middlewares/access.middleware");

const userRoute = express.Router();

userRoute.post("/signup", createUser);
userRoute.post("/login", login);
// userRoute.get("/",getAllUsers);
userRoute.put("/updateName", auth, access(["admin", "user"]), updateUser);
userRoute.put("/resetPassword", auth, access(["user"]), updatePassword);
userRoute.delete("/", auth, access(["admin"]), deleteUser);

module.exports = userRoute;
