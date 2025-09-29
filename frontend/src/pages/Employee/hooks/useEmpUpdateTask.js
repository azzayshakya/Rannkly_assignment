import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { EmployeeUpdateTaskApi } from "@/apis/apiServices";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EmployeeUpdateTaskApi,
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries(["createdTasks"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update task");
    },
  });
};
