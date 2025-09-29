import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { EmployeeDeleteTaskApi } from "@/apis/apiServices";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EmployeeDeleteTaskApi,
    onSuccess: () => {
      toast.success("Task deleted");
      queryClient.invalidateQueries(["createdTasks"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete task");
    },
  });
};
