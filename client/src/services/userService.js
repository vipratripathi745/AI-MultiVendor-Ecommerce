import api from "./api";

// =============================
// Get All Users
// =============================
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// =============================
// Update User Role
// =============================
export const updateRole = async (
  id,
  role
) => {
  const response = await api.put(
    `/users/${id}/role`,
    { role }
  );

  return response.data;
};

// =============================
// Delete User
// =============================
export const deleteUser = async (
  id
) => {
  const response = await api.delete(
    `/users/${id}`
  );

  return response.data;
};