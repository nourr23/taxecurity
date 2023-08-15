import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
const RoutesLayout = () => {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default RoutesLayout;
