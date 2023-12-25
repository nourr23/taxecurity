import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";
import { client } from "../global/apiClient";
import { getItem } from "../../core/storage";
import { useQuery } from "@tanstack/react-query";

const getUser = async (id: number) => {
  const { data } = await client.get(`users/${id}`, {
    timeout: 2000, // since it can be heavy too
    headers: {
      Authorization: `Bearer ${getItem("auth")}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
  return data;
};

export function useUserDetails(id: number) {
  return useQuery<any>(["user_details", id], () => getUser(id), {
    retry: true,
    keepPreviousData: true,
    enabled: !!id,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    cacheTime: 1000 * 60 * 60,
    onError: (error: any) => {
      // showError(error);
    },
    onSuccess(data) {},
  });
}
