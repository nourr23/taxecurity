import { BsXLg } from "react-icons/bs";
const ModalComponent = ({ open, setOpen, title, children, data }: any) => {
  return (
    <>
      {open ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.6)] backdrop-blur-[2px] flex items-center justify-center">
          <div className="rounded-lg bg-white overflow-y-scroll md:overflow-y-hidden max-h-[95vh] px-4 w-full max-w-[500px] pt-3 pb-5 ">
            <div className="flex justify-between items-center py-3">
              <h1 className="text-lg font-bold text-primary">{title}</h1>
              <button onClick={setOpen}>
                <BsXLg />
              </button>
            </div>
            {data ? (
              <div className="flex flex-col max-h-[260px] py-2 overflow-y-scroll  gap-y-2">
                {data.map((user: any) => (
                  <div key={user.id} className="flex items-center">
                    <div className="rounded-[50%] h-[40px] w-[40px] bg-blue-400"></div>
                    <div className="ml-3">
                      {user.firstName} {user.lastName}{" "}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>{children}</>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ModalComponent;
