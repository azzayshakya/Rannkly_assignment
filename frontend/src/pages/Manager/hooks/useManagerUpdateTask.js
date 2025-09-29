import { ManagerUpdateTaskApi } from "@/apis/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useManagerUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) =>
      ManagerUpdateTaskApi({ id, updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries(["manager-tasks"]);
    },
  });
};
