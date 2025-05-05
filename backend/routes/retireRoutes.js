const express = require("express");
const router = express.Router();

const retireController = require("../controllers/retireController");
const { authenticateJWT } = require("../middleware/authMiddleware");

router.post("/retire", authenticateJWT, retireController.retireCredits);
// router.get("/history", authenticateJWT, retireController.getRetirementHistory);

module.exports = router;
