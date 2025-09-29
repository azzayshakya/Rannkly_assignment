import { useEffect, useState } from "react";
import { useManagerTasks } from "./hooks/useManagerTasks";
import { useManagerUpdateTask } from "./hooks/useManagerUpdateTask";
import { useManagerDeleteTask } from "./hooks/useManagerDeleteTask";
import { useGetAllUserMutation } from "../hooks/useGetAllUser";

const ManagerAllTasksManagementPage = () => {
  const { data: tasks, isLoading } = useManagerTasks();
  const updateTask = useManagerUpdateTask();
  const deleteTask = useManagerDeleteTask();

  const {
    getAllUserMutation,
    data: userData,
    isSuccess: usersFetched,
  } = useGetAllUserMutation();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUserMutation();
  }, [getAllUserMutation]);

  useEffect(() => {
    if (usersFetched && userData?.users) {
      setUsers(userData.users);
    }
  }, [usersFetched, userData]);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    assignedTo: "",
    dueDate: "",
  });

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo || "",
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
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

  const getUserById = (id) => users.find((u) => u._id === id);

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

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        All Tasks Management
      </h2>

      {tasks?.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        tasks.map((task) => {
          const assignedUser = getUserById(task.assignedTo);
          const createdByUser = getUserById(task.createdBy);

          return (
            <div
              key={task._id}
              className="bg-white shadow rounded-lg p-6 mb-6 border hover:shadow-lg transition"
            >
              {editingTaskId === task._id ? (
                <>
                  {/* Edit Mode */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="Pending">Pending</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Priority
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Assigned To
                      </label>
                      <select
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">-- Select User --</option>
                        {users.map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.name} ({user.email})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Due Date
                      </label>
                      <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSave(task._id)}
                      disabled={updateTask.isLoading}
                      className={`flex-1 px-4 py-2 text-white font-semibold rounded ${
                        updateTask.isLoading
                          ? "bg-green-300 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {updateTask.isLoading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-4 py-2 text-white font-semibold bg-gray-500 hover:bg-gray-600 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* View Mode */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {task.title}
                  </h3>
                  <p className="text-gray-700 mb-3">{task.description}</p>
                  <p className="text-gray-600 mb-1">
                    <strong>Created by:</strong>{" "}
                    {createdByUser
                      ? `${createdByUser.name} (${createdByUser.email})`
                      : "Unknown"}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Assigned to:</strong>{" "}
                    {assignedUser
                      ? `${assignedUser.name} (${assignedUser.email})`
                      : "Unknown"}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-1 text-sm text-white rounded ${
                        statusColors[task.status] || "bg-gray-400"
                      }`}
                    >
                      {task.status}
                    </span>
                  </p>
                  <p className="mb-1">
                    <strong>Priority:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-1 text-sm text-white rounded ${
                        priorityColors[task.priority] || "bg-gray-400"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </p>
                  {task.dueDate && (
                    <p className="mb-4">
                      <strong>Due:</strong>{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 font-semibold rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ManagerAllTasksManagementPage;
