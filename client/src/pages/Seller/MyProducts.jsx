import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getSellerProducts,
  deleteProduct,
} from "../../services/productService";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getSellerProducts();

      setProducts(response.products);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteProduct(id);

      toast.success(response.message);

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          No Products Found
        </h2>

        <Link
          to="/seller/add-product"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Add Product
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          My Products
        </h1>

        <Link
          to="/seller/add-product"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Product
        </Link>

      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Product</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Stock</th>

              <th className="p-4 text-center">Edit</th>

              <th className="p-4 text-center">Delete</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b"
              >

                <td className="p-4">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                </td>

                <td className="p-4 font-semibold">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4">
                  ₹{product.price}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4 text-center">

                  <Link
                    to={`/seller/edit-product/${product.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </Link>

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MyProducts;