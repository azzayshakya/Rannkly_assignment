import { useEffect, useState } from "react";
import { useGetAllUserMutation } from "@/pages/hooks/useGetAllUser";
import { useCreateTaskMutation } from "../hooks/useSubmitTaskForm";
import { useDefineTaskForm } from "../hooks/useDefineTaskForm";


export default function CreateTaskForm() {
  const { form, errors } = useDefineTaskForm();
  const { submitTaskMutation, isSubmitting } = useCreateTaskMutation();

  const { getAllUserMutation, isSuccess, data } = useGetAllUserMutation();
  const [userEmails, setUserEmails] = useState([]);

  useEffect(() => {
    getAllUserMutation();
  }, [getAllUserMutation]);

  useEffect(() => {
    if (isSuccess && data?.users) {
      const emails = data.users.map((user) => user.email);
      setUserEmails(emails);
    }
  }, [isSuccess, data]);

  const onSubmit = (formData) => {
    submitTaskMutation(formData);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Task</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Title</label>
          <input
            {...form.register("title")}
            type="text"
            className="w-full rounded border p-2"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            {...form.register("description")}
            className="w-full rounded border p-2"
          ></textarea>
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600">Priority</label>
          <select
            {...form.register("priority")}
            className="w-full rounded border p-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && (
            <p className="text-sm text-red-500">{errors.priority.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600">Due Date</label>
          <input
            {...form.register("dueDate")}
            type="date"
            className="w-full rounded border p-2"
          />
          {errors.dueDate && (
            <p className="text-sm text-red-500">{errors.dueDate.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600">Assign To</label>
          <select
            {...form.register("assignedTo")}
            className="w-full rounded border p-2"
          >
            <option value="">-- Select User --</option>
            {userEmails.map((email) => (
              <option key={email} value={email}>
                {email}
              </option>
            ))}
          </select>
          {errors.assignedTo && (
            <p className="text-sm text-red-500">{errors.assignedTo.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
