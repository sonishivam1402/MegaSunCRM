import API from "./axios";

export const getAllUsers = async () => {
  try {
    const res = await API.get("/user");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("getAllUsers failed:", err);
    }
    throw err;
  }
};
