const express = require("express");
const connectDB = require("./config");
const routes = require("./src/routes/combine.routes");
const cookieParser = require('cookie-parser')
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(morgan("dev"))

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
