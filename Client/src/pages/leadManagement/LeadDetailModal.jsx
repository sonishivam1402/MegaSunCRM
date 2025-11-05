import React, { useState, useEffect } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import { getLeadById } from '../../api/leadApi';
import getLabelColor from '../../utils/GetLabelColor';
import { useEscapeKey } from '../../utils/useEscapeKey';

const LeadDetailModal = ({ isOpen, onClose, leadId }) => {
  const [leadData, setLeadData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Details');

  useEscapeKey(() => {
    if (isOpen) onClose();
  });

  const getData = async (id) => {
    setLoading(true);
    try {
      const response = await getLeadById(id);
      // console.log("Response", response)
      setLeadData(response[0][0]);
      setProductData(response[1] || []);
    } catch (error) {
      console.error('Error fetching lead:', error);
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
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-900">Lead details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('Details')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'Details'
              ? 'border-green-800 text-green-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('Items')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'Items'
              ? 'border-green-800 text-green-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Items
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : leadData ? (
            <>
              {activeTab === 'Details' && (
                <div className="space-y-6">
                  {/* Lead name */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">Lead name</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <span className="text-sm font-medium text-gray-900">{leadData.LeadName || 'N/A'}</span>
                  </div>

                  {/* Lead phone number */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">Lead phone number</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <span className="text-sm font-medium text-gray-900">{leadData.LeadPhoneNumber || 'N/A'} {leadData["Alternate Number"] ? ", " + leadData["Alternate Number"] : ""}</span>
                  </div>

                  {/* Lead Email */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">Lead Email</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <span className="text-sm font-medium text-gray-900">{leadData.Email || 'N/A'}</span>
                  </div>

                  {/* Lead address */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">LandMark Address</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <span className="text-sm font-medium text-gray-900">{leadData.Address || 'N/A'}</span>
                  </div>

                  {/* Lead address */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">Lead address</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {leadData.LeadAddress ? leadData.LeadAddress
                        .split(',')
                        .map(part => part.trim())
                        .filter(Boolean) // removes empty parts
                        .join(', ')
                        : 'N/A'}</span>
                  </div>

                  {/* Lead address */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">Country</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <span className="text-sm font-medium text-gray-900">{leadData.Country || 'N/A'}</span>
                  </div>

                  {/* Lead pincode */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">Pincode</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <span className="text-sm font-medium text-gray-900">{leadData.Pincode || 'N/A'}</span>
                  </div>

                  {/* Lead GST */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">GST Number</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <span className="text-sm font-medium text-gray-900">{leadData.GSTNumber || 'N/A'}</span>
                  </div>

                  {/* Lead type */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">Lead type</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLabelColor(leadData.LeadType)}`}>
                      {leadData.LeadType || 'N/A'}
                    </span>
                  </div>

                  {/* Assigned to */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">Assigned to</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-xs text-white font-semibold">
                        {leadData.AssignedTo ? leadData.AssignedTo.charAt(0).toUpperCase() : "N"}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{leadData.AssignedTo || 'Not Assigned'}</span>
                    </div>
                  </div>

                  {/* Lead source */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">Lead source</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <span className="text-sm font-medium text-gray-900">{leadData.LeadSource || 'N/A'}</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 w-32 flex-shrink-0">Status</span>
                    <span className="text-sm text-gray-500 mx-3">:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLabelColor(leadData.Status)}`}>
                      {leadData.Status || 'N/A'}
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'Items' && (
                <div>
                  {productData.length > 0 ? (
                    <div className="space-y-4">
                      {productData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {/* {getItemIcon(item.icon)} */}
                            <span className="text-sm font-normal">{item.ProductName}</span>
                          </div>
                          <span className="text-sm text-gray-600">{item.Quantity}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-gray-400 mb-2">
                        <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p className="text-sm">No products found for this lead</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg p-6">
              <div className="text-center py-8 text-gray-500">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-sm">No lead data found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetailModal;