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
      // localStorage.removeItem("raUserToken");
      // localStorage.removeItem("raUser");
      // window.location.href = "/login";
    } else if (status === 403) {
      toast.error("You are not authorized to perform this action");
      // window.location.href = "/not-authorized";
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

export const GetProfileApi = async () => {
  try {
    const response = await api.get("/auth/profile", authHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const GetAllUsersApi = async () => {
  try {
    const response = await api.get("/auth/get-users", authHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const UpdateUserRoleApi = async ({ userId, role }) => {
  try {
    const response = await api.patch(
      `/admin/users/${userId}/role`,
      { role },
      authHeaders(),
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const CreateTaskApi = async (data) => {
  try {
    const response = await api.post("/api/create-task", data, authHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllTasksApi = async () => {
  try {
    const response = await api.get("/api/all-tasks", authHeaders());

    return response.data.tasks || [];
  } catch (err) {
    console.error(" API error", err.response?.data || err.message);
    throw err;
  }
};

export const updateTaskApi = async ({ id, updates }) => {
  try {
    const response = await api.post(`/tasks/${id}`, updates, authHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const GetAllEmployeesApi = async () => {
  try {
    const res = await api.get("/auth/employees", authHeaders());
    return res.data.users || [];
  } catch (err) {
    console.error(" Employees API error:", err.response?.data || err.message);
    throw err;
  }
};

export const GetAllEmployeesAndManagersApi = async () => {
  try {
    const res = await api.get("/auth/employees-managers", authHeaders());
    return res.data.users || [];
  } catch (err) {
    console.error(
      "Employees + Managers API error:",
      err.response?.data || err.message,
    );
    throw err;
  }
};

export const EmployeeFetchCreatedTasks = async () => {
  try {
    const response = await api.get("/employee/created", authHeaders());
    return response.data.tasks || [];
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to fetch created tasks",
    );
    throw error.response?.data || error.message;
  }
};

export const EmployeeFetchAssignedTasks = async () => {
  try {
    const response = await api.get("/employee/assigned", authHeaders());
    return response.data.tasks || [];
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to fetch assigned tasks",
    );
    throw error.response?.data || error.message;
  }
};

export const EmployeeUpdateTaskApi = async ({ id, updatedData }) => {
  try {
    const response = await api.put(
      `/employee/update/${id}`,
      updatedData,
      authHeaders(),
    );
    toast.success("Task updated successfully");
    return response.data.task;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update task");
    throw error.response?.data || error.message;
  }
};

export const EmployeeDeleteTaskApi = async (id) => {
  try {
    const response = await api.delete(`/api/tasks/${id}`, authHeaders());
    toast.success("Task deleted successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete task");
    throw error.response?.data || error.message;
  }
};


export const ManagerFetchAllTasksApi = async () => {
  try {
    const response = await api.get("/manager/created", authHeaders());
    return response.data.tasks || [];
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to fetch tasks for manager"
    );
    throw error.response?.data || error.message;
  }
};


export const ManagerUpdateTaskApi = async ({ id, updatedData }) => {
  try {
    const response = await api.put(
      `/manager/update/${id}`,
      updatedData,
      authHeaders()
    );
    return response.data.task;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to update task"
    );
    throw error.response?.data || error.message;
  }
};

export const ManagerDeleteTaskApi = async (id) => {
  try {
    const response = await api.delete(
      `/manager/delete/${id}`,
      authHeaders()
    );
    return response.data;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to delete task"
    );
    throw error.response?.data || error.message;
  }
};

