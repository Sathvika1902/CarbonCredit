require('dotenv').config();
const { pool } = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const [existing] = await pool.execute("SELECT * FROM Users WHERE Email = ?", [email]);
        if (existing.length > 0) {
            return res.status(409).json({ success: false, message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.execute(
            "INSERT INTO Users (Name, Email, PasswordHash, Role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role]
        );

        const userId = result.insertId;
        const token = jwt.sign({ user_id: userId, role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({ success: true, token, role });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const [users] = await pool.execute("SELECT * FROM Users WHERE Email = ?", [email]);
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.PasswordHash);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { user_id: user.UserID, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ success: true, token, role: user.Role });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};
