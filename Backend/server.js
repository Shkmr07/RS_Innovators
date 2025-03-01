const express = require("express");
const connectDB = require("./config");
const routes = require("./src/routes/combine.routes");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) =>
  res.send("🎯 Welcome to my gamify wellness application")
);
app.use("/api", routes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Database connection failed", err.message);
    process.exit(1);
  });
