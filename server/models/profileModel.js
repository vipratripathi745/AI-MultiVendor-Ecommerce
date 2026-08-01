// ========================================
// Update User Profile
// ========================================

export const updateUserProfile = async (
  id,
  name,
  phone
) => {
  const result = await pool.query(
    `
    UPDATE users
    SET
      name = $1,
      phone = $2
    WHERE id = $3
    RETURNING
      id,
      name,
      email,
      role,
      phone,
      created_at;
    `,
    [name, phone, id]
  );

  return result.rows[0];
};