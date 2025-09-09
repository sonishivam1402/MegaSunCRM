import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/Layout";
import UserDetailsPage from "../pages/userManagement/UserDetail";
import UserTypeDetail from "../pages/userManagement/UserTypeDetail";
import UserManagementWrapper from "../pages/userManagement/UserManagementWrapper";

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
        <Route path="/users" element={<UserManagementWrapper/>} />
        <Route path="/users/:userId/details" element={<UserDetailsPage />} />
        <Route path="/userTypes/:userTypeId/details" element={<UserTypeDetail />} />

      </Route>
    </Routes>
  );
}
