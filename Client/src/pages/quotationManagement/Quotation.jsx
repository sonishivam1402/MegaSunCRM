import React, { useEffect, useState, useRef, useCallback } from 'react';
import AddIcon from '../../assets/icons/AddIcon';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import AddNewQuotationModal from './AddNewQuotation';
import { getQuotations } from '../../api/quotation';
import { getLeadsDD } from '../../api/leadApi';
import { getAllUsersDD } from '../../api/userApi';

const Quotation = ({ refreshKey }) => {
    // State management
    const [quotations, setQuotations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    // Filters - FIX: Initialize typeFilter with '1' to match default select value
    const [typeFilter, setTypeFilter] = useState('1');
    const [salesmanFilter, setSalesmanFilter] = useState('');
    const [salesmanOptions, setSalesmanOptions] = useState([]);

    // Modal and dropdown states
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRefs = useRef({});

    // Debounce timer ref
    const searchTimeoutRef = useRef(null);

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / pageSize);

    // Fetch salesman options
    const fetchSalesmen = async () => {
        try {
            const response = await getAllUsersDD();
            if (response && Array.isArray(response.data) && response.data.length >= 1) {
                setSalesmanOptions(response.data[0] || []);
            }
        } catch (err) {
            console.error('Error fetching salesmen:', err);
        }
    };

    // Fetch quotations with pagination, search, and filters
    const fetchQuotations = useCallback(async (search = '', page = 1, limit = 10, type = '', assignedTo = '') => {
        try {
            setLoading(true);
            const offset = (page - 1) * limit;

            // FIX: Build params object, only include non-empty values
            const params = {
                search,
                offset,
                limit,
                type
            };

            // Only add salesman if it has value
            if (assignedTo) {
                params.assignedTo = assignedTo;
            } else {
                params.assignedTo = null;
            }

            console.log('API Request Params:', params); // DEBUG: Log params being sent

            const response = await getQuotations(params);
            console.log('API Response:', response.data); // DEBUG: Log full response

            if (response && response.data) {
                setQuotations(response.data[0] || []);
                const totalCount = response.data[1]?.[0]?.TotalCount;
                setTotalRecords(totalCount !== undefined ? totalCount : 0);
            } else {
                setQuotations([]);
                setTotalRecords(0);
            }
        } catch (err) {
            console.error('API ERROR:', err);
            console.error('Error details:', err.response?.data); // DEBUG: Log error details
            setQuotations([]);
            setTotalRecords(0);
        } finally {
            setLoading(false);
        }
    }, []);

    // Debounced search function
    const debouncedSearch = useCallback((searchValue, page = 1, limit = pageSize) => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (searchValue.length < 3) {
            return;
        }

        searchTimeoutRef.current = setTimeout(() => {
            fetchQuotations(searchValue, page, limit, typeFilter, salesmanFilter);
        }, 1000);
    }, [pageSize, fetchQuotations, typeFilter, salesmanFilter]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setPageNumber(1);

        if (value === '' || value.trim().length < 3) {
            // FIX: Fetch without search when cleared or less than 3 chars
            fetchQuotations('', 1, pageSize, typeFilter, salesmanFilter);
            return;
        }

        debouncedSearch(value, 1, pageSize);
    };

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setPageNumber(page);
            const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
            fetchQuotations(currentSearch, page, pageSize, typeFilter, salesmanFilter);
        }
    };

    // Handle page size change
    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPageNumber(1);
        const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
        fetchQuotations(currentSearch, 1, newPageSize, typeFilter, salesmanFilter);
    };

    // Handle type filter change
    const handleTypeFilterChange = (e) => {
        const value = e.target.value;
        setTypeFilter(value);
        setPageNumber(1);
        const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
        fetchQuotations(currentSearch, 1, pageSize, value, salesmanFilter);
    };

    // Handle salesman filter change
    const handleSalesmanFilterChange = (e) => {
        const value = e.target.value;
        setSalesmanFilter(value);
        setPageNumber(1);
        const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
        fetchQuotations(currentSearch, 1, pageSize, typeFilter, value);
    };

    // Initial data fetch
    useEffect(() => {
        fetchSalesmen();
    }, []);

    // FIX: Initial fetch with proper default type filter
    useEffect(() => {
        fetchQuotations('', pageNumber, pageSize, typeFilter, salesmanFilter);
    }, [refreshKey]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeDropdown && dropdownRefs.current[activeDropdown]) {
                if (!dropdownRefs.current[activeDropdown].contains(event.target)) {
                    setActiveDropdown(null);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdown]);

    const toggleDropdown = (quotationId) => {
        setActiveDropdown(activeDropdown === quotationId ? null : quotationId);
    };

    const handleExport = () => {
        console.log('Export all quotations');
    };

    const handleAddQuotation = () => {
        setAddModalOpen(true);
    };

    const handleModalSuccess = () => {
        fetchQuotations('', 1, pageSize, typeFilter, salesmanFilter);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-6 py-4 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-gray-800">Quotation History</h1>
                    <button
                        onClick={handleAddQuotation}
                        className="px-4 py-2 bg-[#0d4715] text-white rounded-md text-sm hover:bg-[#0a3811] flex items-center gap-2"
                    >
                        <AddIcon color='white' />
                        Add new quotation
                    </button>
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative w-64">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search (min 3 chars)"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0d4715]"
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="relative">
                        <select
                            value={typeFilter}
                            onChange={handleTypeFilterChange}
                            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm hover:cursor-pointer min-w-[120px]"
                        >
                            <option value="1">Domestic</option>
                            <option value="0">International</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {/* Salesman Filter */}
                    <div className="relative">
                        <select
                            value={salesmanFilter}
                            onChange={handleSalesmanFilterChange}
                            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm hover:cursor-pointer min-w-[140px]"
                        >
                            <option value="">All Salesmen</option>
                            {salesmanOptions.map((salesman) => (
                                <option key={salesman.UserId} value={salesman.UserId}>
                                    {salesman.Name}
                                </option>
                            ))}
                        </select>
                        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <div className="flex-1"></div>

                    {/* Export All Button */}
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 text-sm font-medium flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export all
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="px-6 flex-1 overflow-y-auto">
                <table className="w-full">
                    <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-gray-300">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QUOTATION DETAILS</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">QUOTATION BY</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">LEAD DETAILS</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ITEM</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">AMOUNT</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">TYPE</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0d4715]"></div>
                                        <span className="ml-2">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : quotations.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                    No quotations found
                                </td>
                            </tr>
                        ) : (
                            quotations.map((quotation) => (
                                <tr key={quotation.QuotationId}>
                                    {/* Quotation Details */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">{quotation.SystemGeneratedId}</span>
                                    </td>

                                    {/* Quotation By */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                                                <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium bg-[#cd8b65]">
                                                    {quotation.QuotationCreatedBy?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-900">{quotation.QuotationCreatedBy || 'Unknown'}</span>
                                        </div>
                                    </td>

                                    {/* Lead Details */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {quotation.LeadName || '-'}
                                    </td>

                                    {/* Item */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {quotation.Products || '-'}
                                    </td>

                                    {/* Amount */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex flex-col text-sm">
                                            <span className="text-gray-600">Basic: <span className="text-gray-900">{quotation.BasicAmount || '-'}</span></span>
                                            <span className="text-gray-600">Final: <span className="text-gray-900">{quotation.FinalAmount || '-'}</span></span>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#f5d99f] text-[#8b6914]">
                                            {quotation.IsDomestic ? "Domestic" : "International"}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex justify-end items-center">
                                            <div className="relative" ref={el => dropdownRefs.current[quotation.QuotationId] = el}>
                                                <button
                                                    className="p-2 hover:bg-gray-100 rounded"
                                                    onClick={() => toggleDropdown(quotation.QuotationId)}
                                                >
                                                    <ThreeDotIcon />
                                                </button>

                                                {/* Dropdown Menu */}
                                                {activeDropdown === quotation.QuotationId && (
                                                    <div className="absolute right-2 mt-1 w-50 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                                        <div className="py-1">
                                                            <button className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                                                Download Quotation
                                                            </button>
                                                            <button className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                                                Download Performa Invoice
                                                            </button>
                                                            <button className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                                                View last follow-up
                                                            </button>
                                                            <button className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                                                Whatsapp
                                                            </button>
                                                            <button className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                                                Edit
                                                            </button>
                                                            <button className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-6 py-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Show</span>
                        <div className="relative">
                            <select
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                className="appearance-none bg-btn-gray hover:cursor-pointer rounded-s-xs px-3 py-1 pr-8 text-sm"
                            >
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                            </select>
                            <img src="/icons/Dropdown.png" alt="Dropdown" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-2 pointer-events-none opacity-50" />
                        </div>
                        <span className="text-sm text-gray-600">records</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        Showing {totalRecords === 0 ? 0 : ((pageNumber - 1) * pageSize) + 1} to {Math.min(pageNumber * pageSize, totalRecords)} of {totalRecords} entries
                    </div>
                    <div className="flex items-center border border-gray-300 rounded">
                        {/* Previous button */}
                        <button
                            onClick={() => handlePageChange(pageNumber - 1)}
                            disabled={pageNumber === 1 || loading}
                            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:!opacity-50 disabled:!cursor-not-allowed border-r border-gray-300"
                        >
                            <img src="/icons/Left_arrow.png" alt="Previous" className="w-2 h-3" />
                        </button>

                        {/* Current page info */}
                        <div className="px-4 py-2 text-sm text-gray-700 min-w-[60px] text-center">
                            {pageNumber}/{totalPages || 1}
                        </div>

                        {/* Next button */}
                        <button
                            onClick={() => handlePageChange(pageNumber + 1)}
                            disabled={pageNumber === totalPages || totalPages === 0 || loading}
                            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:!opacity-50 disabled:!cursor-not-allowed border-l border-gray-300"
                        >
                            <img src="/icons/Right_arrow.png" alt="Next" className="w-2 h-3" />
                        </button>
                    </div>
                </div>
            </div>
            {addModalOpen && (
                <AddNewQuotationModal
                    isOpen={addModalOpen}
                    onClose={() => setAddModalOpen(false)}
                    onSuccess={handleModalSuccess}
                />
            )}
        </div>
    );
};

export default Quotation;