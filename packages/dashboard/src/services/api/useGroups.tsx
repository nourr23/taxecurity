import { client } from "../global/apiClient";
import { getItem } from "../../core/storage";
import { useQuery } from "@tanstack/react-query";

type Pagination = {
  pageNumber?: number;
  limitPerPage?: number;
};
const getFilteredGroups = async (variables: string, pagination: Pagination) => {
  const { data } = await client.get(
    `groups/filtered?group_admin=${variables}&name=${variables}&skip=${pagination.pageNumber}`,
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

export function useGroups(variables: string, pagination: Pagination) {
  return useQuery<any>(
    ["groups", variables, pagination],
    () => getFilteredGroups(variables, pagination),
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
