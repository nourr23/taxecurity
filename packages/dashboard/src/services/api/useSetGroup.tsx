import { client } from "../global/apiClient";
import { getItem } from "../../core/storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useSetGroup() {
  return useMutation(
    (data: any) =>
      client.patch(
        `groups/${data.id}`,
        {
          active: data.active,
          name: data.name,
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
