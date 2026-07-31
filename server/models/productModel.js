import pool from "../config/db.js";

// ============================
// Add Product
// ============================
export const addProduct = async (
  seller_id,
  name,
  description,
  price,
  stock,
  category,
  image,
  brand
) => {
  const query = `
    INSERT INTO products
    (seller_id, name, description, price, stock, category, image, brand)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *;
  `;

  const values = [
    seller_id,
    name,
    description,
    price,
    stock,
    category,
    image,
    brand,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// ============================
// Get All Products
// (Pagination + Search + Filters + Sorting)
// ============================
export const getAllProducts = async (
  page = 1,
  limit = 10,
  search = "",
  category = "",
  brand = "",
  minPrice = "",
  maxPrice = "",
  sort = "newest"
) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT *
    FROM products
    WHERE 1 = 1
  `;

  let countQuery = `
    SELECT COUNT(*) AS total
    FROM products
    WHERE 1 = 1
  `;

  const values = [];
  let index = 1;

  // Search
  if (search) {
    query += `
      AND (
        name ILIKE $${index}
        OR brand ILIKE $${index}
        OR category ILIKE $${index}
      )
    `;

    countQuery += `
      AND (
        name ILIKE $${index}
        OR brand ILIKE $${index}
        OR category ILIKE $${index}
      )
    `;

    values.push(`%${search}%`);
    index++;
  }

  // Category
  if (category) {
    query += ` AND category ILIKE $${index}`;
    countQuery += ` AND category ILIKE $${index}`;

    values.push(category);
    index++;
  }

  // Brand
  if (brand) {
    query += ` AND brand ILIKE $${index}`;
    countQuery += ` AND brand ILIKE $${index}`;

    values.push(brand);
    index++;
  }

  // Minimum Price
  if (minPrice) {
    query += ` AND price >= $${index}`;
    countQuery += ` AND price >= $${index}`;

    values.push(Number(minPrice));
    index++;
  }

  // Maximum Price
  if (maxPrice) {
    query += ` AND price <= $${index}`;
    countQuery += ` AND price <= $${index}`;

    values.push(Number(maxPrice));
    index++;
  }

  // Sorting
  switch (sort) {
    case "price_asc":
      query += ` ORDER BY price ASC`;
      break;

    case "price_desc":
      query += ` ORDER BY price DESC`;
      break;

    case "oldest":
      query += ` ORDER BY created_at ASC`;
      break;

    default:
      query += ` ORDER BY created_at DESC`;
      break;
  }

  query += `
    LIMIT $${index}
    OFFSET $${index + 1}
  `;

  const productsResult = await pool.query(query, [
    ...values,
    limit,
    offset,
  ]);

  const countResult = await pool.query(countQuery, values);

  return {
    products: productsResult.rows,
    totalProducts: Number(countResult.rows[0].total),
  };
};

// ============================
// Get Products By Seller
// ============================

export const getSellerProducts = async (sellerId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM products
    WHERE seller_id = $1
    ORDER BY created_at DESC;
    `,
    [sellerId]
  );

  return result.rows;
};

// ============================
// Get Product By ID
// ============================
export const getProductById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM products
    WHERE id = $1;
    `,
    [id]
  );

  return result.rows[0];
};

// ============================
// Update Product
// ============================
export const updateProduct = async (
  id,
  name,
  description,
  price,
  stock,
  category,
  image,
  brand
) => {
  const query = `
    UPDATE products
    SET
      name = $1,
      description = $2,
      price = $3,
      stock = $4,
      category = $5,
      image = $6,
      brand = $7,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $8
    RETURNING *;
  `;

  const values = [
    name,
    description,
    price,
    stock,
    category,
    image,
    brand,
    id,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// ============================
// Delete Product
// ============================
export const deleteProduct = async (id) => {
  await pool.query(
    `
    DELETE FROM products
    WHERE id = $1;
    `,
    [id]
  );
};

// ============================
// Lock Product For Checkout
// ============================
export const lockProductForUpdate = async (
  client,
  product_id
) => {
  const result = await client.query(
    `
    SELECT id, name, stock
    FROM products
    WHERE id = $1
    FOR UPDATE;
    `,
    [product_id]
  );

  return result.rows[0];
};

// ============================
// Reduce Product Stock
// ============================
export const decreaseProductStock = async (
  client,
  product_id,
  quantity
) => {
  await client.query(
    `
    UPDATE products
    SET stock = stock - $1
    WHERE id = $2;
    `,
    [quantity, product_id]
  );
};

// ============================
// Get Product By ID and Seller
// ============================
export const getProductByIdAndSeller = async (id, sellerId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM products
    WHERE id = $1
    AND seller_id = $2;
    `,
    [id, sellerId]
  );

  return result.rows[0];
};

// ============================
// Delete Product By Seller
// ============================
export const deleteProductBySeller = async (id, sellerId) => {
  const result = await pool.query(
    `
    DELETE FROM products
    WHERE id = $1
    AND seller_id = $2
    RETURNING *;
    `,
    [id, sellerId]
  );

  return result.rows[0];
};