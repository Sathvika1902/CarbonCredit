// server.js
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");

const rateLimiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");
const corsMiddleware = require("./middleware/corsMiddleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const issuanceRoutes = require("./routes/issuanceRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const retireRoutes = require("./routes/retireRoutes");

const { pool } = require("./config/database");

const app = express();

// ✅ Fix for rate limiter error (X-Forwarded-For)
app.set("trust proxy", 1);

// ✅ Core Middleware
app.use(corsMiddleware);           // Custom CORS config
app.use(express.json());           // Body parser
app.use(helmet());                 // Security headers
app.use(logger);                   // Request logging
app.use(rateLimiter);             // Apply rate limiting

// ✅ API Routes
app.use("/api/auth", authRoutes);         // login/register
app.use("/api/users", userRoutes);        // user profile, wallet
app.use("/api/credits", issuanceRoutes);  // issue credits
app.use("/api/trades", tradeRoutes);      // trade credits
app.use("/api/retire", retireRoutes);     // retire credits

// ✅ Health Check Route
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS serverTime");
    res.status(200).json({ status: "ok", serverTime: rows[0].serverTime });
  } catch (err) {
    console.error("❌ Database check failed:", err.message);
    res.status(500).json({ error: "Database connection failed", details: err.message });
  }
});

// ✅ Fallback 404 handler (for unknown routes)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

// ✅ Global error handler
app.use(errorHandler);

// ✅ Start Server and Verify DB
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL connected successfully.");
    conn.release();
  } catch (err) {
    console.warn("⚠️ MySQL not reachable at startup:", err.message);
  }

  console.log(`🚀 Server running on port ${PORT}`);
});
