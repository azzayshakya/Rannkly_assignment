import { useEffect } from "react";
import { useGetAllEmployeesAndManagersMutation } from "../hooks/useGetAllEmployeesAndManagersMutation";

export default function EmployeesManagersPage() {
  const {
    getAllEmployeesAndManagersMutation,
    data: users,
    isGettingUsers,
    isError,
    error,
  } = useGetAllEmployeesAndManagersMutation();

  useEffect(() => {
    getAllEmployeesAndManagersMutation(); 
  }, [getAllEmployeesAndManagersMutation]);

  if (isGettingUsers)
    return <p className="mt-6 text-center">Loading employees & managers...</p>;
  if (isError)
    return (
      <p className="mt-6 text-center text-red-500">Error: {error.message}</p>
    );
  if (!users || users.length === 0)
    return <p className="mt-6 text-center">No employees/managers found</p>;

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Employees & Managers
      </h2>
      <ul className="space-y-3">
        {users.map((u) => (
          <li key={u._id} className="rounded border bg-gray-50 p-3">
            <p className="font-semibold">{u.name}</p>
            <p className="text-sm text-gray-600">{u.email}</p>
            <span className="text-xs text-gray-500">Role: {u.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
