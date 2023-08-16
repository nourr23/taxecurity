import { useQuery } from "@tanstack/react-query";
import { client } from "../global/apiClient";

export const getUsers = async () => {
  const data = await client.get("users", {
    timeout: 5000,
  });
  return data;
};

export function useUsers() {
  return useQuery<any>(["users"], () => getUsers(), {
    // retry: true,
    keepPreviousData: true,
  });
}
