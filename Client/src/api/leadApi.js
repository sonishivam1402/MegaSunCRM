import API from "./axios";

// Get All Leads
export const getAllLeads = async ({ search = "", limit = 10, offset = 0, status, leadTypeId }) => {
  try {
    const res = await API.get("/lead", {
      params: { search, limit, offset, status, leadTypeId },
    });
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching all leads", err);
    }
    throw err;
  }
};

// Get All Leads for Dropdown
export const getLeadsDD = async () => {
  try {
    const res = await API.get("/lead/dropdown");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching leads for dropdown", err);
    }
    throw err;
  }
}; 

// Get All New Leads
export const getAllNewLeads = async ({ search = "", limit = 10, offset = 0, status, leadTypeId }) => {
  try {
    const res = await API.get("/lead/newLeads", {
      params: { search, limit, offset, status, leadTypeId },
    });
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching new leads", err);
    }
    throw err;
  }
};

// Get Lead By Id
export const getLeadById = async (id) => {
  try {
    const res = await API.get(`/lead/${id}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error(`Error in fetching lead by ${id}`, err);
    }
    throw err;
  }
};

// Create New Lead
export const createNewLead = async (lead) => {
  try {
    const res = await API.post("/lead", lead);
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Create new lead failed:", err);
    }
    throw err;
  }
};

// Update Lead By Id
export const updateLeadById = async (id, lead) => {
  try {
    const res = await API.put(`/lead/${id}`, lead);
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("update lead failed:", err);
    }
    throw err;
  }
};

// Delete Lead By Id
export const deleteLeadById = async (id) => {
  try {
    const res = await API.delete(`/lead/${id}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in deleting lead by Id", err);
    }
    throw err;
  }
}; 

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

// Get All Lead Sources for Dropdown
export const getAllLeadSourcesDD = async () => {
  try {
    const res = await API.get("/lead/sourceDropdown");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching lead sources for dropdown", err);
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

// Get All Lead Status for Dropdown
export const getAllLeadStatusDD = async () => {
  try {
    const res = await API.get("/lead/statusDropdown");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching lead status for dropdown", err);
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

// Get All Lead Types for Dropdown
export const getAllLeadTypesDD = async () => {
  try {
    const res = await API.get("/lead/typesDropdown");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching lead types for dropdown", err);
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