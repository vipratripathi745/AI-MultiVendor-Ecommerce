import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaTrash,
  FaStar,
} from "react-icons/fa";

import {
  getAdminProducts,
  deleteAdminProduct,
} from "../../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response =
        await getAdminProducts();

      setProducts(response.products);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this product?"
      )
    )
      return;

    try {
      const response =
        await deleteAdminProduct(id);

      toast.success(response.message);

      setProducts((prev) =>
        prev.filter(
          (product) => product.id !== id
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Manage Products
        </h1>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left">
                    Seller
                  </th>

                  <th className="px-6 py-4 text-left">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-left">
                    Rating
                  </th>

                  <th className="px-6 py-4 text-left">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.map((product) => (

                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />

                        <div>

                          <h3 className="font-bold">
                            {product.name}
                          </h3>

                          <p className="text-gray-500">
                            {product.brand}
                          </p>

                          <p className="text-sm text-gray-400">
                            {product.category}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <p className="font-semibold">
                        {product.seller_name}
                      </p>

                      <p className="text-gray-500 text-sm">
                        {product.seller_email}
                      </p>

                    </td>

                    <td className="px-6 py-5 font-bold text-blue-600">
                      ₹{product.price}
                    </td>

                    <td className="px-6 py-5">
                      {product.stock}
                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <FaStar className="text-yellow-400" />

                        <span>
                          {Number(
                            product.average_rating
                          ).toFixed(1)}
                        </span>

                        <span className="text-gray-500">
                          (
                          {
                            product.total_reviews
                          }
                          )
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <button
                        onClick={() =>
                          handleDelete(
                            product.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition"
                      >

                        <FaTrash />

                        Delete

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Products;