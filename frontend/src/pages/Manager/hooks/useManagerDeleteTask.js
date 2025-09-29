import { ManagerDeleteTaskApi } from "@/apis/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useManagerDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => ManagerDeleteTaskApi(id),
    onSuccess: () => {
      toast.success("Task deleted successfully");
      queryClient.invalidateQueries(["manager-tasks"]);
    },
  });
};
