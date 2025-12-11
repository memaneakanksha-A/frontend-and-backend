// server.js - MERN Backend (Production Ready)

const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");

// =====================
// 🔌 Connect MongoDB
// =====================
connectDB();

const app = express();

// =====================
// ✅ Middleware
// =====================
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://frontend-and-backend-1-5r8v.onrender.com"],
    credentials: true,
  })
);

// =====================
// ✅ Root Route (for Render health check)
// =====================
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully 🚀");
});

// =====================
// ✅ API Routes
// =====================
app.use("/api/auth", require("./routes/auth"));

// =====================
// ✅ 404 Handler
// =====================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// =====================
// ✅ Start Server
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
