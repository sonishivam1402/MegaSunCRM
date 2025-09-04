import API from "./axios";

export const login = async ({ email, password }) => {
  const response = await API.post("/auth/sign-in", { email, password });

  if (response.data.accessToken) {
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("menus", JSON.stringify(response.data.menus)); 
  }

  return response.data;
};

export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await API.post("/auth/logout", { refreshToken });
    }
  } catch (err) {
    console.error("Logout API error:", err);
  } finally {
    localStorage.clear();
    window.location.href = "/login";
  }
};
