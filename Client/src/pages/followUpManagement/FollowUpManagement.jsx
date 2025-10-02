import React, { useEffect, useState, useRef, useCallback } from 'react';
import { deleteFollowUpById, getFollowUps } from '../../api/followUpApi';
import EditIcon from "../../assets/icons/EditIcon";
import AddIcon from "../../assets/icons/AddIcon";
import HistoryIcon from '../../assets/icons/HistoryIcon';
import WhatsAppIcon from '../../assets/icons/WhatsAppIcon';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import { toast } from 'react-toastify';
import dayjs from "dayjs";
import AddNewFollowUp from './AddNewFollowUp';
import EditFollowUpComment from './EditFollowUpComment';
import DetailFollowUpModal from './DetailFollowUpModal';
import HistoryModal from './HistoryModal';

const FollowUpManagement = () => {
    // State management
    const [followUps, setFollowUps] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [addFollowUpModalOpen, setAddFollowUpModalOpen] = useState(false);
    const [editFollowUpModalOpen, setEditFollowUpModalOpen] = useState(false);
    const [detailFollowUpModalOpen, setDetailFollowUpModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [selectedFollowUp, setSelectedFollowUp] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const dropdownRefs = useRef({});

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
                offset: offset
            };

            const response = await getFollowUps(apiParams);
            //console.log(response)
            // Handle response structure similar to leads
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
        fetchFollowUps('All', 1, pageSize);
    }, [fetchFollowUps, pageSize]);

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

    // Dropdown handlers
    const toggleDropdown = (followUpId) => {
        setActiveDropdown(activeDropdown === followUpId ? null : followUpId);
    };

    const handleHistory = (followUp) => {
        setSelectedFollowUp(followUp);
        setHistoryModalOpen(true);
        setActiveDropdown(null);
    };

    const handleEdit = (followUp) => {
        setSelectedFollowUp(followUp);
        setEditFollowUpModalOpen(true);
        setActiveDropdown(null);
    };

    const handleAdd = (followUp) => {
        setAddFollowUpModalOpen(true);
        setSelectedFollowUp(followUp);
        setActiveDropdown(null);
    };

    const handleWhatsApp = (followUp) => {
        if (!followUp?.Contact) {
            console.error("No contact found for this follow-up");
            return;
        }

        // Ensure correct format (without spaces, etc.)
        const phone = followUp.Contact.replace(/\D/g, "");

        // Optional: prefill a message
        const message = encodeURIComponent("Hello, I'm following up regarding your inquiry.");

        const whatsappUrl = `https://api.whatsapp.com/send?phone=91${phone}&text=${message}`;

        // Open in new tab
        window.open(whatsappUrl, "_blank");

        setActiveDropdown(null);
    };


    const handleExport = () => {
        console.log('Export follow-ups');
        toast.info('Export functionality coming soon');
    };

    const handleAddNewFollowUp = () => {
        setAddFollowUpModalOpen(true);
    };

    const handleDelete = (Id) => {
        setDeleteModalOpen(true);
        setSelectedFollowUp(Id);
        setActiveDropdown(null);
    };

    const confirmDelete = async () => {
        if (!selectedFollowUp) return;
        setDeleting(true);
        try {
            const response = await deleteFollowUpById(selectedFollowUp);
            if (response.status == 201) {
                setSelectedFollowUp(null)
                setDeleteModalOpen(false);
                toast.success(response.data.Message);
                await fetchFollowUps();
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

    // const handleSort = () => {
    //     console.log('Sort follow-ups');
    //     toast.info('Sort functionality coming soon');
    // };

    // const handleFilter = () => {
    //     console.log('Additional filters');
    //     toast.info('Filter functionality coming soon');
    // };

    // Get status color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'interested':
                return 'bg-green-100 text-green-800';
            case 'not interested':
                return 'bg-red-100 text-red-800';
            case 'fresh lead':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get lead type color
    const getLeadTypeColor = (leadType) => {
        switch (leadType) {
            case 'Retail':
                return 'bg-orange-100 text-orange-800';
            case 'User':
                return 'bg-purple-100 text-purple-800';
            case 'Dealer':
                return 'bg-blue-100 text-blue-800';
            case 'NPD':
                return 'bg-pink-100 text-pink-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

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
            <div className="px-6 py-4 flex-shrink-0">
                <h1 className="text-xl font-medium text-gray-900 mb-4">{activeFilter} follow-ups</h1>

                {/* Filter Tabs and Actions */}
                <div className="flex items-center justify-between">
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

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            <img src="/icons/Export.png" alt="Export" className="w-4 h-4" />
                            Export
                        </button>
                        <button
                            onClick={handleAddNewFollowUp}
                            className="flex items-center gap-2 px-4 py-2 text-green-900 rounded-sm text-sm font-medium border !border-green-900"
                        >
                            <AddIcon color='green' />
                            Add new follow-up
                        </button>
                        {/* <button
              onClick={handleSort}
              className="p-2 bg-white rounded-lg hover:bg-gray-100 border border-gray-300"
            >
              <img src="/icons/Sort.png" alt="Sort" className="w-4 h-4" />
            </button>
            <button
              onClick={handleFilter}
              className="p-2 bg-white rounded-lg hover:bg-gray-100 border border-gray-300"
            >
              <img src="/icons/Filter.png" alt="Filter" className="w-4 h-4" />
            </button> */}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="px-6 flex-1 overflow-y-auto">
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
                            <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ACTIONS
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
                                                <span className="text-sm font-medium text-gray-900 cursor-pointer hover:text-[#0d4715]">
                                                    {followUp.LeadName || 'N/A'}
                                                </span>
                                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getLeadTypeColor(followUp.LeadType)}`}>
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
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(followUp.FollowupStatus)}`}>
                                            {followUp.FollowupStatus || 'N/A'}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            {/* Call/History Button */}
                                            <button
                                                onClick={() => handleHistory(followUp.LeadId)}
                                                className="p-2 hover:bg-gray-100 rounded-full"
                                                title="History"
                                            >
                                                <HistoryIcon size={16} />
                                            </button>

                                            {/* Edit Button */}
                                            <button
                                                onClick={() => handleEdit(followUp)}
                                                className="p-2 hover:bg-gray-100 rounded-full"
                                                title="Edit"
                                            >
                                                <EditIcon size={16} />
                                            </button>

                                            {/* Add Button */}
                                            <button
                                                onClick={() => handleAdd(followUp)}
                                                className="p-2 hover:bg-gray-100 rounded-full"
                                                title="Add"
                                            >
                                                <AddIcon size={16} />
                                            </button>

                                            {/* WhatsApp Button */}
                                            <button
                                                onClick={() => handleWhatsApp(followUp)}
                                                className="p-2 hover:bg-gray-100 rounded-full"
                                                title="WhatsApp"
                                            >
                                                <WhatsAppIcon size={16} />
                                            </button>

                                            {/* More Options */}
                                            <div className="relative" ref={el => dropdownRefs.current[followUp.FollowUpId || followUp.LeadId] = el}>
                                                <button
                                                    className="p-1 hover:bg-gray-100 rounded"
                                                    onClick={() => toggleDropdown(followUp.FollowUpId || followUp.LeadId)}
                                                >
                                                    <ThreeDotIcon />
                                                </button>

                                                {/* Dropdown Menu */}
                                                {activeDropdown === (followUp.FollowUpId || followUp.LeadId) && (
                                                    <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                                        <div className="py-1">
                                                            <button
                                                                onClick={() => {
                                                                    setDetailFollowUpModalOpen(true);
                                                                    setSelectedFollowUp(followUp);
                                                                    setActiveDropdown(null);
                                                                }}
                                                                className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
                                                            >
                                                                View Details
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    handleDelete(followUp.FollowUpId)
                                                                    setActiveDropdown(null);
                                                                }}
                                                                className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
                                                            >
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

            {deleteModalOpen && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#f1f0e9] border rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Confirm Delete
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete ?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                                onClick={() => {
                                    setSelectedFollowUp(null);
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

            {addFollowUpModalOpen && (
                <AddNewFollowUp
                    isOpen={addFollowUpModalOpen}
                    onClose={() => setAddFollowUpModalOpen(false)}
                    onSuccess={() => fetchFollowUps()}
                    followUp={selectedFollowUp}
                />
            )}

            {editFollowUpModalOpen && (
                <EditFollowUpComment
                    id={selectedFollowUp?.FollowUpId}
                    comment={selectedFollowUp?.Comments}
                    isOpen={editFollowUpModalOpen}
                    onClose={() => setEditFollowUpModalOpen(false)}
                    onSuccess={() => fetchFollowUps()}
                />
            )}

            {detailFollowUpModalOpen && (
                <DetailFollowUpModal
                    isOpen={detailFollowUpModalOpen}
                    onClose={() => setDetailFollowUpModalOpen(false)}
                    followUp={selectedFollowUp?.FollowUpId}
                />
            )}

            {historyModalOpen && (
                <HistoryModal
                    isOpen={historyModalOpen}
                    onClose={() => setHistoryModalOpen(false)}
                    followUp={selectedFollowUp}
                />
            )}

        </div>
    );
};

export default FollowUpManagement;