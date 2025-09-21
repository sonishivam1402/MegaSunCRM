import API from "./axios";

// Get All Users
export const getAllUsers = async ({ search = "", limit = 10, offset = 0, status, userTypeId }) => {
  try {
    const res = await API.get("/user", {
      params: { search, limit, offset, status, userTypeId },
    });
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
    //console.log("API Call Data : ", data);
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

// Update User Image By Id
export const updateImageByUserId = async (data) => {
  try {
    //console.log(data);
    const res = await API.post("/user/updateImage", data );
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Image update failed:", err);
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

// Update Password
export const updateUserPassword = async (newPassword) => {
  try {
    const res = await API.post("/user/updatePassword", {newPassword});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Update Password failed:", err);
    }
    throw err;
  }
};

// Create User Type
export const createUserType = async (payload) => {
  try {
    const res = await API.post("/user/createUserType", payload);
    //console.log(res);
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Create User Type failed:", err);
    }
    throw err;
  }  
}


// Create User Type
export const updateUserType = async (id, payload) => {
  try {
    const res = await API.post(`/user/userTypes/${id}`, payload);
    //console.log(res);
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Updating User Type failed:", err);
    }
    throw err;
  }  
}

// Get User Type By Id
export const getUserTypeById = async (id) => {
  try {
    const res = await API.get(`/user/userTypes/${id}`);
    //console.log(res);
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Get User Type  by Id failed:", err);
    }
    throw err;
  }  
}

// Get All Users for Dropdown
export const getAllUsersDD = async () => {
  try {
    const res = await API.get("/user/usersDropdown");
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching users for dropdown", err);
    }
    throw err;
  }
}; 