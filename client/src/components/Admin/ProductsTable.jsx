function ProductsTable({
  products,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4">Image</th>

            <th>Name</th>

            <th>Seller</th>

            <th>Category</th>

            <th>Brand</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-4">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover mx-auto"
                />

              </td>

              <td className="font-semibold">
                {product.name}
              </td>

              <td>
                {product.seller_name}
              </td>

              <td>
                {product.category}
              </td>

              <td>
                {product.brand}
              </td>

              <td className="text-blue-600 font-semibold">
                ₹{product.price}
              </td>

              <td>

                {product.stock > 0 ? (
                  <span className="text-green-600 font-semibold">
                    {product.stock}
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Out of Stock
                  </span>
                )}

              </td>

              <td>

                <button
                  onClick={() =>
                    onDelete(product.id)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {products.length === 0 && (

        <div className="text-center py-10 text-gray-500">

          No Products Found

        </div>

      )}

    </div>
  );
}

export default ProductsTable;