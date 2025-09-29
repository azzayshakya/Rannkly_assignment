import { useEffect } from "react";
import { useGetAllTasksMutation } from "../hooks/useGetAllTasks";

export default function AllTasksPage() {
  const {
    getAllTasksMutation,
    isGettingTasks,
    isError,
    error,
    data: tasks,
  } = useGetAllTasksMutation();

  useEffect(() => {
    getAllTasksMutation();
  }, [getAllTasksMutation]);

  if (isGettingTasks)
    return <p className="mt-6 text-center">Loading tasks...</p>;
  if (isError)
    return (
      <p className="mt-6 text-center text-red-500">Error: {error.message}</p>
    );
  if (!tasks || tasks.length === 0)
    return <p className="mt-6 text-center">No tasks found</p>;

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-center text-2xl font-bold">All Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="rounded-lg border bg-gray-50 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500">
                  Priority: <span className="font-medium">{task.priority}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Status: <span className="font-medium">{task.status}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Assigned To: {task.assignedTo?.name} ({task.assignedTo?.email}
                  )
                </p>
                <p className="text-xs text-gray-500">
                  Created By: {task.createdBy?.name} ({task.createdBy?.email})
                </p>
                <p className="text-xs text-gray-400">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
