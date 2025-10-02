import { getAllManagerAndEmployee } from "@/apis/apiServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetAllManagerAndEmployeeMutation = () => {
  const {
    mutate: getAllManagerAndEmployeeMutation,
    isPending: isGettingUsers,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: getAllManagerAndEmployee,
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    getAllManagerAndEmployeeMutation,
    isGettingUsers,
    isSuccess,
    isError,
    error,
    allManagersAndEmployeeData:data,
  };
};
