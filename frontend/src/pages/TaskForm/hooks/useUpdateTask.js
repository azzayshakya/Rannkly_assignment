import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateTaskApi } from "@/apis/apiServices";

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: updateTaskApi,
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (err) => {
      toast.error(err.message || "Update failed");
    },
  });

  return { updateTask, isUpdating };
};
