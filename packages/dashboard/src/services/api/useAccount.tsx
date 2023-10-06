import { useQuery } from "@tanstack/react-query";
import { client } from "../global/apiClient";
import { getItem } from "../../core/storage";

export const getMe = async () => {
  const data = await client.get("admin/workers/me", {
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${getItem("auth")}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
  return data.data;
};

export function useAccount() {
  return useQuery<any>(["account"], () => getMe(), {
    // retry: true,
    keepPreviousData: true,
  });
}
