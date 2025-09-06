import API from "./axios";

// Get All Users
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

// Get User By Id
export const getUserById = async (id) => {
  try {
    const res = await API.get(`/user/${id}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Get User by Id failed:", err);
    }
    throw err;
  }
};

// Create New User
export const createNewUser = async (data) => {
  try {
    //console.log("API Call Data : ", user);
    const res = await API.post("/user/createNewUser", data);
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Create new user failed:", err);
    }
    throw err;
  }
};

// Update User By Id
export const updateUserById = async (id, data) => {
  try {
    //console.log(user);
    const res = await API.post(`/user/${id}`, data );
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Update user failed:", err);
    }
    throw err;
  }
};

// Get All User Types
export const getAllUserType = async (UserTypeId) => {
  try {
    const res = await API.post("/user/userTypes", { UserTypeId });
    return res.data.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Get User Types failed:", err);
    }
    throw err;
  }
};


// Get All User Type Names for Dropdown
export const getAllUserTypeNames = async () => {
  try {
    const res = await API.get("/user/userTypeNames");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Get User Types failed:", err);
    }
    throw err;
  }
};