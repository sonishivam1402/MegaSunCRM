import React, { useState, useEffect } from 'react';
import { getUserTypeById } from '../../api/userApi.js';
import { useParams, useNavigate } from 'react-router-dom';

const UserTypeDetail = () => {
    // Separate states for the 4 arrays from API response
    const [basicInfo, setBasicInfo] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [dashboardCards, setDashboardCards] = useState(null);
    const [apiResponse, setApiResponse] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userTypeId } = useParams();
    const navigate = useNavigate();

    // Fetch user type data when component mounts
    useEffect(() => {
        if (userTypeId) {
            fetchUserTypeData();
        }
    }, [userTypeId]);

    const fetchUserTypeData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getUserTypeById(userTypeId);
            console.log("Details Page Response: ", response.data);
            
            if (response?.status === 200 && response.data) {
                // Set the 4 separate states based on nested array structure
                setBasicInfo(response.data[0]?.[0] || null);
                setPermissions(response.data[1] || []);
                setDashboardCards(response.data[2]?.[0] || null);
                setApiResponse(response.data[3]?.[0] || null);
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

    const getStatusBadge = (status) => {
        if (!status) return null;
        const isActive = status === true || status?.toLowerCase() === 'active';
        return (
            <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                isActive 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {isActive ? 'Active' : 'Inactive'}
            </span>
        );
    };

    const getAccessTypeBadge = (basicInfo) => {
        if (!basicInfo) return null;
        
        let label = '';
        let className = '';
        
        if (basicInfo.IsAdmin) {
            label = 'Administrator';
            className = 'bg-purple-100 text-purple-800 border border-purple-200';
        } else if (basicInfo.IsRegularUser) {
            label = 'Regular User';
            className = 'bg-blue-100 text-blue-800 border border-blue-200';
        } else {
            label = 'Limited Access';
            className = 'bg-gray-100 text-gray-800 border border-gray-200';
        }
        
        return (
            <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${className}`}>
                {label}
            </span>
        );
    };

    const getPermissionIcon = (hasAccess) => {
        return hasAccess ? (
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        ) : (
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        );
    };

    const renderDashboardAccessTable = () => {
        if (!dashboardCards) {
            return (
                <div className="text-center py-8">
                    <p className="text-gray-500">No dashboard access data available</p>
                </div>
            );
        }
        
        // Handle the case where dashboardCards might be an object
        let cardEntries = [];
        
        if (typeof dashboardCards === 'object') {
            cardEntries = Object.entries(dashboardCards).filter(([key]) => 
                key !== 'Message' && key !== 'Success' && key.includes('Card')
            );
        }
        
        if (cardEntries.length === 0) {
            return (
                <div className="text-center py-8">
                    <p className="text-gray-500">No dashboard cards data available</p>
                </div>
            );
        }
        
        return (
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Dashboard Component
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Has Access
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {cardEntries.map(([cardName, value]) => {
                            const hasAccess = value === 1 || value === '1' || value === true;
                            const displayName = cardName.replace(' Card', '').replace(/([A-Z])/g, ' $1').trim();
                            
                            return (
                                <tr key={cardName} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="text-sm font-medium text-gray-900">{displayName}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {getPermissionIcon(hasAccess)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading user type details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-red-600 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="space-x-3">
                        <button
                            onClick={fetchUserTypeData}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => navigate(-1)}
                                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </button>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">User Type Details</h1>
                                <p className="text-sm text-gray-500">View and manage user type information</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            {apiResponse?.Success && (
                                <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                    {apiResponse.Message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Basic Information Card */}
                    {basicInfo && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                            </div>
                            <div className="px-6 py-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-2">User Type Name</label>
                                        <p className="text-lg font-semibold text-gray-900">{basicInfo.Name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-2">Status</label>
                                        {getStatusBadge(basicInfo.IsActive)}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-2">Access Type</label>
                                        {getAccessTypeBadge(basicInfo)}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-2">Created Date</label>
                                        <p className="text-sm text-gray-900">
                                            {basicInfo.CreatedOn ? new Date(basicInfo.CreatedOn).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }) : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Access Table */}
                    {dashboardCards && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h2 className="text-lg font-semibold text-gray-900">Dashboard Access</h2>
                                <p className="text-sm text-gray-600 mt-1">Available dashboard components and features</p>
                            </div>
                            <div className="px-6 py-6">
                                {renderDashboardAccessTable()}
                            </div>
                        </div>
                    )}

                    {/* Permissions Table */}
                    {permissions.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h2 className="text-lg font-semibold text-gray-900">Page Permissions</h2>
                                <p className="text-sm text-gray-600 mt-1">CRUD access permissions for different modules</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Module
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Create
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Read
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Update
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {permissions.map((permission, index) => (
                                            <tr key={permission.PermissionId || index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{permission.Name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {permission.Type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    {getPermissionIcon(permission.CreateAccess)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    {getPermissionIcon(permission.ReadAccess)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    {getPermissionIcon(permission.UpdateAccess)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    {getPermissionIcon(permission.DeleteAccess)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Admin Access Notice */}
                    {basicInfo?.IsAdmin && (
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-purple-800">Administrator Access</h3>
                                    <div className="mt-2 text-sm text-purple-700">
                                        <p>This user type has full administrative privileges and can access all system features and perform all operations without restrictions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* No Data State */}
                    {!basicInfo && !permissions.length && !dashboardCards && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <div className="text-gray-400 text-6xl mb-4">📄</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
                            <p className="text-gray-600">Unable to load user type information. Please try refreshing the page.</p>
                            <button
                                onClick={fetchUserTypeData}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Refresh Data
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserTypeDetail;