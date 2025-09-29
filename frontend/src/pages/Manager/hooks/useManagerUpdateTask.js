import { ManagerUpdateTaskApi } from "@/apis/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useManagerUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) =>
      ManagerUpdateTaskApi({ id, updatedData }),
    onSuccess: () => {
      toast.success("Task updated succesfully")
      queryClient.invalidateQueries(["manager-tasks"]);
    },
  });
};
