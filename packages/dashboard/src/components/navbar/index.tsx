import { Link, useLocation } from "react-router-dom";
import { setOpenedSideBarFct, useAppStore } from "../../core";

const Navbar = () => {
  const { opened_side_bar } = useAppStore();
  console.log({ opened_side_bar });
  const location = useLocation();

  const RenderedLinks = () => {
    return (
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
    );
  };
  return (
    <>
      <div className="h-[100vh] w-[240px] flex-col border-r-2 hidden md:flex">
        <div className="w-full h-[80px] border-b-2 flex items-center justify-center text-xl font-bold">
          Dashboard
        </div>
        <RenderedLinks />
      </div>
      {opened_side_bar && (
        <div className=" h-[100vh] w-full md:hidden flex absolute  top-0 left-0 bg-black/60">
          <div className="h-full w-[260px] flex-col border-r-2 bg-white">
            <div className="w-full h-[113px] border-b-2 flex items-center justify-center text-xl font-bold">
              Dashboard
            </div>
            <RenderedLinks />
            <div className=" px-7 mt-1">
              <button
                className=" px-5 py-2 rounded text-red-500 font-bold border-red-500 border-[1px]"
                onClick={setOpenedSideBarFct}
              >
                Close
              </button>
            </div>
          </div>
          <button className="flex-1" onClick={setOpenedSideBarFct}></button>
        </div>
      )}
    </>
  );
};
export default Navbar;
