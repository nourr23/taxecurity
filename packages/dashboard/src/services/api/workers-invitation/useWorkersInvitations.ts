import { client } from "../../global/apiClient";
import { getItem } from "../../../core/storage";
import { useQuery } from "@tanstack/react-query";

const getWorkersInvitations = async () => {
    const { data } = await client.get(`workers/invitations`, {
      timeout: 2000, // since it can be heavy too
      headers: {
        Authorization: `Bearer ${getItem("auth")}`,
        "Access-Control-Allow-Origin": "*",
      },
    });
    return data;
  };

  export function useWorkersInvitations() {
    return useQuery<any>(["workers"], () => getWorkersInvitations(), {
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
    });
  }