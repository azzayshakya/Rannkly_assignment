import { ManagerDeleteTaskApi } from "@/apis/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useManagerDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => ManagerDeleteTaskApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["manager-tasks"]);
    },
  });
};
