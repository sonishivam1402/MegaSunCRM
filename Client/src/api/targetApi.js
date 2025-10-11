import API from "./axios";

// Get Targets
export const getTargets = async ({ offset, limit }) => {
  try {
    const res = await API.get(`/target`, {
      params: { offset, limit }
    });
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching targets", err);
    }
    throw err;
  }
};

// Get target by user id
export const getTargetByUserId = async ({ userId, offset, limit }) => {
  try {
    const res = await API.get(`/target/detail`, {
      params: { userId, offset, limit }
    });
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching target by user Id", err);
    }
    throw err;
  }
};

// Get order by user id and month
export const getOrderByUserIdAndMonth = async ({ offset, limit, month, year, userId }) => {
  try {
    const res = await API.get(`/target/order`, {
      params: { offset, limit, month, year, userId }
    });
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching order by user Id and month", err);
    }
    throw err;
  }
};

// Create Target
export const createNewTarget = async (data) => {
  try {
    const res = await API.post(`/target`, { data });
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in creating target", err);
    }
    throw err;
  }
};