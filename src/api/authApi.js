import axios from "axios"

import axiosClient from "api/axiosClient";
import { getRefreshTokenFromLocalStorage } from "utils/auth"

const authApi = {
  signIn(payload) {
    // payload = {
    //   email
    //   password
    // }

    const url = "/auth/sign_in";
    return axiosClient.post(url, { ...payload });
  },
  signUp(payload) {
    // payload = {
    //   name
    //   email
    //   title
    //   avatar
    //   password
    // }

    const url = "/auth/sign_up";
    return axiosClient.post(url, { ...payload });
  },

  refreshToken() {
    const url = `${process.env.REACT_APP_API_URL || "http:/localhost:8080/v1"}/auth/refresh_token`;
    const payload = { refreshToken: getRefreshTokenFromLocalStorage() };
    return axios.post(url, payload);
  }
};

export default authApi;
