import axios from "axios";
import { SERVER_ADDRESS } from "./apis";

// axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: SERVER_ADDRESS,
  headers: {
    ["Content-Type"]: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axiosInstance;
