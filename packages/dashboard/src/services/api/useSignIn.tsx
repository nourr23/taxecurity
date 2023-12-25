import { useMutation } from "@tanstack/react-query";
import { client } from "../global/apiClient";
import { useAuth } from "../../core/auth";

export function useSignIn() {
  const { signIn } = useAuth();
  return useMutation(
    (data: any) => client.post("admin/auth/signin", data, { timeout: 5000 }),
    // .catch((error) => console.log(error)),
    {
      onError: (error: any) => {
        // console.log(error.response);
      },
      onSuccess(response) {
        signIn(response.data.access_token);
        console.log('1')
      },
    }
  );
}
