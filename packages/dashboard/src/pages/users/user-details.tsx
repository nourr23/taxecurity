import { useParams } from "react-router";
import { useUserDetails } from "../../services/api/useUserDetails";

const UserDetails = () => {
  // const { id } = useParams();
  const variables = { id: "1" };
  const { data, isLoading, isFetching, isFetched, isSuccess, isError } =
    useUserDetails({ variables, suspense: false });
  console.log(data && data);
  return <div>user details</div>;
};
export default UserDetails;
