import React, { useEffect, useState, useRef, useCallback } from 'react';
import { deleteLeadById, getAllLeads, getAllLeadSourcesDD, getAllLeadStatusDD, getAllLeadTypesDD } from '../../api/leadApi';
import LeadDetailModal from './LeadDetailModal';
import EditIcon from "../../assets/icons/EditIcon";
import AddIcon from "../../assets/icons/AddIcon";
import HistoryIcon from '../../assets/icons/HistoryIcon';
import WhatsAppIcon from '../../assets/icons/WhatsAppIcon';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import { toast } from 'react-toastify';
import EditLeadModal from './EditLeadModal';
import LastFollowUpModal from './LastFollowUpModal';
import AddNewFollowUp from '../followUpManagement/AddNewFollowUp';
import { useAuth } from '../../context/AuthContext';
import HistoryModal from '../followUpManagement/HistoryModal';
import getLabelColor from '../../utils/GetLabelColor';

const LeadsTab = ({ refreshKey }) => {
  // State management
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filters
  const [leadTypeFilter, setLeadTypeFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [leadTypeOptions, setLeadTypeOptions] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  // Modal and dropdown states
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [lastFollowUpModalOpen, setLastFollowUpModalOpen] = useState(false);
  const [addFollowUpModalOpen, setAddFollowUpModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const dropdownRefs = useRef({});
  const { user, menus } = useAuth();

  const leadMenu = menus.find(item => item.Name === "My Leads");
  const followUpMenu = menus.find(item => item.Name === "Followups");

  // Debounce timer ref
  const searchTimeoutRef = useRef(null);

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);

  // Fetch leads with pagination, search, and filters
  const fetchLeads = useCallback(async (search = '', page = 1, limit = 10, status = '', leadTypeId = '', sourceId = '') => {
    // console.log('API CALL TRIGGERED:', {
    //   search: search,
    //   page: page,
    //   limit: limit,
    //   offset: (page - 1) * limit,
    //   status: status,
    //   leadTypeId: leadTypeId,
    //   sourceId: sourceId,
    //   timestamp: new Date().toISOString()
    // });

    try {
      setLoading(true);
      const offset = (page - 1) * limit;

      // Build API parameters
      const apiParams = {
        search: search,
        limit: limit,
        offset: offset,
        userId: user.UserId
      };

      // Add status filter if provided
      if (status !== '') {
        apiParams.status = status;
      }

      // Add leadTypeId filter if provided
      if (leadTypeId !== '') {
        apiParams.leadTypeId = leadTypeId;
      }

      // Add sourceId filter if provided
      if (sourceId !== '') {
        apiParams.sourceId = sourceId;
      }

      const response = await getAllLeads(apiParams);
      // Handle the actual API response structure
      // Response is an array with [leads_array, total_count_array, success_message_array]
      if (response && Array.isArray(response) && response.length >= 2) {
        // First array contains the leads data
        const leadsData = response[0] || [];
        setLeads(leadsData);

        // Second array contains total count
        const totalCountData = response[1] || [];
        const totalCount = totalCountData[0]?.["Total Count"] || 0;
        setTotalRecords(totalCount);
      } else {
        // Fallback if response structure is different
        setLeads([]);
        setTotalRecords(0);
      }
    } catch (err) {
      console.error('API ERROR:', err);
      setLeads([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch filter options
  const getLeadTypes = async () => {
    try {
      const res = await getAllLeadTypesDD();
      setLeadTypeOptions(res[0]);
    } catch (err) {
      console.error('Error fetching lead types:', err);
    }
  };

  const getSources = async () => {
    try {
      const res = await getAllLeadSourcesDD();
      setSourceOptions(res[0]);
    } catch (err) {
      console.error('Error fetching sources:', err);
    }
  };

  const getStatuses = async () => {
    try {
      const res = await getAllLeadStatusDD();
      setStatusOptions(res[0]);
    } catch (err) {
      console.error('Error fetching statuses:', err);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback((searchValue, page = 1, limit = pageSize) => {
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // If search term is less than 3 characters, don't make any API call
    if (searchValue.length < 3) {
      //console.log('NO API CALL - Less than 3 characters');
      return;
    }

    // Only set timeout and make API call if 3+ characters
    // console.log('SETTING 1-SECOND TIMEOUT FOR SEARCH');
    searchTimeoutRef.current = setTimeout(() => {
      //console.log('TIMEOUT COMPLETED - Making API call');
      fetchLeads(searchValue, page, limit, statusFilter, leadTypeFilter, sourceFilter);
    }, 1000);
  }, [pageSize, fetchLeads, statusFilter, leadTypeFilter, sourceFilter]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPageNumber(1); // Reset to first page on search

    // If search is cleared (empty), fetch all leads immediately
    if (value === '') {
      //console.log('SEARCH CLEARED - Immediate API call for all leads');
      fetchLeads('', 1, pageSize, statusFilter, leadTypeFilter, sourceFilter);
      return;
    }

    // Otherwise, use debounced search (only calls API for 3+ chars)
    debouncedSearch(value, 1, pageSize);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page);
      const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
      fetchLeads(currentSearch, page, pageSize, statusFilter, leadTypeFilter, sourceFilter);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPageNumber(1); // Reset to first page
    const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
    fetchLeads(currentSearch, 1, newPageSize, statusFilter, leadTypeFilter, sourceFilter);
  };

  // Handle lead type filter change
  const handleLeadTypeFilterChange = (e) => {
    const value = e.target.value;
    setLeadTypeFilter(value);
    setPageNumber(1); // Reset to first page
    const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
    fetchLeads(currentSearch, 1, pageSize, statusFilter, value, sourceFilter);
  };

  // Handle source filter change
  const handleSourceFilterChange = (e) => {
    const value = e.target.value;
    setSourceFilter(value);
    setPageNumber(1); // Reset to first page
    const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
    fetchLeads(currentSearch, 1, pageSize, statusFilter, leadTypeFilter, value);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    setPageNumber(1); // Reset to first page
    const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
    fetchLeads(currentSearch, 1, pageSize, value, leadTypeFilter, sourceFilter);
  };

  // Initial data fetch
  useEffect(() => {
    //console.log('INITIAL LOAD - Component mounted or refreshKey changed');
    fetchLeads('', 1, pageSize, statusFilter, leadTypeFilter, sourceFilter);
    getLeadTypes();
    getSources();
    getStatuses();
  }, [refreshKey, fetchLeads, pageSize]);

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

  // Dropdown handlers
  const toggleDropdown = (leadId) => {
    setActiveDropdown(activeDropdown === leadId ? null : leadId);
  };

  const handleEdit = (leadId) => {
    setEditModalOpen(true);
    setSelectedLeadId(leadId);
    setActiveDropdown(null);
  };

  const handleAdd = (leadId) => {
    setAddFollowUpModalOpen(true);
    setSelectedLeadId(leadId);
    setActiveDropdown(null);
  };

  const handleDetails = (leadId) => {
    setDetailModalOpen(true);
    setSelectedLeadId(leadId);
    setActiveDropdown(null);
  };

  const handleDelete = (leadId) => {
    setDeleteModalOpen(true);
    setSelectedLeadId(leadId);
    setActiveDropdown(null);
  };

  const handleCall = (leadId) => {
    setLastFollowUpModalOpen(true)
    setSelectedLeadId(leadId)
    setActiveDropdown(null);
  };

  const handleWhatsApp = (lead) => {
    if (!lead?.Contact) {
      console.error("No contact found for this lead");
      return;
    }

    // Ensure correct format (without spaces, etc.)
    const phone = lead.Contact.replace(/\D/g, "");

    const whatsappUrl = `https://api.whatsapp.com/send?phone=91${phone}`;

    // Open in new tab
    window.open(whatsappUrl, "_blank");

    setActiveDropdown(null);
  };

  const confirmDelete = async () => {
    if (!selectedLeadId) return;
    setDeleting(true);
    try {
      await deleteLeadById(selectedLeadId);
      setSelectedLeadId(null)
      setDeleteModalOpen(false);
      toast.success('Deleted Successfully.');
      await fetchLeads();
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
  }

  return (
    <div className="flex flex-col h-full">
      {/* Filter Controls */}
      <div className="px-6 py-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-2xs">
            <img src="/icons/Search.png" alt="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
            <input
              type="text"
              placeholder="Search lead name (min 3 chars)"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-btn-gray rounded-s-xs text-sm"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          {/* Lead Type Filter */}
          <div className="relative">
            <select
              value={leadTypeFilter}
              onChange={handleLeadTypeFilterChange}
              className="appearance-none bg-btn-gray rounded-s-xs px-4 py-2 pr-8 text-sm hover:cursor-pointer"
            >
              <option value="">Lead type</option>
              {leadTypeOptions.map((option, index) => (
                <option key={index} value={option.LeadTypeId}>{option.Name}</option>
              ))}
            </select>
            <img src="/icons/Dropdown.png" alt="Dropdown" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-2 pointer-events-none opacity-50" />
          </div>

          {/* Source Filter */}
          <div className="relative">
            <select
              className="appearance-none bg-btn-gray rounded-s-xs px-4 py-2 pr-8 text-sm hover:cursor-pointer"
              value={sourceFilter}
              onChange={handleSourceFilterChange}
            >
              <option value="">Source</option>
              {sourceOptions.map((option, index) => (
                <option key={index} value={option.LeadSourceId}>{option.Name}</option>
              ))}
            </select>
            <img src="/icons/Dropdown.png" alt="Dropdown" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-2 pointer-events-none opacity-50" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="appearance-none bg-btn-gray rounded-s-xs px-4 py-2 pr-8 text-sm hover:cursor-pointer"
            >
              <option value="">Status</option>
              {statusOptions.map((option, index) => (
                <option key={index} value={option.LeadStatusId}>{option.Name}</option>
              ))}
            </select>
            <img src="/icons/Dropdown.png" alt="Dropdown" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-2 pointer-events-none opacity-50" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="border-b border-b-color">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LEAD DETAILS</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">LAST FOLLOWUP DATE</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-fit">ITEM</th>
              {user.IsAdmin && <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ASSIGNED TO</th>}
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">LEAD SOURCE</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
              <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-400">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.LeadId} className="hover:bg-gray-50">
                  {/* Lead Details */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{lead.Name || 'N/A'}</span>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(lead.LeadType)}`}>
                          {lead.LeadType || 'N/A'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{lead.Contact || 'N/A'} • {lead.State || 'N/A'}</div>
                    </div>
                  </td>

                  {/* Last Followup Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {lead.LastFollowUpDate || 'N/A'}
                  </td>

                  {/* Item */}
                  <td className="px-6 py-4 break-words whitespace-normal text-left text-sm text-gray-900">
                    {formatProducts(lead.Products)}
                  </td>

                  {/* Assigned To */}
                  {user.IsAdmin &&
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-left items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                          {lead.AssignedTo?.Avatar ? (
                            <img
                              src={lead.AssignedTo.Avatar}
                              alt="Profile"
                              className="w-6 h-6 object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium bg-[#0d4715]">
                              {lead.AssignedTo ? lead.AssignedTo.charAt(0).toUpperCase() : '?'}
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-900">{lead.AssignedTo || 'N/A'}</span>
                      </div>
                    </td>
                  }
                  {/* Lead Source */}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {lead.LeadSource || 'N/A'}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getLabelColor(lead.Status)}`}>
                      {lead.Status || 'N/A'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end items-center gap-1">
                      {/* Call Button */}
                      {followUpMenu?.ReadAccess && (
                        <button
                          onClick={() => handleCall(lead.LeadId)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                          title="Call"
                        >
                          <HistoryIcon size={14} />
                        </button>
                      )}

                      {/* Edit Button */}
                      {leadMenu?.UpdateAccess && (
                        <button
                          onClick={() => handleEdit(lead.LeadId)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                          title="Edit"
                        >
                          <EditIcon size={14} />
                        </button>
                      )}

                      {/* Add Button */}
                      {followUpMenu?.CreateAccess && (
                        <button
                          onClick={() => handleAdd(lead)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                          title="Create FollowUp"
                        >
                          <AddIcon size={14} />
                        </button>
                      )}

                      {/* WhatsApp Button */}
                      <button
                        onClick={() => handleWhatsApp(lead)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="WhatsApp"
                      >
                        <WhatsAppIcon size={14} />
                      </button>

                      {/* More Options */}
                      <div className="relative" ref={el => dropdownRefs.current[lead.LeadId] = el}>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => toggleDropdown(lead.LeadId)}
                        >
                          <ThreeDotIcon />
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdown === lead.LeadId && (
                          <div className="absolute right-0 mt-1 w-24 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                            <div className="py-1">
                              <button
                                onClick={() => handleDetails(lead.LeadId)}
                                className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Details
                              </button>
                              {leadMenu?.DeleteAccess && (
                                <button
                                  onClick={() => handleDelete(lead.LeadId)}
                                  className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
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
              Are you sure you want to delete ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => {
                  setSelectedLeadId(null);
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

      {detailModalOpen && (
        <LeadDetailModal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          leadId={selectedLeadId}
        />
      )}

      {editModalOpen && (
        <EditLeadModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          leadId={selectedLeadId}
          onSuccess={fetchLeads}
        />
      )}

      {/* {lastFollowUpModalOpen && (
        <LastFollowUpModal
          isOpen={lastFollowUpModalOpen}
          onClose={() => { setLastFollowUpModalOpen(false), setSelectedLeadId(null) }}
          leadId={selectedLeadId}
        />
      )} */}

      {lastFollowUpModalOpen && (
        <HistoryModal
          isOpen={lastFollowUpModalOpen}
          onClose={() => { setLastFollowUpModalOpen(false), setSelectedLeadId(null) }}
          followUp={selectedLeadId}
        />
      )}

      {addFollowUpModalOpen && (
        <AddNewFollowUp
          isOpen={addFollowUpModalOpen}
          onClose={() => { setAddFollowUpModalOpen(false), setSelectedLeadId(null) }}
          onSuccess={() => null}
          followUp={selectedLeadId}
        />
      )}

    </div>
  );
};

export default LeadsTab;