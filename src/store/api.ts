import axios from "axios";
import router from "@/router";

const api = axios.create({
  baseURL: "http://163.5.242.173:7007",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
      router.push("/auth/login");
    }

    return Promise.reject(error);
  }
);

export default api;
