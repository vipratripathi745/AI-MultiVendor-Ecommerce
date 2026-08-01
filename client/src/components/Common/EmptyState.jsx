import { Link } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

function EmptyState({
  title = "Nothing Here",
  description = "There is nothing to display.",
  buttonText,
  buttonLink = "/",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">

      <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-8">

        <FaBoxOpen className="text-6xl text-blue-600" />

      </div>

      <h2 className="text-4xl font-bold text-gray-800">
        {title}
      </h2>

      <p className="text-gray-500 mt-4 max-w-md text-lg">
        {description}
      </p>

      {buttonText && (
        <Link
          to={buttonLink}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          {buttonText}
        </Link>
      )}

    </div>
  );
}

export default EmptyState;