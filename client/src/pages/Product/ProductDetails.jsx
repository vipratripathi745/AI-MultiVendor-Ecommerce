import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getProduct } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { addToWishlist } from "../../services/wishlistService";

function ProductDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [addingCart, setAddingCart] = useState(false);
  const [addingWishlist, setAddingWishlist] =
    useState(false);

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

      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingCart(true);

      const response = await addToCart(product.id, 1);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add to cart"
      );
    } finally {
      setAddingCart(false);
    }
  };

  const handleWishlist = async () => {
  console.log("Wishlist button clicked");
  console.log(product);

    try {
        setAddingWishlist(true);

        const response = await addToWishlist(product.id);

        console.log(response);

        toast.success(response.message);
    } catch (error) {
        console.log(error);

        toast.error(
        error.response?.data?.message ||
        "Failed to add to wishlist"
        );
    } finally {
        setAddingWishlist(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-3xl">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-3xl">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <div className="grid lg:grid-cols-2 gap-12">

        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl shadow-lg"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-3">
            Brand : {product.brand}
          </p>

          <p className="text-gray-500">
            Category : {product.category}
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-8">
            ₹{product.price}
          </h2>

          <p className="mt-8 leading-8">
            {product.description}
          </p>

          <p className="mt-8">
            Stock :

            <span className="ml-2 text-green-600 font-semibold">
              {product.stock}
            </span>

          </p>

          <div className="flex gap-5 mt-10">

            <button
              onClick={handleAddToCart}
              disabled={addingCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              {addingCart
                ? "Adding..."
                : "Add To Cart"}
            </button>

            <button
              onClick={handleWishlist}
              disabled={addingWishlist}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg"
            >
              {addingWishlist
                ? "Adding..."
                : "❤ Wishlist"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;