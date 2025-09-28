import { useEffect } from "react";
import { useGetAllUserMutation } from "../hooks/useGetAllUser";

export default function UserRolesManagement() {
  const { getAllUserMutation, isGettingUsers, isSuccess, data } =
    useGetAllUserMutation();

  useEffect(() => {
    getAllUserMutation();
  }, [getAllUserMutation]);

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
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Phone:</strong> {user.number}
              </p>
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
