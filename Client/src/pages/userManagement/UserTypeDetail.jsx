import React, { useState, useEffect } from 'react';
import { getUserTypeById } from '../../api/userApi.js';
import { useParams, useNavigate } from 'react-router-dom';

const UserTypeDetail = () => {
    const [basicInfo, setBasicInfo] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [dashboardCards, setDashboardCards] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userTypeId } = useParams();
    const navigate = useNavigate();

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

            if (response?.status === 200 && response.data) {
                setBasicInfo(response.data[0]?.[0] || null);
                setPermissions(response.data[1] || []);
                setDashboardCards(response.data[2]?.[0] || null);
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
            <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${isActive
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                {isActive ? 'Active' : 'Inactive'}
            </span>
        );
    };

    const getPermissionIcon = (hasAccess) => {
        return hasAccess ? (
            <div className='flex items-center justify-center'>
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        ) : (
            <div className='flex items-center justify-center'>
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
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
                    {/* <thead className="border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Dashboard Component
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Access
                            </th>
                        </tr>
                    </thead> */}
                    <tbody className="divide-y divide-gray-200">
                        {cardEntries.map(([cardName, value]) => {
                            const hasAccess = value === 1 || value === '1' || value === true;
                            const displayName = cardName.replace(' Card', '').replace(/([A-Z])/g, ' $1').trim();

                            return (
                                <tr key={cardName} className="hover:bg-gray-50">
                                    <td className="px-4">
                                        <div className="text-md font-medium text-gray-600">{displayName}</div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading user type details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
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
        <div className="min-h-screen">
            {/* Header */}
            <div className="max-w-7xl px-6">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">User Type Details</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Basic Information and Dashboard Access Side by Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Basic Information */}
                        {basicInfo && (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                                </div>
                                <div className="p-6 flex-1 space-y-2">
                                    <div className="grid grid-cols-1 gap-7">
                                        <div className="flex gap-5">
                                            <span className="w-32 text-gray-600 font-medium">Name</span>
                                            <span className="text-gray-900">:</span>
                                            <span className="text-gray-900">{basicInfo.Name || 'N/A'}</span>
                                        </div>
                                        <div className="flex gap-5">
                                            <span className="w-32 text-gray-600 font-medium">Status</span>
                                            <span className="text-gray-900">:</span>
                                            <span className="text-gray-900">{getStatusBadge(basicInfo.IsActive)}</span>
                                        </div>
                                        <div className="flex gap-5">
                                            <span className="w-32 text-gray-600 font-medium">Access Type</span>
                                            <span className="text-gray-900">:</span>
                                            <span className="text-gray-900">{basicInfo.IsAdmin ? "Admin" : "Regular User" || 'N/A'}</span>
                                        </div>
                                        <div className="flex gap-5">
                                            <span className="w-32 text-gray-600 font-medium">Created On</span>
                                            <span className="text-gray-900">:</span>
                                            <span className="text-gray-900">{basicInfo.CreatedOn || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Dashboard Access */}
                        {dashboardCards && (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">Dashboard Access</h2>
                                </div>
                                <div className="px-6 py-6">
                                    {renderDashboardAccessTable()}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Permissions Table - Full Width */}
                    {permissions.length > 0 && (
                        <div className="border  rounded-lg overflow-hidden">
                            <div className="px-6 py-4">
                                <h2 className="text-lg font-semibold text-gray-900">Page Permissions</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Module
                                            </th>
                                            <th className="px-15 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Create
                                            </th>
                                            <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Read
                                            </th>
                                            <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Update
                                            </th>
                                            <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {permissions.map((permission, index) => (
                                            <tr key={permission.PermissionId || index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="text-md font-medium text-gray-900">{permission.Name}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-medium">
                                                        {permission.Type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {getPermissionIcon(permission.CreateAccess)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {getPermissionIcon(permission.ReadAccess)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {getPermissionIcon(permission.UpdateAccess)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {getPermissionIcon(permission.DeleteAccess)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* No Data State */}
                    {!basicInfo && !permissions.length && !dashboardCards && (
                        <div className="border border-gray-200 rounded-lg p-12 text-center">
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