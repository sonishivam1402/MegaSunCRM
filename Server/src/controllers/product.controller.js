import axios from "axios";

export const getProducts = async (req, res, next) => {
  try {
    const { SearchTerm = "", PageSize = 10, PageNumber = 1 } = req.query;

    const response = await axios.get("https://devapi.megakitchensystem.in/Product/GetProducts", {
      params: {
        SearchTerm,
        PageNumber,
        PageSize
      }
    });

    return res.json(response.data);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    return res.status(500).json({ message: "Error fetching products" });
  }
};
