import { Table } from "@medusajs/ui";
import { useWorkers } from "../../services/api";

const WorkersPage = () => {
  const {
    data: workers,
    isLoading: isLoadingWorkers,
    isSuccess: isSuccessWorkers,
    isFetching: isFetchingWorkers,
    isFetched: isFetchedWorkers,
  } = useWorkers();
  console.log(workers);
  return (
    <div>
      {isLoadingWorkers || isFetchingWorkers ? (
        <div>Is loading</div>
      ) : workers || isSuccessWorkers || isFetchedWorkers ? (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Phone number</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {workers.map((worker: any) => (
              <Table.Row key={worker.id}>
                <Table.Cell>
                  {/* <Link to={`/users/${user.id}`}> {user.id} </Link> */}
                  {worker.id}
                </Table.Cell>
                <Table.Cell>
                  {/* <Link to={`/users/${user.id}`} className="capitalize">
                    {user.firstName} {user.lastName}
                  </Link> */}
                  {worker.firstName} {worker.lastName}
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
      ) : null}
    </div>
  );
};
export default WorkersPage;
