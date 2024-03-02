import { User } from "../lib/definitions";

type Props = {
    users: [],
    blockedUsers: string[],
    handleBlockedUsers: (param: string) => void,
}

export default function UserTable ({users, blockedUsers, handleBlockedUsers} : Props) {
    return (
        <table className="w-full">
        <thead>
          <tr>
            <th className="w-1/2 t-row">Full Name</th>
            <th className="w-1/2 t-row">Options</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: User) => (
            <tr key={user.id}>
              <td className="t-row text-center">
                {user.firstName} {user.lastName}
              </td>
              <td className="t-row">
                <div className="flex items-center justify-center gap-3">
                  <button className="btn">Details</button>
                  <button
                    className={`btn ${
                      blockedUsers.includes(user.id)
                        ? "bg-red-400 hover:bg-red-500"
                        : "bg-green-500 hover:bg-green-600"
                    } `}
                    onClick={() => handleBlockedUsers(user.id)}
                  >
                    {blockedUsers.includes(user.id) ? "Unblock" : "Block"}
                  </button>
                  <button className="btn bg-red-500 hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}