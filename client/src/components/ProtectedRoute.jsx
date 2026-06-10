import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ children }) {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <p className="message">Ładowanie...</p>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
