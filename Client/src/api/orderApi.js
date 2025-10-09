import API from "./axios";

// Get Orders
export const getOrders = async ({search, offset, limit, type, assignedTo}) => {
  try {
    const res = await API.get(`/order`,{
        params : {search, offset, limit, type, assignedTo}
    });
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching orders", err);
    }
    throw err;
  }
};

// Get order by id
export const getOrderById = async (id) => {
  try {
    const res = await API.get(`/order/${id}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching order by Id", err);
    }
    throw err;
  }
};

// Get last followup by order id
export const getLastFollowupByOrderId = async (id) => {
  try {
    const res = await API.get(`/order/last-followup/${id}`);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching last follow-up by order Id", err);
    }
    throw err;
  }
};

// Delete Order by id
export const deleteOrderById = async (id) => {
  try {
    const res = await API.delete(`/order/${id}`);
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in deleting order by Id", err);
    }
    throw err;
  }
};

// Create Order
export const createNewOrder = async (data) => {
  try {
    const res = await API.post(`/order`,{data});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in creating order", err);
    }
    throw err;
  }
};

// Update Order By Id
export const updateOrderById = async (id, data) => {
  try {
    const res = await API.put(`/order/${id}`,{data});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in updating order by Id", err);
    }
    throw err;
  }
};

// Export CSV
export const exportOrders = async () => {
  try {
    const res = await API.get("/order/export-csv" , {
      responseType : 'blob',
    });
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in exporting orders", err);
    }
    throw err;
  }
};