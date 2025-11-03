import API from "./axios";

export const getNotify = async () => {
  try {
    const res = await API.get("/notify");
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in fetching notifications ", err);
    }
    throw err;
  }
};

export const markNotifyAsRead = async (id) => {
  try {
    const res = await API.put(`/notify/${id}`);
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in updating notifications ", err);
    }
    throw err;
  }
};

export const markAllNotifyAsRead = async ({notifyIds}) => {
  try {
    const res = await API.put(`/notify/markAllAsRead`, {notifyIds});
    return res;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("Error in updating notifications ", err);
    }
    throw err;
  }
};
