const express = require("express");
const {
  logYogaSession,
  getUserYogaSessions,
  updateYogaSession,
} = require("../controllers/yoga.controller");
const auth = require("../middlewares/auth.middleware");
const access = require("../middlewares/access.middleware");

const yogaRoute = express.Router();

yogaRoute.post("/create", auth, access(["admin", "user"]), logYogaSession);
yogaRoute.get("/", auth, access(["admin", "user"]), getUserYogaSessions);
yogaRoute.put("/", auth, access(["admin", "user"]), updateYogaSession);

module.exports = yogaRoute;
