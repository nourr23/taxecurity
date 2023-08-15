import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
const RoutesLayout = () => {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
export default RoutesLayout;
