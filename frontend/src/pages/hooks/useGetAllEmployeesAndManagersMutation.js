// src/hooks/useGetAllEmployeesAndManagersMutation.js
import { useMutation } from "@tanstack/react-query";
import { GetAllEmployeesAndManagersApi } from "@/apis/apiServices";
import { toast } from "react-toastify";

export const useGetAllEmployeesAndManagersMutation = () => {
  const {
    mutate: getAllEmployeesAndManagersMutation,
    isPending: isGettingUsers,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: GetAllEmployeesAndManagersApi,
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  return {
    getAllEmployeesAndManagersMutation,
    isGettingUsers,
    isSuccess,
    isError,
    error,
    data,
  };
};
