// import type { AxiosError } from "axios";
// import { createQuery } from "react-query-kit";
// import { client } from "../global/apiClient";
// import { getItem } from "../../core/storage";

// type Response = [];
// // type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

// export const useUsers = createQuery<Response, Variables, AxiosError>({
//   primaryKey: "users", // we recommend using  endpoint base url as primaryKey
//   queryFn: async (variables: Variables) => {
//     return client
//       .get(`users/filtered?lastName=${variables.lastName}`, {
//         headers: {
//           Authorization: `Bearer ${getItem("auth")}`,
//           "Access-Control-Allow-Origin": "*",
//         },
//       })
//       .then((response) => response.data)
//       .catch((error) => {
//         console.log("error.response");
//         console.log(error.response);
//         throw error;
//       });
//   },
// });

import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";
import { client } from "../global/apiClient";
import { getItem } from "../../core/storage";
import { useQuery } from "@tanstack/react-query";

type Variables = {
  email: string;
  firstName: string;
  lastName: string;
  phone_number: string;
};

type Pagination = {
  pageNumber?: number;
  limitPerPage?: number;
};
const getFilteredUser = async (variables: string, pagination: Pagination) => {
  const { data } = await client.get(
    `users/filtered?lastName=${variables}&firstName=${variables}&email=${variables}&phone_number=${variables}&skip=${pagination.pageNumber}`,
    {
      timeout: 2000, // since it can be heavy too
      headers: {
        Authorization: `Bearer ${getItem("auth")}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return data;
};

export function useUsers(variables: string, pagination: Pagination) {
  return useQuery<any>(
    ["users", variables, pagination],
    () => getFilteredUser(variables, pagination),
    {
      retry: true,
      keepPreviousData: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      cacheTime: 1000 * 60 * 60,
      // enabled: variables.length > 2 || variables.length === 0,
      onError: (error: any) => {
        // showError(error);
      },
      onSuccess(data) {},
    }
  );
}
