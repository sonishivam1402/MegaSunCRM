import React, { useState } from 'react';
import { createLeadType } from '../../api/leadApi';
import { toast } from 'react-toastify';
import CloseIcon from '../../assets/icons/CloseIcon';

const AddLeadTypeModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({ 
        Name: '', 
        Status: 1 
    });
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'Status' ? parseInt(value) : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.Name.trim()) {
            newErrors.Name = 'Name is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setSaving(true);
        try {
            const response = await createLeadType(formData);
            
            if (response.status === 201) {
                toast.success(response.data?.[0]?.Message || 'Lead Type created successfully.');
                setFormData({ Name: '', Status: 1 }); 
                setErrors({});
                onSuccess && onSuccess(); 
                onClose && onClose(); 
            } else if (response.status === 200) {
                toast.error(response.data?.[0]?.Message || 'Failed to create lead type.');
            } else {
                toast.error(`Unexpected error (code ${response.status})`);
            }
        } catch (err) {
            console.error(err);
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Something went wrong. Please try again later.');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleClose = () => {
        if (!saving) {
            setFormData({ Name: '', Status: 1 });
            setErrors({});
            onClose && onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-end z-50">
            <div className="bg-[#f1f0e9] rounded-lg shadow-lg p-6 w-full max-w-lg h-full flex flex-col">
                <div className='flex justify-between items-center shrink-0 mb-4'>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Add Lead Type
                    </h2>
                    <button
                        className="p-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                        onClick={handleClose}
                        disabled={saving}
                    >
                        <CloseIcon />
                    </button>
                </div>
                
                <div className="space-y-4 flex-1 border-t pt-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleInputChange}
                            placeholder="Enter lead type name"
                            className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                                errors.Name ? 'border-red-300' : 'border-gray-300'
                            }`}
                            disabled={saving}
                        />
                        {errors.Name && (
                            <p className="text-red-500 text-xs mt-1">{errors.Name}</p>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            name="Status"
                            value={formData.Status}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                            disabled={saving}
                        >
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </select>
                    </div>
                </div>
                
                <div className="mt-6 shrink-0 space-y-2">
                    <button
                        className="px-4 py-2 w-full text-sm rounded bg-green-800 text-white hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        onClick={handleSubmit}
                        disabled={saving}
                    >
                        {saving ? 'Creating...' : 'Create Lead Type'}
                    </button>
                    
                    <button
                        className="px-4 py-2 w-full text-sm rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 transition-colors"
                        onClick={handleClose}
                        disabled={saving}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddLeadTypeModal;