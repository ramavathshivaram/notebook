import axios from "axios";
import { toast } from "sonner";
import { refreshTokenApi } from "./api.js";
import useAuthStore from "../store/auth.store.js";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

const refreshFunc = async (originalRequest) => {
  try {
    const token = await refreshTokenApi();

    useAuthStore.getState().setToken(token);

    originalRequest.headers.Authorization = `Bearer ${token}`;

    return api(originalRequest);
  } catch (refreshError) {
    toast.error("Session expired. Please login again.");

    useAuthStore.getState().clearUser();

    return Promise.reject(refreshError);
  }
};

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      return refreshFunc(originalRequest);
    }

    toast.error(message);
    return Promise.reject(message);
  },
);

export default api;
