import { Navigate } from "react-router-dom";

export default function SuperAdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== "superAdmin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}