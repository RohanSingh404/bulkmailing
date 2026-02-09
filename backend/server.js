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
    origin: [
      "http://localhost:3000",  // for local development
      "https://massswapsomailer-m3hql91c0-rohansinghiitian6395-4082s-projects.vercel.app" // your frontend URL
    ],
    credentials: true,
  })
);



app.use(morgan("tiny"));

// Routes
const userRoutes = require("./routes/user");
const commonRoutes = require("./routes/common");

app.use("/api/user", userRoutes);
app.use("/api", commonRoutes);



// ✅ ===== SERVE FRONTEND (React/Vite) =====

// Path to frontend build folder
const frontendPath = path.join(__dirname, "..", "frontend", "dist");

// Serve static files
app.use(express.static(frontendPath));

// React router fallback (important)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
  
});



// Start Server
module.exports = app;
