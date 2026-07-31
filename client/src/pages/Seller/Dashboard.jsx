import Sidebar from "../../components/Seller/Sidebar";

function Dashboard() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold">
          Seller Dashboard
        </h1>

        <p className="mt-3 text-gray-600">
          Welcome to your seller dashboard.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;