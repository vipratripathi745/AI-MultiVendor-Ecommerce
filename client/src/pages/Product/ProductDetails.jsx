import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getProduct } from "../../services/productService";
import { addToCart } from "../../services/cartService";

function ProductDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(id);

      setProduct(response.product);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load product"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);

      const response = await addToCart(product.id, 1);

      toast.success(response.message);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-bold">
          Loading Product...
        </h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-bold">
          Product Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Product Image */}

        <div>

          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-lg object-cover"
          />

        </div>

        {/* Product Details */}

        <div>

          <h1 className="text-4xl font-bold mb-3">
            {product.name}
          </h1>

          <p className="text-lg text-gray-500">
            Brand : {product.brand}
          </p>

          <p className="text-lg text-gray-500">
            Category : {product.category}
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-8">
            ₹{product.price}
          </h2>

          <p className="mt-8 text-gray-700 leading-8">
            {product.description}
          </p>

          <div className="mt-8">

            <span className="font-semibold">
              Stock :
            </span>

            {product.stock > 0 ? (
              <span className="ml-2 text-green-600 font-semibold">
                {product.stock} Available
              </span>
            ) : (
              <span className="ml-2 text-red-600 font-semibold">
                Out of Stock
              </span>
            )}

          </div>

          <div className="flex gap-4 mt-10">

            <button
              onClick={handleAddToCart}
              disabled={
                addingToCart || product.stock === 0
              }
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg transition"
            >
              {addingToCart
                ? "Adding..."
                : "Add To Cart"}
            </button>

            <button
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition"
            >
              Add To Wishlist
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;