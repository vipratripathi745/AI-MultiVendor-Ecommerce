import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBoxOpen,
} from "react-icons/fa";

import {
  getSellerProducts,
  deleteProduct,
} from "../../services/productService";

import EmptyState from "../../components/Common/EmptyState";

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
    if (!window.confirm("Delete this product?")) return;

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
      <div className="text-center py-24 text-3xl font-bold">
        Loading Products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No Products Added"
        description="Start selling by adding your first product."
        buttonText="Add Product"
        buttonLink="/seller/add-product"
      />
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              My Products
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all your listed products.
            </p>

          </div>

          <Link
            to="/seller/add-product"
            className="mt-5 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
          >
            <FaPlus />
            Add Product
          </Link>

        </div>

        {/* Products Table */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-5 text-left">
                  Product
                </th>

                <th className="p-5 text-left">
                  Category
                </th>

                <th className="p-5 text-left">
                  Price
                </th>

                <th className="p-5 text-left">
                  Stock
                </th>

                <th className="p-5 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div>

                        <h3 className="font-bold text-lg">

                          {product.name}

                        </h3>

                        <p className="text-gray-500 text-sm">

                          {product.brand}

                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="p-5">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                      {product.category}

                    </span>

                  </td>

                  <td className="p-5 font-bold text-blue-600 text-lg">

                    ₹{product.price}

                  </td>

                  <td className="p-5">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock}
                    </span>

                  </td>

                  <td className="p-5">

                    <div className="flex justify-center gap-3">

                      <Link
                        to={`/seller/edit-product/${product.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition"
                      >
                        <FaEdit />
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(product.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition"
                      >
                        <FaTrash />
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default MyProducts;