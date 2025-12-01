import axios from "axios";

const EXTERNAL_API_BASE = "https://api.megakitchensystem.in";

// Get all products with pagination and search
export const getAllProducts = async ({
  SearchTerm = "",
  PageNumber = 1,
  PageSize = 10,
}, options = {}) => {
  try {
    const response = await axios.get(`${EXTERNAL_API_BASE}/Product/GetProducts`, {
      params: {
        SearchTerm,
        PageNumber,
        PageSize
      },
      timeout: 10000,
      headers: {
        'Accept': 'application/json'
      },
      ...options // Include abort signal if provided
    });
    
    // Transform the data to only send what frontend needs
    if (response.data?.data?.items) {
      const transformedData = {
        items: response.data.data.items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          productCategoryName: item.productCategoryName,
          productImage: item.productImages?.[0],
          price: item.price
        })),
        totalCount: response.data.data.totalCount || 0,
        pageNumber: response.data.data.pageNumber || PageNumber,
        pageSize: response.data.data.pageSize || PageSize
      };
      
      return { data: transformedData };
    }
    
    return response.data;
  } catch (error) {
    console.error("getAllProducts failed:", error);
    throw error;
  }
};

// Get Product Options for Dropdown
export const getProductOptions = async () => {
  try {
    const response = await axios.get(`${EXTERNAL_API_BASE}/Product/GetProductOptions/lookup`, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("getProductOptions failed:", error);
    throw error;
  }
};