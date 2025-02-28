const express = require("express");
const userRoute = require("./user.route");
const yogaRoute = require("./yoga.route");

const routes = express.Router();

routes.use("/user", userRoute);
routes.use("/yoga", yogaRoute);

module.exports = routes;
