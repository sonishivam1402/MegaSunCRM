import axios from 'axios';

// Get All Products
export const getAllProducts = async ({
  SearchTerm = "",
  PageNumber = 1,
  PageSize = 10,
  token
}) => {
  try {
    const res = await axios.get("https://devapi.megakitchensystem.in/Product/GetProducts", {
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
