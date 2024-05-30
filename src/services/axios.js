import axios from "axios";

axios.defaults.baseURL = "http://localhost:1337/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axios;
