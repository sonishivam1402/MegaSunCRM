import React, { useState, useEffect } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import AddIcon from '../../assets/icons/AddIcon';
import TrashIcon from '../../assets/icons/TrashIcon';
import { getAllLeadSourcesDD, getAllLeadStatusDD, getAllLeadTypesDD, createNewLead } from '../../api/leadApi';
import { getAllUsersDD } from '../../api/userApi';
import { getProductOptions } from '../../api/productApi';
import { toast } from 'react-toastify';

const AddLeadModal = ({ isOpen, onClose, onSuccess }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        location: '',
        leadStatusId: '',
        leadTypeId: '',
        leadSourceId: '',
        userId: '',
        productMappings: []
    });

    const [leadTypeOptions, setLeadTypeOptions] = useState([]);
    const [sourceOptions, setSourceOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [usersOptions, setUsersOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);

    // Fetch filter options
    const getLeadTypes = async () => {
        try {
            const res = await getAllLeadTypesDD();
            setLeadTypeOptions(res[0]);
        } catch (err) {
            console.error('Error fetching lead types:', err);
        }
    };

    const getSources = async () => {
        try {
            const res = await getAllLeadSourcesDD();
            setSourceOptions(res[0]);
        } catch (err) {
            console.error('Error fetching sources:', err);
        }
    };

    const getStatuses = async () => {
        try {
            const res = await getAllLeadStatusDD();
            setStatusOptions(res[0]);
        } catch (err) {
            console.error('Error fetching statuses:', err);
        }
    };

    const getUsers = async () => {
        try {
            const res = await getAllUsersDD();
            console.log(res);
            setUsersOptions(res.data[0]);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const getProducts = async () => {
        try {
            const res = await getProductOptions();
            setProductOptions(res.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    // Load dropdown options
    useEffect(() => {
        if (isOpen) {
            getLeadTypes();
            getSources();
            getStatuses();
            getUsers();
            getProducts();
        }
    }, [isOpen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addProduct = () => {
        setFormData(prev => ({
            ...prev,
            productMappings: [
                ...prev.productMappings,
                { ProductId: '', ProductName: '', Quantity: 1 }
            ]
        }));
    };

    const removeProduct = (index) => {
        setFormData(prev => ({
            ...prev,
            productMappings: prev.productMappings.filter((_, i) => i !== index)
        }));
    };

    const updateProduct = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            productMappings: prev.productMappings.map((product, i) => {
                if (i === index) {
                    if (field === 'ProductId') {
                        const selectedProduct = productOptions.find(p => p.productId == value);
                        return {
                            ...product,
                            ProductId: parseInt(value),
                            ProductName: selectedProduct ? selectedProduct.productName : ''
                        };
                    }
                    return { ...product, [field]: field === 'Quantity' ? parseInt(value) : value };
                }
                return product;
            })
        }));
    };

    const validateStep1 = () => {
        const required = ['name', 'contact', 'location', 'leadStatusId', 'leadTypeId', 'leadSourceId', 'userId'];
        return required.every(field => formData[field] && formData[field].toString().trim() !== '');
    };

    const validateStep2 = () => {
        return formData.productMappings.length > 0 &&
            formData.productMappings.every(p => p.ProductId && p.Quantity > 0);
    };

    const handleNext = () => {
        if (validateStep1()) {
            setCurrentStep(2);
        }
    };

    const handleBack = () => {
        setCurrentStep(1);
    };

    const handleSubmit = async () => {
        if (validateStep2()) {
            // Parse location into city, state, pincode, address
            const locationParts = formData.location.split(',').map(part => part.trim());

            const submitData = {
                lead: {
                    name: formData.name,
                    contact: formData.contact,
                    city: locationParts[0] || '',
                    state: locationParts[1] || '',
                    leadStatusId: formData.leadStatusId,
                    leadTypeId: formData.leadTypeId,
                    leadSourceId: formData.leadSourceId,
                    userId: formData.userId,
                    productMappings: formData.productMappings
                }
            };

            try {
                const response = await createNewLead(submitData);
                if (response.status == 201) {
                    toast.success(response.data[0].Message);
                    onSuccess();
                    handleClose();
                }
                else {
                    toast.error(response.data[0].Message);
                }
            } catch (error) {
                console.error("Error creating lead:", error);
            }
        }
    };


    const handleClose = () => {
        setCurrentStep(1);
        setFormData({
            name: '',
            contact: '',
            location: '',
            leadStatusId: '',
            leadTypeId: '',
            leadSourceId: '',
            userId: '',
            productMappings: []
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-xs  flex items-center justify-end z-50 overflow-y-auto">
            <div className="bg-[#F0EEE4] w-200 h-screen max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-3">
                        <button onClick={handleClose} className="text-gray-600">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Add new lead</h2>
                            <p className="text-sm text-gray-600">Add in the details of the new lead.</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <CloseIcon size={20} />
                    </button>
                </div>

                <div className="p-4">
                    {/* Step Indicator */}
                    <div className="flex items-center mb-6">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>
                            {currentStep > 1 ? '✓' : '1'}
                        </div>
                        <div className={`flex-1 h-0.5 mx-3 ${currentStep > 1 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>
                            2
                        </div>
                    </div>

                    <div className="mb-2 px-2">
                        <span className="text-xs text-gray-500 font-medium">
                            STEP-{currentStep}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 mt-1">
                            {currentStep === 1 ? 'Lead details' : 'Product/Item details'}
                        </h3>
                    </div>

                    <div className="max-h-96 overflow-y-auto px-2">
                        {currentStep === 1 ? (
                            <div className="space-y-4">
                                {/* Lead's full name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lead's full name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
                                    />
                                </div>

                                {/* Lead's mobile number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lead's mobile number
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.contact}
                                        onChange={(e) => handleInputChange('contact', e.target.value)}
                                        placeholder="XXXXXXXXXX"
                                        className="w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
                                    />
                                </div>

                                {/* Lead's location */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lead's location
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        placeholder="Ahmedabad, India"
                                        className="w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
                                    />
                                </div>

                                {/* Lead type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lead type
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.leadTypeId}
                                            onChange={(e) => handleInputChange('leadTypeId', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
                                        >
                                            <option value="">Select lead type</option>
                                            {leadTypeOptions.map(type => (
                                                <option key={type.LeadTypeId} value={type.LeadTypeId}>{type.Name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Lead source */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lead source
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.leadSourceId}
                                            onChange={(e) => handleInputChange('leadSourceId', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
                                        >
                                            <option value="">Select source</option>
                                            {sourceOptions.map(source => (
                                                <option key={source.LeadSourceId} value={source.LeadSourceId}>{source.Name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Lead status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lead status
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.leadStatusId}
                                            onChange={(e) => handleInputChange('leadStatusId', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
                                        >
                                            <option value="">Select status</option>
                                            {statusOptions.map(status => (
                                                <option key={status.LeadStatusId} value={status.LeadStatusId}>{status.Name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* User */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        User
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.userId}
                                            onChange={(e) => handleInputChange('userId', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
                                        >
                                            <option value="">Select user</option>
                                            {usersOptions.map(user => (
                                                <option key={user.UserId} value={user.UserId}>{user.Name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Interested Item/product */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Interested Item/product
                                    </label>

                                    {formData.productMappings.map((product, index) => (
                                        <div key={index} className="flex gap-2 mb-3 items-start">
                                            <div className="flex-1 relative">
                                                <select
                                                    value={product.ProductId || ''}
                                                    onChange={(e) => updateProduct(index, 'ProductId', e.target.value)}
                                                    className="w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500 max-h-40 overflow-y-auto"
                                                >
                                                    <option value="">Select lead type</option>
                                                    {productOptions.map(prod => (
                                                        <option key={prod.productId} value={prod.productId}>{prod.productName}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <input
                                                type="number"
                                                value={product.Quantity || 1}
                                                onChange={(e) => updateProduct(index, 'Quantity', e.target.value)}
                                                placeholder="Qty"
                                                min="1"
                                                className="w-20 px-3 py-3 bg-gray-200 border-0 rounded text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
                                            />
                                            {formData.productMappings.length > 1 && (
                                                <button
                                                    onClick={() => removeProduct(index)}
                                                    className="p-3 text-red-600 hover:text-red-800 transition-colors"
                                                >
                                                    <TrashIcon size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        onClick={addProduct}
                                        className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors mt-3"
                                    >
                                        <AddIcon size={16} />
                                        Add another item
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    <div className="mt-6 pt-4">
                        {currentStep === 1 ? (
                            <button
                                onClick={handleNext}
                                disabled={!validateStep1()}
                                className="w-full py-3 bg-green-800 text-white rounded font-medium hover:bg-green-900 transition-colors disabled:!bg-gray-400 disabled:!cursor-not-allowed"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!validateStep2()}
                                className="w-full py-3 bg-green-800 text-white rounded font-medium hover:bg-green-900 transition-colors disabled:!bg-gray-400 disabled:!cursor-not-allowed"
                            >
                                Confirm
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AddLeadModal;