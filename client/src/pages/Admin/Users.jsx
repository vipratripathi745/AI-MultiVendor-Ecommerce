import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUsers } from "react-icons/fa";

import {
  getUsers,
  updateRole,
  deleteUser,
} from "../../services/userService";

import UsersTable from "../../components/Admin/UsersTable";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(response.users);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleRole = async (id, role) => {
    try {
      const response = await updateRole(id, role);

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
    if (!window.confirm("Delete this user?")) return;

    try {
      const response = await deleteUser(id);

      toast.success(response.message);

      fetchUsers();
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

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold flex items-center gap-4">

              <FaUsers className="text-blue-600" />

              User Management

            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Manage all registered users and their roles.
            </p>

          </div>

          <div className="bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-lg">

            <p className="text-sm uppercase">
              Total Users
            </p>

            <h2 className="text-3xl font-bold">
              {users.length}
            </h2>

          </div>

        </div>

        {/* Users Table */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <UsersTable
            users={users}
            onRoleChange={handleRole}
            onDelete={handleDelete}
          />

        </div>

      </div>

    </div>
  );
}

export default Users;