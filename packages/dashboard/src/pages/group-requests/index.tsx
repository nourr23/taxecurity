import { useGroupRequests } from "../../services/api";
import { Table } from "@medusajs/ui";
import { useState } from "react";
import SearchInput from "../../components/search-input";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const GroupRequestsPage = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching, isFetched, isSuccess, isError } =
    useGroupRequests(search, { limitPerPage: 10, pageNumber });

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
        ) : isFetched || isSuccess || data ? (
          <>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Group</Table.HeaderCell>
                  <Table.HeaderCell>Sender</Table.HeaderCell>
                  <Table.HeaderCell>Group Admin</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.map((item: any) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.Group.name}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/users/${item.sender.id}`}>
                        {item.sender.firstName} {item.sender.lastName}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/users/${item.creator.id}`}>
                        {item.creator.firstName} {item.creator.lastName}
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

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
      </div>
    </>
  );
};
export default GroupRequestsPage;
