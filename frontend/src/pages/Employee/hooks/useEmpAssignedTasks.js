import { useQuery } from "@tanstack/react-query";
import { EmployeeFetchAssignedTasks } from "@/apis/apiServices";

export const useAssignedTasks = () => {
  return useQuery({
    queryKey: ["assignedTasks"],
    queryFn: EmployeeFetchAssignedTasks,
  });
};
