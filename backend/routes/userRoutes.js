const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  getWalletBalance,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");
console.log("getUserProfile:", getUserProfile);


const { authenticateJWT, authorizeRoles } = require("../middleware/authMiddleware");


// Self access
router.get("/me", authenticateJWT, getUserProfile);
router.get("/wallet", authenticateJWT, getWalletBalance);

// Admin routes
router.get("/all", authenticateJWT, authorizeRoles("Admin"), getAllUsers);
router.get("/:id", authenticateJWT, authorizeRoles("Admin"), getUserById);
router.put("/:id", authenticateJWT, authorizeRoles("Admin"), updateUserById);
router.delete("/:id", authenticateJWT, authorizeRoles("Admin"), deleteUserById);

module.exports = router;
