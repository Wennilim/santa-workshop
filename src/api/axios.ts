import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { useGlobalStore } from "../stores/useGlobalStore";

export const serverAxiosParams = {
  baseURL: import.meta.env.VITE_API_URL,
};

export const serverAxiosInstance = axios.create(serverAxiosParams);

serverAxiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

serverAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const res = error.response;

    if (res && res.status === 401) {
      useGlobalStore.getState().setIsAuthError(true);
    }

    if (res && res.status === 500) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

const api = (axiosInstance: AxiosInstance) => {
  return {
    get: (url: string, config?: AxiosRequestConfig) =>
      axiosInstance.get(url, config),
    delete: (url: string, config?: AxiosRequestConfig) =>
      axiosInstance.delete(url, config),
    post: (
      url: string,
      body: object[] | object | string,
      config?: AxiosRequestConfig,
    ) => axiosInstance.post(url, body, config),
    put: (
      url: string,
      body: object[] | object | string,
      config?: AxiosRequestConfig,
    ) => axiosInstance.put(url, body, config),
    patch: (
      url: string,
      body: object[] | object | string,
      config?: AxiosRequestConfig,
    ) => axiosInstance.patch(url, body, config),
  };
};

export const serverApi = api(serverAxiosInstance);
