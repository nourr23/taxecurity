import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Header from "../components/header";
const RoutesLayout = () => {
  return (
    <div>
      <div className="flex">
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="flex-1">
          <Header />
          <div className="p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoutesLayout;
