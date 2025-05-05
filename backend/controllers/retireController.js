const { pool } = require("../config/database");

exports.retireCredits = async (req, res) => {
  try {
    const { creditId } = req.body;
    await pool.execute(`UPDATE CarbonCredits SET Status = 'Retired' WHERE CreditID = ?`, [creditId]);
    res.status(200).json({ success: true, message: "Credits retired successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRetirementHistory = async (req, res) => {
  try {
    const userId = req.user.user_id || req.user.userId;

    const [records] = await pool.execute(
      `SELECT * FROM CarbonCredits WHERE Status = 'Retired' AND CreditID IN 
       (SELECT CreditID FROM Transactions WHERE BuyerID = ?)`,
      [userId]
    );

    res.status(200).json({ success: true, retiredCredits: records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
