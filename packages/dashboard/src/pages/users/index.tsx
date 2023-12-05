import { Link } from "react-router-dom";
import { useUsers } from "../../services/api";
import { Table } from "@medusajs/ui";
import { useState } from "react";
import SearchInput from "../../components/search-input";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const UsersPage = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching, isFetched, isSuccess, isError } =
    useUsers(search, { limitPerPage: 10, pageNumber });
  const UserCard = ({ user }: any) => {
    return (
      <Link
        to={`/users/${user.id}`}
        className="w-full border-b-2 pb-4 flex flex-col gap-y-1"
      >
        <h1>{user.firstName}</h1>
        <h1>{user.lastName}</h1>
        <h1>{user.phone_number}</h1>
        <h1>{user.email}</h1>
      </Link>
    );
  };

  const onSearch = (e: any) => {
    e.preventDefault();
    setPageNumber(0);
    setSearch(e.target.value);
  };

  return (
    <>
      <div>
        <div className="flex flex-col gap-y-2 items-start mb-4">
          <SearchInput
            value={search}
            onChangeValue={onSearch}
            placeholder={"Search"}
          />
        </div>

        {isLoading || isFetching ? (
          <span>loading</span>
        ) : (
          (data || isSuccess || isFetched) && (
            <>
              <div className="md:hidden flex-col w-full px-4 items-center gap-y-4 flex">
                {data?.map((user: any, index: number) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
              <div className="md:flex flex-col w-full hidden">
                <Table className="">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Id</Table.HeaderCell>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Phone number</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {data?.map((user: any, index: number) => (
                      <Table.Row key={user.id}>
                        <Table.Cell>
                          <Link to={`/users/${user.id}`}> {user.id} </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/users/${user.id}`} className="capitalize">
                            {user.firstName} {user.lastName}
                          </Link>
                        </Table.Cell>
                        <Table.Cell>{user.phone_number}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
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
                  disabled={data.length < 10}
                  onClick={() => setPageNumber((prev) => prev + 10)}
                >
                  <MdKeyboardArrowRight size={32} color={"#3b82f6"} />
                </button>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};
export default UsersPage;
