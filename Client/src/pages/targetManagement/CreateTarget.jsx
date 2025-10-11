import React, { useState, useEffect } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import { getTargetUsers, createNewTarget } from '../../api/targetApi';
import { toast } from 'react-toastify';

const CreateTarget = ({ isOpen, onClose, onSuccess }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [targets, setTargets] = useState({});

    useEffect(() => {
        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getTargetUsers();
            
            if (response?.data && Array.isArray(response.data)) {
                // First array contains users with TotalTarget property
                const usersData = response.data[0] || [];
                
                setUsers(usersData);
                
                // Pre-fill targets from TotalTarget in user object
                const initialTargets = {};
                usersData.forEach(user => {
                    initialTargets[user.UserId] = user.TotalTarget?.toString() || '';
                });
                setTargets(initialTargets);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleTargetChange = (userId, value) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setTargets(prev => ({
            ...prev,
            [userId]: numericValue
        }));
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);

            const payload = users.map(user => ({
                userId: user.UserId,
                target: parseInt(targets[user.UserId]) || 0,
                month: user.CurrentMonth,
                year: user.CurrentYear
            }));

            const hasValidTargets = payload.some(item => item.target > 0);
            if (!hasValidTargets) {
                toast.warning('Please enter at least one target value');
                return;
            }

            const response = await createNewTarget(payload);

            if (response.status === 201) {
                toast.success(response.data.Message);
                onClose();
                onSuccess();
            } else {
                toast.error(
                    response.data?.[0]?.Message ||
                    response.data?.Message ||
                    "Something went wrong"
                );
            }
        } catch (error) {
            console.error('Error creating targets:', error);
            toast.error('Failed to create targets');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-end z-50 overflow-y-auto">
            <div className="w-200 max-w-5xl h-full bg-[#f1f0e9] shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Add New Targets
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                            <span className="ml-2">Loading users...</span>
                        </div>
                    ) : (
                        <div>
                            {users.map((user, index) => (
                                <div
                                    key={user.UserId}
                                    className={`grid grid-cols-3 gap-6 px-6 py-4 ${
                                        index !== users.length - 1 ? 'border-b border-gray-200' : ''
                                    }`}
                                >
                                    {/* User Field */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            User
                                        </label>
                                        <input
                                            type="text"
                                            value={user.Name || 'Unknown'}
                                            disabled
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-gray-100 text-gray-700 hover:cursor-not-allowed"
                                        />
                                    </div>

                                    {/* Month Field */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            Month
                                        </label>
                                        <input
                                            type="text"
                                            value={user.CurrentMonthName}
                                            disabled
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-gray-100 text-gray-700 hover:cursor-not-allowed"
                                        />
                                    </div>

                                    {/* Domestic Target Field */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            Domestic Target
                                        </label>
                                        <input
                                            type="text"
                                            value={targets[user.UserId] || ''}
                                            onChange={(e) => handleTargetChange(user.UserId, e.target.value)}
                                            placeholder="Enter target"
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t flex justify-start space-x-3">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="px-6 py-2 bg-green-800 text-white rounded text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {submitting ? 'Submitting...' : 'Submit'}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={submitting}
                        className="px-6 py-2 bg-gray-500 text-white rounded text-sm font-medium hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTarget;