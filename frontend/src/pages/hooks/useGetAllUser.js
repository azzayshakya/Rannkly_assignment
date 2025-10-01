import { useMutation } from "@tanstack/react-query";
import { getAllUsersExceptCurrentAndAdmin } from "@/apis/apiServices";

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
    mutationFn: getAllUsersExceptCurrentAndAdmin,
    onSuccess: () => {},
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
