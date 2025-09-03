import API from "./axios";

export const getTest = async () => {
  const response = await API.get("/test");
  return response.data;
};

