import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormSchema } from "@/pages/TaskForm/constants/TaskFormValidation";

export const useDefineEmpCreatedTask =() => {
  const form = useForm({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      dueDate: "",
      assignedTo: "",
    },
});

  const {
    formState: { errors },
  } = form;

  return { form, errors };
};
