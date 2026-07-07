import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMovies = () => axios.get(`${API_URL}/movies`);
export const addMovie = (data) => axios.post(`${API_URL}/movies`, data, authHeader());
export const updateMovie = (id, data) =>
  axios.put(`${API_URL}/movies/${id}`, data, authHeader());
export const deleteMovie = (id) =>
  axios.delete(`${API_URL}/movies/${id}`, authHeader());
