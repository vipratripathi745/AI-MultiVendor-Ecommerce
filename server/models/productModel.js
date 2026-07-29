import pool from "../config/db.js";

// Add Product
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

// Get All Products
export const getAllProducts = async () => {
  const result = await pool.query(
    "SELECT * FROM products ORDER BY created_at DESC"
  );

  return result.rows;
};

// Get Product By ID
export const getProductById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE id=$1",
    [id]
  );

  return result.rows[0];
};

// Update Product
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
      name=$1,
      description=$2,
      price=$3,
      stock=$4,
      category=$5,
      image=$6,
      brand=$7,
      updated_at=CURRENT_TIMESTAMP
    WHERE id=$8
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

// Delete Product
export const deleteProduct = async (id) => {
  await pool.query(
    "DELETE FROM products WHERE id=$1",
    [id]
  );
};