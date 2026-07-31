import api from "./api";

// Get Cart
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// Add To Cart
export const addToCart = async (product_id, quantity = 1) => {
  const response = await api.post("/cart", {
    product_id,
    quantity,
  });

  return response.data;
};

// Update Quantity
export const updateCart = async (id, quantity) => {
  const response = await api.put(`/cart/${id}`, {
    quantity,
  });

  return response.data;
};

// Remove Item
export const removeCartItem = async (id) => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};

// Clear Cart
export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};