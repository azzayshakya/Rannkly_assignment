import { useState } from "react";
import { useCreatedTasks } from "./hooks/useEmpCreatedTasks.js";
import { useDeleteTask } from "./hooks/useEmpDeleteTask.js";
import { useUpdateTask } from "./hooks/useEmpUpdateTask.js";

const EmployeeCreatedTasksPage = () => {
  const { data: tasks, isLoading } = useCreatedTasks();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
  });

  if (isLoading)
    return <p className="mt-10 text-center text-gray-500">Loading...</p>;

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEditingTaskId(null);
  };

  const handleSave = (taskId) => {
    updateTask.mutate({ id: taskId, updatedData: formData });
    setEditingTaskId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask.mutate(id);
    }
  };

  const statusColors = {
    Pending: "bg-yellow-400",
    InProgress: "bg-blue-600",
    Completed: "bg-green-600",
  };

  const priorityColors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-600",
  };

  return (
    <div className="mx-auto max-w-3xl p-4 font-sans">
      <h2 className="mb-8 text-center text-3xl font-semibold text-gray-800">
        Tasks You Created
      </h2>

      {tasks?.length === 0 ? (
        <p className="text-center text-gray-500">No tasks created</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="mb-6 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
          >
            {editingTaskId === task._id ? (
              <>
                <div className="mb-4">
                  <label
                    className="mb-1 block font-semibold text-gray-700"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    autoFocus
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="mb-1 block font-semibold text-gray-700"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="mb-1 block font-semibold text-gray-700"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    className="mb-1 block font-semibold text-gray-700"
                    htmlFor="priority"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleSave(task._id)}
                    disabled={updateTask.isLoading}
                    className={`flex-1 rounded-md px-4 py-2 font-semibold text-white ${
                      updateTask.isLoading
                        ? "cursor-not-allowed bg-green-300"
                        : "bg-green-600 hover:bg-green-700"
                    } transition`}
                  >
                    {updateTask.isLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={updateTask.isLoading}
                    className="flex-1 rounded-md bg-gray-500 px-4 py-2 font-semibold text-white transition hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  {task.title}
                </h3>
                <p className="mb-6 text-gray-700">{task.description}</p>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-gray-600">
                      Assigned to:
                    </dt>
                    <dd className="text-gray-800">{task.assignedTo}</dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-gray-600">Status:</dt>
                    <dd>
                      <span
                        className={`text-xs inline-block rounded px-2 py-1 text-white ${
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
                        className={`text-xs inline-block rounded px-2 py-1 text-white ${
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
                </dl>

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="flex-1 rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeCreatedTasksPage;
