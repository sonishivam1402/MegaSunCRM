import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, logout as apiLogout } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Helper function to save auth data
  const saveAuthData = (authData) => {
    setToken(authData.accessToken);
    setRefreshToken(authData.refreshToken);
    setUser(authData.user);
    setMenus(authData.menus);

    localStorage.setItem("token", authData.accessToken);
    localStorage.setItem("refreshToken", authData.refreshToken);
    localStorage.setItem("user", JSON.stringify(authData.user));
    localStorage.setItem("menus", JSON.stringify(authData.menus));
  };

  // Helper function to clear auth data
  const clearAuthData = () => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    setMenus([]);
    localStorage.clear();
  };

  // Load user + tokens from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");
    const storedMenus = localStorage.getItem("menus");

    if (storedToken && storedRefreshToken && storedUser && storedMenus) {
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
      setUser(JSON.parse(storedUser));
      setMenus(JSON.parse(storedMenus));
    }

    setLoading(false);
  }, []);

  // Login function
  const login = async (credentials) => {
    const data = await apiLogin(credentials);
    saveAuthData(data); // Use helper function
    navigate("/");
  };

  // Logout function
  const logout = async () => {
    try {
      if (refreshToken) {
        await apiLogout();
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Always clear data and navigate, even if API call fails
      clearAuthData(); // Use helper function
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      refreshToken, 
      login, 
      logout, 
      menus, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);