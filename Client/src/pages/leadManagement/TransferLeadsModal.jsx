import React, { useState, useEffect } from 'react';
import { getAllUsersDD } from '../../api/userApi';
import { transferLeads } from '../../api/leadApi';
import { toast } from 'react-toastify';
import CloseIcon from "../../assets/icons/CloseIcon";
import { useEscapeKey } from '../../utils/useEscapeKey';

const TransferLeadsModal = ({ isOpen, onClose, onSuccess, leadsData }) => {
    const [usersOptions, setUsersOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');

    useEscapeKey(() => {
        if (isOpen) onClose();
    });

    // Fetch users for dropdown
    const getUsers = async () => {
        try {
            const res = await getAllUsersDD();
            setUsersOptions(res.data[0] || []);
        } catch (err) {
            console.error('Error fetching users:', err);
            toast.error('Failed to load users');
        }
    };

    // Load users on mount
    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            getUsers().finally(() => setLoading(false));
        }
    }, [isOpen]);

    // Handle transfer
    const handleTransfer = async () => {
        if (!selectedUser) {
            toast.error('Please select a user');
            return;
        }

        if (!leadsData || leadsData.length === 0) {
            toast.error('No leads to transfer');
            return;
        }

        setSubmitting(true);
        try {
            // Extract lead IDs from the passed data
            const leadIds = leadsData.map(lead => lead.LeadId);

            const data = {
                selectedUser,
                leadIds,
            };

            const response = await transferLeads(data);

            if (response.status === 200 || response.status === 201) {
                toast.success(response.data.Message || 'Leads transferred successfully');
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
            console.error('Error transferring leads:', err);
            toast.error('Failed to transfer leads');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle close
    const handleClose = () => {
        setSelectedUser('');
        onClose();
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
                                Transfer leads
                            </h2>
                            <p className="text-xs text-gray-500">
                                Select a user to transfer the selected leads.
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

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0d4715]"></div>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {/* Leads Table */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Selected leads ({leadsData?.length || 0})
                                </label>
                                <div className="bg-white rounded-sm border border-gray-300 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 border-b border-gray-300">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                                                        Lead Name
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                                                        Mobile
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                                                        Assigned To
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {leadsData && leadsData.length > 0 ? (
                                                    leadsData.map((lead, index) => (
                                                        <tr key={lead.LeadId || index} className="hover:bg-gray-50">
                                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                                {lead.Name || '-'}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                                {lead.Contact || '-'}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                                {lead.AssignedTo || '-'}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" className="px-4 py-8 text-center text-sm text-gray-500">
                                                            No leads selected
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Select User Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Transfer to
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedUser}
                                        onChange={(e) => setSelectedUser(e.target.value)}
                                        className="w-full appearance-none bg-white rounded-sm px-4 py-2.5 pr-10 text-sm border border-gray-300"
                                    >
                                        <option value="">Select user</option>
                                        {usersOptions.map((user) => (
                                            <option key={user.UserId} value={user.UserId}>
                                                {user.Name || user.UserName}
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
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-300">
                    <button
                        onClick={handleTransfer}
                        disabled={submitting || loading || !leadsData || leadsData.length === 0}
                        className="w-full bg-[#0d4715] text-white rounded-sm py-3 text-sm font-medium hover:bg-[#0a3811] disabled:!opacity-50 disabled:!cursor-not-allowed transition-colors"
                    >
                        {submitting ? 'Transferring...' : 'Transfer'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransferLeadsModal;