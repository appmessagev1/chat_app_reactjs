import axios from "axios";
import { parse, stringify } from "qs";

import { getTokenFromLocalStorage } from "utils/auth";
import authApi from "api/authApi";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

axiosClient.interceptors.request.use(
  async config => {
    if (config.url === "/users/sign_in" || config.url === "/users/sign_up") return config;
    config.headers = {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      "Content-Type": "application/json",
    };
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await authApi.refreshToken();
        if (data && data.error_code === 0) {
          const { access_token, refresh_token } = data.data;
          localStorage.setItem("token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
          return axiosClient(originalRequest);
        }
      } catch (e) {
        window.location.href = "/sign_in";
      }
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
