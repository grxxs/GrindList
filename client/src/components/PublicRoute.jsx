import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function PublicRoute({ children }) {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <p className="message">Ładowanie...</p>;
  }

  if (user) {
    return <Navigate to="/library" replace />;
  }

  return children;
}

export default PublicRoute;
