const { query } = require('../config/database');

// Issue carbon credits for a project
exports.issueCredits = async (req, res) => {
  try {
    const { projectId, totalCredits, pricePerCredit, expiryDate } = req.body;

    if (!projectId || !totalCredits || !pricePerCredit || !expiryDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert into CarbonCredits table
    const result = await query(
      `INSERT INTO CarbonCredits (ProjectID, TotalCredits, PricePerCredit, ExpiryDate, Status)
       VALUES (?, ?, ?, ?, 'Available')`,
      [projectId, totalCredits, pricePerCredit, expiryDate]
    );

    // Associate the issuer (req.user.userId) with the project if not already
    await query(
      `INSERT IGNORE INTO ProjectsIssuers (ProjectID, IssuerID)
       VALUES (?, ?)`,
      [projectId, req.user.userId]
    );

    return res.status(201).json({ message: 'Credits issued successfully', CreditID: result.insertId });

  } catch (error) {
    console.error("Error issuing credits:", error);
    res.status(500).json({ error: "Server error while issuing credits" });
  }
};

// Get all carbon credits issued by the issuer
exports.getCreditsByIssuer = async (req, res) => {
  try {
    const issuerId = req.user.userId;

    const credits = await query(
      `SELECT cc.*
       FROM CarbonCredits cc
       JOIN ProjectsIssuers pi ON cc.ProjectID = pi.ProjectID
       WHERE pi.IssuerID = ?`,
      [issuerId]
    );

    res.status(200).json({ credits });
  } catch (error) {
    console.error("Error fetching issued credits:", error);
    res.status(500).json({ error: "Server error" });
  }
};
