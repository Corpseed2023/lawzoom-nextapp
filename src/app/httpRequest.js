import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_AUTH,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
export const complianceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_GET,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
