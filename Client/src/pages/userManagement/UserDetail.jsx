import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../api/userApi';
import { useAuth } from "../../context/AuthContext";
import EditUserModal from './EditUserModal';
import ImageUploadModal from '../../components/ImageUploadModal';

const UserDetailsPage = () => {
    const { userId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('userDetails');
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isEditImageModalOpen, setIsEditImageModalOpen] = useState(false);

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
            //console.log("Details Page : ", response);
            setUserDetails(response);
            setError(null);
        } catch (err) {
            setError(err.response.data.message);
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
        setIsEditUserModalOpen(true);
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading user details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={handleBackClick}
                        className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!userDetails) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">User not found</p>
                    <button
                        onClick={handleBackClick}
                        className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full">
            {/* Header with Back Button and User Name */}
            <div className="px-6 py-2">
                <div className="flex items-center gap-3 pt-3">
                    {user.IsAdmin && (
                        <button
                            onClick={handleBackClick}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    <h1 className="text-xl font-semibold text-gray-900">{userDetails.Name}</h1>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="mx-6 py-0 border-b flex items-center justify-between">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-green-900'
                                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleEditClick}
                    className="flex items-center gap-2 px-4 py-1  border border-green-900 text-green-900 font-medium rounded-sm hover:bg-gray-50 transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.05882 11.9412H2.94929L10.1751 4.71541L9.28459 3.82494L2.05882 11.0507V11.9412ZM1 13V10.6109L10.3109 1.30406C10.4176 1.20712 10.5355 1.13224 10.6644 1.07941C10.7935 1.02647 10.9288 1 11.0703 1C11.2118 1 11.3489 1.02512 11.4815 1.07535C11.6142 1.12559 11.7316 1.20547 11.8339 1.315L12.6959 2.18782C12.8055 2.29006 12.8835 2.40771 12.9301 2.54076C12.9767 2.67382 13 2.80688 13 2.93994C13 3.08194 12.9758 3.21741 12.9273 3.34635C12.8788 3.47541 12.8017 3.59329 12.6959 3.7L3.38906 13H1ZM9.72206 4.27794L9.28459 3.82494L10.1751 4.71541L9.72206 4.27794Z" fill="#0D4715" />
                        <path d="M10.1751 4.71541L2.94929 11.9412H2.05882V11.0507L9.28459 3.82494M10.1751 4.71541L9.28459 3.82494M10.1751 4.71541L9.72206 4.27794L9.28459 3.82494M11.9479 2.93853L11.0615 2.05212M1 13V10.6109L10.3109 1.30406C10.4176 1.20712 10.5355 1.13224 10.6644 1.07941C10.7935 1.02647 10.9288 1 11.0703 1C11.2118 1 11.3489 1.02512 11.4815 1.07535C11.6142 1.12559 11.7316 1.20547 11.8339 1.315L12.6959 2.18782C12.8055 2.29006 12.8835 2.40771 12.9301 2.54076C12.9767 2.67382 13 2.80688 13 2.93994C13 3.08194 12.9758 3.21741 12.9273 3.34635C12.8788 3.47541 12.8017 3.59329 12.6959 3.7L3.38906 13H1Z" stroke="#0D4715" strokeWidth="0.2" />
                    </svg>

                    Edit
                </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {activeTab === 'userDetails' && (
                    <div className="flex gap-15">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            <div className="relative w-[320px] h-[325px] rounded-lg overflow-hidden bg-gray-100">
                                {userDetails.ProfileImagePath ? (
                                    <img
                                        src={userDetails.ProfileImagePath}
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
                                <button onClick={()=>setIsEditImageModalOpen(true)} className="absolute bottom-3 right-3 p-2 border rounded-sm shadow-md hover:shadow-lg transition-shadow">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.05882 11.9412H2.94929L10.1751 4.71541L9.28459 3.82494L2.05882 11.0507V11.9412ZM1 13V10.6109L10.3109 1.30406C10.4176 1.20712 10.5355 1.13224 10.6644 1.07941C10.7935 1.02647 10.9288 1 11.0703 1C11.2118 1 11.3489 1.02512 11.4815 1.07535C11.6142 1.12559 11.7316 1.20547 11.8339 1.315L12.6959 2.18782C12.8055 2.29006 12.8835 2.40771 12.9301 2.54076C12.9767 2.67382 13 2.80688 13 2.93994C13 3.08194 12.9758 3.21741 12.9273 3.34635C12.8788 3.47541 12.8017 3.59329 12.6959 3.7L3.38906 13H1ZM9.72206 4.27794L9.28459 3.82494L10.1751 4.71541L9.72206 4.27794Z" fill="#0D4715" />
                                        <path d="M10.1751 4.71541L2.94929 11.9412H2.05882V11.0507L9.28459 3.82494M10.1751 4.71541L9.28459 3.82494M10.1751 4.71541L9.72206 4.27794L9.28459 3.82494M11.9479 2.93853L11.0615 2.05212M1 13V10.6109L10.3109 1.30406C10.4176 1.20712 10.5355 1.13224 10.6644 1.07941C10.7935 1.02647 10.9288 1 11.0703 1C11.2118 1 11.3489 1.02512 11.4815 1.07535C11.6142 1.12559 11.7316 1.20547 11.8339 1.315L12.6959 2.18782C12.8055 2.29006 12.8835 2.40771 12.9301 2.54076C12.9767 2.67382 13 2.80688 13 2.93994C13 3.08194 12.9758 3.21741 12.9273 3.34635C12.8788 3.47541 12.8017 3.59329 12.6959 3.7L3.38906 13H1Z" stroke="#0D4715" strokeWidth="0.2" />
                                    </svg> 
                                </button>
                            </div>
                        </div>

                        {/* User Information */}
                        <div className="flex-1 space-y-6">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex gap-5">
                                    <span className="w-32 text-gray-600 font-medium">First name</span>
                                    <span className="text-gray-900">:</span>
                                    <span className="text-gray-900">{userDetails.FirstName || userDetails.Name?.split(' ')[0] || 'N/A'}</span>
                                </div>

                                <div className="flex gap-5">
                                    <span className="w-32 text-gray-600 font-medium">Last name</span>
                                    <span className="text-gray-900">:</span>
                                    <span className="text-gray-900">{userDetails.LastName || userDetails.Name?.split(' ')[1] || 'N/A'}</span>
                                </div>

                                <div className="flex gap-5">
                                    <span className="w-32 text-gray-600 font-medium">User type</span>
                                    <span className="text-gray-900">:</span>
                                    <span className="text-gray-900">{userDetails.UserType || 'N/A'}</span>
                                </div>

                                <div className="flex gap-5">
                                    <span className="w-32 text-gray-600 font-medium">Email address</span>
                                    <span className="text-gray-900">:</span>
                                    <span className="text-gray-900">{userDetails.Email || 'N/A'}</span>
                                </div>

                                <div className="flex gap-5">
                                    <span className="w-32 text-gray-600 font-medium">Phone no.</span>
                                    <span className="text-gray-900">:</span>
                                    <span className="text-gray-900">{userDetails.Contact || userDetails.Phone || 'N/A'}</span>
                                </div>

                                <div className="flex gap-5">
                                    <span className="w-32 text-gray-600 font-medium">GST no.</span>
                                    <span className="text-gray-900">:</span>
                                    <span className="text-gray-900">{userDetails.GSTNumber || 'N/A'}</span>
                                </div>

                                <div className="flex gap-5">
                                    <span className="w-32 text-gray-600 font-medium">Address</span>
                                    <span className="text-gray-900">:</span>
                                    <span className="text-gray-900">{userDetails.Address || 'N/A'}</span>
                                </div>

                                <div className="flex items-center gap-5">
                                    <span className="w-32 text-gray-600 font-medium">Status</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-900">:</span>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${userDetails.IsActive
                                            ? 'bg-green-200 text-green-900'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {userDetails.IsActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* User since */}
                            <div>
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
            <EditUserModal
                isOpen={isEditUserModalOpen}
                onClose={() => setIsEditUserModalOpen(false)}
                userData={userDetails}
                onUserEdited={fetchUserDetails}
            />

            <ImageUploadModal
                isOpen={isEditImageModalOpen}
                onClose={()=>setIsEditImageModalOpen(false)}
                userData={userDetails}
                onUserEdit={fetchUserDetails}
            />
        </div>
    );
};

export default UserDetailsPage;