import axios from "axios";
import { getToken } from "../utils/token";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const getProfile = () => {
  return axios.get(`${API_URL}/profil`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
