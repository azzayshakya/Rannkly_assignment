import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      toast.error("Session expired, please login again");
      localStorage.removeItem("raUserToken");
      localStorage.removeItem("raUser");
      window.location.href = "/login";
    } else if (status === 403) {
      toast.error("You are not authorized to perform this action");
      window.location.href = "/not-authorized";
    }
    return Promise.reject(error);
  },
);

export const getAuthToken = () => localStorage.getItem("raUserToken");

export const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getAuthToken()}` },
});

export const loginApi = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const CreateAccountApi = async (userData) => {
  try {
    console.log("sending this data ",userData)
    const response = await api.post("/auth/create-account", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logoutApi = async () => {
  try {
    const response = await api.get("/auth/logout", authHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const GetProfileApi=async()=>{
  try {
    const response = await api.get("/auth/profile", authHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export const GetAllUsersApi=async()=>{
  try {
    const response = await api.get("/auth/get-users", authHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}