import { useMutation } from "@tanstack/react-query";
import { GetAllUsersApi } from "@/apis/apiServices";

import { toast } from "react-toastify";

export const useGetAllUserMutation = () => {
  const {
    mutate: getAllUserMutation,
    isPending: isGettingUsers,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: GetAllUsersApi,
    onSuccess: () => {
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    getAllUserMutation,
    isGettingUsers,
    isSuccess,
    isError,
    error,
    data,
  };
};
