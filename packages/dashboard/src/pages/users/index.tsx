import { useUsers } from "../../services/api";
const UsersPage = () => {
  const { data } = useUsers();
  console.log(data ? data : "no data");
  return <div>Users</div>;
};
export default UsersPage;
