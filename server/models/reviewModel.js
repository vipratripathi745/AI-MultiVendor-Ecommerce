import pool from "../config/db.js";

// ========================================
// Check Existing Review
// ========================================
export const getReviewByUserAndProduct = async (
  user_id,
  product_id
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM reviews
    WHERE user_id = $1
    AND product_id = $2;
    `,
    [user_id, product_id]
  );

  return result.rows[0];
};

// ========================================
// Create Review
// ========================================
export const createReview = async (
  user_id,
  product_id,
  rating,
  comment
) => {
  const result = await pool.query(
    `
    INSERT INTO reviews
    (user_id, product_id, rating, comment)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
    `,
    [
      user_id,
      product_id,
      rating,
      comment,
    ]
  );

  return result.rows[0];
};

// ========================================
// Get Review By ID
// ========================================
export const getReviewById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM reviews
    WHERE id = $1;
    `,
    [id]
  );

  return result.rows[0];
};

// ========================================
// Update Review
// ========================================
export const updateReview = async (
  id,
  rating,
  comment
) => {
  const result = await pool.query(
    `
    UPDATE reviews
    SET
      rating = $1,
      comment = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *;
    `,
    [
      rating,
      comment,
      id,
    ]
  );

  return result.rows[0];
};

// ========================================
// Delete Review
// ========================================
export const deleteReview = async (id) => {
  await pool.query(
    `
    DELETE FROM reviews
    WHERE id = $1;
    `,
    [id]
  );
};

// ========================================
// Get Product Reviews
// ========================================
export const getReviewsByProduct = async (
  product_id
) => {
  const result = await pool.query(
    `
    SELECT
      reviews.id,
      reviews.rating,
      reviews.comment,
      reviews.created_at,
      users.id AS user_id,
      users.name
    FROM reviews
    JOIN users
      ON reviews.user_id = users.id
    WHERE reviews.product_id = $1
    ORDER BY reviews.created_at DESC;
    `,
    [product_id]
  );

  return result.rows;
};

// ========================================
// Average Rating
// ========================================
export const getProductRatingSummary =
  async (product_id) => {
    const result = await pool.query(
      `
      SELECT
        COUNT(*) AS total_reviews,
        COALESCE(AVG(rating),0) AS average_rating
      FROM reviews
      WHERE product_id = $1;
      `,
      [product_id]
    );

    return result.rows[0];
  };