import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 1000,
  headers: {
    // Authorization: `Bearer ${getAuthToken()}`,
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInBob25lX251bWJlciI6Ijk5ODg3NzQ0IiwiaWF0IjoxNjkyMTgyMDQ3LCJleHAiOjE2OTIyMDIxNDd9.cdTarN0IAMFt-eVAcltHbNXC6U23eFjNf8fbi8w4bOg`,
  },
});
