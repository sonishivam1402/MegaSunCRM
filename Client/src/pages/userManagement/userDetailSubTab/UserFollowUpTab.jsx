import React, { useEffect, useState, useCallback } from 'react';
import { getFollowUps } from '../../../api/followUpApi';
import { toast } from 'react-toastify';
import dayjs from "dayjs";
import getLabelColor from '../../../utils/GetLabelColor';

const UserFollowUpTab = ({id}) => {

    // State management
    const [followUps, setFollowUps] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / pageSize);

    // Filter tabs
    const filterTabs = [
        { label: 'All', value: 'All' },
        { label: 'Upcoming', value: 'Upcoming' },
        { label: 'Deal Closed', value: 'Deal Closed' },
        { label: 'Expired', value: 'Expired' },
        { label: 'Not Interested', value: 'Not Interested' }
    ];

    // Fetch follow-ups
    const fetchFollowUps = useCallback(async (filter = 'All', page = 1, limit = 10) => {
        try {
            setLoading(true);
            const offset = (page - 1) * limit;

            const apiParams = {
                filter: filter,
                limit: limit,
                offset: offset,
                userId: id
            };

            const response = await getFollowUps(apiParams);

            // Handle response structure
            if (response && Array.isArray(response) && response.length >= 2) {
                const followUpsData = response[0] || [];
                setFollowUps(followUpsData);
                const totalCountData = response[1] || [];
                const totalCount = totalCountData[0]?.["Total Count"] || 0;
                setTotalRecords(totalCount);
            } else {
                setFollowUps([]);
                setTotalRecords(0);
            }
        } catch (err) {
            console.error('Error fetching follow-ups:', err);
            setFollowUps([]);
            setTotalRecords(0);
            toast.error('Failed to fetch follow-ups');
        } finally {
            setLoading(false);
        }
    }, []);

    // Handle filter change
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setPageNumber(1);
        fetchFollowUps(filter, 1, pageSize);
    };

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setPageNumber(page);
            fetchFollowUps(activeFilter, page, pageSize);
        }
    };

    // Handle page size change
    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPageNumber(1);
        fetchFollowUps(activeFilter, 1, newPageSize);
    };

    // Initial data fetch
    useEffect(() => {
        if (id) {
            fetchFollowUps('All', 1, pageSize);
        }
    }, [fetchFollowUps, pageSize]);

    // Format products
    const formatProducts = (products) => {
        if (!products || products.length === 0) return 'N/A';
        const productList = products.split(",").map(p => p.trim());
        const displayed = productList.slice(0, 2).join(", ");
        const extra = productList.length > 2 ? `, ${productList.length - 2} more..` : "";
        return displayed + extra;
    };

    return (
        <div className="flex flex-col h-full bg-[#f1f0e9]">
            {/* Header */}
            <div className="px-6 py-4 flex-shrink-0 bg-[#f1f0e9]">
                <h1 className="text-xl font-medium text-gray-900 mb-4">{activeFilter} follow-ups</h1>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => handleFilterChange(tab.value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === tab.value
                                    ? 'bg-[#0d4715] text-white'
                                    : 'border text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Container with Scroll */}
            <div className="flex-1 overflow-y-auto px-6 min-h-0">
                <table className="w-full rounded-lg">
                    <thead className="border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                LEAD DETAILS
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                LAST FOLLOWUP DATE
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                NEXT FOLLOWUP DATE
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ITEM
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ASSIGNED TO
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                LEAD SOURCE
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center">
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0d4715]"></div>
                                        <span className="ml-2 text-gray-600">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : followUps.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                    No follow-ups found
                                </td>
                            </tr>
                        ) : (
                            followUps.map((followUp) => (
                                <tr key={followUp.FollowUpId || followUp.LeadId} className="hover:bg-gray-50">
                                    {/* Lead Details */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {followUp.LeadName || 'N/A'}
                                                </span>
                                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(followUp.LeadType)}`}>
                                                    {followUp.LeadType || 'N/A'}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {followUp.Contact || 'XXXXXXXXXX'} • {followUp.State || 'Madhya Pradesh'}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Last Followup Date */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                        {dayjs(followUp.LastFollowUpDate).format("DD-MM-YYYY") || 'N/A'}
                                    </td>

                                    {/* Next Followup Date */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                        {dayjs(followUp.NextFollowUpDate).format("DD-MM-YYYY") || 'N/A'}
                                    </td>

                                    {/* Item */}
                                    <td className="px-6 py-4 text-center text-sm text-gray-900">
                                        <div className="max-w-xs mx-auto">
                                            {formatProducts(followUp.Products || followUp.Item)}
                                        </div>
                                    </td>

                                    {/* Assigned To */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                                                {followUp.AssignedToAvatar ? (
                                                    <img
                                                        src={followUp.AssignedToAvatar}
                                                        alt="Profile"
                                                        className="w-6 h-6 object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium bg-[#0d4715]">
                                                        {followUp.AssignedUser ? followUp.AssignedUser.charAt(0).toUpperCase() : '?'}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-900">{followUp.AssignedUser || 'N/A'}</span>
                                        </div>
                                    </td>

                                    {/* Lead Source */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                        {followUp.LeadSource || 'N/A'}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getLabelColor(followUp.FollowupStatus)}`}>
                                            {followUp.FollowupStatus || 'N/A'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-6 py-4 flex-shrink-0 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    {/* Page Size Selector */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Show</span>
                        <div className="relative">
                            <select
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                className="appearance-none bg-btn-gray hover:cursor-pointer rounded-s-xs px-3 py-1 pr-8 text-sm border border-gray-300"
                            >
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                            </select>
                            <img
                                src="/icons/Dropdown.png"
                                alt="Dropdown"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-2 pointer-events-none opacity-50"
                            />
                        </div>
                        <span className="text-sm text-gray-600">records</span>
                    </div>

                    {/* Records Info */}
                    <div className="text-sm text-gray-600">
                        Showing {totalRecords === 0 ? 0 : ((pageNumber - 1) * pageSize) + 1} to{' '}
                        {Math.min(pageNumber * pageSize, totalRecords)} of {totalRecords} entries
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center border border-gray-300 rounded">
                        {/* Previous button */}
                        <button
                            onClick={() => handlePageChange(pageNumber - 1)}
                            disabled={pageNumber === 1 || loading}
                            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
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
                            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border-l border-gray-300"
                        >
                            <img src="/icons/Right_arrow.png" alt="Next" className="w-2 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserFollowUpTab;