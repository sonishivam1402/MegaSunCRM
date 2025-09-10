import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserManagement from "./UserManagement";

export default function UserManagementWrapper() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.IsAdmin) {
    return <UserManagement />;
  }

  // Regular user → force redirect to their details page
  return <Navigate to={`/users/${user.UserId}/details`} replace />;
}
