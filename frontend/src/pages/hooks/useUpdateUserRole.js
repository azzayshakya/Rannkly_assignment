import { useMutation } from "@tanstack/react-query";
import { UpdateUserRoleApi } from "@/apis/apiServices";
import { toast } from "react-toastify";

export const useUpdateUserRoleMutation = () => {
  const {
    mutate: updateUserRoleMutation,
    isPending: isUpdating,
    isError,
    error,
  } = useMutation({
    mutationFn: UpdateUserRoleApi,
    onSuccess: () => {
      toast.success("Role updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update role.");
    },
  });

  return {
    updateUserRoleMutation,
    isUpdating,
    isError,
    error,
  };
};
