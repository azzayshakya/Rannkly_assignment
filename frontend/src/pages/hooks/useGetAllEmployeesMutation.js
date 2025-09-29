import { useMutation } from "@tanstack/react-query";
import { GetAllEmployeesApi } from "@/apis/apiServices";
import { toast } from "react-toastify";

export const useGetAllEmployeesMutation = () => {
  const {
    mutate: getAllEmployeesMutation,
    isPending: isGettingEmployees,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: GetAllEmployeesApi,
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  return {
    getAllEmployeesMutation,
    isGettingEmployees,
    isSuccess,
    isError,
    error,
    data,
  };
};
