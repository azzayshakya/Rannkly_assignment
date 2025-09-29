import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CreateTaskApi } from "@/apis/apiServices";

export const useCreateTaskMutation = () => {
  const {
    mutate: submitTaskMutation,
    isPending: isSubmitting,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: CreateTaskApi,
    onSuccess: () => {
      toast.success("Task Created Successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create task");
    },
  });

  return { submitTaskMutation, isSubmitting, isSuccess, error };
};
