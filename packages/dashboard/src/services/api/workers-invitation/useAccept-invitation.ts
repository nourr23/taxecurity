import { client } from "../../global/apiClient";
import { getItem } from "../../../core/storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useAcceptInvitation() {
  return useMutation(
    (data: any) =>
      client.post(`workers/invitations/accept`, {
        destination: data.email,
        code: data.code,
      }),
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
