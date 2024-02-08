import { Table } from "@medusajs/ui";
import { useWorkersInvitations } from "../../services/api";

const WorkersInvitationsPage = () => {
  const {
    data: workersInvitations,
    isLoading: isLoadingInvitations,
    isSuccess: isSuccessInvitations,
    isFetching: isFetchingInvitations,
    isFetched: isFetchedInvitations,
  } = useWorkersInvitations();

  return (
    <div>
      {isLoadingInvitations || isFetchingInvitations ? (
        <div>Is loading</div>
      ) : workersInvitations || isSuccessInvitations || isFetchedInvitations ? (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sent by</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              <Table.HeaderCell>status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {workersInvitations.map((invitation: any) => (
              <Table.Row key={invitation.id}>
                <Table.Cell>
                  {invitation.sentBy.firstName} {invitation.sentBy.lastName}
                </Table.Cell>
                <Table.Cell>{invitation.createdAt}</Table.Cell>
                <Table.Cell>{invitation.destination}</Table.Cell>
                <Table.Cell
                  className={` ${
                    invitation.status === "worker"
                      ? "text-green-500 "
                      : invitation.status === "canceled"
                      ? " text-red-500"
                      : " text-blue-700"
                  }`}
                >
                  {invitation.status}
                </Table.Cell>
                <Table.Cell className=" flex gap-x-2 items-center">
                  <button>Accept</button>
                  <button>decline</button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : null}
    </div>
  );
};
export default WorkersInvitationsPage;
