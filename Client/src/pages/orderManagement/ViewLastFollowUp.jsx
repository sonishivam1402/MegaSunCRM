import React, { useState, useEffect } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import { getFollowUpById } from '../../api/followUpApi';
import dayjs from 'dayjs';
import { getLastFollowupByOrderId } from '../../api/orderApi';
import getLabelColor from '../../utils/GetLabelColor';
import { useEscapeKey } from '../../utils/useEscapeKey';

const ViewLastFollowUp = ({ isOpen, onClose, followUp }) => {
    const [followUps, setFollowUps] = useState([]);
    const [loading, setLoading] = useState(false);

    useEscapeKey(() => {
        if (isOpen) onClose();
    });

    const getData = async (id) => {
        setLoading(true);
        try {
            const response = await getLastFollowupByOrderId(id);
            const data = Array.isArray(response[0]) ? response[0] : [];
            setFollowUps(data);

        } catch (error) {
            console.error('Error fetching follow-up:', error);
            setFollowUps([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && followUp) {
            getData(followUp);
        }
    }, [isOpen, followUp]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-end z-50">
            <div className="bg-[#F0EEE4] w-full max-w-6xl h-screen flex flex-col shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-900">Follow-Up Details</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                        <CloseIcon size={16} />
                    </button>
                </div>

                {/* Table Container */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="rounded-md">
                        <table className="w-full">
                            <thead className="border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lead Name
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Followup Date
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Next Followup Date
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Comment
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lead Source
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center">
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0d4715]"></div>
                                                <span className="ml-2 text-gray-600">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : followUps.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                            No follow-ups found
                                        </td>
                                    </tr>
                                ) : (
                                    followUps.map((followUp, index) => (
                                        <tr key={followUp.FollowUpId || followUp.LeadId || index}>
                                            {/* Lead Details */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-gray-900 cursor-pointer hover:text-[#0d4715]">
                                                            {followUp.LeadName || 'N/A'}
                                                        </span>
                                                        {followUp.LeadType && (
                                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(followUp.LeadType)}`}>
                                                                {followUp.LeadType}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {followUp.LeadContact || 'XXXXXXXXXX'}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Last Followup Date */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                                {dayjs(followUp.LastFollowUpDate).format("DD-MM-YYYY")}
                                            </td>

                                            {/* Next Followup Date */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                                {dayjs(followUp.NextFollowUpDate).format("DD-MM-YYYY")}
                                            </td>

                                            {/* Comments */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                                {followUp.Comments}
                                            </td>

                                            {/* Lead Source */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                                {followUp.LeadSource || 'N/A'}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getLabelColor(followUp.LeadStatus)}`}>
                                                    {followUp.LeadStatus || 'N/A'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewLastFollowUp;