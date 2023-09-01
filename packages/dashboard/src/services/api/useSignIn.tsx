import { useMutation } from "@tanstack/react-query";
import { client } from "../global/apiClient";

export function useSignIn() {
  return useMutation(
    (data: any) =>
      client
        .post("/auth/signin", data, { timeout: 5000 }),
        // .catch((error) => console.log(error)),
    {
      onError: (error: any) => {
        // console.log(error.response);
      },
      onSuccess(data) {},
    }
  );
}
