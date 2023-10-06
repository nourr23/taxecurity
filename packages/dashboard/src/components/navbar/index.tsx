import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="h-[100vh] w-[240px] flex flex-col border-r-2">
      <div className="w-full h-[80px] border-b-2 flex items-center justify-center text-xl font-bold">
        Dashboard
      </div>
      <div className="pt-7">
        <nav>
          <ul>
            <li
              className={`h-[40px] flex ${
                location.pathname === "" ? "text-blue-500" : "text-gray-500"
              }  items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full " to={""}>
                Home
              </Link>
            </li>
            <li
              className={`h-[40px] ${
                location.pathname === "/users"
                  ? "text-blue-500"
                  : "text-gray-500"
              }  flex items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full" to={"/users"}>
                Users
              </Link>
            </li>
            <li
              className={`h-[40px] ${
                location.pathname === "/requests"
                  ? "text-blue-500"
                  : "text-gray-500"
              }   flex items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full" to={"/requests"}>
                User requests
              </Link>
            </li>
            <li
              className={`h-[40px] ${
                location.pathname === "/groups"
                  ? "text-blue-500"
                  : "text-gray-500"
              }  flex items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full" to={"/groups"}>
                Groups
              </Link>
            </li>
            <li
              className={`h-[40px] ${
                location.pathname === "/group-requests"
                  ? "text-blue-500"
                  : "text-gray-500"
              }   flex items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full" to={"/group-requests"}>
                Group requests
              </Link>
            </li>
            <li
              className={`h-[40px] ${
                location.pathname === "/group-invites"
                  ? "text-blue-500"
                  : "text-gray-500"
              }   flex items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full" to={"/group-invites"}>
                Group invites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Navbar;
