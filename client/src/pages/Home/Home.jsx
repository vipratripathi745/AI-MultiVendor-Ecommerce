import { useEffect, useState } from "react";
import {
  FaShippingFast,
  FaShieldAlt,
  FaUndoAlt,
  FaHeadset,
} from "react-icons/fa";

import ProductCard from "../../components/ProductCard/ProductCard";
import { getAllProducts } from "../../services/productService";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const categories = [
    "Electronics",
    "Fashion",
    "Shoes",
    "Accessories",
    "Laptop",
    "Mobile",
  ];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 items-center gap-10">

          <div>

            <span className="bg-white text-blue-700 px-4 py-2 rounded-full font-semibold">
              🔥 Biggest Sale of the Year
            </span>

            <h1 className="text-6xl font-extrabold mt-8 leading-tight">

              Shop Smarter

              <br />

              Live Better

            </h1>

            <p className="mt-8 text-xl text-blue-100">

              Buy premium electronics, fashion,
              accessories and much more with
              exclusive discounts.

            </p>

            <button className="mt-10 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition">

              Shop Now

            </button>

          </div>

          <div className="hidden lg:flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
              alt="Hero"
              className="rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      </section>

      {/* CATEGORY */}

      <section className="max-w-7xl mx-auto py-16 px-6">

        <h2 className="text-4xl font-bold mb-10 text-center">

          Shop by Category

        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((item) => (

            <div
              key={item}
              className="bg-white rounded-2xl shadow-md p-8 text-center font-semibold hover:bg-blue-600 hover:text-white hover:-translate-y-2 transition duration-300 cursor-pointer"
            >

              {item}

            </div>

          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">

            <FaShippingFast className="text-5xl mx-auto text-blue-600" />

            <h3 className="font-bold text-xl mt-5">
              Free Shipping
            </h3>

            <p className="mt-2 text-gray-500">
              On all orders above ₹999
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">

            <FaShieldAlt className="text-5xl mx-auto text-green-600" />

            <h3 className="font-bold text-xl mt-5">
              Secure Payment
            </h3>

            <p className="mt-2 text-gray-500">
              100% safe transactions
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">

            <FaUndoAlt className="text-5xl mx-auto text-red-500" />

            <h3 className="font-bold text-xl mt-5">
              Easy Returns
            </h3>

            <p className="mt-2 text-gray-500">
              7 Days return policy
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">

            <FaHeadset className="text-5xl mx-auto text-purple-600" />

            <h3 className="font-bold text-xl mt-5">
              24×7 Support
            </h3>

            <p className="mt-2 text-gray-500">
              Always here to help
            </p>

          </div>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-4xl font-bold">
            Featured Products
          </h2>

          <button className="text-blue-600 font-semibold">
            View All →
          </button>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;