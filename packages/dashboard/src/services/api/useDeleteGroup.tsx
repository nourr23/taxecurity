import { client } from "../global/apiClient";
import { getItem } from "../../core/storage";
import { useMutation, useQuery } from "@tanstack/react-query";

const deleteGroup = async (id: number) => {
  console.info("deleteGroup operation");
  const { data } = await client.delete(`groups/${id}`, {
    headers: {
      Authorization: `Bearer ${getItem("auth")}`,
      "Access-Control-Allow-Origin": "*",
    },
    timeout: 5000,
  });
  return data;
};

export function useDeleteGroup() {
  return useMutation((id: number) => deleteGroup(id), {
    onError: (error: any) => {
      // showError(error);
      console.log(error);
    },
    onSuccess: (data: any) => {},
  });
}
