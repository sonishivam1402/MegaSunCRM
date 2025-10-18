import API from "./axios";

// Get Dashboard Data
export const getDashboardData = async () => {
  try {
    const res = await API.get("/dashboard");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching dashboard data : ", err);
    }
    throw err;
  }
};