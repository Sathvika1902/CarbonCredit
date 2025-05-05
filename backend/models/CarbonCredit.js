const pool = require("../config/database");

exports.issueCredits = async (projectId, totalCredits, pricePerCredit, expiryDate) => {
    try {
        const [result] = await pool.execute(
            `INSERT INTO CarbonCredits (ProjectID, TotalCredits, PricePerCredit, ExpiryDate) VALUES (?, ?, ?, ?)`,
            [projectId, totalCredits, pricePerCredit, expiryDate]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error issuing credits:", error);
        throw error;
    }
};

exports.getAvailableCredits = async () => {
    try {
        const [credits] = await pool.execute(
            `SELECT * FROM CarbonCredits WHERE Status = 'Available'`
        );
        return credits;
    } catch (error) {
        console.error("Error fetching available credits:", error);
        throw error;
    }
};

exports.updateCreditStatus = async (creditId, status) => {
    try {
        await pool.execute(
            `UPDATE CarbonCredits SET Status = ? WHERE CreditID = ?`,
            [status, creditId]
        );
    } catch (error) {
        console.error("Error updating credit status:", error);
        throw error;
    }
};
