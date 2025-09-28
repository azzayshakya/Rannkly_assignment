import { z } from "zod";

export const TaskFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(5, { message: "Description is too short" }),
  priority: z.enum(["Low", "Medium", "High"], { required_error: "Priority is required" }),
  dueDate: z.string().nonempty("Due date is required"),
  assignedTo: z.string().email("Please select a valid user"),
});
