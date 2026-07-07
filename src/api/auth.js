import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const loginUser = (data) => {
  return axios.post(`${API_URL}/auth/login`, data);
};

export const registerUser = (data) => {
  return axios.post(`${API_URL}/auth/register`, data);
};
