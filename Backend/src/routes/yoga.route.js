const express = require("express");
const {
  logYogaSession,
  getUserYogaSessions,
  updateYogaSession,
  leaderboard,
} = require("../controllers/yoga.controller");
const auth = require("../middlewares/auth.middleware");
const access = require("../middlewares/access.middleware");

const yogaRoute = express.Router();

yogaRoute.post("/create", auth, access(["admin", "user"]), logYogaSession);
yogaRoute.get("/yogaDetails", auth, access(["admin", "user"]), getUserYogaSessions);
yogaRoute.put("/:yogaId", auth, access(["admin", "user"]), updateYogaSession);
yogaRoute.get("/",leaderboard)

module.exports = yogaRoute;
