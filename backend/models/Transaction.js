const pool = require("../config/database");

exports.createTransaction = async (buyerId, creditId, amount, blockchainHash) => {
    try {
        const [result] = await pool.execute(
            `INSERT INTO Transactions (BuyerID, CreditID, Amount, BlockchainHash) VALUES (?, ?, ?, ?)`,
            [buyerId, creditId, amount, blockchainHash]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
};

exports.getAllTransactions = async () => {
    try {
        const [transactions] = await pool.execute(`SELECT * FROM Transactions`);
        return transactions;
    } catch (error) {
        console.error("Error retrieving transactions:", error);
        throw error;
    }
};

exports.getTransactionsByUser = async (userId) => {
    try {
        const [transactions] = await pool.execute(
            `SELECT * FROM Transactions WHERE BuyerID = ?`,
            [userId]
        );
        return transactions;
    } catch (error) {
        console.error("Error retrieving user's transactions:", error);
        throw error;
    }
};
