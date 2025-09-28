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

    updateUserRoleMutation({ userId, role: newRole }, {
      onSuccess: () => {
        getAllUserMutation();
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">User Role Management</h2>

      {isGettingUsers && <p>Loading users...</p>}

      {!isGettingUsers && isSuccess && data?.users?.length > 0 && (
        <div className="space-y-2">
          {data.users.map((user) => (
            <div
              key={user._id}
              className="rounded-md border bg-white p-4 shadow-sm"
            >
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Current Role:</strong> {user.role}</p>
              <p><strong>Phone:</strong> {user.number}</p>

              <div className="mt-3 space-x-2">
                <select
                  value={selectedRoles[user._id] || user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="rounded border p-2"
                >
                  <option value="Employee">Employee</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>

                <button
                  onClick={() => handleSubmitRole(user._id)}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Submit Role"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isGettingUsers && isSuccess && data?.users?.length === 0 && (
        <p>No users found.</p>
      )}
    </div>
  );
}
