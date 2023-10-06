import { Link } from "react-router-dom";
import { useUsers } from "../../services/api";
import { Table } from "@medusajs/ui";

const UsersPage = () => {
  const { data, isLoading, isFetching, isFetched, isSuccess, isError } =
    useUsers();
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

  if (isLoading || isFetching) {
    return <span>loading</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div>
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
              <Table.HeaderCell>Last name</Table.HeaderCell>
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
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>{user.phone_number}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
export default UsersPage;
