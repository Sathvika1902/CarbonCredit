const pool = require("../config/database");

exports.createUser = async (name, email, password, role) => {
    try {
        const [result] = await pool.execute(
            `INSERT INTO Users (Name, Email, PasswordHash, Role) VALUES (?, ?, ?, ?)`,
            [name, email, password, role]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

exports.getUserByEmail = async (email) => {
    try {
        const [users] = await pool.execute(`SELECT * FROM Users WHERE Email = ?`, [email]);
        return users.length > 0 ? users[0] : null;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
};

exports.getUserById = async (userId) => {
    try {
        const [users] = await pool.execute(`SELECT * FROM Users WHERE UserID = ?`, [userId]);
        return users.length > 0 ? users[0] : null;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};
