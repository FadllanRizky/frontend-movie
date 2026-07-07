// SIMPAN TOKEN & ROLE
export const saveAuth = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

// AMBIL TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};

// AMBIL ROLE
export const getRole = () => {
  return localStorage.getItem("role");
};

// CEK ROLE
export const isAdmin = () => getRole() === "admin";
export const isUser = () => getRole() === "user";

// HAPUS AUTH (LOGOUT)
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
