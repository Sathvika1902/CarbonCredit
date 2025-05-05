const pool = require("../config/database");

exports.getWalletByUserId = async (userId) => {
    try {
        const [wallets] = await pool.execute(`SELECT * FROM Wallets WHERE UserID = ?`, [userId]);
        return wallets.length > 0 ? wallets[0] : null;
    } catch (error) {
        console.error("Error fetching wallet:", error);
        throw error;
    }
};

exports.updateWalletBalance = async (userId, amount) => {
    try {
        await pool.execute(
            `UPDATE Wallets SET Balance = Balance + ? WHERE UserID = ?`,
            [amount, userId]
        );
    } catch (error) {
        console.error("Error updating wallet balance:", error);
        throw error;
    }
};

exports.createWallet = async (userId, initialBalance = 0) => {
    try {
        const [result] = await pool.execute(
            `INSERT INTO Wallets (UserID, Balance) VALUES (?, ?)`,
            [userId, initialBalance]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error creating wallet:", error);
        throw error;
    }
};
