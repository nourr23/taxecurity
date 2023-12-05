import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Header from "../components/header";
import { useAccount } from "../services/api";
import { useEffect } from "react";
const RoutesLayout = () => {
  const { data, isLoading } = useAccount();
  useEffect(() => {}, [data, isLoading]);
  return (
    <>
      {isLoading ? (
        <span>loading..</span>
      ) : (
        data && (
          <div>
            <div className="flex">
              <div className="">
                <Navbar />
              </div>
              <div className="flex-1">
                <Header data={data} />
                <div className="md:p-10 p-4">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};
export default RoutesLayout;
