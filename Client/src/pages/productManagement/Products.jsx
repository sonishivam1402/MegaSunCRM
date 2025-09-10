import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getAllProducts } from '../../api/productApi'; // Adjust import path as needed
import ProductDetailModal from './ProductDetailModal'; // Adjust import path as needed

const Products = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Categories for sidebar
  const categories = [
    'All products',
    'Applicances',
    'Cookware',
    'Bakeware',
    'Serveware',
    'Cookware',
    'Tableware',
    'Storage & containers'
  ];
  
  // Debounce timer ref
  const searchTimeoutRef = useRef(null);

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);

  // Fetch products function
  const fetchProducts = useCallback(async (search = '', page = 1, size = 20) => {
    console.log('Fetching products:', { search, page, size });
    
    try {
      setLoading(true);
      
      const response = await getAllProducts({
        SearchTerm: search,
        PageNumber: page,
        PageSize: size
      });

      console.log('API Response:', response);
      
      // Handle the API response structure
      if (response.data && response.data.items) {
        setProducts(response.data.items);
        setTotalRecords(response.data.totalCount || 0);
      } else if (Array.isArray(response)) {
        // If API returns array directly
        setProducts(response.data.items);
        setTotalRecords(response.data.totalCount);
      } else {
        setProducts([]);
        setTotalRecords(0);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback((searchValue, page = 1, size = pageSize) => {
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set timeout for search
    searchTimeoutRef.current = setTimeout(() => {
      fetchProducts(searchValue, page, size);
    }, 500);
  }, [pageSize, fetchProducts]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPageNumber(1); // Reset to first page on search
    
    debouncedSearch(value, 1, pageSize);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page);
      fetchProducts(searchTerm, page, pageSize);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPageNumber(1);
    fetchProducts(searchTerm, 1, newPageSize);
  };

  // Handle product card click
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Initial load
  useEffect(() => {
    fetchProducts('', 1, pageSize);
  }, [fetchProducts]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="px-6 py-4 flex items-center justify-between flex-shrink-0">
        <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-80"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Products Grid - This takes remaining height */}
      <div className="flex-1 p-6 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <span className="text-gray-500 text-lg">No products found</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <div 
                key={product.productId} 
                className="rounded-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
                onClick={() => handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="aspect-square rounded-t-lg overflow-hidden">
                  {product.productImages[0] ? (
                    <img
                      src={product.productImages[0].imagePath}
                      alt={product.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">
                    {product.productName || 'Product Name'}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                    {product.productCategoryName || 'Product category'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price || '0'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Pagination - Always at bottom */}
      {totalRecords > 0 && (
        <div className="border-t px-8 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            {/* Records per page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-600">records</span>
            </div>

            {/* Page info and total records */}
            <div className="text-sm text-gray-600">
              Showing {((pageNumber - 1) * pageSize) + 1} to {Math.min(pageNumber * pageSize, totalRecords)} of {totalRecords} products
            </div>

            {/* Compact Pagination Controls */}
            <div className="flex items-center border border-gray-300 rounded">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber === 1 || loading}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
              >
                &lt;
              </button>

              {/* Current page info */}
              <div className="px-4 py-2 text-sm text-gray-700 min-w-[60px] text-center">
                {pageNumber}/{totalPages || 1}
              </div>

              {/* Next button */}
              <button
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber === totalPages || totalPages === 0 || loading}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border-l border-gray-300"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;