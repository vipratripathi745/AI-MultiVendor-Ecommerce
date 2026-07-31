import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaBoxOpen,
  FaShoppingBag,
} from "react-icons/fa";

function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/seller/dashboard",
    },
    {
      name: "Add Product",
      icon: <FaPlus />,
      path: "/seller/add-product",
    },
    {
      name: "My Products",
      icon: <FaBoxOpen />,
      path: "/seller/products",
    },
    {
      name: "Orders",
      icon: <FaShoppingBag />,
      path: "/seller/orders",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">

      <div className="text-center py-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold">
          Seller Panel
        </h2>
      </div>

      <nav className="mt-6">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 hover:bg-slate-800 transition ${
                isActive ? "bg-blue-600" : ""
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;