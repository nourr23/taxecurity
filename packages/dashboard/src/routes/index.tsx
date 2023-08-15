import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import UsersPage from "../pages/users";
import UserRequestsPage from "../pages/user-requests";
import GroupsPage from "../pages/groups";
import GroupRequestsPage from "../pages/group-requests";
import GroupInvitesPage from "../pages/group-invites";
import RoutesLayout from "./Routes";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <RoutesLayout />,
    children: [
      { path: "/dashboard/", element: <HomePage /> },
      { path: "/dashboard/users", element: <UsersPage /> },
      { path: "/dashboard/requests", element: <UserRequestsPage /> },
      { path: "/dashboard/groups", element: <GroupsPage /> },
      { path: "/dashboard/group-requests", element: <GroupRequestsPage /> },
      { path: "/dashboard/group-invites", element: <GroupInvitesPage /> },
    ],
  },
  {
    path: "/",
    element: <LoginPage />,
  },
]);
