function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      <img
        src={product.image}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-4">

        <h3 className="text-xl font-semibold">
          {product.name}
        </h3>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-blue-600 font-bold text-xl">
            ₹{product.price}
          </span>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;