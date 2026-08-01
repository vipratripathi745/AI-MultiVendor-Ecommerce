import { useEffect, useMemo, useState } from "react";
import {
  FaShippingFast,
  FaShieldAlt,
  FaUndoAlt,
  FaHeadset,
} from "react-icons/fa";

import ProductCard from "../../components/ProductCard/ProductCard";
import SkeletonCard from "../../components/Loading/SkeletonCard";
import EmptyState from "../../components/Common/EmptyState";
import SortDropdown from "../../components/Home/SortDropdown";
import Pagination from "../../components/Home/Pagination";

import { getAllProducts } from "../../services/productService";
import { useSearch } from "../../context/SearchContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 8;

  const {
    search,
    category,
    setCategory,
    sortBy,
  } = useSearch();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const data = await getAllProducts();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Shoes",
    "Accessories",
    "Laptop",
    "Mobile",
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search

    const keyword = search.toLowerCase();

    filtered = filtered.filter((product) => {
      return (
        product.name
          ?.toLowerCase()
          .includes(keyword) ||
        product.brand
          ?.toLowerCase()
          .includes(keyword) ||
        product.category
          ?.toLowerCase()
          .includes(keyword)
      );
    });

    // Category

    if (category !== "All") {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() ===
          category.toLowerCase()
      );
    }

    // Sorting

    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        filtered.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        );
        break;

      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.created_at) -
            new Date(b.created_at)
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [
    products,
    search,
    category,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-10 items-center">

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

              Buy premium electronics,
              fashion, accessories and
              much more with exclusive
              discounts.

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

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold text-center mb-10">

          Shop by Category

        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">

          {categories.map((item) => (

            <button
              key={item}
              onClick={() =>
                setCategory(item)
              }
              className={`rounded-2xl shadow-md p-6 font-semibold transition duration-300 hover:-translate-y-2

                ${
                  category === item
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-600 hover:text-white"
                }`}
            >
              {item}
            </button>

          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-10">

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

              100% Safe Payment

            </p>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">

            <FaUndoAlt className="text-5xl mx-auto text-red-500" />

            <h3 className="font-bold text-xl mt-5">

              Easy Returns

            </h3>

            <p className="mt-2 text-gray-500">

              7 Days Return Policy

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

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-5">

          <h2 className="text-4xl font-bold">

            Featured Products

          </h2>

          <SortDropdown />

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {loading ? (

            [...Array(8)].map(
              (_, index) => (
                <SkeletonCard
                  key={index}
                />
              )
            )

          ) : filteredProducts.length >
            0 ? (

            currentProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )

          ) : (

            <div className="col-span-full">

              <EmptyState
                title="No Products Found"
                description={`No products match "${search}"`}
                buttonText="Clear Search"
                buttonLink="/"
              />

            </div>

          )}

        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </section>

    </div>
  );
}

export default Home;