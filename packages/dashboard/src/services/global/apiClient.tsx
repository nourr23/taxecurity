import axios from "axios";
export const client = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 1000,
  // headers: {
  //   Authorization: `Bearer ${getItem("auth")}`,
  //   "Access-Control-Allow-Origin": "*",
  // },
});
