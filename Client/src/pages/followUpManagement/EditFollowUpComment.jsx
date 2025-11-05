import React, { useState, useEffect } from 'react';
import { getLeadsDD, getAllLeadStatusDD } from '../../api/leadApi';
import { toast } from 'react-toastify';
import CloseIcon from "../../assets/icons/CloseIcon";
import { createFollowUp, updateFollowUpById } from '../../api/followUpApi';
import { useEscapeKey } from '../../utils/useEscapeKey';

const EditFollowUpComment = ({ id, comment, isOpen, onClose, onSuccess }) => {

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [comments, setComments] = useState('');

    useEscapeKey(() => {
        if (isOpen) onClose();
    });

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setComments(comment || '')
            setLoading(false);
        }
    }, [isOpen]);


    // Handle form submission
    const handleSubmit = async () => {

        setSubmitting(true);
        try {
            const response = await updateFollowUpById(id, comments)
            if (response.status == 201) {
                toast.success(response.data.Message);
                onSuccess();
                handleClose();
            }
            else {
                toast.error(response.data?.[0]?.Message || response.data?.Message || "Something went wrong");
            }
        } catch (err) {
            console.error('Error updating follow-up:', err);
            toast.error('Failed to update follow-up');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle close
    const handleClose = () => {
        setComments('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-end z-50 overflow-y-auto">
            <div className="w-200 max-w-2xl h-full bg-[#f1f0e9] shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleClose}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Edit follow-up
                            </h2>
                            <p className="text-xs text-gray-500">
                                Edit details of the follow-up.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0d4715]"></div>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {/* Follow up Comments */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Follow up comments (optional):
                                </label>
                                <textarea
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    placeholder="Type here"
                                    rows={8}
                                    className="w-full rounded-sm px-4 py-3 text-sm border border-gray-300 resize-none"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-300">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || loading}
                        className="w-full bg-[#0d4715] text-white rounded-sm py-3 text-sm font-medium hover:bg-[#0a3811] disabled:!opacity-50 disabled:!cursor-not-allowed transition-colors"
                    >
                        {submitting ? 'Updating...' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditFollowUpComment;