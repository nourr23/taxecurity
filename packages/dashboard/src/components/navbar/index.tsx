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
                location.pathname === "/dashboard"
                  ? "text-blue-500"
                  : "text-gray-500"
              }  items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full " to={"/dashboard"}>
                Home
              </Link>
            </li>
            <li
              className={`h-[40px] ${
                location.pathname === "/dashboard/users"
                  ? "text-blue-500"
                  : "text-gray-500"
              }  flex items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full" to={"/dashboard/users"}>
                Users
              </Link>
            </li>
            <li
              className={`h-[40px] ${
                location.pathname === "/dashboard/requests"
                  ? "text-blue-500"
                  : "text-gray-500"
              }   flex items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full" to={"/dashboard/requests"}>
                User requests
              </Link>
            </li>
            <li
              className={`h-[40px] ${
                location.pathname === "/dashboard/groups"
                  ? "text-blue-500"
                  : "text-gray-500"
              }  flex items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full" to={"/dashboard/groups"}>
                Groups
              </Link>
            </li>
            <li
              className={`h-[40px] ${
                location.pathname === "/dashboard/group-requests"
                  ? "text-blue-500"
                  : "text-gray-500"
              }   flex items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full" to={"/dashboard/group-requests"}>
                Group requests
              </Link>
            </li>
            <li
              className={`h-[40px] ${
                location.pathname === "/dashboard/group-invites"
                  ? "text-blue-500"
                  : "text-gray-500"
              }   flex items-center font-bold pl-8 hover:bg-gray-100`}
            >
              <Link className="w-full" to={"/dashboard/group-invites"}>
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
