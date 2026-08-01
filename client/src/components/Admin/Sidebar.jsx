import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
} from "react-icons/fa";

function Sidebar() {
  const menus = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaChartPie />,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: <FaBoxOpen />,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: <FaShoppingCart />,
    },
  ];

  return (
    <div className="w-72 bg-gray-900 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        Admin Panel
      </h1>

      <div className="space-y-3">

        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            {menu.icon}
            {menu.title}
          </NavLink>
        ))}

      </div>

    </div>
  );
}

export default Sidebar;