import pool from "../config/db.js";

// ========================================
// Find User By Email
// ========================================
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1;
    `,
    [email]
  );

  return result.rows[0];
};

// ========================================
// Create User
// ========================================
export const createUser = async (
  name,
  email,
  password,
  role,
  phone
) => {
  const result = await pool.query(
    `
    INSERT INTO users
    (
      name,
      email,
      password,
      role,
      phone
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING
      id,
      name,
      email,
      role,
      phone;
    `,
    [name, email, password, role, phone]
  );

  return result.rows[0];
};

// ========================================
// Get All Users
// ========================================
export const getAllUsers = async () => {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      role,
      phone,
      address,
      created_at
    FROM users
    ORDER BY created_at DESC;
    `
  );

  return result.rows;
};

// ========================================
// Get User By Id
// ========================================
export const getUserById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      role,
      phone,
      address,
      created_at
    FROM users
    WHERE id = $1;
    `,
    [id]
  );

  return result.rows[0];
};

// ========================================
// Update User Profile
// ========================================
export const updateUserProfile = async (
  id,
  name,
  phone,
  address
) => {
  const result = await pool.query(
    `
    UPDATE users
    SET
      name = $1,
      phone = $2,
      address = $3
    WHERE id = $4
    RETURNING
      id,
      name,
      email,
      role,
      phone,
      address;
    `,
    [name, phone, address, id]
  );

  return result.rows[0];
};

// ========================================
// Update User Role
// ========================================
export const updateUserRole = async (
  id,
  role
) => {
  const result = await pool.query(
    `
    UPDATE users
    SET role = $1
    WHERE id = $2
    RETURNING
      id,
      name,
      email,
      role;
    `,
    [role, id]
  );

  return result.rows[0];
};

// ========================================
// Delete User
// ========================================
export const deleteUser = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING id;
    `,
    [id]
  );

  return result.rows[0];
};