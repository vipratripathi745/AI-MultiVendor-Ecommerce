function RecentUsers({ users }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        Recent Users
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="py-3 text-left">
              Name
            </th>

            <th className="text-left">
              Email
            </th>

            <th className="text-left">
              Role
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b"
            >

              <td className="py-3">
                {user.name}
              </td>

              <td>
                {user.email}
              </td>

              <td className="capitalize">
                {user.role}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentUsers;