import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getToken, logout } from "./auth";

export const API_URL = "http://localhost:3001";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error?.response?.status;

    if (status === 401) {
      logout();
    }

    return Promise.reject(error);
  }
);

export async function loginRequest(email: string, password: string) {
  try {
    const res = await api.post("/login", {
      email,
      password,
    });

    return res.data;
  } catch (err: any) {
    const message =
      err?.response?.data?.error || "Erreur de connexion";

    throw new Error(message);
  }
}