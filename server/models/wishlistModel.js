import pool from "../config/db.js";

// =======================================
// Check Wishlist Item
// =======================================
export const getWishlistItem = async (
  user_id,
  product_id
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM wishlist
    WHERE user_id = $1
    AND product_id = $2;
    `,
    [user_id, product_id]
  );

  return result.rows[0];
};

// =======================================
// Add To Wishlist
// =======================================
export const addToWishlist = async (
  user_id,
  product_id
) => {
  const result = await pool.query(
    `
    INSERT INTO wishlist(user_id, product_id)
    VALUES($1,$2)
    RETURNING *;
    `,
    [user_id, product_id]
  );

  return result.rows[0];
};

// =======================================
// Get Wishlist
// =======================================
export const getWishlist = async (user_id) => {
  const result = await pool.query(
    `
    SELECT
        w.id,
        p.id AS product_id,
        p.name,
        p.price,
        p.image,
        p.brand,
        p.category,
        p.stock
    FROM wishlist w
    JOIN products p
      ON w.product_id = p.id
    WHERE w.user_id = $1
    ORDER BY w.created_at DESC;
    `,
    [user_id]
  );

  return result.rows;
};

// =======================================
// Remove Wishlist Item
// =======================================
export const removeWishlistItem = async (
  user_id,
  product_id
) => {
  await pool.query(
    `
    DELETE FROM wishlist
    WHERE user_id = $1
    AND product_id = $2;
    `,
    [user_id, product_id]
  );
};