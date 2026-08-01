import {
  FaTrash,
  FaUserShield,
  FaUserTie,
  FaUser,
} from "react-icons/fa";

function UsersTable({
  users,
  onRoleChange,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-5 text-left font-bold">
              User
            </th>

            <th className="px-6 py-5 text-left font-bold">
              Email
            </th>

            <th className="px-6 py-5 text-left font-bold">
              Phone
            </th>

            <th className="px-6 py-5 text-left font-bold">
              Role
            </th>

            <th className="px-6 py-5 text-center font-bold">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b hover:bg-gray-50 transition"
            >

              {/* User */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">

                    {user.role === "admin" ? (
                      <FaUserShield />
                    ) : user.role === "seller" ? (
                      <FaUserTie />
                    ) : (
                      <FaUser />
                    )}

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">
                      {user.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      ID #{user.id}
                    </p>

                  </div>

                </div>

              </td>

              {/* Email */}

              <td className="px-6 py-5 text-gray-700">
                {user.email}
              </td>

              {/* Phone */}

              <td className="px-6 py-5">
                {user.phone || "-"}
              </td>

              {/* Role */}

              <td className="px-6 py-5">

                <select
                  value={user.role}
                  onChange={(e) =>
                    onRoleChange(
                      user.id,
                      e.target.value
                    )
                  }
                  className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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

              {/* Action */}

              <td className="px-6 py-5 text-center">

                <button
                  onClick={() =>
                    onDelete(user.id)
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

export default UsersTable;