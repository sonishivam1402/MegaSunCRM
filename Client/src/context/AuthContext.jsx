import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, logout as apiLogout } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user + token from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedMenus = localStorage.getItem("menus");

    if (storedToken && storedUser && storedMenus) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setMenus(JSON.parse(storedMenus));
    }

    setLoading(false);
  }, []);

  // Login function
  const login = async (credentials) => {
    const data = await apiLogin(credentials); // { token, user }
    setToken(data.token);
    setUser(data.user);
    setMenus(data.menus);

    // persist to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("menus", JSON.stringify(data.menus));

    navigate("/"); // redirect after login
  };

  // Logout function
  const logout = () => {
    apiLogout();

    // clear state
    setToken(null);
    setUser(null);
    setMenus([]);

    // clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("menus");

    navigate("/login"); // redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, menus, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
