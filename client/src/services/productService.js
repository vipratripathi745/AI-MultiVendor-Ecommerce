import api from "./api";

// Public Products
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Seller Products
export const getSellerProducts = async () => {
  const response = await api.get("/products/my-products");
  return response.data;
};

// Create Product
export const createProduct = async (formData) => {
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete Product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

//get product by id
export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

//update product
export const updateProduct = async (id, formData) => {
  const response = await api.put(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};