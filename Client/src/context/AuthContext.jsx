import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, logout as apiLogout } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // access token
  const [refreshToken, setRefreshToken] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

    setToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setUser(data.user);
    setMenus(data.menus);

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("menus", JSON.stringify(data.menus));

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
    }

    // clear state
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    setMenus([]);

    // clear localStorage
    localStorage.clear();

    navigate("/login");
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

// Custom hook
export const useAuth = () => useContext(AuthContext);
