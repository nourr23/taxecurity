import { client } from "../../global/apiClient";
import { getItem } from "../../../core/storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useSetWorker() {
  return useMutation(
    (data: any) =>
      client.patch(
        `admin/workers/${data.id}`,
        {
          type: data.type,
          status: data.status,
        },
        {
          headers: {
            Authorization: `Bearer ${getItem("auth")}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      ),
    {
      onError: (error: AxiosError<any>) => {
        // console.log(error);
      },

      onSuccess: (response) => {
        if (response.data.code === 200) {
          // navigation.navigate('CommentAdded');
        } else {
          // show error
        }
      },
    }
  );
}
