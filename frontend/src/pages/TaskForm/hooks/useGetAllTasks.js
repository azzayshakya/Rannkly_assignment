import { getAllTasksApi } from "@/apis/apiServices";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

export const useGetAllTasksMutation = () => {
  const {
    mutate: getAllTasksMutation,
    isPending: isGettingTasks,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: getAllTasksApi,
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  return {
    getAllTasksMutation,
    isGettingTasks,
    isSuccess,
    isError,
    error,
    data,
  };
};
