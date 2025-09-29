import { useQuery } from "@tanstack/react-query";
import { EmployeeFetchCreatedTasks } from "@/apis/apiServices";

export const useCreatedTasks = () => {
  return useQuery({
    queryKey: ["createdTasks"],
    queryFn: EmployeeFetchCreatedTasks,
  });
};
