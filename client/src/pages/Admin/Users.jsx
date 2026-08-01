import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

import {
  getUsers,
  updateRole,
  deleteUser,
} from "../../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(response.users);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRole = async (
    id,
    role
  ) => {
    try {
      const response = await updateRole(
        id,
        role
      );

      toast.success(response.message);

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update role"
      );
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this user?"
      )
    )
      return;

    try {
      const response =
        await deleteUser(id);

      toast.success(response.message);

      setUsers((prev) =>
        prev.filter(
          (user) => user.id !== id
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Loading Users...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Manage Users
        </h1>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left">
                    Change Role
                  </th>

                  <th className="px-6 py-4 text-left">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.map((user) => (

                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-6 py-5 font-semibold">
                      {user.name}
                    </td>

                    <td className="px-6 py-5">
                      {user.email}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-700"
                            : user.role ===
                              "seller"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.role}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRole(
                            user.id,
                            e.target.value
                          )
                        }
                        className="border rounded-lg px-3 py-2"
                      >

                        <option value="customer">
                          Customer
                        </option>

                        <option value="seller">
                          Seller
                        </option>

                        <option value="admin">
                          Admin
                        </option>

                      </select>

                    </td>

                    <td className="px-6 py-5">

                      <button
                        onClick={() =>
                          handleDelete(
                            user.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition"
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

        </div>

      </div>

    </div>
  );
}

export default Users;