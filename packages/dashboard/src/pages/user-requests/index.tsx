import { useUserRequests } from "../../services/api";
import { Link } from "react-router-dom";
import { Table } from "@medusajs/ui";

const UserRequestsPage = () => {
  const { data, isLoading, isFetching, isFetched, isSuccess, isError } =
    useUserRequests();
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
              <Table.HeaderCell>Sender</Table.HeaderCell>
              <Table.HeaderCell>Receiver</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((item: any) => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <Link to={`/users/${item.sender.id}`}>
                    {item.sender.firstName} {item.sender.lastName}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/users/${item.sender.id}`}>
                    {item.receiver.firstName} {item.receiver.lastName}
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
export default UserRequestsPage;
