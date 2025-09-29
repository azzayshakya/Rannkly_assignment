import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CreateTaskApi } from "@/apis/apiServices";
import { useNavigate } from "react-router-dom";

export const useCreateTaskMutation = () => {
   const navigate = useNavigate();
  const {
    mutate: submitTaskMutation,
    isPending: isSubmitting,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: CreateTaskApi,
    onSuccess: (data) => {
      toast.success(`${data.task.title} :Task Created Successfully!`);
      navigate("/")
     
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create task");
    },
  });

  return { submitTaskMutation, isSubmitting, isSuccess, error };
};
