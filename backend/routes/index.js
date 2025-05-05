const express = require("express");
const router = express.Router();


const authRoutes = require("./authRoutes");
const issuanceRoutes = require("./issuanceRoutes");
const tradeRoutes = require("./tradeRoutes");
const retireRoutes = require("./retireRoutes");
const userRoutes = require("./userRoutes");


// Route mapping
router.use("/auth", authRoutes);        // login, register
router.use("/issue", issuanceRoutes);   // issue new credits
router.use("/trade", tradeRoutes);      // trading credits
router.use("/retire", retireRoutes);    // retiring credits
router.use("/user", userRoutes);        // user-related data fetch/update

module.exports = router;
