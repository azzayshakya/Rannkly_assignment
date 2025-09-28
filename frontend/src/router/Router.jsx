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
