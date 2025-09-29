import { useAssignedTasks } from "./hooks/useEmpAssignedTasks";

const statusColors = {
  Pending: "bg-yellow-500",
  InProgress: "bg-blue-500",
  Completed: "bg-green-600",
};

const priorityColors = {
  Low: "bg-green-500",
  Medium: "bg-orange-500",
  High: "bg-red-600",
};

const EmployeeAssignedTasksPage = () => {
  const { data: tasks, isLoading } = useAssignedTasks();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Tasks Assigned to You
      </h2>

      {tasks?.length === 0 ? (
        <p className="text-center text-gray-600">No tasks assigned</p>
      ) : (
        <div className="space-y-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {task.title}
              </h3>
              <p className="text-gray-700 mb-6">{task.description}</p>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-gray-600">Status:</dt>
                  <dd>
                    <span
                      className={`inline-block px-2 py-1 text-white text-xs rounded ${
                        statusColors[task.status] || "bg-gray-400"
                      }`}
                    >
                      {task.status}
                    </span>
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-gray-600">Priority:</dt>
                  <dd>
                    <span
                      className={`inline-block px-2 py-1 text-white text-xs rounded ${
                        priorityColors[task.priority] || "bg-gray-400"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-gray-600">Due Date:</dt>
                  <dd className="text-gray-800">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-gray-600">Created By:</dt>
                  <dd className="text-gray-800">{task.createdBy}</dd>
                </div>

                <div>
                  <dt className="font-semibold text-gray-600">Assigned To:</dt>
                  <dd className="text-gray-800">{task.assignedTo}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeAssignedTasksPage;
