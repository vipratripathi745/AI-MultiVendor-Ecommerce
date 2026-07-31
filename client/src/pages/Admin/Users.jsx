import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getUsers,
  updateRole,
  deleteUser,
} from "../../services/userService";

import UsersTable from "../../components/Admin/UsersTable";

function Users() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const response =
        await getUsers();

      setUsers(response.users);

    } catch (error) {

      toast.error(
        "Failed to fetch users"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleRole = async (
    id,
    role
  ) => {

    try {

      const response =
        await updateRole(id, role);

      toast.success(
        response.message
      );

      fetchUsers();

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message
      );

    }

  };

  const handleDelete = async (
    id
  ) => {

    if (
      !window.confirm(
        "Delete this user?"
      )
    )
      return;

    try {

      const response =
        await deleteUser(id);

      toast.success(
        response.message
      );

      fetchUsers();

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message
      );

    }

  };

  if (loading)
    return (
      <h1 className="text-center text-3xl py-20">
        Loading...
      </h1>
    );

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-10">

        User Management

      </h1>

      <UsersTable
        users={users}
        onRoleChange={
          handleRole
        }
        onDelete={
          handleDelete
        }
      />

    </div>
  );
}

export default Users;