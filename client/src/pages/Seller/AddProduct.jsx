import {
  FaBoxOpen,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import Sidebar from "../../components/Seller/Sidebar";
import ProductForm from "../../components/Seller/ProductForm";

function AddProduct() {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Add Product
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Create a new product for your store.
            </p>

          </div>

          <Link
            to="/seller/products"
            className="mt-5 md:mt-0 inline-flex items-center gap-2 bg-white hover:bg-gray-50 border px-6 py-3 rounded-xl shadow transition"
          >
            <FaArrowLeft />
            Back to Products
          </Link>

        </div>

        {/* Form */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="flex items-center gap-4 px-8 py-6 border-b bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaBoxOpen className="text-3xl" />

            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Product Information
              </h2>

              <p className="text-blue-100">
                Fill all product details carefully.
              </p>

            </div>

          </div>

          <div className="p-8">

            <ProductForm />

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddProduct;