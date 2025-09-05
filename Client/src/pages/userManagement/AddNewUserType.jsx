
import React, { useState } from 'react';

const AddNewUserTypeModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    accessName: '',
    status: '',
    accessType: 'full', // 'full' or 'limited'
    dashboardAccess: {},
    pageAccess: {}
  });

  const dashboardItems = [
    { id: 'target', name: 'Target Page' },
    { id: 'quotation', name: 'Quotation Page' },
    { id: 'order', name: 'Order Page' },
    { id: 'invoice', name: 'Invoice Page' },
    { id: 'userManagement', name: 'User Management' },
    { id: 'followUps', name: 'Follow ups' },
    { id: 'leads', name: 'Leads Page' }
  ];

  const pageItems = [
    { id: 'products', name: 'Products' },
    { id: 'customers', name: 'Customers' },
    { id: 'reports', name: 'Reports' },
    { id: 'settings', name: 'Settings' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'notifications', name: 'Notifications' }
  ];

  const crudOperations = [
    { id: 'create', name: 'Create', bit: 1 },
    { id: 'read', name: 'Read', bit: 2 },
    { id: 'update', name: 'Update', bit: 4 },
    { id: 'delete', name: 'Delete', bit: 8 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAccessTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      accessType: type,
      dashboardAccess: {},
      pageAccess: {}
    }));
  };

  const handleDashboardAccessChange = (itemId, checked) => {
    setFormData(prev => ({
      ...prev,
      dashboardAccess: {
        ...prev.dashboardAccess,
        [itemId]: checked ? 15 : 0 // Full CRUD access (1+2+4+8=15) or no access
      }
    }));
  };

  const handlePageCrudChange = (itemId, operation, checked) => {
    setFormData(prev => {
      const currentAccess = prev.pageAccess[itemId] || 0;
      const newAccess = checked 
        ? currentAccess | operation.bit 
        : currentAccess & ~operation.bit;
      
      return {
        ...prev,
        pageAccess: {
          ...prev.pageAccess,
          [itemId]: newAccess
        }
      };
    });
  };

  const calculateTotalBits = (permissions) => {
    return Object.values(permissions).reduce((sum, bits) => sum + bits, 0);
  };

  const handleSubmit = async () => {
    const payload = {
      accessName: formData.accessName,
      status: formData.status,
      accessType: formData.accessType,
      permissions: {
        dashboardAccess: formData.dashboardAccess,
        pageAccess: formData.pageAccess,
        totalDashboardBits: calculateTotalBits(formData.dashboardAccess),
        totalPageBits: calculateTotalBits(formData.pageAccess)
      }
    };

    try {
      const response = await fetch('/api/user-types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        onSubmit(result);
        onClose();
        // Reset form
        setFormData({
          accessName: '',
          status: '',
          accessType: 'full',
          dashboardAccess: {},
          pageAccess: {}
        });
      } else {
        throw new Error('Failed to create user type');
      }
    } catch (error) {
      console.error('Error creating user type:', error);
      alert('Failed to create user type. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-end z-50">
      <div className="bg-white w-200 h-screen max-w-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              
            </button>
            <div>
              <h2 className="text-lg font-semibold">Add new user type</h2>
              <p className="text-sm text-gray-500">Add in the details of the new lead type.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4 space-y-6">
          {/* Access Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Name
            </label>
            <input
              type="text"
              placeholder="Type lead type name here"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.accessName}
              onChange={(e) => handleInputChange('accessName', e.target.value)}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Access Type */}
          <div>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="accessType"
                  value="full"
                  checked={formData.accessType === 'full'}
                  onChange={(e) => handleAccessTypeChange('full')}
                  className="mr-3 text-green-600"
                />
                <span className="text-sm">Full access - Admin</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="accessType"
                  value="limited"
                  checked={formData.accessType === 'limited'}
                  onChange={(e) => handleAccessTypeChange('limited')}
                  className="mr-3 text-green-600"
                />
                <span className="text-sm">Limited access - Sub account</span>
              </label>
            </div>
          </div>

          {/* Dashboard View (for Full Access) */}
          {formData.accessType === 'full' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Dashboard view</h3>
              <div className="space-y-2">
                {dashboardItems.map(item => (
                  <label key={item.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.dashboardAccess[item.id] > 0}
                      onChange={(e) => handleDashboardAccessChange(item.id, e.target.checked)}
                      className="mr-3 text-green-600"
                    />
                    <span className="text-sm">{item.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Limited Access Tables */}
          {formData.accessType === 'limited' && (
            <div className="space-y-6">
              {/* Dashboard View Table */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Dashboard View</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-md">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Module
                        </th>
                        {crudOperations.map(op => (
                          <th key={op.id} className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                            {op.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {dashboardItems.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 text-sm text-gray-900">
                            {item.name}
                          </td>
                          {crudOperations.map(op => (
                            <td key={op.id} className="px-2 py-2 text-center">
                              <input
                                type="checkbox"
                                checked={(formData.dashboardAccess[item.id] || 0) & op.bit}
                                onChange={(e) => handlePageCrudChange(item.id, op, e.target.checked)}
                                className="text-green-600 rounded"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Page Access Table */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Pages Access</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-md">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Page
                        </th>
                        {crudOperations.map(op => (
                          <th key={op.id} className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                            {op.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pageItems.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 text-sm text-gray-900">
                            {item.name}
                          </td>
                          {crudOperations.map(op => (
                            <td key={op.id} className="px-2 py-2 text-center">
                              <input
                                type="checkbox"
                                checked={(formData.pageAccess[item.id] || 0) & op.bit}
                                onChange={(e) => handlePageCrudChange(item.id, op, e.target.checked)}
                                className="text-green-600 rounded"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={handleSubmit}
            disabled={!formData.accessName || !formData.status}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewUserTypeModal;