import { useMutation } from "@tanstack/react-query";
import { getAllEmployeeExceptCurrent } from "@/apis/apiServices";
import { toast } from "react-toastify";

export const useGetAllEmployeeExceptCurrentMutation = () => {
  const {
    mutate: getAllEmployeeExceptCurrentMutation,
    isPending: isGettingUsers,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: getAllEmployeeExceptCurrent,
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    getAllEmployeeExceptCurrentMutation,
    isGettingUsers,
    isSuccessWhileGettingEmployeeExceptCurrent:isSuccess,
    isError,
    error,
    employeeExceptCurrentData:data,
  };
};
