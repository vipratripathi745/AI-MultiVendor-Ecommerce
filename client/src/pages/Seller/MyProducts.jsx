import Sidebar from "../../components/Seller/Sidebar";

function MyProducts() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Products
        </h1>

        <p className="text-gray-600">
          Your uploaded products will appear here.
        </p>

      </div>

    </div>
  );
}

export default MyProducts;