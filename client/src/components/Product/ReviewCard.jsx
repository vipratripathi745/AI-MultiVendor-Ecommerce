import {
  FaStar,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

function ReviewCard({
  review,
  onEdit,
  onDelete,
}) {
  const { user } = useAuth();

  const isOwner =
    user && user.id === review.user_id;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-xl font-bold">

            {review.name}

          </h3>

          <p className="text-gray-500 text-sm">

            {new Date(
              review.created_at
            ).toLocaleDateString()}

          </p>

        </div>

        {/* Rating */}

        <div className="flex items-center gap-1">

          {[1, 2, 3, 4, 5].map((star) => (

            <FaStar
              key={star}
              className={
                star <= review.rating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            />

          ))}

        </div>

      </div>

      {/* Comment */}

      <p className="mt-5 text-gray-700 leading-7">

        {review.comment}

      </p>

      {/* Actions */}

      {isOwner && (

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => onEdit(review)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition"
          >

            <FaEdit />

            Edit

          </button>

          <button
            onClick={() =>
              onDelete(review.id)
            }
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
          >

            <FaTrash />

            Delete

          </button>

        </div>

      )}

    </div>
  );
}

export default ReviewCard;