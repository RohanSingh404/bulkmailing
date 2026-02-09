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

const path = require("path");

const frontendPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));



// Start Server
//module.exports = app;
