import React, { useState } from 'react';
import { createUserType } from '../../api/userApi.js';

const AddNewUserTypeModal = ({ isOpen, onClose, onUserCreated }) => {
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
    { id: 'lead', name: 'Leads', apiKey: 'lead' },
    { id: 'invoice', name: 'Invoice', apiKey: 'invoice' },
    { id: 'quotation', name: 'Quotation', apiKey: 'quotation' },
    { id: 'user', name: 'User Management', apiKey: 'user' },
    { id: 'followUps', name: 'Follow ups', apiKey: 'followUps' },
    { id: 'target', name: 'Target', apiKey: 'target' },
    { id: 'orders', name: 'Orders', apiKey: 'orders' },
    { id: 'product', name: 'Products', apiKey: 'product' }
  ];

  const crudOperations = [
    { id: 'create', name: 'Create', key: 'create' },
    { id: 'read', name: 'Read', key: 'read' },
    { id: 'update', name: 'Update', key: 'update' },
    { id: 'delete', name: 'Delete', key: 'delete' }
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
        [itemId]: checked
      }
    }));
  };

  const handlePageCrudChange = (itemId, operation, checked) => {
    setFormData(prev => ({
      ...prev,
      pageAccess: {
        ...prev.pageAccess,
        [itemId]: {
          ...prev.pageAccess[itemId],
          [operation.key]: checked
        }
      }
    }));
  };

  const buildPermissionsPayload = () => {
    const permissions = {};
    
    pageItems.forEach(item => {
      if (formData.accessType === 'full') {
        // For full access (admin), all permissions are true
        permissions[item.apiKey] = {
          read: true,
          create: true,
          update: true,
          delete: true
        };
      } else {
        // For limited access (regular user), use the selected permissions
        const itemPermissions = formData.pageAccess[item.id] || {};
        permissions[item.apiKey] = {
          read: itemPermissions.read || false,
          create: itemPermissions.create || false,
          update: itemPermissions.update || false,
          delete: itemPermissions.delete || false
        };
      }
    });

    return permissions;
  };

  const handleSubmit = async () => {
    const payload = {
      Name: formData.accessName,
      IsAdmin: formData.accessType === 'full',
      IsRegularUser: formData.accessType === 'limited',
      permissions: buildPermissionsPayload()
    };

    try {
      const response = await createUserType(payload);

      if (response?.status === 201) {
        alert(response.data.Message);
        onClose();
        onUserCreated();

        // Reset form
        setFormData({
          accessName: '',
          status: '',
          accessType: 'full',
          dashboardAccess: {},
          pageAccess: {}
        });
      } else {
        alert(response.data.Message)
      }
    } catch (error) {
      console.error('Error creating user type:', error);
      alert('Failed to create user type. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-end z-50">
      <div className="bg-white w-full max-w-2xl h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ←
            </button>
            <div>
              <h2 className="text-lg font-semibold">Add new user type</h2>
              <p className="text-sm text-gray-500">Add in the details of the new user type.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
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
              placeholder="Type user type name here"
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

          {/* Dashboard View (Same for both Full and Limited Access) */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Dashboard view <span className="text-xs text-gray-500">(Display only - Not saved to API)</span>
            </h3>
            <div className="space-y-2">
              {dashboardItems.map(item => (
                <label key={item.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.dashboardAccess[item.id] || false}
                    onChange={(e) => handleDashboardAccessChange(item.id, e.target.checked)}
                    className="mr-3 text-green-600"
                  />
                  <span className="text-sm">{item.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Page Access - Only show CRUD table for Limited Access */}
          {formData.accessType === 'limited' && (
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
                              checked={(formData.pageAccess[item.id] && formData.pageAccess[item.id][op.key]) || false}
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
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={handleSubmit}
            disabled={!formData.accessName || !formData.status}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create User Type
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewUserTypeModal;