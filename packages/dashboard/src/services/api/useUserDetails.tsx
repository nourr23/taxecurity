import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";
import { client } from "../global/apiClient";
import { getItem } from "../../core/storage";

type Response = [];
type Variables = { id: string }; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useUserDetails = createQuery<Response, Variables, AxiosError>({
  primaryKey: "userDetails", // we recommend using  endpoint base url as primaryKey
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return client
      .get(`users/${variables.id}`, {
        headers: {
          Authorization: `Bearer ${getItem("auth")}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log("error.response");
        console.log(error.response);
        throw error;
      });
  },
});
