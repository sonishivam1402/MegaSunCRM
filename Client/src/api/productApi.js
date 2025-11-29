import API from "./axios";

// Get all products with pagination and search
export const getAllProducts = async ({
  SearchTerm = "",
  PageNumber = 1,
  PageSize = 10,
}, options = {}) => {
  try {
    const response = await API.get("/products", {
      params: {
        SearchTerm,
        PageNumber,
        PageSize
      },
      ...options // Include abort signal if provided
    });
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status !== 401) {
      console.error("getAllProducts failed:", error);
    }
    throw error;
  }
};

// Get Product Options for Dropdown
export const getProductOptions = async () => {
  try {
    const response = await API.get("/products/products");
    return response.data;
  } catch (error) {
    console.error("getProductOptions failed:", error);
    throw error;
  }
};