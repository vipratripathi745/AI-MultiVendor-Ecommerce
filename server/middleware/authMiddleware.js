import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await pool.query(
      `
      SELECT id, name, email, role
      FROM users
      WHERE id = $1
      `,
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = result.rows[0];

    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default protect;