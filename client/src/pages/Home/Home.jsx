import { useEffect, useState } from "react";
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

      console.log(data);

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">

          <h1 className="text-5xl font-bold mb-6">
            Welcome to AI Shop
          </h1>

          <p className="text-xl mb-8 max-w-2xl">
            Discover thousands of products at the best prices.
            Fast delivery, secure payments and amazing offers.
          </p>

          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Shop Now
          </button>

        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold mb-8">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white shadow rounded-xl p-8 text-center hover:shadow-lg transition cursor-pointer">
            Electronics
          </div>

          <div className="bg-white shadow rounded-xl p-8 text-center hover:shadow-lg transition cursor-pointer">
            Fashion
          </div>

          <div className="bg-white shadow rounded-xl p-8 text-center hover:shadow-lg transition cursor-pointer">
            Shoes
          </div>

          <div className="bg-white shadow rounded-xl p-8 text-center hover:shadow-lg transition cursor-pointer">
            Accessories
          </div>

        </div>

      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold mb-8">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <p className="text-gray-500 text-lg">
              No products found.
            </p>
          )}

        </div>

      </section>
    </>
  );
}

export default Home;