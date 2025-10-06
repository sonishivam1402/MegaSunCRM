import API from "./axios";

// Get Quotations
export const getQuotations = async ({search, offset, limit, type, assignedTo}) => {
  try {
    const res = await API.get(`/quotation`,{
        params : {search, offset, limit, type, assignedTo}
    });
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching quotations", err);
    }
    throw err;
  }
};

// Get quotation by id
export const getQuotationById = async (id) => {
  try {
    const res = await API.get(`/quotation/${id}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching quotation by Id", err);
    }
    throw err;
  }
};

// Get last followup by quotation id
export const getLastFollowupByQuotationId = async (id) => {
  try {
    const res = await API.get(`/quotation/followup/${id}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching last follow-up by quotation Id", err);
    }
    throw err;
  }
};

// Delete Quotation by id
export const deleteQuotationById = async (id) => {
  try {
    const res = await API.delete(`/quotation/${id}`);
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in deleting quotation by Id", err);
    }
    throw err;
  }
};

// Create Quotation
export const createQuotations = async (data) => {
  try {
    const res = await API.post(`/quotation`,{data});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in creating quotation", err);
    }
    throw err;
  }
};

// Export CSV
export const exportQuotation = async () => {
  try {
    const res = await API.get("/quotation/export-csv" , {
      responseType : 'blob',
    });
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in exporting quotations", err);
    }
    throw err;
  }
};