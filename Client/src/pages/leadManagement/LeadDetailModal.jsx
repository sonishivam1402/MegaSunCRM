import React, { useState, useEffect } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import { getLeadById } from '../../api/leadApi';

const LeadDetailModal = ({ isOpen, onClose, leadId }) => {
  const [leadData, setLeadData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Details');

  // Mock API call - replace with your actual API
  const getData = async (id) => {
    setLoading(true);
    try {
      // Simulating API call
      const response = await getLeadById(id);
      
      // Mock data - replace with actual API call
    //   const mockData = {
    //     name: 'Rakesh Gupta',
    //     phone: 'XXXXXXXXXX',
    //     address: 'Madhya Pradesh',
    //     type: 'Retail',
    //     assignedTo: {
    //       name: 'Ramesh Patel',
    //       avatar: 'RP'
    //     },
    //     source: 'Facebook',
    //     status: 'Interested',
    //     items: [
    //       { name: 'Spoon and fork set', quantity: 12, icon: 'utensils' },
    //       { name: 'Knife set', quantity: 8, icon: 'chef-hat' },
    //       { name: 'Cutting board', quantity: 5, icon: 'square' }
    //     ]
    //   };
      console.log("Response", response)
      setLeadData(response[0][0]);
      setProductData(response[1] || []);
    } catch (error) {
      console.error('Error fetching lead:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Open")
    if (isOpen && leadId) {
      getData(leadId);
    }
  }, [isOpen, leadId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Interested':
        return 'text-green-600';
      case 'Fresh Lead':
        return 'text-blue-600';
      case 'Not Interested':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-end z-50">
      <div className="bg-[#F0EEE4] w-200 h-screen max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
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
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === 'Details'
                ? 'border-green-800 text-green-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('Items')}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === 'Items'
                ? 'border-green-800 text-green-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Items
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : leadData ? (
            <>
              {activeTab === 'Details' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lead name</span>
                    <span className="text-sm font-medium">{leadData.LeadName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lead phone number</span>
                    <span className="text-sm font-medium">{leadData.LeadPhoneNumber}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lead address</span>
                    <span className="text-sm font-medium">{leadData.LeadAddress}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lead type</span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                      {leadData.LeadType}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Assigned to</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                        {leadData.AssignedTo}
                      </div>
                      <span className="text-sm font-medium">{leadData.AssignedTo}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lead source</span>
                    <span className="text-sm font-medium">{leadData.LeadSource}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`text-sm font-medium ${getStatusColor(leadData.Status)}`}>
                      {leadData.Status}
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'Items' && (
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
              )}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No lead data found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetailModal;