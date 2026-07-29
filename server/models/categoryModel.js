import pool from "../config/db.js";

// Get all categories
export const getAllCategories = async () => {
  const result = await pool.query(
    "SELECT * FROM categories ORDER BY name ASC"
  );

  return result.rows;
};

// Add category
export const addCategory = async (name) => {
  const result = await pool.query(
    "INSERT INTO categories(name) VALUES($1) RETURNING *",
    [name]
  );

  return result.rows[0];
};