import API from "./axios";

export const login = async ({ email, password }) => {
  const response = await API.post("/auth/sign-in", { email, password });
  return response.data; // contains { user, menus }
};

export const logout = async () => {
  await API.post("/auth/logout");
};
