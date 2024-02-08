import { Table } from "@medusajs/ui";
import { useWorkers } from "../../services/api";
import InviteWorkerModal from "../../components/invite-worker-modal";
import { useState } from "react";
import { Link } from "react-router-dom";

const WorkersPage = () => {
  const {
    data: workers,
    isLoading: isLoadingWorkers,
    isSuccess: isSuccessWorkers,
    isFetching: isFetchingWorkers,
    isFetched: isFetchedWorkers,
  } = useWorkers();
  const [invitationOpened, setInvitationOpened] = useState(false);
  return (
    <div>
      <button
        onClick={() => setInvitationOpened(true)}
        className="font-semibold ml-4 rounded border py-2 px-4 border-blue-500 mb-6 text-gray-600"
      >
        Add a worker
      </button>
      {isLoadingWorkers || isFetchingWorkers ? (
        <div>Is loading</div>
      ) : workers || isSuccessWorkers || isFetchedWorkers ? (
        <div className=" overflow-x-scroll md:overflow-x-hidden pb-4 max-w-[360px] md:max-w-none">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {workers.map((worker: any) => (
                <Table.Row key={worker.id}>
                  <Table.Cell>
                    <Link to={`/workers/${worker.id}`}> {worker.id} </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/workers/${worker.id}`} className="capitalize">
                      {worker.firstName} {worker.lastName}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{worker.phone}</Table.Cell>
                  <Table.Cell>{worker.email}</Table.Cell>
                  <Table.Cell
                    className={` ${
                      worker.type === "worker"
                        ? "text-green-500 "
                        : " text-red-500"
                    }`}
                  >
                    {worker.type}
                  </Table.Cell>
                  <Table.Cell
                    className={` ${
                      worker.status === "active"
                        ? "text-green-500 "
                        : "text-red-500"
                    }`}
                  >
                    {worker.status}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : null}
      {invitationOpened && (
        <InviteWorkerModal setOpen={() => setInvitationOpened(false)} />
      )}
    </div>
  );
};
export default WorkersPage;
