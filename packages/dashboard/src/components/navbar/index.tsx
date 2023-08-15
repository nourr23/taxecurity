import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-[100vh] w-[240px] flex flex-col py-7 items-center border-r-2">
      <nav>
        <ul>
          <li>
            <Link to={"/dashboard"}> Home</Link>
          </li>
          <li>
            <Link to={"/dashboard/login"}> Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
