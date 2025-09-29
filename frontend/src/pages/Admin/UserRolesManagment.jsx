import { useEffect, useState } from "react";
import { useGetAllUserMutation } from "../hooks/useGetAllUser";
import { useUpdateUserRoleMutation } from "../hooks/useUpdateUserRole";

export default function UserRolesManagement() {
  const { getAllUserMutation, isGettingUsers, isSuccess, data } =
    useGetAllUserMutation();

  const { updateUserRoleMutation, isUpdating } = useUpdateUserRoleMutation();

  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    getAllUserMutation();
  }, [getAllUserMutation]);

  const handleRoleChange = (userId, newRole) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleSubmitRole = (userId) => {
    const newRole = selectedRoles[userId];
    if (!newRole) return;

    updateUserRoleMutation(
      { userId, role: newRole },
      {
        onSuccess: () => {
          getAllUserMutation();
        },
      }
    );
  };

  if (isGettingUsers)
    return <p className="text-center mt-10 text-gray-500">Loading users...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        User Role Management
      </h2>

      {isSuccess && data?.users?.length > 0 ? (
        <div className="space-y-6">
          {data.users.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow rounded-lg p-6 border hover:shadow-lg transition"
            >
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Phone:</strong> {user.number || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Current Role:</strong> {user.role}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={selectedRoles[user._id] || user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>

                <button
                  onClick={() => handleSubmitRole(user._id)}
                  disabled={isUpdating}
                  className={`px-4 py-2 text-white font-semibold rounded transition ${
                    isUpdating
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isUpdating ? "Updating..." : "Submit Role"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        isSuccess && <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
}
