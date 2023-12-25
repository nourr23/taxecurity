import { client } from "../global/apiClient";
import { getItem } from "../../core/storage";
import { useMutation, useQuery } from "@tanstack/react-query";

const deleteUser = async (id: number) => {
  console.info("deleteUser operation");
  const { data } = await client.delete(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${getItem("auth")}`,
      "Access-Control-Allow-Origin": "*",
    },
    timeout: 5000,
  });
  return data;
};

export function useDeleteUser() {
  return useMutation((id: number) => deleteUser(id), {
    onError: (error: any) => {
      // showError(error);
      console.log(error)
    },
    onSuccess: (data: any) => {},
  });
}
