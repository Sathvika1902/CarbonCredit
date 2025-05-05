const { pool } = require("../config/database");

exports.getUserProfile = async (req, res) => {
  try {
    const [user] = await pool.execute(
      "SELECT Name, Email, Role FROM Users WHERE UserID = ?",
      [req.user.user_id]
    );
    if (user.length === 0)
      return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user: user[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getWalletBalance = async (req, res) => {
  try {
    const [wallet] = await pool.execute(
      "SELECT Balance FROM Wallets WHERE UserID = ?",
      [req.user.user_id]
    );
    if (wallet.length === 0)
      return res.status(404).json({ success: false, message: "Wallet not found" });
    res.status(200).json({ success: true, balance: wallet[0].Balance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.execute("SELECT UserID, Name, Email, Role FROM Users");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const [user] = await pool.execute("SELECT UserID, Name, Email, Role FROM Users WHERE UserID = ?", [req.params.id]);
    if (user.length === 0)
      return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user: user[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    await pool.execute("UPDATE Users SET Name = ?, Email = ?, Role = ? WHERE UserID = ?", [
      name,
      email,
      role,
      req.params.id,
    ]);
    res.status(200).json({ success: true, message: "User updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    await pool.execute("DELETE FROM Users WHERE UserID = ?", [req.params.id]);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
