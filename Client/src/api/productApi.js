import API from "./axios";

// Simple in-memory cache
const cache = new Map();
const pendingRequests = new Map();

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Create cache key from parameters
const createCacheKey = (params) => {
  return `products-${params.SearchTerm || ''}-${params.PageNumber}-${params.PageSize}`;
};

// Check if cache entry is still valid
const isCacheValid = (cacheEntry) => {
  return cacheEntry && (Date.now() - cacheEntry.timestamp) < CACHE_DURATION;
};

export const getAllProducts = async ({
  SearchTerm = "",
  PageNumber = 1,
  PageSize = 10,
}, options = {}) => {
  const cacheKey = createCacheKey({ SearchTerm, PageNumber, PageSize });
  
  // Return cached data if valid
  const cachedData = cache.get(cacheKey);
  if (isCacheValid(cachedData)) {
    //console.log('Returning cached data for:', cacheKey);
    return cachedData.data;
  }
  
  // Return pending request if already in progress
  if (pendingRequests.has(cacheKey)) {
    //console.log('Waiting for pending request:', cacheKey);
    return pendingRequests.get(cacheKey);
  }
  
  //console.log('Making new API call for:', cacheKey);
  
  // Create new request promise
  const requestPromise = API.get("/products", {
    params: {
      SearchTerm,
      PageNumber,
      PageSize
    },
    ...options // Include abort signal if provided
  })
  .then(response => {
    const data = response.data;
    
    // Cache the successful response
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    // Remove from pending requests
    pendingRequests.delete(cacheKey);
    
    return data;
  })
  .catch(error => {
    // Remove from pending requests on error
    pendingRequests.delete(cacheKey);
    
    if (error.response && error.response.status !== 401) {
      console.error("getAllProducts failed:", error);
    }
    throw error;
  });
  
  // Store pending request
  pendingRequests.set(cacheKey, requestPromise);
  
  return requestPromise;
};

// Optional: Clear cache function
export const clearProductsCache = () => {
  cache.clear();
  pendingRequests.clear();
};

// Optional: Preload next page
export const preloadNextPage = (currentParams) => {
  const nextPageParams = {
    ...currentParams,
    PageNumber: currentParams.PageNumber + 1
  };
  
  // Only preload if next page isn't already cached
  const nextPageKey = createCacheKey(nextPageParams);
  if (!cache.has(nextPageKey) && !pendingRequests.has(nextPageKey)) {
    getAllProducts(nextPageParams).catch(() => {
      // Ignore preload errors
    });
  }
};


// Get Product Options for Dropdown
export const getProductOptions = async () => {
  try{
    const response = await API.get("/products/products");
    return response.data;
  }catch(error){
    console.error("getProductOptions failed:", error);
    throw error;
  }
}