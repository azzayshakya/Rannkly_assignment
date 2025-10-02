import { useEffect, useState } from "react";
import { useCreatedTasks } from "./hooks/useEmpCreatedTasks.js";
import { useDeleteTask } from "./hooks/useEmpDeleteTask.js";
import { useUpdateTask } from "./hooks/useEmpUpdateTask.js";
import { useDefineEmpCreatedTask } from "./hooks/useDefineEmpCreatedTaskForm.js";
import { useGetAllEmployeeExceptCurrentMutation } from "../hooks/useGetAllEmployeeExceptCurrent.js";

const EmployeeCreatedTasksPage = () => {
  const { data: tasks, isLoading } = useCreatedTasks();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const {
    getAllEmployeeExceptCurrentMutation,
    employeeExceptCurrentData,
    isSuccessWhileGettingEmployeeExceptCurrent,
  } = useGetAllEmployeeExceptCurrentMutation();

  useEffect(() => {
    getAllEmployeeExceptCurrentMutation();
  }, [getAllEmployeeExceptCurrentMutation]);

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (employeeExceptCurrentData?.data) {
      setEmployees(employeeExceptCurrentData.data);
    }
  }, [employeeExceptCurrentData]);

  const [editingTaskId, setEditingTaskId] = useState(null);

  const { form, errors } = useDefineEmpCreatedTask();
  const { register, handleSubmit, reset } = form;

  if (isLoading)
    return <p className="mt-10 text-center text-gray-500">Loading...</p>;

  const handleEditClick = (task) => {
    console.log("task", task);
    setEditingTaskId(task._id);
    reset({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo?._id || "",
      dueDate: task.dueDate?.split("T")[0] || "",
    });
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    reset();
  };

  const onSubmit = (data) => {
    updateTask.mutate({ id: editingTaskId, updatedData: data });
    setEditingTaskId(null);
    reset();
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-700">
                    Title
                  </label>
                  <input
                    {...register("title")}
                    className="w-full rounded-md border px-3 py-2"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full resize-none rounded-md border px-3 py-2"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Priority
                  </label>
                  <select
                    {...register("priority")}
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Assign To
                  </label>
                  <select
                    {...register("assignedTo")}
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="">Select Employee</option>
                    {employees?.map((emp) => (
                      <option key={emp._id} value={emp.email}>
                        {emp.name} ({emp.email})
                      </option>
                    ))}
                  </select>
                  {errors.assignedTo && (
                    <p className="text-sm text-red-500">
                      {errors.assignedTo.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700">
                    Due Date
                  </label>
                  <input
                    type="date"
                    {...register("dueDate")}
                    className="w-full rounded-md border px-3 py-2"
                  />
                  {errors.dueDate && (
                    <p className="text-sm text-red-500">
                      {errors.dueDate.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={updateTask.isLoading}
                    className={`flex-1 rounded-md px-4 py-2 font-semibold text-white ${
                      updateTask.isLoading
                        ? "cursor-not-allowed bg-green-300"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {updateTask.isLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 rounded-md bg-gray-500 px-4 py-2 font-semibold text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
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
                    <dd className="text-gray-800">
                      {task.assignedTo || "Unassigned"}
                    </dd>
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
                    className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="flex-1 rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
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
