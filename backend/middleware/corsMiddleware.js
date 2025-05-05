// middleware/corsMiddleware.js

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", // ✅ Your React frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // ✅ Allow cookies and credentials
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
