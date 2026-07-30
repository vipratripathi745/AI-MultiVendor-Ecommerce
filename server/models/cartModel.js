import pool from "../config/db.js";

// ===============================
// Add Item to Cart
// ===============================
export const addToCart = async (user_id, product_id, quantity) => {
  // Check if product already exists in cart
  const checkQuery = `
    SELECT *
    FROM cart
    WHERE user_id = $1
      AND product_id = $2;
  `;

  const checkResult = await pool.query(checkQuery, [user_id, product_id]);

  // Product already exists -> Increase quantity
  if (checkResult.rows.length > 0) {
    const updateQuery = `
      UPDATE cart
      SET quantity = quantity + $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $2
        AND product_id = $3
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, [
      quantity,
      user_id,
      product_id,
    ]);

    return result.rows[0];
  }

  // Insert new cart item
  const insertQuery = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const result = await pool.query(insertQuery, [
    user_id,
    product_id,
    quantity,
  ]);

  return result.rows[0];
};

// ===============================
// Get User Cart
// ===============================
export const getCartByUser = async (user_id) => {
  const query = `
    SELECT
      c.id,
      c.quantity,

      p.id AS product_id,
      p.name,
      p.price,
      p.image,
      p.brand,
      p.stock,

      (p.price * c.quantity) AS subtotal

    FROM cart c
    JOIN products p
      ON c.product_id = p.id

    WHERE c.user_id = $1

    ORDER BY c.created_at DESC;
  `;

  const result = await pool.query(query, [user_id]);

  return result.rows;
};

// ===============================
// Update Cart Quantity
// ===============================
export const updateCartQuantity = async (
  cart_id,
  user_id,
  quantity
) => {
  const query = `
    UPDATE cart
    SET quantity = $1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
      AND user_id = $3
    RETURNING *;
  `;

  const result = await pool.query(query, [
    quantity,
    cart_id,
    user_id,
  ]);

  return result.rows[0];
};

// ===============================
// Remove Cart Item
// ===============================
export const removeCartItem = async (
  cart_id,
  user_id
) => {
  const query = `
    DELETE FROM cart
    WHERE id = $1
      AND user_id = $2
    RETURNING *;
  `;

  const result = await pool.query(query, [
    cart_id,
    user_id,
  ]);

  return result.rows[0];
};

// ===============================
// Clear Cart (Transaction)
// ===============================
export const clearCart = async (
  client,
  user_id
) => {
  const query = `
    DELETE FROM cart
    WHERE user_id = $1;
  `;

  await client.query(query, [user_id]);
};