import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormSchema } from "../constants/TaskFormValidation";

export const useDefineTaskForm = () => {
  const form = useForm({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  return { form, errors };
};
