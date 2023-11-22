import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";
import { client } from "../global/apiClient";
import { getItem } from "../../core/storage";
import { useQuery } from "@tanstack/react-query";

type Pagination = {
  pageNumber?: number;
  limitPerPage?: number;
};
const getFilteredRequests = async (
  variables: string,
  pagination: Pagination
) => {
  const { data } = await client.get(
    `request/filtered?sender=${variables}&receiver=${variables}&skip=${pagination.pageNumber}`,
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

export function useUserRequests(variables: string, pagination: Pagination) {
  return useQuery<any>(
    ["user-requests", variables, pagination],
    () => getFilteredRequests(variables, pagination),
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
