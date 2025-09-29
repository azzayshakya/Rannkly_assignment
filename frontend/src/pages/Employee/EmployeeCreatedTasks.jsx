import React, { useState } from "react";
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

  if (isLoading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

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
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Tasks You Created
      </h2>

      {tasks?.length === 0 ? (
        <p className="text-center text-gray-500">No tasks created</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white shadow-md rounded-lg p-6 mb-6 transition-shadow hover:shadow-lg"
          >
            {editingTaskId === task._id ? (
              <>
                {/* Title */}
                <div className="mb-4">
                  <label className="block mb-1 font-semibold text-gray-700" htmlFor="title">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    autoFocus
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block mb-1 font-semibold text-gray-700" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Status */}
                <div className="mb-4">
                  <label className="block mb-1 font-semibold text-gray-700" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Priority */}
                <div className="mb-6">
                  <label className="block mb-1 font-semibold text-gray-700" htmlFor="priority">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
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
                    className={`flex-1 px-4 py-2 font-semibold text-white rounded-md ${
                      updateTask.isLoading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    } transition`}
                  >
                    {updateTask.isLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={updateTask.isLoading}
                    className="flex-1 px-4 py-2 font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h3>
                <p className="text-gray-700 mb-3">{task.description}</p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Created by:</span> {task.createdBy}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Assigned to:</span> {task.assignedTo}
                </p>

                <p className="mb-1">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 text-white text-sm rounded ${
                      statusColors[task.status] || "bg-gray-400"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>

                <p className="mb-4">
                  <span className="font-semibold">Priority:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 text-white text-sm rounded ${
                      priorityColors[task.priority] || "bg-gray-400"
                    }`}
                  >
                    {task.priority}
                  </span>
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="flex-1 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="flex-1 px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeCreatedTasksPage;
