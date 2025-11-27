import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, logout as apiLogout } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load from localStorage (optional)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedMenus = localStorage.getItem("menus");

    if (storedUser && storedMenus) {
      setUser(JSON.parse(storedUser));
      setMenus(JSON.parse(storedMenus));
    }

    setLoading(false);
  }, []);

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
