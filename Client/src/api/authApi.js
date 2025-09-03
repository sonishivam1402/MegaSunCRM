import API from "./axios";

export const login = async ({ email, password }) => {
  const response = await API.post("/auth/sign-in", { email, password });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("menus", JSON.stringify(response.data.menus)); 
  }

  return response.data; // contains token + user
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
