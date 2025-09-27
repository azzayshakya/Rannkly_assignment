import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import { CreateAccountApi } from "@/apis/apiServices";
import { toast } from "react-toastify";
import { UserContext } from "@/context/user.context";
import { useContext } from "react";
export const useCreateAccountMutation = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    mutate: submitLoginMutation,
    isPending: isSubmitting,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: CreateAccountApi,
    onSuccess: (data) => {
      const { token, user } = data;
      toast.success(`Account Created 🎉`);
      localStorage.setItem("wechatUserToken", token);

      localStorage.setItem("wechatUser", JSON.stringify(user));
      setUser(data.user)
      navigate("/home");
    },
    onError: (error) => {
      toast.error(error.message || "failed to create account")
    },
  });

  return {
    submitLoginMutation,
    isSubmitting,
    isSuccess,
    isError,
    error,
  };
};
