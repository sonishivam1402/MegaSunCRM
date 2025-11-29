import axios from "axios";

export const getProducts = async (req, res, next) => {
  try {
    const { SearchTerm = "", PageSize = 10, PageNumber = 1 } = req.query;
    
    const response = await axios.get("https://api.megakitchensystem.in/Product/GetProducts", {
      params: {
        SearchTerm,
        PageNumber,
        PageSize
      },
      timeout: 10000,
      headers: {
        'Accept': 'application/json'
      }
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
      
      return res.json({ data: transformedData });
    }
    
    return res.json(response.data);
    
  } catch (err) {
    console.error("Error fetching products:", err.message);
    
    if (err.code === 'ECONNABORTED') {
      return res.status(504).json({ message: "Request timeout" });
    }
    
    if (err.response) {
      return res.status(err.response.status).json({ 
        message: "External API error",
        details: err.response.data?.message || err.message
      });
    }
    
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductOptions = async (req, res, next) => {
  try {
    const response = await axios.get("https://api.megakitchensystem.in/Product/GetProductOptions/lookup", {
      timeout: 10000,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    return res.json(response.data);
    
  } catch (err) {
    console.error("Error fetching product options:", err.message);
    
    if (err.code === 'ECONNABORTED') {
      return res.status(504).json({ message: "Request timeout" });
    }
    
    if (err.response) {
      return res.status(err.response.status).json({ 
        message: "External API error",
        details: err.response.data?.message || err.message
      });
    }
    
    return res.status(500).json({ message: "Internal server error" });
  }
};