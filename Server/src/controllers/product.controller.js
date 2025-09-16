import axios from "axios";
import NodeCache from 'node-cache';

// Initialize cache (5 minutes TTL)
const cache = new NodeCache({ 
  stdTTL: 300, // 5 minutes
  checkperiod: 60 // Check for expired keys every 60 seconds
});

// Pending requests map to prevent duplicate calls
const pendingRequests = new Map();

export const getProducts = async (req, res, next) => {
  try {
    const { SearchTerm = "", PageSize = 10, PageNumber = 1 } = req.query;
    
    // Create cache key
    const cacheKey = `products-${SearchTerm}-${PageNumber}-${PageSize}`;
    
    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log('Returning cached data for:', cacheKey);
      
      // Set cache headers for browser caching
      res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
      res.setHeader('X-Cache', 'HIT');
      
      return res.json(cachedData);
    }
    
    // Check if request is already pending
    if (pendingRequests.has(cacheKey)) {
      console.log('Waiting for pending request:', cacheKey);
      
      try {
        const result = await pendingRequests.get(cacheKey);
        res.setHeader('X-Cache', 'PENDING');
        return res.json(result);
      } catch (error) {
        return res.status(500).json({ message: "Error fetching products" });
      }
    }
    
    console.log('Making new external API call for:', cacheKey);
    
    // Create pending request promise
    const requestPromise = axios.get("https://api.megakitchensystem.in/Product/GetProducts", {
      params: {
        SearchTerm,
        PageNumber,
        PageSize
      },
      timeout: 10000, // 10 second timeout
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'YourApp/1.0'
      }
    })
    .then(response => {
      // Process and optimize the response
      const processedData = processProductData(response.data);
      
      // Cache the result
      cache.set(cacheKey, processedData);
      
      // Remove from pending requests
      pendingRequests.delete(cacheKey);
      
      return processedData;
    })
    .catch(error => {
      // Remove from pending requests on error
      pendingRequests.delete(cacheKey);
      throw error;
    });
    
    // Store pending request
    pendingRequests.set(cacheKey, requestPromise);
    
    // Wait for the request to complete
    const result = await requestPromise;
    
    // Set cache headers
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
    res.setHeader('X-Cache', 'MISS');
    
    return res.json(result);
    
  } catch (err) {
    console.error("Error fetching products:", err.message);
    
    // Return appropriate error based on type
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

// Process and optimize product data
const processProductData = (data) => {
  if (!data || !data.items) return data;
  
  return {
    ...data,
    items: data.items.map(product => ({
      ...product,
      // Optimize image URLs if needed
      productImages: product.productImages?.map(img => ({
        ...img,
        // Add different sizes if your CDN supports it
        imagePath: img.imagePath,
        thumbnailPath: optimizeImageUrl(img.imagePath, 300, 300),
        mediumPath: optimizeImageUrl(img.imagePath, 600, 600)
      })) || [],
      // Ensure price is a number
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      // Clean up any undefined values
      productName: product.productName || '',
      productCategoryName: product.productCategoryName || 'Uncategorized'
    }))
  };
};

// Helper function to optimize image URLs (if your CDN supports it)
const optimizeImageUrl = (originalUrl, width, height, quality = 80) => {
  if (!originalUrl) return '';
  
  // Example for Cloudinary, adjust based on your image service
  // return originalUrl.replace('/upload/', `/upload/w_${width},h_${height},q_${quality},f_auto/`);
  
  // For now, return original URL
  return originalUrl;
};

// Optional: Clear cache endpoint for debugging
export const clearProductsCache = (req, res) => {
  cache.flushAll();
  pendingRequests.clear();
  res.json({ message: 'Cache cleared successfully' });
};

// Optional: Cache stats endpoint
export const getCacheStats = (req, res) => {
  const stats = cache.getStats();
  res.json({
    ...stats,
    pendingRequests: pendingRequests.size,
    cacheKeys: cache.keys().length
  });
};