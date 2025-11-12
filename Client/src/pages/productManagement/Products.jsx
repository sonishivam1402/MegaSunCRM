import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { getAllProducts } from '../../api/productApi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  // Refs for performance
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);
  const containerRef = useRef(null);

  // Memoize total pages calculation
  const totalPages = useMemo(() => Math.ceil(totalRecords / pageSize), [totalRecords, pageSize]);

  // Fetch products function with abort controller
  const fetchProducts = useCallback(async (search = '', page = 1, size = 25) => {
    try {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setLoading(true);

      const response = await getAllProducts({
        SearchTerm: search,
        PageNumber: page,
        PageSize: size
      });

      if (response?.data?.items) {
        const transformedProducts = response.data.items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          productCategoryName: item.productCategoryName,
          productImage: item.productImages?.[0], // Get only first image
          price: item.price
        }));

        setProducts(transformedProducts);
        setTotalRecords(response.data.totalCount || 0);
      } else {
        setProducts([]);
        setTotalRecords(0);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error fetching products:', err);
        setProducts([]);
        setTotalRecords(0);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Optimized debounced search
  const debouncedSearch = useCallback((searchValue, page = 1, size = pageSize) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchProducts(searchValue, page, size);
    }, 250);
  }, [pageSize, fetchProducts]);

  // Throttled event handlers
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPageNumber(1);
    debouncedSearch(value, 1, pageSize);
  }, [pageSize, debouncedSearch]);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages && !loading) {
      setPageNumber(page);
      fetchProducts(searchTerm, page, pageSize);
      // Scroll to top smoothly
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }
  }, [totalPages, loading, searchTerm, pageSize, fetchProducts]);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setPageNumber(1);
    fetchProducts(searchTerm, 1, newPageSize);
  }, [searchTerm, fetchProducts]);

  // Initial load
  useEffect(() => {
    fetchProducts('', 1, pageSize);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header - Simplified */}
      <header className="px-6 py-4 border-b  flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Products</h2>

          {/* Search Input - Optimized */}
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-sm"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-green-900 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {loading && products.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-8 h-8 border-3 border-green-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-500 text-lg">No products found</p>
              {searchTerm && (
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms</p>
              )}
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="h-full overflow-y-auto p-6"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch' // Better iOS scrolling
            }}
          >
            <ProductGrid products={products} />
          </div>
        )}
      </main>

      {/* Fixed Pagination */}
      {totalRecords > 0 && (
        <footer className="border-t border-gray-200 px-6 py-4 flex-shrink-0">
          <PaginationControls
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalRecords={totalRecords}
            totalPages={totalPages}
            loading={loading}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </footer>
      )}
    </div>
  );
};

// Highly Optimized Product Grid with Intersection Observer
const ProductGrid = React.memo(({ products }) => {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gridAutoRows: 'min-content'
      }}
    >
      {products.map((product, index) => (
        <ProductCard
          key={`${product.productId}-${index}`}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

// Ultra-lightweight Product Card
const ProductCard = React.memo(({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      {
        rootMargin: '50px', // Load images 50px before they come into view
        threshold: 0.1
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const imageUrl = product.productImage.imagePath;
  const shouldShowImage = isVisible && imageUrl && !imageError;

  // Create optimized image URL (if your backend supports it)
  const optimizedImageUrl = imageUrl ? `${imageUrl}?w=300&h=300&q=80&f=webp` : null;

  return (
    <article
      ref={cardRef}
      className="rounded-sm border border-gray-200 overflow-hidden"
      style={{
        // Prevent layout shifts
        minHeight: '320px',
        // Hardware acceleration
        transform: 'translateZ(0)',
        // Contain layout and style recalculations
        contain: 'layout style paint',
      }}
    >
      {/* Image Container */}
      <div className="relative bg-gray-100 aspect-square overflow-hidden">
        {shouldShowImage ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={optimizedImageUrl || imageUrl}
              alt={product.productName || 'Product'}
              className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              decoding="async"
              // Add image dimensions to prevent layout shift
              width="300"
              height="300"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-5 mb-2 line-clamp-2">
          {product.productName?.toUpperCase() || 'Unnamed Product'}
        </h3>

        <p className="text-xs text-gray-500 mb-3 truncate">
          {product.productCategoryName || 'Uncategorized'}
        </p>

        <span className="text-lg font-bold text-gray-900">
          ₹{product.price?.toLocaleString() || '0'}
        </span>

      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';

// Lightweight Pagination
const PaginationControls = React.memo(({
  pageNumber,
  pageSize,
  totalRecords,
  totalPages,
  loading,
  onPageChange,
  onPageSizeChange
}) => {
  const startRecord = ((pageNumber - 1) * pageSize) + 1;
  const endRecord = Math.min(pageNumber * pageSize, totalRecords);

  return (
    <div className="flex items-center justify-between">
      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Show</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
        </select>
        <span className="text-sm text-gray-600">per page</span>
      </div>

      {/* Records Info */}
      <div className="text-sm text-gray-600">
        {startRecord}–{endRecord} of {totalRecords.toLocaleString()} products
      </div>

      {/* Navigation */}
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={pageNumber === 1 || loading}
          className="px-3 py-1 text-sm border border-gray-300 rounded-l hover:bg-gray-50 disabled:!opacity-50 disabled:!cursor-not-allowed"
        >
          &lt;
        </button>

        <div className="px-4 py-1 text-sm border-t border-b border-gray-300 bg-gray-50 min-w-[80px] text-center">
          {pageNumber} of {totalPages}
        </div>

        <button
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={pageNumber >= totalPages || loading}
          className="px-3 py-1 text-sm border border-gray-300 rounded-r hover:bg-gray-50 disabled:!opacity-50 disabled:!cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
});

PaginationControls.displayName = 'PaginationControls';

export default Products;