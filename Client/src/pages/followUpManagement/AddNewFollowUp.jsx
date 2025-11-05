import React, { useState, useEffect, useRef } from 'react';
import { getLeadsDD, getAllLeadStatusDD } from '../../api/leadApi';
import { toast } from 'react-toastify';
import CloseIcon from "../../assets/icons/CloseIcon";
import { createFollowUp } from '../../api/followUpApi';
import { Search } from 'lucide-react';
import { useEscapeKey } from '../../utils/useEscapeKey';

const AddNewFollowUp = ({ isOpen, onClose, onSuccess, followUp }) => {
    const [leads, setLeads] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form data
    const [selectedLead, setSelectedLead] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [comments, setComments] = useState('');

    // Search states
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const today = new Date().toISOString().split('T')[0];
    const [nextFollowUpDate, setNextFollowUpDate] = useState(today);

    // Filter leads based on search query
    const filteredLeads = leads.filter(lead =>
        lead.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get selected lead name
    const selectedLeadName = leads.find(lead => lead.LeadId === selectedLead)?.Name || '';

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch leads for dropdown only when followUp is not passed
    const fetchLeads = async () => {
        try {
            const response = await getLeadsDD();
            if (response && Array.isArray(response) && response.length >= 1) {
                setLeads(response[0] || []);
            }
        } catch (err) {
            console.error('Error fetching leads:', err);
            toast.error('Failed to load leads');
        }
    };

    // Fetch statuses for dropdown
    const fetchStatuses = async () => {
        try {
            const res = await getAllLeadStatusDD();
            setStatusOptions(res[0] || []);
        } catch (err) {
            console.error('Error fetching statuses:', err);
            toast.error('Failed to load statuses');
        }
    };

    useEscapeKey(() => {
        if (isOpen) onClose();
    });

    // Load data on mount
    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            if (followUp?.LeadId) {
                // Pre-fill from followUp
                setSelectedLead(followUp.LeadId);
                setLeads([
                    {
                        LeadId: followUp.LeadId,
                        Name: followUp?.Name && followUp?.Name.trim() !== ""
                            ? `${followUp.Name} - ${followUp.Contact}`
                            : followUp?.Contact || ""
                    }
                ]);
                // no need to fetch leads
                fetchStatuses().finally(() => setLoading(false));
            } else {
                // Normal flow: fetch all leads
                Promise.all([fetchLeads(), fetchStatuses()])
                    .finally(() => setLoading(false));
            }
        }
    }, [isOpen, followUp]);

    // Handle form submission
    const handleSubmit = async () => {
        if (!selectedLead) {
            toast.error('Please select a lead');
            return;
        }
        if (!selectedStatus) {
            toast.error('Please select a status');
            return;
        }
        if (!nextFollowUpDate) {
            toast.error('Please select next follow-up date');
            return;
        }

        setSubmitting(true);
        try {
            const response = await createFollowUp(
                selectedLead,
                selectedStatus,
                comments,
                nextFollowUpDate
            );

            if (response.status === 201) {
                toast.success(response.data.Message);
                onSuccess();
                handleClose();
            } else {
                toast.error(
                    response.data?.[0]?.Message ||
                    response.data?.Message ||
                    "Something went wrong"
                );
            }
        } catch (err) {
            console.error('Error creating follow-up:', err);
            toast.error('Failed to add follow-up');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle close
    const handleClose = () => {
        setSelectedLead('');
        setSelectedStatus('');
        setComments('');
        setNextFollowUpDate('');
        setSearchQuery('');
        onClose();
    };

    // Handle lead selection
    const handleLeadSelect = (leadId) => {
        setSelectedLead(leadId);
        setIsDropdownOpen(false);
        setSearchQuery('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-end z-50 overflow-y-auto">
            <div className="w-200 max-w-2xl h-full bg-[#f1f0e9] shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleClose}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Add new follow-up
                            </h2>
                            <p className="text-xs text-gray-500">
                                Add in the details of the follow-up.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0d4715]"></div>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {/* Select Lead with Search */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select lead
                                </label>
                                <div className="relative" ref={dropdownRef}>
                                    {/* Display Field */}
                                    <div
                                        onClick={() => !followUp?.LeadId && setIsDropdownOpen(!isDropdownOpen)}
                                        className={`w-full appearance-none rounded-sm px-4 py-2.5 pr-10 text-sm border border-gray-300 
                                    ${followUp?.LeadId ? 'bg-[#00000012] cursor-not-allowed text-gray-600' : 'bg-[#00000012] cursor-pointer hover:border-gray-400 focus:border-gray-400'}
                                `}
                                    >
                                        {selectedLeadName || 'Select lead'}
                                    </div>

                                    {/* Dropdown Arrow */}
                                    {!followUp?.LeadId && (
                                        <img
                                            src="/icons/Dropdown.png"
                                            alt="Dropdown"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-2 pointer-events-none opacity-50"
                                        />
                                    )}

                                    {/* Dropdown Panel */}
                                    {isDropdownOpen && !followUp?.LeadId && (
                                        <div className="absolute z-10 w-full mt-1 bg-[#f1f0e9] border border-gray-300 rounded-sm shadow-lg">
                                            {/* Search Input */}
                                            <div className="p-2 border-b border-gray-200">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        placeholder="Search leads..."
                                                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                                                        onClick={(e) => e.stopPropagation()}
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>

                                            {/* Options List */}
                                            <div className="max-h-48 overflow-y-auto">
                                                {filteredLeads.length > 0 ? (
                                                    filteredLeads.map((lead) => (
                                                        <div
                                                            key={lead.LeadId}
                                                            onClick={() => handleLeadSelect(lead.LeadId)}
                                                            className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 ${selectedLead === lead.LeadId ? 'bg-gray-50' : 'bg-[#f1f0e9]'
                                                                }`}
                                                        >
                                                            {lead.Name}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                                        No leads found
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full appearance-none bg-white rounded-sm px-4 py-2.5 pr-10 text-sm border border-gray-300 hover:border-gray-400 focus:border-gray-400"
                                    >
                                        <option value="">Select status</option>
                                        {statusOptions.map((status) => (
                                            <option key={status.LeadStatusId} value={status.LeadStatusId}>
                                                {status.Name}
                                            </option>
                                        ))}
                                    </select>
                                    <img
                                        src="/icons/Dropdown.png"
                                        alt="Dropdown"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-2 pointer-events-none opacity-50"
                                    />
                                </div>
                            </div>


                            {/* Next Follow-up Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Next follow-up date
                                </label>
                                <div className="relative" onClick={() => document.getElementById('nextFollowUpDate').showPicker()}>
                                    <input
                                        id='nextFollowUpDate'
                                        type="date"
                                        value={nextFollowUpDate}
                                        onChange={(e) => setNextFollowUpDate(e.target.value)}
                                        className="w-full bg-white rounded-sm px-4 py-2.5 text-sm border border-gray-300"
                                        min={today}
                                    />
                                </div>
                            </div>

                            {/* Follow up Comments */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Follow up comments (optional):
                                </label>
                                <textarea
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    placeholder="Type here"
                                    rows={8}
                                    className="w-full rounded-sm px-4 py-3 text-sm border border-gray-300 resize-none"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-300">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || loading}
                        className="w-full bg-[#0d4715] text-white rounded-sm py-3 text-sm font-medium hover:bg-[#0a3811] disabled:!opacity-50 disabled:!cursor-not-allowed transition-colors"
                    >
                        {submitting ? 'Adding...' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewFollowUp;