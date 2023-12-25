import { client } from "../global/apiClient";
import { getItem } from "../../core/storage";
import { useQuery } from "@tanstack/react-query";

type Pagination = {
  pageNumber?: number;
  limitPerPage?: number;
};
const getFilteredGroupRequests = async (
  variables: string,
  pagination: Pagination
) => {
  const { data } = await client.get(
    `group-requests/filtered?creator=${variables}&group_name=${variables}&sender=${variables}&skip=${pagination.pageNumber}`,
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

export function useGroupRequests(variables: string, pagination: Pagination) {
  return useQuery<any>(
    ["group-requests", variables, pagination],
    () => getFilteredGroupRequests(variables, pagination),
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
