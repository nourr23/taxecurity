import { FaBell, FaList } from "react-icons/fa";
import { useAuth } from "../../core/auth";
import { setOpenedSideBarFct } from "../../core";
const Header = ({ data }: any) => {
  const { signOut } = useAuth();
  return (
    <div className="md:h-[80px] h-auto py-4 md:py-0 w-full flex  md:px-6 px-3 text-gray-500 items-center justify-between border-b-2">
      <div className="font-semibold flex-col md:flex-row items-start gap-y-3 md:items-center justify-between flex  mb-3 md:mb-0">
        <div className="text-blue-500">
          {data.firstName} {data.lastName}
        </div>
        <div className="md:hidden block">
          <button onClick={setOpenedSideBarFct}>
            <FaList size={23} />
          </button>
        </div>
      </div>
      <div className="flex items-center  md:justify-normal justify-between ">
        <button>
          <FaBell size={23} />
        </button>
        <button
          className="font-semibold ml-4 rounded border py-2 px-4 border-blue-500"
          onClick={signOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Header;
