import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBoxOpen } from "react-icons/fa";

import {
  getAdminProducts,
  deleteAdminProduct,
} from "../../services/adminProductService";

import ProductsTable from "../../components/Admin/ProductsTable";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAdminProducts();

      setProducts(response.products);
    } catch (error) {
      console.error(error);

      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteAdminProduct(id);

      toast.success(response.message);

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete product"
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

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold flex items-center gap-4">

              <FaBoxOpen className="text-green-600" />

              Product Management

            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              View, monitor and manage all products across the platform.
            </p>

          </div>

          <div className="mt-5 md:mt-0 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-lg">

            <p className="text-sm uppercase tracking-wide">
              Total Products
            </p>

            <h2 className="text-3xl font-bold">
              {products.length}
            </h2>

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <ProductsTable
            products={products}
            onDelete={handleDelete}
          />

        </div>

      </div>

    </div>
  );
}

export default Products;