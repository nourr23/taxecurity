import { FaBell, FaList } from "react-icons/fa";
import { useAuth } from "../../core/auth";
const Header = () => {
  const {signOut} = useAuth()
  return (
    <div className="md:h-[80px] h-auto py-4 md:py-0 w-full flex flex-wrap md:px-6 px-3 text-gray-500 items-center justify-between border-b-2">
      <div className="font-semibold  items-center justify-between flex w-full md:w-auto mb-3 md:mb-0">
        <div className="text-blue-500">Mohamed Nour Jouini</div>
        <div className="md:hidden block">
          <button>
            <FaList size={23} />
          </button>
        </div>
      </div>
      <div className="flex items-center md:justify-normal justify-between md:w-auto w-full">
        <button>
          <FaBell size={23} />
        </button>
        <button className="font-semibold ml-4 rounded border py-2 px-4 border-blue-500" onClick={signOut} >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Header;
