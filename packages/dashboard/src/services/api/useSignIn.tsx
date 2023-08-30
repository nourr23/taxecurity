import { useMutation } from "@tanstack/react-query";
import { client } from "../global/apiClient";

export function useSignIn() {
  return useMutation(
    (data: any) => client.post("/auth/signin", data, { timeout: 5000 }),
    {
      onError: (error: any) => {
        console.log({ error });
      },
    }
  );
}
