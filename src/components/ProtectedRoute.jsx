import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../utils/token";

export default function ProtectedRoute({ children, adminOnly }) {
  const token = getToken();
  const role = getRole();

  if (!token) return <Navigate to="/login" />;

  if (adminOnly && role !== "admin")
    return <Navigate to="/" />;

  return children;
}
