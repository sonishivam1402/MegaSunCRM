import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../api/userApi'; // Assuming you have this API function

const UserDetailsPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('userDetails');
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const tabs = [
        { id: 'userDetails', label: 'User Details' },
        { id: 'targetSales', label: 'Target & Sales' },
        { id: 'followUp', label: 'Follow-up' },
        { id: 'quotations', label: 'Quotations' },
        { id: 'invoice', label: 'Invoice' }
    ];

    // Fetch user details
    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            const response = await getUserById(userId);
            console.log(response);
            setUserDetails(response);
            setError(null);
        } catch (err) {
            setError('Failed to fetch user details');
            console.error('Error fetching user details:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    const handleBackClick = () => {
        navigate(-1); 
    };

    const handleEditClick = () => {
        console.log('Edit user:', userId);
        // navigate(`/users/${userId}/edit`);
    };

    if (loading) {
        return (
            <div className="bg-white h-full flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading user details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={handleBackClick}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!userDetails) {
        return (
            <div className="bg-white h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">User not found</p>
                    <button 
                        onClick={handleBackClick}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white h-full">
            {/* Header with Back Button and User Name */}
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleBackClick}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-semibold text-gray-900">{userDetails.Name}</h1>
                    </div>
                    <button 
                        onClick={handleEditClick}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 py-0 border-b border-gray-200">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === tab.id
                                    ? 'text-blue-600 border-blue-600'
                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {activeTab === 'userDetails' && (
                    <div className="flex gap-8">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            <div className="relative w-64 h-80 rounded-lg overflow-hidden bg-gray-100">
                                {userDetails.ProfileImage ? (
                                    <img
                                        src={userDetails.ProfileImage}
                                        alt={userDetails.Name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <div className="text-6xl font-bold text-gray-400">
                                            {userDetails.Name?.charAt(0)?.toUpperCase()}
                                        </div>
                                    </div>
                                )}
                                {/* Edit Icon on Image */}
                                <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* User Information */}
                        <div className="flex-1 space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex">
                                    <span className="w-32 text-gray-600 font-medium">First name</span>
                                    <span className="text-gray-900">: {userDetails.FirstName || userDetails.Name?.split(' ')[0] || 'N/A'}</span>
                                </div>
                                
                                <div className="flex">
                                    <span className="w-32 text-gray-600 font-medium">Last name</span>
                                    <span className="text-gray-900">: {userDetails.LastName || userDetails.Name?.split(' ')[1] || 'N/A'}</span>
                                </div>
                                
                                <div className="flex">
                                    <span className="w-32 text-gray-600 font-medium">User type</span>
                                    <span className="text-gray-900">: {userDetails.UserType || 'N/A'}</span>
                                </div>
                                
                                <div className="flex">
                                    <span className="w-32 text-gray-600 font-medium">Email address</span>
                                    <span className="text-gray-900">: {userDetails.Email || 'N/A'}</span>
                                </div>
                                
                                <div className="flex">
                                    <span className="w-32 text-gray-600 font-medium">Phone no.</span>
                                    <span className="text-gray-900">: {userDetails.Contact || userDetails.Phone || 'N/A'}</span>
                                </div>
                                
                                <div className="flex">
                                    <span className="w-32 text-gray-600 font-medium">GST no.</span>
                                    <span className="text-gray-900">: {userDetails.GSTNumber || 'N/A'}</span>
                                </div>
                                
                                <div className="flex">
                                    <span className="w-32 text-gray-600 font-medium">Address</span>
                                    <span className="text-gray-900">: {userDetails.Address || 'N/A'}</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <span className="w-32 text-gray-600 font-medium">Status</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-900">:</span>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                            userDetails.IsActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {userDetails.IsActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* User since */}
                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500">
                                    User since {userDetails.CreatedOn ? new Date(userDetails.CreatedOn).getFullYear() : new Date().getFullYear()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'targetSales' && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Target & Sales content will be displayed here</p>
                    </div>
                )}

                {activeTab === 'followUp' && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Follow-up content will be displayed here</p>
                    </div>
                )}

                {activeTab === 'quotations' && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Quotations content will be displayed here</p>
                    </div>
                )}

                {activeTab === 'invoice' && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Invoice content will be displayed here</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetailsPage;