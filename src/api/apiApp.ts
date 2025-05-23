import type { AxiosInstance } from "axios";
import axios from "axios";
import Cookies from "js-cookie";
import { removeCredentials } from "../utils/global";


export const apiApp: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

export const getUserToken = () => {
  return Cookies.get("access_token");
};

apiApp.interceptors.request.use((config) => {
  const token = getUserToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = "application/json";
  }

  return config;
});

apiApp.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.data.message === "Unauthenticated.") {
        removeCredentials();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
