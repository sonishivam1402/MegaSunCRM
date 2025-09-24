import API from "./axios";

export const login = async ({ email, password }) => {
  const response = await API.post("/auth/sign-in", { email, password });
  return response.data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    await API.post("/auth/logout", { refreshToken });
  }
};