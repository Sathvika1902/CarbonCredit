const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

exports.generateToken = (user) => {
  try {
    return jwt.sign(
      {
        user_id: user.user_id || user.userId || user.UserID,
        userId: user.user_id || user.userId || user.UserID,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Invalid or expired token");
  }
};
