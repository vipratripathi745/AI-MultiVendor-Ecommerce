import api from "./api";

// ========================================
// Public Products
// ========================================

export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// ========================================
// Seller
// ========================================

export const getSellerProducts = async () => {
  const response = await api.get("/products/my-products");
  return response.data;
};

export const createProduct = async (formData) => {
  const response = await api.post(
    "/products",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateProduct = async (
  id,
  formData
) => {
  const response = await api.put(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(
    `/products/${id}`
  );

  return response.data;
};

// ========================================
// Admin
// ========================================

export const getAdminProducts =
  async () => {
    const response = await api.get(
      "/products/admin/all"
    );

    return response.data;
  };

export const deleteAdminProduct =
  async (id) => {
    const response = await api.delete(
      `/products/admin/${id}`
    );

    return response.data;
  };