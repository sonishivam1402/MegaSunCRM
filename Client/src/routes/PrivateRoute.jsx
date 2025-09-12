import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { token, user, loading, menus } = useAuth();

  if (loading) { return <div>Loading...</div>; }

  if (!token || !user) { return <Navigate to="/login" replace />; }

  return children ? children : <Outlet />;
}