import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, logout as apiLogout } from "../api/authApi";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Validate token and load from localStorage on mount (only once)
  useEffect(() => {
    const validateAndLoadAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const storedMenus = localStorage.getItem("menus");

      // If no stored data, just set loading to false
      if (!storedUser || !storedMenus) {
        setLoading(false);
        return;
      }

      // If stored data exists, validate token by trying to refresh it
      try {
        await API.post("/auth/refreshToken");
        // If refresh succeeds, tokens are valid - load user data
        setUser(JSON.parse(storedUser));
        setMenus(JSON.parse(storedMenus));
      } catch (err) {
        // If refresh fails, tokens are expired - clear everything
        // console.log("Token validation failed, clearing auth data");
        localStorage.clear();
        setUser(null);
        setMenus([]);
        // Redirect to login if not already there
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    validateAndLoadAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures this runs only once on mount

  // Save user + menus
  const saveAuthData = (authData) => {
    setUser(authData.user);
    setMenus(authData.menus);

    localStorage.setItem("user", JSON.stringify(authData.user));
    localStorage.setItem("menus", JSON.stringify(authData.menus));
  };

  // Clear data
  const clearAuthData = () => {
    setUser(null);
    setMenus([]);
    localStorage.clear();
  };

  // Login
  const login = async (credentials) => {
    const data = await apiLogin(credentials); // { user, menus }
    saveAuthData(data);
    navigate("/");
  };

  // Logout
  const logout = async () => {
    try {
      await apiLogout(); // No tokens passed
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      clearAuthData();
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      menus,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
