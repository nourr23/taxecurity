import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ModalComponent from "../../components/modal/index.tsx";
import { useDeleteUser, useUserDetails } from "../../services/api";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  const {
    mutateAsync: deleteAsync,
    isLoading: isLoadingDelete,
    isError: isLoadingError,
    error: errorDelete,
  } = useDeleteUser();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalTitle, setModalTitle] = useState("");
  const { data, isLoading, isFetching, isFetched, isSuccess, isError } =
    useUserDetails(Number(id));
  const [user, setUser] = useState<any>();
  useEffect(() => {
    if (isSuccess || isFetched || data) {
      setUser(data);
    }
  }, [isLoading, isFetching, isFetched, data, isSuccess]);
  const openFollowers = () => {
    setModalData(user.followedBy);
    setModalTitle("Followers");
    setOpen(true);
  };
  const openFolloweing = () => {
    setModalData(user.following);
    setModalTitle("Following");
    setOpen(true);
  };

  const deleteUser = (id: number) => {
    deleteAsync(id).then((res) => {
      navigate("/users");
    });
  };
  if (isLoading || isFetching) {
    return <span>loading</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div>
      {user ? (
        <div>
          <div className="flex flex-col items-start">
            <div className="flex w-full items-center">
              <div className="h-[140px] w-[140px] rounded-[50%] bg-gray-500 border-[2px] border-solid  border-white shadow-sm"></div>
              <div className="ml-3">
                <button
                  className="px-3 py-2 border-blue-400 border-[1px] rounded"
                  onClick={() => openFollowers()}
                >
                  Followers
                </button>
              </div>
              <div className="ml-3">
                <button
                  className="px-3 py-2 border-blue-400 border-[1px] rounded"
                  onClick={() => openFolloweing()}
                >
                  Following
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col w-full gap-y-3 ">
              <div className="">
                <div className="">
                  {user.firstName} {user.lastName}{" "}
                </div>
                <div className="">{user.phone}</div>
                <div className="flex mt-3">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="rounded bg-red-500 px-6 py-1 text-white"
                  >
                    Delete
                  </button>
                  <button className="rounded border-2 border-red-500 px-6 py-1 text-red-500 ml-3">
                    Block
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ModalComponent
            open={open}
            title={modalTitle}
            setOpen={() => setOpen(false)}
            data={modalData}
          />
        </div>
      ) : null}
    </div>
  );
};
export default UserDetails;
