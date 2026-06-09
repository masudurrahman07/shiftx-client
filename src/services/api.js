import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.url && config.url.includes("[object")) {
    console.error(
      "Invalid API URL — object passed as ID instead of string:",
      config.url
    );
    return Promise.reject(
      new Error("Invalid request URL: object passed as ID")
    );
  }

  return config;
});

export default api;