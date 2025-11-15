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

export const getDashboardLeadershipData = async () => {
  try {
    const res = await API.get("/dashboard/users");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching dashboard leadership data : ", err);
    }
    throw err;
  }
};

// Get Dashboard Products Data
export const getDashboardProducts = async (startDate, endDate) => {
  try {
    const res = await API.get("/dashboard/products",{
      params : {
        startDate,
        endDate
      }
    });
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching dashboard products data : ", err);
    }
    throw err;
  }
};