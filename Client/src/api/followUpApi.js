import API from "./axios";

// Get Follow-ups
export const getFollowUps = async (apiParams) => {
  try {
    const res = await API.get(`/followUp/filter`,{
        params : {
            filter : apiParams.filter,
            limit : apiParams.limit,
            offset : apiParams.offset
        }
    });
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching follow-ups", err);
    }
    throw err;
  }
};

// Get Follow-up by lead id
export const getFollowUpByLeadId = async (id) => {
  try {
    //console.log(id);
    const res = await API.get(`/followUp/lead/${id}`);
    //console.log(res.data);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching follow-up by Id", err);
    }
    throw err;
  }
};

export const getLastFollowUpByLeadId = async (id) => {
  try {
    //console.log(id);
    const res = await API.get(`/followUp/lead/last/${id}`);
    //console.log(res.data);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching last follow-up by LeadId", err);
    }
    throw err;
  }
};

// Get Follow-up by id
export const getFollowUpById = async (id) => {
  try {
    const res = await API.get(`/followUp/${id}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching follow-up by Id", err);
    }
    throw err;
  }
};

// Delete Follow-up by id
export const deleteFollowUpById = async (id) => {
  try {
    const res = await API.delete(`/followUp/${id}`);
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in deleting follow-up by Id", err);
    }
    throw err;
  }
};

// Update Follow-up by id
export const updateFollowUpById = async (id, comment) => {
  try {
    const res = await API.put(`/followUp/${id}`, {comment});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in updating follow-up by Id", err);
    }
    throw err;
  }
};

// Create New Follow-up
export const createFollowUp = async (leadId, leadStatusId, comment, nextFollowUpDate) => {
  try {
    const res = await API.post(`/followUp`, {leadId, leadStatusId, comment, nextFollowUpDate});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in creating follow-up", err);
    }
    throw err;
  }
};

// Export CSV
export const exportFollowUp = async () => {
  try {
    const res = await API.get("/followUp/export-csv" , {
      responseType : 'blob',
    });
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in exporting follow-up", err);
    }
    throw err;
  }
};
