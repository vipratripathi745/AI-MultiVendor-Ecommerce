import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover"
        />
      </Link>

      <div className="p-4">

        <Link to={`/products/${product.id}`}>
          <h3 className="text-xl font-semibold hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-blue-600 font-bold text-xl">
            ₹{product.price}
          </span>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;