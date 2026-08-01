import {
  FaTrash,
  FaUserTie,
} from "react-icons/fa";

import EmptyState from "../Common/EmptyState";

function ProductsTable({
  products,
  onDelete,
}) {
    if (products.length === 0) {
      return (
        <EmptyState
          title="No Products Found"
          description="Products added by sellers will appear here."
        />
      );
    }

  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-5 text-left">
              Product
            </th>

            <th className="px-6 py-5 text-left">
              Seller
            </th>

            <th className="px-6 py-5 text-left">
              Category
            </th>

            <th className="px-6 py-5 text-left">
              Brand
            </th>

            <th className="px-6 py-5 text-left">
              Price
            </th>

            <th className="px-6 py-5 text-left">
              Stock
            </th>

            <th className="px-6 py-5 text-center">
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

              {/* Product */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-2xl object-cover shadow"
                  />

                  <div>

                    <h3 className="font-bold text-lg">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Product ID #{product.id}
                    </p>

                  </div>

                </div>

              </td>

              {/* Seller */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-2">

                  <FaUserTie className="text-blue-600" />

                  <span className="font-medium">
                    {product.seller_name}
                  </span>

                </div>

              </td>

              {/* Category */}

              <td className="px-6 py-5">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                  {product.category}

                </span>

              </td>

              {/* Brand */}

              <td className="px-6 py-5">
                {product.brand}
              </td>

              {/* Price */}

              <td className="px-6 py-5">

                <span className="text-xl font-bold text-green-600">

                  ₹{product.price}

                </span>

              </td>

              {/* Stock */}

              <td className="px-6 py-5">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.stock > 10
                      ? "bg-green-100 text-green-700"
                      : product.stock > 0
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock > 0
                    ? product.stock
                    : "Out of Stock"}
                </span>

              </td>

              {/* Action */}

              <td className="px-6 py-5 text-center">

                <button
                  onClick={() =>
                    onDelete(product.id)
                  }
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
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
  );
}

export default ProductsTable;