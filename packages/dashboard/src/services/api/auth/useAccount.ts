import { useQuery } from "@tanstack/react-query";
import { client } from "../../global/apiClient";
import { getItem } from "../../../core/storage";
// import { useAuth } from "../../../core/auth";
import { useAuth } from "../../../core/auth";

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
  const { signOut } = useAuth();
  return useQuery<any>(["me"], () => getMe(), {
    // retry: true,
    keepPreviousData: true,
    onError: (error: any) => {
      if (error.response.data.statusCode === 401) {
        signOut();
      }
    },
  });
}
