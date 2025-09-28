import { useMutation } from "@tanstack/react-query";
import { GetProfileApi } from "@/apis/apiServices";

import { toast } from "react-toastify";

export const useGetProfileMutation = () => {
  //   const { user } = useContext(UserContext);

  const {
    mutate: getProfileMutation,
    isPending: isGettingProfile,
    isSuccess,
    isError,
    error,
    data,

  } = useMutation({
    mutationFn: GetProfileApi,
    onSuccess: (data) => {
      const  userData  = data.user;
      console.log(userData)
      
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    getProfileMutation,
    isGettingProfile,
    isSuccess,
    isError,
    error,
    data
  };
};
