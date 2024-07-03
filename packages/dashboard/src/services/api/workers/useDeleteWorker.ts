import { client } from "../../global/apiClient";
import { getItem } from "../../../core/storage";
import { useMutation } from "@tanstack/react-query";

const deleteWorker = async (id: number) => {
  console.info("deleteWorker operation");
  const { data } = await client.delete(`admin/workers/${id}`, {
    headers: {
      Authorization: `Bearer ${getItem("auth")}`,
      "Access-Control-Allow-Origin": "*",
    },
    timeout: 5000,
  });
  return data;
};

export function useDeleteWorker() {
  return useMutation((id: number) => deleteWorker(id), {
    onError: (error: any) => {
      // showError(error);
      console.log(error);
    },
    onSuccess: (data: any) => {},
  });
}
