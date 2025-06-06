import axios from "axios";

export const api = axios.create({
 baseURL: "https://money-guard-backend-3e63.onrender.com/api-docs",
});

export const setToken = (token) => {
 api.defaults.headers.common.Authorization = `Bearer ${token}`;
 localStorage.setItem("authToken", token);
};

export const clearToken = () => {
 api.defaults.headers.common.Authorization = "";
 localStorage.removeItem("authToken");
};

export const initializeToken = () => {
 const token = localStorage.getItem("authToken");
 if (token) {
  setToken(token);
 }
};
