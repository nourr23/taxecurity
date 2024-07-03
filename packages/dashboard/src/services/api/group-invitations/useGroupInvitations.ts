import { client } from "../../global/apiClient";
import { getItem } from "../../../core/storage";
import { useQuery } from "@tanstack/react-query";

type Pagination = {
  pageNumber?: number;
  limitPerPage?: number;
};
const getFilteredGroupInvitations = async (
  variables: string,
  pagination: Pagination
) => {
  const { data } = await client.get(
    `group-invitations/filtered?creator=${variables}&group_name=${variables}&receiver=${variables}&skip=${pagination.pageNumber}`,
    {
      timeout: 2000, // since it can be heavy too
      headers: {
        Authorization: `Bearer ${getItem("auth")}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return data;
};

export function useGroupInvitations(variables: string, pagination: Pagination) {
  return useQuery<any>(
    ["group-invitations", variables, pagination],
    () => getFilteredGroupInvitations(variables, pagination),
    {
      retry: true,
      keepPreviousData: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      cacheTime: 1000 * 60 * 60,
      // enabled: variables.length > 2 || variables.length === 0,
      onError: (error: any) => {
        // showError(error);
      },
      onSuccess(data) {},
    }
  );
}
