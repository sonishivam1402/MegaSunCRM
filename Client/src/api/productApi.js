import API from "./axios";

// Get All Products
export const getAllProducts = async ({
  SearchTerm = "",
  PageNumber = 1,
  PageSize = 10,
}) => {
  try {
    const res = await API.get("/products", {
      params: {
        SearchTerm,
        PageNumber,
        PageSize
      }
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.status !== 401) {
      console.error("getAllProducts failed:", err);
    }
    throw err;
  }
};
