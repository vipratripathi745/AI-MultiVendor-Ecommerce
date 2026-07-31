import api from "./api";

// ======================================
// Get All Products (Admin)
// ======================================
export const getAdminProducts = async () => {
  const response = await api.get("/products/admin/all");

  return response.data;
};

// ======================================
// Delete Product (Admin)
// ======================================
export const deleteAdminProduct = async (id) => {
  const response = await api.delete(
    `/products/admin/${id}`
  );

  return response.data;
};