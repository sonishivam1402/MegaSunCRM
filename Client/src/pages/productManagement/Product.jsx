import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { getAllProducts } from '../../api/productApi';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [imageErrors, setImageErrors] = useState({});
    
    const debounceTimeout = useRef(null);
    const totalPages = Math.ceil(totalRecords / pageSize);

    const fetchProducts = useCallback(async (search, page, size) => {
        setLoading(true);
        try {
            const response = await getAllProducts({
                    SearchTerm: search,
                    PageNumber: page,
                    PageSize: size
            });

            if (response?.data?.items) {

               setProducts(response.data.items);
                setTotalRecords(response.data.totalCount || 0);
                setImageErrors({});
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

    // Debounced search handler
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Clear existing timeout
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        
        // Set new timeout - wait 500ms after user stops typing
        debounceTimeout.current = setTimeout(() => {
            setPageNumber(1);
            fetchProducts(value, 1, pageSize);
        }, 500);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setPageNumber(page);
            fetchProducts(searchTerm, page, pageSize);
        }
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPageNumber(1);
        fetchProducts(searchTerm, 1, newPageSize);
    };

    const handleImageError = (productId) => {
        setImageErrors(prev => ({
            ...prev,
            [productId]: true
        }));
    };

    useEffect(() => {
        fetchProducts('', 1, pageSize);
        
        // Cleanup debounce timeout on unmount
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [fetchProducts, pageSize]);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="px-6 py-4 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">Products</h2>

                    <div className="relative w-80">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {loading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">
                {loading && products.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600 text-lg">Loading products...</p>
                        </div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <p className="text-gray-500 text-lg font-medium">No products found</p>
                            {searchTerm && (
                                <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
                        {products.map((product) => (
                            <div 
                                key={product.productId} 
                                className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="relative bg-gray-100 aspect-square overflow-hidden">
                                    {product.productImage?.imagePath && !imageErrors[product.productId] ? (
                                        <img
                                            src={product.productImage.imagePath}
                                            alt={product.productName}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            decoding="async"
                                            onError={() => handleImageError(product.productId)}
                                            style={{
                                                // Force browser to render at smaller size
                                                maxWidth: '100%',
                                                height: 'auto'
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 text-sm leading-5 mb-2 line-clamp-2 min-h-[2.5rem]">
                                        {product.productName?.toUpperCase() || 'Unnamed Product'}
                                    </h3>
                                    <p className="text-xs text-gray-900 mb-3 truncate">
                                        {product.productCategoryName || 'Uncategorized'}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-green-700">
                                            ₹{product.price?.toLocaleString('en-IN') || '0'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Pagination */}
            {totalRecords > 0 && (
                <footer className="border-t border-gray-200 px-6 py-4 flex-shrink-0 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Show</span>
                            <select
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                            >
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                            </select>
                            <span className="text-sm text-gray-600">per page</span>
                        </div>

                        <div className="text-sm text-gray-600 font-medium">
                            {((pageNumber - 1) * pageSize) + 1}–{Math.min(pageNumber * pageSize, totalRecords)} of {totalRecords.toLocaleString('en-IN')} products
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => handlePageChange(pageNumber - 1)}
                                disabled={pageNumber === 1}
                                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            <div className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg min-w-[100px] text-center font-medium">
                                {pageNumber} / {totalPages}
                            </div>
                            <button
                                onClick={() => handlePageChange(pageNumber + 1)}
                                disabled={pageNumber >= totalPages}
                                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default Product;