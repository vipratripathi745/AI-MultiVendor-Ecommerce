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
    (
      seller_id,
      name,
      description,
      price,
      stock,
      category,
      image,
      brand
    )
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
    SELECT
      p.*,
      COALESCE(AVG(r.rating), 0) AS average_rating,
      COUNT(r.id) AS total_reviews
    FROM products p
    LEFT JOIN reviews r
      ON p.id = r.product_id
    WHERE 1=1
  `;

  let countQuery = `
    SELECT COUNT(*) AS total
    FROM products
    WHERE 1=1
  `;

  const values = [];
  let index = 1;

  // Search
  if (search) {
    query += `
      AND (
        p.name ILIKE $${index}
        OR p.brand ILIKE $${index}
        OR p.category ILIKE $${index}
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
    query += ` AND p.category ILIKE $${index}`;
    countQuery += ` AND category ILIKE $${index}`;

    values.push(category);
    index++;
  }

  // Brand
  if (brand) {
    query += ` AND p.brand ILIKE $${index}`;
    countQuery += ` AND brand ILIKE $${index}`;

    values.push(brand);
    index++;
  }

  // Min Price
  if (minPrice) {
    query += ` AND p.price >= $${index}`;
    countQuery += ` AND price >= $${index}`;

    values.push(Number(minPrice));
    index++;
  }

  // Max Price
  if (maxPrice) {
    query += ` AND p.price <= $${index}`;
    countQuery += ` AND price <= $${index}`;

    values.push(Number(maxPrice));
    index++;
  }

  query += `
    GROUP BY p.id
  `;

  switch (sort) {
    case "price_asc":
      query += ` ORDER BY p.price ASC`;
      break;

    case "price_desc":
      query += ` ORDER BY p.price DESC`;
      break;

    case "oldest":
      query += ` ORDER BY p.created_at ASC`;
      break;

    default:
      query += ` ORDER BY p.created_at DESC`;
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

  const countResult = await pool.query(
    countQuery,
    values
  );

  return {
    products: productsResult.rows,
    totalProducts: Number(
      countResult.rows[0].total
    ),
  };
};



// ============================
// Seller Products
// ============================
export const getSellerProducts = async (
  sellerId
) => {
  const result = await pool.query(
    `
    SELECT
      p.*,
      COALESCE(AVG(r.rating),0) AS average_rating,
      COUNT(r.id) AS total_reviews
    FROM products p

    LEFT JOIN reviews r
      ON p.id = r.product_id

    WHERE p.seller_id = $1

    GROUP BY p.id

    ORDER BY p.created_at DESC;
    `,
    [sellerId]
  );

  return result.rows;
};

// ============================
// Product By Id
// ============================
export const getProductById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      p.*,
      COALESCE(AVG(r.rating),0) AS average_rating,
      COUNT(r.id) AS total_reviews

    FROM products p

    LEFT JOIN reviews r
      ON p.id = r.product_id

    WHERE p.id = $1

    GROUP BY p.id;
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
  const result = await pool.query(
    `
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
    `,
    [
      name,
      description,
      price,
      stock,
      category,
      image,
      brand,
      id,
    ]
  );

  return result.rows[0];
};

// ============================
// Delete Product
// ============================
export const deleteProduct = async (id) => {
  await pool.query(
    `
    DELETE
    FROM products
    WHERE id=$1;
    `,
    [id]
  );
};

// ============================
// Checkout Lock
// ============================
export const lockProductForUpdate = async (
  client,
  product_id
) => {
  const result = await client.query(
    `
    SELECT
      id,
      name,
      stock
    FROM products
    WHERE id=$1
    FOR UPDATE;
    `,
    [product_id]
  );

  return result.rows[0];
};

// ============================
// Reduce Stock
// ============================
export const decreaseProductStock = async (
  client,
  product_id,
  quantity
) => {
  await client.query(
    `
    UPDATE products
    SET stock=stock-$1
    WHERE id=$2;
    `,
    [quantity, product_id]
  );
};

// ============================
// Product By Seller
// ============================
export const getProductByIdAndSeller = async (
  id,
  sellerId
) => {
  const result = await pool.query(
    `
    SELECT
      p.*,
      COALESCE(AVG(r.rating),0) AS average_rating,
      COUNT(r.id) AS total_reviews

    FROM products p

    LEFT JOIN reviews r
      ON p.id = r.product_id

    WHERE
      p.id = $1
      AND p.seller_id = $2

    GROUP BY p.id;
    `,
    [id, sellerId]
  );

  return result.rows[0];
};

// ============================
// Delete Product By Seller
// ============================
export const deleteProductBySeller = async (
  id,
  sellerId
) => {
  const result = await pool.query(
    `
    DELETE
    FROM products
    WHERE id=$1
    AND seller_id=$2
    RETURNING *;
    `,
    [id, sellerId]
  );

  return result.rows[0];
};

// ============================
// Admin - Get All Products
// ============================
export const getAllProductsForAdmin =
  async () => {
    const result = await pool.query(
      `
      SELECT
        p.*,
        COALESCE(AVG(r.rating),0) AS average_rating,
        COUNT(r.id) AS total_reviews,
        u.name AS seller_name,
        u.email AS seller_email

      FROM products p

      JOIN users u
        ON p.seller_id = u.id

      LEFT JOIN reviews r
        ON p.id = r.product_id

      GROUP BY
        p.id,
        u.id,
        u.name,
        u.email

      ORDER BY p.created_at DESC;
      `
    );

    return result.rows;
  };

// ============================
// Admin - Delete Product
// ============================
export const deleteProductByAdmin = async (
  id
) => {
  const result = await pool.query(
    `
    DELETE FROM products
    WHERE id=$1
    RETURNING *;
    `,
    [id]
  );

  return result.rows[0];
};