import axios from "axios";
import { getItem } from "../../core/storage";
console.log("from api client", getItem("auth"));
export const client = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 1000,
  // headers: {
  //   Authorization: `Bearer ${getItem("auth")}`,
  //   "Access-Control-Allow-Origin": "*",
  // },
});
