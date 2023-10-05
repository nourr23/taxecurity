import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import UsersPage from "../pages/users";
import UserRequestsPage from "../pages/user-requests";
import GroupsPage from "../pages/groups";
import GroupRequestsPage from "../pages/group-requests";
import GroupInvitesPage from "../pages/group-invites";
import RoutesLayout from "./Routes";
import { RouterProvider } from "react-router-dom";
import APIProvider from "../services/global/APIProvider";
import { useAuth } from "../core/auth";

const Router = () => {
  const {status} = useAuth()
  const router = createBrowserRouter([
    {
      path: "/",
      element: status === 'signIn' ?<RoutesLayout /> : <Navigate to={'/login'} />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/users", element: <UsersPage /> },
        { path: "/requests", element: <UserRequestsPage /> },
        { path: "/groups", element: <GroupsPage /> },
        { path: "/group-requests", element: <GroupRequestsPage /> },
        { path: "/group-invites", element: <GroupInvitesPage /> },
      ],
    },
    {
      path: "/login",
      element: status !== 'signIn' ? <LoginPage /> : <Navigate to={'/'} />,
    },
  ]);

  return (
    <APIProvider>
      <RouterProvider router={router} />
    </APIProvider>
  );
};

export default Router;
