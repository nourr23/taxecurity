import { useParams } from "react-router";
import {
  useWorkerDetails,
  useSetWorker,
  useDeleteWorker,
} from "../../services/api";
import { Prompt } from "@medusajs/ui";
import { useNavigate } from "react-router";

const WorkerDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: worker,
    isLoading: isLoadingWorker,
    isFetching: isFetchingWorker,
    isFetched: isFetchedWorker,
    refetch,
  } = useWorkerDetails(Number(id));

  const { mutateAsync: updateAsync, isLoading: isLoadingUpdate } =
    useSetWorker();

  const { mutateAsync: deleteAsync, isLoading: isLoadingDelete } =
    useDeleteWorker();

  const updateWorker = async (status: string) => {
    const newStatus =
      status === "block" ? "blocked" : status === "active" ? "active" : status;
    let obj = {
      id: worker.id,
      status: newStatus,
    };
    await updateAsync(obj).then(() => {
      refetch();
    });
  };

  const deleteWorker = () => {
    deleteAsync(worker.id).then((res) => {
      navigate("/workers");
    });
  };

  const DeletePrompt = () => {
    return (
      <Prompt>
        <Prompt.Trigger asChild>
          <button className=" bg-red-500 text-white px-3 py-1 rounded">
            Delete
          </button>
        </Prompt.Trigger>
        <Prompt.Content>
          <Prompt.Header>
            <Prompt.Title>Delete worker</Prompt.Title>
            <Prompt.Description>
              Are you sure? This cannot be undone.
            </Prompt.Description>
          </Prompt.Header>
          <Prompt.Footer>
            <Prompt.Cancel>Cancel</Prompt.Cancel>
            <Prompt.Action onClick={() => deleteWorker()}>Delete</Prompt.Action>
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>
    );
  };

  const UpdatePrompt = ({ status }: any) => {
    return (
      <Prompt>
        <Prompt.Trigger asChild>
          <button
            className={` ${
              status === "block"
                ? "border-red-500 text-red-500 border-2"
                : status === "active"
                ? "bg-blue-500 text-white"
                : ""
            } capitalize  px-3 py-1 rounded`}
          >
            {status}
          </button>
        </Prompt.Trigger>
        <Prompt.Content>
          <Prompt.Header>
            <Prompt.Title className=" capitalize">{status} worker</Prompt.Title>
            <Prompt.Description>
              Are you sure? This cannot be undone.
            </Prompt.Description>
          </Prompt.Header>
          <Prompt.Footer>
            <Prompt.Cancel>Cancel</Prompt.Cancel>
            <Prompt.Action onClick={() => updateWorker(status)}>
              {status}
            </Prompt.Action>
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>
    );
  };

  return (
    <div>
      {isLoadingUpdate || isFetchingWorker || isLoadingUpdate ? (
        <span>Loading</span>
      ) : worker || isFetchedWorker ? (
        <div>
          <div className=" flex">
            <div className=" flex flex-col gap-y-2">
              <div>
                <span className="font-bold text-gray-600">Full Name: </span>
                <span className=" text-blue-600"></span>
              </div>
              <div>
                <span className=" font-bold text-gray-600"> Email: </span>
              </div>
              <div>
                <span className=" font-bold text-gray-600"> Phone: </span>
              </div>
              <div>
                <span className=" font-bold text-gray-600"> Created at: </span>
              </div>
              <div>
                <span className=" font-bold text-gray-600"> Updated at: </span>
              </div>
              <div>
                <span className=" font-bold text-gray-600"> Type: </span>
              </div>
              <div>
                <span className=" font-bold text-gray-600"> Status: </span>
              </div>
            </div>

            <div className=" ml-2 flex flex-col gap-y-2">
              <div>
                <span className=" text-blue-600">
                  {worker.firstName} {worker.lastName}
                </span>
              </div>
              <div>
                <span className=" text-blue-600"> {worker.email} </span>
              </div>
              <div>
                <span className=" text-blue-600"> {worker.phone} </span>
              </div>
              <div>
                <span className=" text-blue-600"> {worker.createdAt} </span>
              </div>
              <div>
                <span className=" text-blue-600"> {worker.updatedAt} </span>
              </div>
              <div>
                <span className=" text-blue-600"> {worker.type} </span>
              </div>
              <div>
                <span className=" text-blue-600"> {worker.status} </span>
              </div>
            </div>
          </div>
          <div className="flex my-4 gap-x-4">
            {worker.status !== "active" && <UpdatePrompt status="active" />}
            {worker.status !== "blocked" && <UpdatePrompt status="block" />}

            <DeletePrompt />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default WorkerDetailsPage;
