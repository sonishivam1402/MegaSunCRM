import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import TopNavbar from "../components/TopNavBar";

export default function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SideMenu />

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Navbar */}
        <TopNavbar />

        {/* Page content */}
        <div style={{ flex: 1, padding: "0px", overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
