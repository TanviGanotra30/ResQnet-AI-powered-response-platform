/**
 * src/components/ProtectedRoute.jsx
 * Redirects to login if user is not logged in or not admin.
 */

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
