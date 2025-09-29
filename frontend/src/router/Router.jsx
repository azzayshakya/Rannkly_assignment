import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import { ErrorPage } from "../pages/common/ErrorPage";
import { NotFoundPage } from "../pages/common/NotFoundPage";
import RedirectPage from "../pages/common/RedirectPage";
import HomeUILayout from "../layout/Home/HomeLayout";
import NotAuthorized from "@/pages/common/NotAuthorized";
import LoginMain from "@/auth/login/LoginMain";
import CreateAccountMain from "@/auth/create-account/CreateAccountMain";
import MyProfile from "@/pages/common/MyProfile";
import UserRolesManagement from "@/pages/Admin/UserRolesManagment";
import CreateTaskMainForm from "@/pages/TaskForm/TaskMainForm";
import AllTasksPage from "@/pages/TaskForm/component/SeeAllTasks";
import EmployeesPage from "@/pages/Employee/EmployeesPage";
import EmployeesManagersPage from "@/pages/Employee/EmployeeManagerPage";
import EmployeeAssignedTasksPage from "@/pages/Employee/EmployeeAssignedTask";
import EmployeeCreatedTasksPage from "@/pages/Employee/EmployeeCreatedTasks";
import ManagerAllTasksManagementPage from "@/pages/Manager/ManagerTaskManagementPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeUILayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Navigate to="/home" />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <MyProfile />,
        },
        {
          path: "/user-roles-management",
          element: <UserRolesManagement />,
        },
        {
          path: "/create-task",
          element: <CreateTaskMainForm />,
        },
        {
          path: "/update-task",
          element: <AllTasksPage />,
        },

        // not required 
        
        {
          path: "/all-employee",
          element: <EmployeesPage />,
        },

        // not required
        {
          path: "/all-manager-employee",
          element: <EmployeesManagersPage />,
        },

        // employee

        {
          path: "/Employee-assigned-task",
          element: <EmployeeAssignedTasksPage />,
        },
        {
          path: "/Employee-created-task",
          element: <EmployeeCreatedTasksPage />,
        },
        {
          path: "/task-management",
          element: <ManagerAllTasksManagementPage />,
        },

        {
          path: "/login",
          element: <LoginMain />,
        },
        {
          path: "/create-account",
          element: <CreateAccountMain />,
        },

        {
          path: "*",
          element: <NotFoundPage />,
        },
        {
          path: "/not-authorized",
          element: <NotAuthorized />,
        },
        {
          path: "/redirect",
          element: <RedirectPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ],
  // { basename: import.meta.env.BASE_URL }
);

export default router;
