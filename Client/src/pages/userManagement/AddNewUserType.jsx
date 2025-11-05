import React, { useState } from 'react';
import { createUserType } from '../../api/userApi.js';
import { toast } from 'react-toastify';
import { useEscapeKey } from '../../utils/useEscapeKey';

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
    // { id: 'invoice', name: 'Invoice Page' },
    // { id: 'userManagement', name: 'User Management' },
    { id: 'followUps', name: 'Follow ups' },
    { id: 'leads', name: 'Leads Page' }
  ];

  const pageItems = [
    { id: 'lead', name: 'Leads', apiKey: 'lead' },
    // { id: 'invoice', name: 'Invoice', apiKey: 'invoice' },
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

  useEscapeKey(() => {
    if (isOpen) onClose();
  });

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

  const resetForm = () => {
    setFormData({
      accessName: '',
      status: '',
      accessType: 'full',
      dashboardAccess: {},
      pageAccess: {}
    });
  }

  const buildPermissionsPayload = () => {
    const permissions = {};

    // Build page permissions
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

    // Build dashboard permissions
    const dashboardPermissions = {};
    dashboardItems.forEach(item => {
      if (formData.accessType === 'full') {
        // For full access (admin), all dashboard items are visible
        dashboardPermissions[item.id] = true;
      } else {
        // For limited access, use the selected dashboard access
        dashboardPermissions[item.id] = formData.dashboardAccess[item.id] || false;
      }
    });

    return {
      pageAccess: permissions,
      dashboardAccess: dashboardPermissions
    };
  };

  const handleSubmit = async () => {
    const permissionsPayload = buildPermissionsPayload();

    const payload = {
      Name: formData.accessName,
      IsAdmin: formData.accessType === 'full',
      IsRegularUser: formData.accessType === 'limited',
      pageAccess: permissionsPayload.pageAccess,
      dashboardAccess: permissionsPayload.dashboardAccess
    };

    //console.log(payload);

    try {
      const response = await createUserType(payload);

      if (response?.status === 201) {
        toast.success(response.data.Message);
        onClose();
        onUserCreated();

        // Reset form
        resetForm();
      } else {
        toast.error(response.data.Message)
      }
    } catch (error) {
      console.error('Error creating user type:', error);
      toast.error('Failed to create user type. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-end z-50">
      <div className="bg-[#F0EEE4] w-full max-w-2xl h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-5">
            <button onClick={() => { onClose(), resetForm() }} className="hover:cursor-pointer">
              <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.65375 19.6532L0 9.99945L9.65375 0.345703L11.073 1.76495L2.83825 9.99945L11.073 18.234L9.65375 19.6532Z" fill="#1C1B1F" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg font-semibold">Add new user type</h2>
              <p className="text-sm text-gray-500">Add in the details of the new user type.</p>
            </div>
          </div>
          <button onClick={() => { onClose(), resetForm() }} className="text-[#242425] text-xl font-light hover:cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13M1 1L13 13" stroke="#242425" stroke-width="1.5" stroke-linecap="round" />
            </svg>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
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
                  className="mr-3 bg-green-900 text-green-900"
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
          {formData.accessType === 'limited' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Dashboard view
              </h3>
              <div className="space-y-2">
                {dashboardItems.map(item => (
                  <label key={item.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.dashboardAccess[item.id] || false}
                      onChange={(e) => handleDashboardAccessChange(item.id, e.target.checked)}
                      className="mr-3 text-green-600"
                      disabled={formData.accessType === 'full'}
                    />
                    <span className="text-sm">{item.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Page Access - Only show CRUD table for Limited Access */}
          {formData.accessType === 'limited' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Pages Access</h3>
              <div className="overflow-x-auto">
                <table className="w-full  rounded-md">
                  <thead className="bg-[#00000012]">
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
                              className="text-green-900 rounded"
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
        <div className="p-4">
          <button
            onClick={handleSubmit}
            disabled={!formData.accessName || !formData.status}
            className="w-full bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-900 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create User Type
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewUserTypeModal;