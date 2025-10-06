import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/Layout";
import UserDetailsPage from "../pages/userManagement/UserDetail";
import UserTypeDetail from "../pages/userManagement/UserTypeDetail";
import UserManagementWrapper from "../pages/userManagement/UserManagementWrapper";
import Products from "../pages/productManagement/Products";
import NotFound from "../pages/NotFound";
import LeadManagement from "../pages/leadManagement/LeadManagement";
import FollowUpManagement from "../pages/followUpManagement/FollowUpManagement";
import Quotation from "../pages/quotationManagement/Quotation";

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
        <Route path="/users" element={<UserManagementWrapper />} />
        <Route path="/users/:userId/details" element={<UserDetailsPage />} />
        <Route path="/userTypes/:userTypeId/details" element={<UserTypeDetail />} />

        <Route path="/leads" element={<LeadManagement/>} />
        <Route path="/Followups" element={<FollowUpManagement/>} />
        <Route path="/quotation" element={<Quotation/>} />

        <Route path="/products" element={<Products />} />
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
