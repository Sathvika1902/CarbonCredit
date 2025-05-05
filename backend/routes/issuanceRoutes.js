const express = require("express");
const router = express.Router();

const issuanceController = require("../controllers/issuanceController");
const { authenticateJWT, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/issue", authenticateJWT, authorizeRoles("Issuer"), issuanceController.issueCredits);
router.get("/my-credits", authenticateJWT, issuanceController.getCreditsByIssuer);

module.exports = router;
