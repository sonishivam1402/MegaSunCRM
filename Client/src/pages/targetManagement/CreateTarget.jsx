import React, { useState, useEffect } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import { getAllUsersDD } from '../../api/userApi';
import { createNewTarget } from '../../api/targetApi';
import { toast } from 'react-toastify';

const CreateTarget = ({ isOpen, onClose, onSuccess }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [targets, setTargets] = useState({});

    // Get current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    // Month names array
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Fetch users on component mount
    useEffect(() => {
        if (isOpen) {
            const fetchUsers = async () => {
                try {
                    setLoading(true);
                    // Simulated API call - replace with actual API
                    const response = await getAllUsersDD();

                    if (response && response.data && Array.isArray(response.data)) {
                        setUsers(response.data[0]);
                        const initialTargets = {};
                        response.data.forEach(user => {
                            initialTargets[user.UserId] = '';
                        });
                        setTargets(initialTargets);
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                    alert('Failed to fetch users');
                } finally {
                    setLoading(false);
                }
            };

            fetchUsers();
        }
    }, [isOpen]);

    // Handle target input change
    const handleTargetChange = (userId, value) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setTargets(prev => ({
            ...prev,
            [userId]: numericValue
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            setSubmitting(true);

            const payload = users.map(user => ({
                    userId: user.UserId,
                    target: parseInt(targets[user.UserId]) || 0,
                    month: currentMonth,
                    year: currentYear
                }));

            const hasValidTargets = payload.some(item => item.target > 0);
            if (!hasValidTargets) {
                alert('Please enter at least one target value');
                return;
            }

            //console.log('Submitting payload:', payload);

            // Simulated API call - replace with actual API
            const response = await createNewTarget(payload);

            if (response.status === 201) {
                toast.success(response.data.Message);
                onClose()
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
            alert('Failed to create targets');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-end z-50 overflow-y-auto">
            {/* Modal */}
            {/* <div className="absolute inset-0 flex items-center justify-center p-4"> */}
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
                                    className={`grid grid-cols-3 gap-6 px-6 py-4 ${index !== users.length - 1 ? 'border-b border-gray-200' : ''
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
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-gray-100 text-gray-700"
                                        />
                                    </div>

                                    {/* Month Field */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                            Month
                                        </label>
                                        <input
                                            type="text"
                                            value={monthNames[currentMonth - 1]}
                                            disabled
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-gray-100 text-gray-700"
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
                                            placeholder=""
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