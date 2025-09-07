import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserManagement from "./UserManagement";

export default function UserManagementWrapper() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect regular users to their own profile
    if (user && !user.IsAdmin) {
      navigate(`/users/${user.UserId}/details`);
    }
  }, [user, navigate]);
  
  // Only render UserManagement for admins
  if (user?.IsAdmin) {
    return <UserManagement />;
  }
  
  return null;
}