import { Prompt, Table } from "@medusajs/ui";
import {
  useWorkersInvitations,
  useSetWorkerInvitation,
} from "../../services/api";

const WorkersInvitationsPage = () => {
  const {
    data: workersInvitations,
    isLoading: isLoadingInvitations,
    isSuccess: isSuccessInvitations,
    isFetching: isFetchingInvitations,
    isFetched: isFetchedInvitations,
    refetch,
  } = useWorkersInvitations();

  const { mutateAsync: updateAsync, isLoading: isLoadingUpdate } =
    useSetWorkerInvitation();

  const updateInvitation = async (id: number) => {
    let obj = {
      id: id,
      status: "canceled",
    };
    await updateAsync(obj).then(() => {
      refetch();
    });
  };

  const CancelPrompt = ({ id }: any) => {
    return (
      <Prompt>
        <Prompt.Trigger asChild>
          <button className=" bg-red-500 text-white px-3 py-1 rounded">
            Cancel
          </button>
        </Prompt.Trigger>
        <Prompt.Content>
          <Prompt.Header>
            <Prompt.Title>Cancel Invitation</Prompt.Title>
            <Prompt.Description>
              Are you sure? This cannot be undone.
            </Prompt.Description>
          </Prompt.Header>
          <Prompt.Footer>
            <Prompt.Cancel>Close</Prompt.Cancel>
            <Prompt.Action onClick={() => updateInvitation(id)}>
              Cancel
            </Prompt.Action>
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>
    );
  };

  return (
    <div>
      {isLoadingInvitations || isFetchingInvitations ? (
        <div>Is loading</div>
      ) : workersInvitations || isSuccessInvitations || isFetchedInvitations ? (
        <div className=" overflow-x-scroll md:overflow-x-hidden pb-4 max-w-[360px] md:max-w-none">
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
                    {invitation.status === "pending" && (
                      <CancelPrompt id={invitation.id} />
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : null}
    </div>
  );
};
export default WorkersInvitationsPage;
