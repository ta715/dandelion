import Axios, { AxiosRequestConfig } from "axios";

export const axios = Axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080",
});

axios.interceptors.response.use(
  (response) => {
    console.log(response.data);
    return response.data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
