const express = require("express");
const router = express.Router();

const tradeController = require("../controllers/tradeController");
const { authenticateJWT } = require("../middleware/authMiddleware");

router.get("/listings", tradeController.getMarketplaceListings);
router.post("/trade", authenticateJWT, tradeController.tradeCredits);

module.exports = router;
