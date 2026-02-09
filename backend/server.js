require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db/db");

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(express.json({ limit: "25mb" }));


app.use(
  cors({
    origin: true,   // allow all origins (safe for APIs using auth tokens)
    credentials: true,
  })
);




app.use(morgan("tiny"));

// Routes
const userRoutes = require("./routes/user");
const commonRoutes = require("./routes/common");

app.use("/api/user", userRoutes);
app.use("/api", commonRoutes);






// Start Server
module.exports = app;
