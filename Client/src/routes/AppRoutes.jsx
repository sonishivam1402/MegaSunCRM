import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/Layout";
import UserManagement from "../pages/userManagement/UserManagement";
import UserDetailsPage from "../pages/userManagement/UserDetail";
import UserTypeDetail from "../pages/userManagement/UserTypeDetail";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Private */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />

        {/* add more private pages here */}
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/users/:userId/details" element={<UserDetailsPage />} />
        <Route path="/userTypes/:userTypeId/details" element={<UserTypeDetail />} />

      </Route>
    </Routes>
  );
}
