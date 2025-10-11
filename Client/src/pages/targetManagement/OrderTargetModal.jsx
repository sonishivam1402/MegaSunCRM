import React, { useEffect, useState, useCallback } from 'react';
import { getOrderByUserIdAndMonth } from '../../api/targetApi';
import CloseIcon from '../../assets/icons/CloseIcon';

const OrderTargetModal = ({ isOpen, onClose, data }) => {
    const [orders, setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(totalRecords / pageSize);

    // Fetch order data
    const fetchOrderData = useCallback(async (page = 1, limit = 50) => {
        if (!data) return;

        try {
            setLoading(true);
            const offset = (page - 1) * limit;

            const response = await getOrderByUserIdAndMonth({
                userId: data.UserId,
                month: data.Month,
                year: data.Year,
                offset,
                limit
              });
              

            console.log(response);

            if (response && response.data) {
                setOrders(response.data[0] || []);
                setTotalRecords(response.data?.[1]?.[0]?.["Total Count"] || 0);
            }

        } catch (err) {
            console.error('Error fetching order data:', err);
            setOrders([]);
            setTotalRecords(0);
        } finally {
            setLoading(false);
        }
    }, [data]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setPageNumber(page);
            fetchOrderData(page, pageSize);
        }
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPageNumber(1);
        fetchOrderData(1, newPageSize);
    };

    useEffect(() => {
        if (isOpen && data) {
            fetchOrderData(pageNumber, pageSize);
        }
    }, [isOpen, data]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-end z-50 overflow-y-auto">
            <div className="w-400 max-w-6xl h-full bg-[#f1f0e9] shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Order List
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Table - Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                            <span className="ml-2">Loading...</span>
                        </div>
                    ) : (
                        <div className="rounded">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            DATE
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            LEAD DETAILS
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            CONTACT DETAILS
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            ORDER
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            LEAD SOURCE
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            TYPE
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                No orders found
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order, index) => (
                                            <tr key={order.OrderId || index} className="hover:bg-gray-50">
                                                {/* Date */}
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-blue-600 font-medium">
                                                        -{order.LeadId || 'N/A'} {order.AssignedTo || ''}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {order.Date || 'N/A'}
                                                    </div>
                                                </td>

                                                {/* Lead Details */}
                                                <td className="px-4 py-4">
                                                    <div className="text-sm text-gray-900 font-medium">
                                                        {order.LeadName || 'N/A'}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <span>{order.City || ''}</span>
                                                        {order.City && order.State && <span>-</span>}
                                                        <span>{order.State || ''}</span>
                                                        {order.Location && (
                                                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-yellow-100 text-yellow-600 ml-1">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Contact Details */}
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-blue-600">
                                                        {order.ContactNumber || 'N/A'}
                                                    </div>
                                                </td>

                                                {/* Order */}
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        Basic: ₹{order.BasicAmount?.toLocaleString('en-IN') || '0'}
                                                    </div>
                                                    <div className="text-sm text-gray-900">
                                                        Final: ₹{order.FinalAmount?.toLocaleString('en-IN') || '0'}
                                                    </div>
                                                </td>

                                                {/* Lead Source */}
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <span className="inline-flex px-3 py-1 rounded text-xs font-medium bg-gray-800 text-white">
                                                        {order.LeadSource || 'Direct call'}
                                                    </span>
                                                </td>

                                                {/* Type */}
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <span className="inline-flex px-3 py-1 rounded text-xs font-medium bg-orange-500 text-white">
                                                        {order.Type || 'Domestic'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Show</span>
                        <div className="relative">
                            <select
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                className="appearance-none bg-white hover:cursor-pointer rounded px-3 py-2 pr-8 text-sm border border-gray-300"
                            >
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                            </select>
                            <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-600">entries</span>
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
        </div>
    );
};

export default OrderTargetModal;