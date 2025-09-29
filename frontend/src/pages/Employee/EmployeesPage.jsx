import { useEffect } from "react";
import { useGetAllEmployeesMutation } from "../hooks/useGetAllEmployeesMutation";

export default function EmployeesPage() {
  const {
    getAllEmployeesMutation,
    data: employees,
    isGettingEmployees,
    isError,
    error,
  } = useGetAllEmployeesMutation();

  useEffect(() => {
    getAllEmployeesMutation(); 
  }, [getAllEmployeesMutation]);

  if (isGettingEmployees)
    return <p className="mt-6 text-center">Loading employees...</p>;
  if (isError)
    return (
      <p className="mt-6 text-center text-red-500">Error: {error.message}</p>
    );
  if (!employees || employees.length === 0)
    return <p className="mt-6 text-center">No employees found</p>;

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-center text-2xl font-bold">Employees</h2>
      <ul className="space-y-3">
        {employees.map((emp) => (
          <li key={emp._id} className="rounded border bg-gray-50 p-3">
            <p className="font-semibold">{emp.name}</p>
            <p className="text-sm text-gray-600">{emp.email}</p>
            <span className="text-xs text-gray-500">Role: {emp.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
