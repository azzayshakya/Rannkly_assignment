import { ManagerFetchAllTasksApi } from "@/apis/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useManagerTasks = () => {
  return useQuery({
    queryKey: ["manager-tasks"],
    queryFn: ManagerFetchAllTasksApi,
  });
};
