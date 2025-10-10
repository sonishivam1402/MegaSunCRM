import React, { useState, useEffect } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import { getFollowUpById, getLastFollowUpByLeadId } from '../../api/followUpApi';
import dayjs from 'dayjs';

const LastFollowUpModal = ({ isOpen, onClose, leadId }) => {
  const [followupData, setFollowUpData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async (id) => {
    setLoading(true);
    try {
      const response = await getLastFollowUpByLeadId(id);
      console.log("Response", response)
      setFollowUpData(response[0][0]);
    } catch (error) {
      console.error('Error fetching follow-up:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && leadId) {
      getData(leadId);
    }
  }, [isOpen, leadId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-end z-50">
      <div className="bg-[#F0EEE4] w-200 h-screen max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Last Follow-Up details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : followupData ? (
            <>
              <div className="space-y-6">

                <div className="flex items-center">
                  <span className="text-sm text-gray-700 w-32 flex-shrink-0">Assigned To</span>
                  <span className="text-sm text-gray-500 mx-3">:</span>
                  <span className="text-sm font-medium text-gray-900">{followupData.AssignedTo || 'N/A'}</span>
                </div>

                {/* Comments */}
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 w-32 flex-shrink-0">Comment</span>
                  <span className="text-sm text-gray-500 mx-3">:</span>
                  <span className="text-sm font-medium text-gray-900">{followupData.Comments || 'N/A'}</span>
                </div>

                {/* Last Follow-Up Date */}
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 w-32 flex-shrink-0">Last Follow-Up Date</span>
                  <span className="text-sm text-gray-500 mx-3">:</span>
                  <span className="text-sm font-medium text-gray-900">{dayjs(followupData.LastFollowUpDate).format("DD-MM-YYYY") || 'N/A'}</span>
                </div>

                {/* Next Follow-Up Date */}
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 w-32 flex-shrink-0">Next Follow-Up Date</span>
                  <span className="text-sm text-gray-500 mx-3">:</span>
                  <span className="text-sm font-medium text-gray-900">{dayjs(followupData.NextFollowUpDate).format("DD-MM-YYYY") || 'N/A'}</span>
                </div>

                {/* Created On */}
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 w-32 flex-shrink-0">Modified On</span>
                  <span className="text-sm text-gray-500 mx-3">:</span>
                  <span className="text-sm font-medium text-gray-900">{dayjs(followupData.ModifiedOn).format("DD-MM-YYYY") || 'N/A'}</span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm text-gray-700 w-32 flex-shrink-0">Modified By</span>
                  <span className="text-sm text-gray-500 mx-3">:</span>
                  <span className="text-sm font-medium text-gray-900">{followupData.ModifiedBy || 'N/A'}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg p-6">
              <div className="text-center py-8 text-gray-500">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-sm">No Follow-Up data found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LastFollowUpModal;