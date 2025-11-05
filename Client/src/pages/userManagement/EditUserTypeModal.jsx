import React, { useState, useEffect } from 'react';
import { updateUserType, getUserTypeById } from '../../api/userApi.js';
import { toast } from 'react-toastify';
import { useEscapeKey } from '../../utils/useEscapeKey';

const EditUserTypeModal = ({ isOpen, onClose, onUserTypeEdited, userData }) => {
  const [formData, setFormData] = useState({
    accessName: '',
    status: '',
    accessType: 'full', // 'full' or 'limited' - now read-only
    dashboardAccess: {},
    pageAccess: {}
  });

  // States for API data
  const [basicInfo, setBasicInfo] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [dashboardCards, setDashboardCards] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    { id: 'lead', name: 'My Leads', apiKey: 'lead' },
    // { id: 'invoice', name: 'Invoices', apiKey: 'invoice' },
    { id: 'quotation', name: 'Quotation', apiKey: 'quotation' },
    { id: 'user', name: 'User Management', apiKey: 'user' },
    { id: 'followUps', name: 'Followups', apiKey: 'followUps' },
    { id: 'target', name: 'Target', apiKey: 'target' },
    { id: 'orders', name: 'Orders', apiKey: 'orders' },
    { id: 'product', name: 'Product Management', apiKey: 'product' }
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

  // Fetch user type data when modal opens and userData (userTypeId) is provided
  useEffect(() => {
    if (userData && isOpen) {
      fetchUserTypeData();
    }
  }, [userData, isOpen]);

  const fetchUserTypeData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserTypeById(userData); // userData is userTypeId
      //console.log("Modal Response: ", response.data);

      if (response?.status === 200 && response.data) {
        // Set the 4 separate states based on nested array structure
        setBasicInfo(response.data[0]?.[0] || null);
        setPermissions(response.data[1] || []);
        setDashboardCards(response.data[2]?.[0] || null);
        setApiResponse(response.data[3]?.[0] || null);

        // Prefill form data
        prefillFormData(response.data[0]?.[0], response.data[1], response.data[2]?.[0]);
      } else {
        setError('Failed to fetch user type details');
      }
    } catch (error) {
      console.error('Error fetching user type:', error);
      setError('Failed to fetch user type details');
    } finally {
      setLoading(false);
    }
  };

  // Prefill form data based on API response
  const prefillFormData = (basicInfo, permissions, dashboardCards) => {
    if (!basicInfo) return;

    // Determine access type from existing user data
    const accessType = basicInfo.IsAdmin ? 'full' : 'limited';

    // Convert permissions back to pageAccess format for limited users
    const pageAccess = {};
    if (!basicInfo.IsAdmin && permissions && permissions.length > 0) {
      // Create a mapping from permission names to pageItems
      const permissionMap = {};
      permissions.forEach(perm => {
        permissionMap[perm.Name?.toLowerCase()] = perm;
      });

      pageItems.forEach(item => {
        // Try to match permission by name (case insensitive)
        const matchingPerm = permissions.find(perm =>
          perm.Name?.toLowerCase().includes(item.name.toLowerCase()) ||
          item.name.toLowerCase().includes(perm.Name?.toLowerCase())
        );

        if (matchingPerm) {
          pageAccess[item.id] = {
            create: matchingPerm.CreateAccess || false,
            read: matchingPerm.ReadAccess || false,
            update: matchingPerm.UpdateAccess || false,
            delete: matchingPerm.DeleteAccess || false
          };
        }
      });
    }

    // Convert dashboard cards to dashboardAccess format
    const dashboardAccess = {};
    if (dashboardCards) {
      // Map API response properties to dashboard item IDs
      dashboardAccess.followUps = dashboardCards['Followups Card'] || false;
      dashboardAccess.leads = dashboardCards['Leads Card'] || false;
      dashboardAccess.order = dashboardCards['Orders Card'] || false;
      dashboardAccess.quotation = dashboardCards['Quotations Card'] || false;
      dashboardAccess.target = dashboardCards['Targets Card'] || false;
    }

    setFormData({
      accessName: basicInfo.Name || '',
      status: basicInfo.IsActive ? 'active' : 'inactive',
      accessType: accessType,
      dashboardAccess: dashboardAccess,
      pageAccess: pageAccess
    });
  };

  // Pre-fill form when userData changes (legacy support - keeping for backward compatibility)
  useEffect(() => {
    if (userData && isOpen && typeof userData === 'object' && userData.Name) {
      // This is the old format where userData is the full user object
      const accessType = userData.IsAdmin ? 'full' : 'limited';

      const pageAccess = {};
      if (!userData.IsAdmin && userData.permissions) {
        pageItems.forEach(item => {
          const permission = userData.permissions[item.apiKey];
          if (permission) {
            pageAccess[item.id] = {
              create: permission.create || false,
              read: permission.read || false,
              update: permission.update || false,
              delete: permission.delete || false
            };
          }
        });
      }

      const dashboardAccess = {};
      if (userData.dashboardAccess) {
        dashboardItems.forEach(item => {
          dashboardAccess[item.id] = userData.dashboardAccess[item.id] || false;
        });
      }

      setFormData({
        accessName: userData.Name || '',
        status: userData.IsActive ? 'active' : 'inactive',
        accessType: accessType,
        dashboardAccess: dashboardAccess,
        pageAccess: pageAccess
      });
    }
  }, [userData, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
    const pagePermissions = {};

    pageItems.forEach(item => {
      if (formData.accessType === 'full') {
        // For full access (admin), all permissions are true
        pagePermissions[item.apiKey] = {
          read: true,
          create: true,
          update: true,
          delete: true
        };
      } else {
        // For limited access (regular user), use the selected permissions
        const itemPermissions = formData.pageAccess[item.id] || {};
        pagePermissions[item.apiKey] = {
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
      pageAccess: pagePermissions,
      dashboardAccess: dashboardPermissions
    };
  };

  const handleSubmit = async () => {
    const permissionsPayload = buildPermissionsPayload();

    const payload = {
      UserTypeId: userData, // Use basicInfo.Id if available, otherwise userData (userTypeId)
      Name: formData.accessName,
      IsAdmin: formData.accessType === 'full',
      IsRegularUser: formData.accessType === 'limited',
      IsActive: formData.status === 'active',
      pageAccess: permissionsPayload.pageAccess,
      dashboardAccess: permissionsPayload.dashboardAccess
    };

    try {
      const response = await updateUserType(payload.UserTypeId, payload);

      if (response?.status === 201) {
        toast.success(response.data.Message || 'User type updated successfully');
        onClose();
        onUserTypeEdited();

        // Reset form
        setFormData({
          accessName: '',
          status: '',
          accessType: 'full',
          dashboardAccess: {},
          pageAccess: {}
        });

        // Reset API data states
        setBasicInfo(null);
        setPermissions([]);
        setDashboardCards(null);
        setApiResponse(null);
      } else {
        toast.error(response.data.Message || 'Failed to update user type');
      }
    } catch (error) {
      console.error('Error updating user type:', error);
      toast.error('Failed to update user type. Please try again.');
    }
  };

  if (!isOpen) return null;

  // Show loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-end z-50">
        <div className="bg-[#F0EEE4] w-full max-w-2xl h-screen overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading user type data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-end z-50">
        <div className="bg-[#F0EEE4] w-full max-w-2xl h-screen overflow-y-auto flex items-center justify-center">
          <div className="text-center max-w-md p-6">
            <div className="text-red-600 text-4xl mb-4">⚠️</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-x-3">
              <button
                onClick={fetchUserTypeData}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-end z-50">
      <div className="bg-[#F0EEE4] w-full max-w-2xl h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-5">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.65375 19.6532L0 9.99945L9.65375 0.345703L11.073 1.76495L2.83825 9.99945L11.073 18.234L9.65375 19.6532Z" fill="#1C1B1F" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg font-semibold">Edit user type</h2>
              <p className="text-sm text-gray-500">Edit the details of the user type.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md "
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md "
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Access Type - Read Only Display */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Type
            </label>
            <div className="flex items-center p-3 bg-[#00000012] border border-gray-200 rounded-md">
              <span className="ml-3 text-sm text-gray-600">
                {formData.accessType === 'full' ? 'Full access - Admin' : 'Limited access - Sub account'}
              </span>
            </div>
          </div>

          {/* Dashboard View (Limited Access) */}
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
                <table className="w-full rounded-md">
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
        <div className="p-4 border-t">
          <button
            onClick={handleSubmit}
            disabled={!formData.accessName || !formData.status}
            className="w-full bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update User Type
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserTypeModal;