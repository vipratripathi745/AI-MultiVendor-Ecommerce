function UsersTable({
  users,
  onRoleChange,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="text-left">
              Email
            </th>

            <th className="text-left">
              Phone
            </th>

            <th className="text-left">
              Role
            </th>

            <th className="text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-t"
            >

              <td className="p-4">
                {user.name}
              </td>

              <td>
                {user.email}
              </td>

              <td>
                {user.phone}
              </td>

              <td>

                <select
                  value={user.role}
                  onChange={(e) =>
                    onRoleChange(
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

              <td className="text-center">

                <button
                  onClick={() =>
                    onDelete(user.id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
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