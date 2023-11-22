import { useGroups, useDeleteGroup, useSetGroup } from "../../services/api";
import { Link } from "react-router-dom";
import { Table } from "@medusajs/ui";
import ModalComponent from "../../components/modal/index.tsx";
import { useState } from "react";
import SearchInput from "../../components/search-input";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const GroupsPage = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const {
    data,
    isLoading,
    isFetching,
    isFetched,
    isSuccess,
    isError,
    refetch,
  } = useGroups(search, { limitPerPage: 10, pageNumber });
  const { mutateAsync: deleteAsync, isLoading: isLoadingDelete } =
    useDeleteGroup();

  const { mutateAsync: updateAsync, isLoading: isLoadingUpdate } =
    useSetGroup();

  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState(false);

  const deleteGroup = (id: number) => {
    deleteAsync(id).then((res) => {
      refetch();
    });
  };
  const updateGroup = (data: any) => {
    let obj = {
      id: data.id,
      active: !data.active,
      name: data.name,
    };
    updateAsync(obj).then(() => {
      refetch();
    });
  };
  const showUsers = (users: any) => {
    setModalData(users);
    setOpen(true);
  };

  const onSearch = (e: any) => {
    e.preventDefault();
    setPageNumber(0);
    setSearch(e.target.value);
  };

  const GroupCard = ({ group }: any) => {
    return (
      <>
        <div className="w-full border-b-2 pb-4 flex flex-col gap-y-2">
          <div className="flex justify-between">
            <h1 className="font-Bold">{group.name}</h1>
            <div>
              {group.active ? (
                <span className="px-2 bg-green-400 rounded py-1 text-white">
                  Active
                </span>
              ) : (
                <span className="px-2 bg-red-400 rounded py-1 text-white">
                  Not active
                </span>
              )}
            </div>
          </div>
          <Link to={`/users/${group.creator.id}`}>
            <h1>
              {group.creator.firstName} {group.creator.lastName}
            </h1>
          </Link>
          <button onClick={() => showUsers(group.users)}>
            {group.users.length} users
          </button>
          <div className="flex">
            <button
              onClick={() => deleteGroup(group.id)}
              className="rounded bg-red-500 px-6 py-1 text-white"
            >
              Delete
            </button>
            <button
              onClick={() => updateGroup(group)}
              className="rounded border-2 border-red-500 px-6 py-1 text-red-500 ml-3"
            >
              {group.active ? "Block" : "Unblock"}
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-y-2 items-start mb-4">
        <SearchInput
          value={search}
          onChangeValue={onSearch}
          placeholder={"Search"}
        />
      </div>
      {isFetched || isLoadingDelete || isSuccess || data ? (
        <>
          <div className="hidden md:flex">
            <Table className="">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Admin</Table.HeaderCell>
                  <Table.HeaderCell>Users</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.map((item: any) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>
                      {item.active ? (
                        <span className="px-2 bg-green-400 rounded py-1 text-white">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 bg-red-400 rounded py-1 text-white">
                          Not active
                        </span>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/users/${item.creator.id}`}>
                        {item.creator.firstName} {item.creator.lastName}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <button onClick={() => showUsers(item.users)}>
                        {item.users.length} users
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => deleteGroup(item.id)}
                        className="rounded bg-red-500 px-6 py-1 text-white"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => updateGroup(item)}
                        className="rounded border-2 border-red-500 px-6 py-1 text-red-500 ml-3"
                      >
                        {item.active ? "Block" : "Unblock"}
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col gap-y-4 md:hidden">
            {data.map((group: any) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>

          <ModalComponent
            open={open}
            title={"Group Users"}
            setOpen={() => setOpen(false)}
            data={modalData}
          />
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
              disabled={data.length < 10}
              onClick={() => setPageNumber((prev) => prev + 10)}
            >
              <MdKeyboardArrowRight size={32} color={"#3b82f6"} />
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};
export default GroupsPage;
