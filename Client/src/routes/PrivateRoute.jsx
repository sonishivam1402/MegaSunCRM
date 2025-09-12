import { Navigate, Outlet, useLocation, matchPath } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { token, user, loading, menus } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;
  if (!token || !user) return <Navigate to="/login" replace />;

  const currentPath = location.pathname;

  const menu = menus?.find(m =>
    matchPath({ path: m.NavigationPath + "/*" }, currentPath)
  );

  if (menu && !menu.ReadAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!menu) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
}
