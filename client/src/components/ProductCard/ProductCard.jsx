import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
} from "react-icons/fa";

function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

      {/* Image */}

      <Link to={`/products/${product.id}`}>

        <div className="relative overflow-hidden">

          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
          />

          {/* Discount */}

          <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">

            20% OFF

          </span>

          {/* Wishlist */}

          <button
            className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition"
          >

            <FaHeart />

          </button>

        </div>

      </Link>

      {/* Details */}

      <div className="p-5">

        <p className="text-sm uppercase text-gray-400">

          {product.category}

        </p>

        <Link to={`/products/${product.id}`}>

          <h3 className="text-xl font-bold mt-2 group-hover:text-blue-600 transition">

            {product.name}

          </h3>

        </Link>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">

          {product.description}

        </p>

        {/* Rating */}

        <div className="flex items-center gap-1 mt-4 text-yellow-400">

          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />

          <span className="text-gray-600 ml-2">

            (5.0)

          </span>

        </div>

        {/* Price */}

        <div className="flex items-center gap-3 mt-5">

          <span className="text-3xl font-bold text-blue-600">

            ₹{product.price}

          </span>

          <span className="text-gray-400 line-through">

            ₹{Math.floor(product.price * 1.2)}

          </span>

        </div>

        {/* Buttons */}

        <div className="flex gap-3 mt-6">

          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
          >

            <FaShoppingCart />

            Add To Cart

          </button>

          <button
            className="w-14 border rounded-xl hover:bg-red-500 hover:text-white transition"
          >

            <FaHeart />

          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;