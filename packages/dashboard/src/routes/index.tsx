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
import UserDetails from "../pages/users/user-details";
import WorkersPage from "../pages/workers";
import WorkersInvitationsPage from "../pages/workers-invitations";
import WorkerForm from "../pages/workers/worker-form";
import WorkerDetailsPage from "../pages/workers/worker-details";

const Router = () => {
  const { status } = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        status === "signIn" ? <RoutesLayout /> : <Navigate to={"/login"} />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/workers", element: <WorkersPage /> },
        { path: "/workers/:id", element: <WorkerDetailsPage /> },
        { path: "/workers-invitations", element: <WorkersInvitationsPage /> },
        { path: "/users", element: <UsersPage /> },
        { path: "/requests", element: <UserRequestsPage /> },
        { path: "/groups", element: <GroupsPage /> },
        { path: "/group-requests", element: <GroupRequestsPage /> },
        { path: "/group-invites", element: <GroupInvitesPage /> },
        { path: "/users/:id", element: <UserDetails /> },
      ],
    },
    {
      path: "/login",
      element: status !== "signIn" ? <LoginPage /> : <Navigate to={"/"} />,
    },
    {
      path: "/worker-form",
      element: <WorkerForm />,
    },
  ]);

  return (
    <APIProvider>
      <RouterProvider router={router} />
    </APIProvider>
  );
};

export default Router;
