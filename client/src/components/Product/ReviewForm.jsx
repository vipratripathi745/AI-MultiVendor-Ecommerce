import { useEffect, useState } from "react";
import {
  FaStar,
  FaPaperPlane,
} from "react-icons/fa";

function ReviewForm({
  onSubmit,
  editingReview,
  onCancel,
  loading,
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] =
    useState("");

  useEffect(() => {
    if (editingReview) {
      setRating(editingReview.rating);
      setComment(editingReview.comment);
    } else {
      setRating(5);
      setComment("");
    }
  }, [editingReview]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      rating,
      comment,
    });

    if (!editingReview) {
      setRating(5);
      setComment("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6">

        {editingReview
          ? "Edit Review"
          : "Write a Review"}

      </h2>

      {/* Rating */}

      <div className="mb-6">

        <label className="block font-semibold mb-3">

          Rating

        </label>

        <div className="flex gap-2">

          {[1, 2, 3, 4, 5].map(
            (star) => (

              <button
                key={star}
                type="button"
                onClick={() =>
                  setRating(star)
                }
                className="text-3xl"
              >

                <FaStar
                  className={
                    star <= rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />

              </button>

            )
          )}

        </div>

      </div>

      {/* Comment */}

      <div>

        <label className="block font-semibold mb-3">

          Comment

        </label>

        <textarea
          rows="5"
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          placeholder="Write your review..."
          required
          className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      {/* Buttons */}

      <div className="flex gap-4 mt-6">

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
        >

          <FaPaperPlane />

          {loading
            ? "Saving..."
            : editingReview
            ? "Update Review"
            : "Submit Review"}

        </button>

        {editingReview && (

          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl font-semibold transition"
          >

            Cancel

          </button>

        )}

      </div>

    </form>
  );
}

export default ReviewForm;