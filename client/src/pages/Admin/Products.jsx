import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      <div className="text-center py-20 text-3xl">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          Product Management
        </h1>

        <span className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          Total Products : {products.length}
        </span>

      </div>

      <ProductsTable
        products={products}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default Products;