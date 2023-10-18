import { useGroups } from "../../services/api";
import { Link } from "react-router-dom";
import { Table } from "@medusajs/ui";

const GroupsPage = () => {
  const { data, isLoading, isFetching, isFetched, isSuccess, isError } =
    useGroups();

  if (isLoading || isFetching) {
    return <span>loading</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }
  return (
    <>
      {isFetched || isSuccess || data ? (
        <Table className="">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Admin</Table.HeaderCell>
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
                      {" "}
                      Not active
                    </span>
                  )}
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
      ) : null}
    </>
  );
};
export default GroupsPage;
