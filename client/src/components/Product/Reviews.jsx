import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

import {
  getProductReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../../services/reviewService";

function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] =
    useState(0);
  const [totalReviews, setTotalReviews] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [editingReview, setEditingReview] =
    useState(null);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const response =
        await getProductReviews(productId);

      setReviews(response.reviews);
      setAverageRating(response.averageRating);
      setTotalReviews(response.totalReviews);

    } catch (error) {
      console.log(error);

      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setSaving(true);

      if (editingReview) {
        const response =
          await updateReview(
            editingReview.id,
            data
          );

        toast.success(response.message);

        setEditingReview(null);
      } else {
        const response =
          await addReview({
            product_id: productId,
            ...data,
          });

        toast.success(response.message);
      }

      fetchReviews();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation failed"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this review?"
      )
    )
      return;

    try {
      const response =
        await deleteReview(id);

      toast.success(response.message);

      fetchReviews();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-2xl font-bold">
        Loading Reviews...
      </div>
    );
  }

  return (
    <div className="mt-16">

      {/* Header */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-3xl font-bold">
              Customer Reviews
            </h2>

            <p className="text-gray-500 mt-2">
              {totalReviews} Review
              {totalReviews !== 1 && "s"}
            </p>

          </div>

          <div className="flex items-center gap-3 mt-5 md:mt-0">

            <FaStar className="text-yellow-400 text-3xl" />

            <span className="text-3xl font-bold">

              {Number(
                averageRating
              ).toFixed(1)}

            </span>

            <span className="text-gray-500">
              / 5
            </span>

          </div>

        </div>

      </div>

      {/* Form */}

      <ReviewForm
        onSubmit={handleSubmit}
        editingReview={editingReview}
        onCancel={() =>
          setEditingReview(null)
        }
        loading={saving}
      />

      {/* Reviews */}

      {reviews.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

          <h2 className="text-2xl font-bold">

            No Reviews Yet

          </h2>

          <p className="text-gray-500 mt-2">

            Be the first person to review this product.

          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {reviews.map((review) => (

            <ReviewCard
              key={review.id}
              review={review}
              onEdit={setEditingReview}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default Reviews;