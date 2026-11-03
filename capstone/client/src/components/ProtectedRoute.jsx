import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

export default function ProtectedRoute(props) {
  const auth = useAuth();
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
}
