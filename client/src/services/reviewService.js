import api from "./api";

// =======================================
// Get Product Reviews
// =======================================

export const getProductReviews = async (
  productId
) => {
  const response = await api.get(
    `/reviews/product/${productId}`
  );

  return response.data;
};

// =======================================
// Add Review
// =======================================

export const addReview = async (data) => {
  const response = await api.post(
    "/reviews",
    data
  );

  return response.data;
};

// =======================================
// Update Review
// =======================================

export const updateReview = async (
  id,
  data
) => {
  const response = await api.put(
    `/reviews/${id}`,
    data
  );

  return response.data;
};

// =======================================
// Delete Review
// =======================================

export const deleteReview = async (
  id
) => {
  const response = await api.delete(
    `/reviews/${id}`
  );

  return response.data;
};