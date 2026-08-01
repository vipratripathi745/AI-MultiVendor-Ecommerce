import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white shadow-2xl rounded-3xl p-12 max-w-xl w-full text-center">

        <div className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center mx-auto">

          <FaExclamationTriangle className="text-5xl text-red-600" />

        </div>

        <h1 className="text-8xl font-extrabold text-gray-800 mt-8">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-5 text-lg">
          Sorry, the page you're looking for doesn't exist
          or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition hover:scale-105"
        >
          Back To Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;