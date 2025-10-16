import React, { useEffect, useState, useRef, useCallback } from 'react';
import AddIcon from '../../assets/icons/AddIcon';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import AddNewOrderModal from './AddNewOrder';
import { deleteOrderById, exportOrders, getOrders } from "../../api/orderApi";
import { getAllUsersDD } from '../../api/userApi';
import { toast } from 'react-toastify';
import ViewLastFollowUp from './ViewLastFollowUp';
import EditOrderModal from './EditOrderModal';
import { getQuotationPdf } from '../../api/invoiceApi';
import { useAuth } from '../../context/AuthContext';

const Order = ({ refreshKey }) => {
    const { user, menus } = useAuth();
    const orderMenus = menus.find(item => item.Name === "Orders");
    const followUpMenu = menus.find(item => item.Name === "Followups");

    // State management
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState([]);

    // Filters - FIX: Initialize typeFilter with '1' to match default select value
    const [typeFilter, setTypeFilter] = useState('1');
    const [salesmanFilter, setSalesmanFilter] = useState('');
    const [salesmanOptions, setSalesmanOptions] = useState([]);

    // Modal and dropdown states
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [lastFollowUpModalOpen, setLastFollowUpModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleting, setDeleting] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRefs = useRef({});
    const [editModalOpen, setEditModalOpen] = useState(false);


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

    // Fetch orders with pagination, search, and filters
    const fetchOrders = useCallback(async (search = '', page = 1, limit = 10, type = '', assignedTo = '') => {
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

            //console.log('API Request Params:', params);

            const response = await getOrders(params);
            //console.log('API Response:', response.data);

            if (response && response.data) {
                setOrders(response.data[0] || []);
                const totalCount = response.data[1]?.[0]?.TotalCount;
                setTotalRecords(totalCount !== undefined ? totalCount : 0);
            } else {
                setOrders([]);
                setTotalRecords(0);
            }
        } catch (err) {
            console.error('API ERROR:', err);
            console.error('Error details:', err.response?.data); // DEBUG: Log error details
            setOrders([]);
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
            fetchOrders(searchValue, page, limit, typeFilter, salesmanFilter);
        }, 1000);
    }, [pageSize, fetchOrders, typeFilter, salesmanFilter]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setPageNumber(1);

        if (value === '' || value.trim().length < 3) {
            // FIX: Fetch without search when cleared or less than 3 chars
            fetchOrders('', 1, pageSize, typeFilter, salesmanFilter);
            return;
        }

        debouncedSearch(value, 1, pageSize);
    };

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setPageNumber(page);
            const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
            fetchOrders(currentSearch, page, pageSize, typeFilter, salesmanFilter);
        }
    };

    // Handle page size change
    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPageNumber(1);
        const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
        fetchOrders(currentSearch, 1, newPageSize, typeFilter, salesmanFilter);
    };

    // Handle type filter change
    const handleTypeFilterChange = (e) => {
        const value = e.target.value;
        setTypeFilter(value);
        setPageNumber(1);
        const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
        fetchOrders(currentSearch, 1, pageSize, value, salesmanFilter);
    };

    // Handle salesman filter change
    const handleSalesmanFilterChange = (e) => {
        const value = e.target.value;
        setSalesmanFilter(value);
        setPageNumber(1);
        const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
        fetchOrders(currentSearch, 1, pageSize, typeFilter, value);
    };

    // Initial data fetch
    useEffect(() => {
        fetchSalesmen();
    }, []);

    // FIX: Initial fetch with proper default type filter
    useEffect(() => {
        fetchOrders('', pageNumber, pageSize, typeFilter, salesmanFilter);
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

    const toggleDropdown = (orderId) => {
        setActiveDropdown(activeDropdown === orderId ? null : orderId);
    };

    const handleExport = async () => {
        setLoading(true);
        try {
            const response = await exportOrders(); // axios response
            const blob = response.data;              // <-- axios puts the Blob here

            // Try to read filename from Content-Disposition
            let filename = 'export_' + Date.now() + '.csv';
            const disp = response.headers?.['content-disposition'] || '';
            const m = /filename\*=UTF-8''([^;]+)|filename="([^"]+)"/i.exec(disp);
            if (m) filename = decodeURIComponent(m[1] || m[2]);

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');

            // Format as YYYYMMDD_HHMMSS
            const formatted =
                now.getFullYear() +
                pad(now.getMonth() + 1) +
                pad(now.getDate()) + '_' +
                pad(now.getHours()) +
                pad(now.getMinutes()) +
                pad(now.getSeconds());

            a.download = `export_orders_${formatted}.csv`;
            // a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOrder = () => {
        setAddModalOpen(true);
    };

    const handleWhatsApp = (order) => {
        if (!order?.Contact) {
            console.error("No contact found for this order");
            return;
        }

        // Ensure correct format (without spaces, etc.)
        const phone = order.Contact.replace(/\D/g, "");

        const whatsappUrl = `https://api.whatsapp.com/send?phone=91${phone}`;

        // Open in new tab
        window.open(whatsappUrl, "_blank");

        setActiveDropdown(null);
    };

    const handleModalSuccess = () => {
        fetchOrders('', 1, pageSize, typeFilter, salesmanFilter);
    };

    const handleDelete = (Id) => {
        setDeleteModalOpen(true);
        setSelectedOrder(Id);
        setActiveDropdown(null);
    };

    const confirmDelete = async () => {
        if (!selectedOrder) return;
        setDeleting(true);
        try {
            const response = await deleteOrderById(selectedOrder);
            if (response.status == 201) {
                setSelectedOrder(null)
                setDeleteModalOpen(false);
                toast.success(response.data.Message);
                handleModalSuccess();
            }
            else {
                toast.error(response.data?.[0]?.Message || response.data?.Message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete lead status.');
        } finally {
            setDeleting(false);
        }
    };


    const formatProducts = (products) => {
        if (!products || products.length === 0) return 'N/A';
        const productList = products.split(",").map(p => p.trim());
        const displayed = productList.slice(0, 2).join(", ");
        const extra = productList.length > 2 ? `, ${productList.length - 2} more..` : "";
        return displayed + extra;
    };

    const handleEdit = (id) => {
        setEditModalOpen(true);
        setSelectedOrder(id);
        setActiveDropdown(null);
    };

    const handleDownloadOrder = async (id, type) => {
        try {
            setLoading(true);
            const response = await getQuotationPdf(id, type);

            const blob = await response.data;

            let filename = `${type}.pdf`; // default
            const disposition = response.headers.get("Content-Disposition");
            if (disposition && disposition.includes("filename=")) {
                filename = disposition
                    .split("filename=")[1]
                    .replace(/"/g, "")
                    .trim();
            }

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Download Started");
            setActiveDropdown(null);
        } catch (err) {
            console.error("Download error:", err);
            toast.error("Failed to download order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-6 py-4 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-gray-800">Order History</h1>
                    {orderMenus?.CreateAccess && (
                        <button
                            onClick={handleAddOrder}
                            className="px-4 py-2 bg-[#0d4715] text-white rounded-md text-sm hover:bg-[#0a3811] flex items-center gap-2"
                        >
                            <AddIcon color='white' />
                            Add new order
                        </button>
                    )}
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
                    {user.IsAdmin && (
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
                    )}

                    <div className="flex-1"></div>
                    {user.IsAdmin ? (
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 text-sm font-medium flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export all
                        </button>
                    ) : ""}
                </div>
            </div>

            {/* Table */}
            <div className="px-6 flex-1 overflow-y-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ORDER DETAILS</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ORDER BY</th>
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
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.OrderId}>
                                    {/* Order Details */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">{order.SystemGeneratedId}</span>
                                    </td>

                                    {/* Order By */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                                                <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium bg-[#cd8b65]">
                                                    {order.OrderCreatedBy?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-900">{order.OrderCreatedBy || 'Unknown'}</span>
                                        </div>
                                    </td>

                                    {/* Lead Details */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                                                <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium bg-[#cd8b65]">
                                                    {order.LeadName?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-900">{order.LeadName || 'Unknown'}</span>
                                        </div>
                                    </td>

                                    {/* Item */}
                                    <td className="px-6 py-4 text-sm text-gray-900 text-left">
                                        <div className="max-w-xs mx-auto">
                                            {formatProducts(order.Products || order.Item)}
                                        </div>
                                    </td>

                                    {/* Amount */}
                                    <td className="px-6 py-4 whitespace-nowrap text-left">
                                        <div className="flex flex-col text-sm">
                                            <span className="text-gray-600">Basic : ₹<span className="text-gray-900">{order.BasicAmount || '-'}</span></span>
                                            <span className="text-gray-600">Final : ₹<span className="text-gray-900">{order.FinalAmount || '-'}</span></span>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#f5d99f] text-[#8b6914]">
                                            {order.IsDomestic ? "Domestic" : "International"}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex justify-end items-center">
                                            <div className="relative" ref={el => dropdownRefs.current[order.OrderId] = el}>
                                                <button
                                                    className="p-2 hover:bg-gray-100 rounded"
                                                    onClick={() => toggleDropdown(order.OrderId)}
                                                >
                                                    <ThreeDotIcon />
                                                </button>

                                                {/* Dropdown Menu */}
                                                {activeDropdown === order.OrderId && (
                                                    <div className="absolute right-2 mt-1 w-50 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                                        <div className="py-1">
                                                            {/* <button onClick={() => handleDownloadOrder(order.OrderId, "order")} className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                                                Download Order
                                                            </button> */}

                                                            <button onClick={() => handleDownloadOrder(order.OrderId, "performaInvoice")} className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                                                Download Performa Invoice
                                                            </button>

                                                            {followUpMenu?.ReadAccess && (
                                                                <button
                                                                    onClick={() => {
                                                                        setLastFollowUpModalOpen(true);
                                                                        setSelectedOrder(order);
                                                                        setActiveDropdown(null);
                                                                    }}
                                                                    className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                                                    View last follow-up
                                                                </button>
                                                            )}

                                                            <button onClick={() => handleWhatsApp(order)} className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                                                Whatsapp
                                                            </button>

                                                            {orderMenus?.UpdateAccess && (
                                                                <button onClick={() => handleEdit(order.OrderId)} className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors">
                                                                    Edit
                                                                </button>
                                                            )}

                                                            {orderMenus?.DeleteAccess && (
                                                                <button className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
                                                                    onClick={() => {
                                                                        handleDelete(order.OrderId)
                                                                        setActiveDropdown(null);
                                                                    }}
                                                                >
                                                                    Delete
                                                                </button>
                                                            )}
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

            {deleteModalOpen && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#f1f0e9] border rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Confirm Delete
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete Order ?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                                onClick={() => {
                                    setSelectedOrder(null);
                                    setDeleteModalOpen(false);
                                }}
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                onClick={confirmDelete}
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {addModalOpen && (
                <AddNewOrderModal
                    isOpen={addModalOpen}
                    onClose={() => setAddModalOpen(false)}
                    onSuccess={handleModalSuccess}
                />
            )}

            {lastFollowUpModalOpen && (
                <ViewLastFollowUp
                    isOpen={lastFollowUpModalOpen}
                    onClose={() => setLastFollowUpModalOpen(false)}
                    followUp={selectedOrder?.OrderId}
                />
            )}

            {editModalOpen && (
                <EditOrderModal
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onSuccess={handleModalSuccess}
                    orderId={selectedOrder}
                />
            )}
        </div>
    );
};

export default Order;