import API from "./axios";

// Get All Lead Sources
export const getAllLeadSources = async () => {
  try {
    const res = await API.get("/lead/source");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching lead sources", err);
    }
    throw err;
  }
}; 

// Create Lead Source
export const createLeadSource = async (data) => {
  try {
    const res = await API.post("/lead/source", {data});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in creating lead source", err);
    }
    throw err;
  }
};

// Update Lead Source
export const updateLeadSource = async (id, data) => {
  try {
    const res = await API.put(`/lead/source/${id}`, {data});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in updating lead source", err);
    }
    throw err;
  }
};

// Delete Lead Source
export const deleteLeadSource = async (id) => {
  try {
    const res = await API.delete(`/lead/source/${id}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in deleting lead source", err);
    }
    throw err;
  }
}; 


// Get All Lead Status
export const getAllLeadStatus = async () => {
  try {
    const res = await API.get("/lead/status");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching lead status", err);
    }
    throw err;
  }
}; 

// Create Lead Status
export const createLeadStatus = async (data) => {
  try {
    const res = await API.post("/lead/status", {data});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in creating lead status", err);
    }
    throw err;
  }
};

// Update Lead Status
export const updateLeadStatus = async (id, data) => {
  try {
    const res = await API.put(`/lead/status/${id}`, {data});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in updating lead status", err);
    }
    throw err;
  }
};

// Delete Lead Status
export const deleteLeadStatus = async (id) => {
  try {
    const res = await API.delete(`/lead/status/${id}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in deleting lead status", err);
    }
    throw err;
  }
}; 


// Get All Lead Types
export const getAllLeadTypes = async () => {
  try {
    const res = await API.get("/lead/types");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching lead types", err);
    }
    throw err;
  }
}; 

// Create Lead Type
export const createLeadType = async (data) => {
  try {
    const res = await API.post("/lead/type", {data});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in creating lead type", err);
    }
    throw err;
  }
};

// Update Lead Types
export const updateLeadType = async (id, data) => {
  try {
    const res = await API.put(`/lead/type/${id}`, {data});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in updating lead type", err);
    }
    throw err;
  }
};

// Delete Lead Types
export const deleteLeadType = async (id) => {
  try {
    const res = await API.delete(`/lead/type/${id}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in deleting lead type", err);
    }
    throw err;
  }
}; 