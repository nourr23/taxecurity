import { Prompt, Table } from "@medusajs/ui";
import {
  useWorkersInvitations,
  useSetWorkerInvitation,
} from "../../services/api";
import { useState } from "react";
import SearchInput from "../../components/search-input";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const WorkersInvitationsPage = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");

  const {
    data: workersInvitations,
    isLoading: isLoadingInvitations,
    isSuccess: isSuccessInvitations,
    isFetching: isFetchingInvitations,
    isFetched: isFetchedInvitations,
    refetch,
  } = useWorkersInvitations(search, { limitPerPage: 10, pageNumber });

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

  const onSearch = (e: any) => {
    e.preventDefault();
    setPageNumber(0);
    setSearch(e.target.value);
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
      <div className="flex flex-col gap-y-2 items-start mb-4">
        <SearchInput
          value={search}
          onChangeValue={onSearch}
          placeholder={"Search"}
        />
      </div>
      {isLoadingInvitations || isFetchingInvitations ? (
        <div>Is loading</div>
      ) : workersInvitations || isSuccessInvitations || isFetchedInvitations ? (
        <>
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
          <div className="flex mt-4 items-center font-bold text-blue-500">
            <button
              disabled={pageNumber === 0}
              onClick={() => {
                pageNumber > 0 && setPageNumber((prev) => prev - 10);
              }}
            >
              <MdKeyboardArrowLeft size={32} color={"#3b82f6"} />
            </button>
            <div className="mx-2">page {pageNumber / 10 + 1} </div>
            <button
              disabled={workersInvitations.length < 10}
              onClick={() => setPageNumber((prev) => prev + 10)}
            >
              <MdKeyboardArrowRight size={32} color={"#3b82f6"} />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default WorkersInvitationsPage;
