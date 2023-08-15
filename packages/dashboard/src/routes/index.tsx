import React from "react";
import { createBrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import RoutesLayout from "./Routes";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <RoutesLayout />,
    children: [
      { path: "/dashboard/", element: <HomePage /> },
      { path: "/dashboard/login", element: <LoginPage /> },
    ],
  },
]);
