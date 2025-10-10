import React, { useState, useEffect } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import AddIcon from '../../assets/icons/AddIcon';
import TrashIcon from '../../assets/icons/TrashIcon';
import { getAllLeadSourcesDD, getAllLeadStatusDD, getAllLeadTypesDD, getLeadById, updateLeadById } from '../../api/leadApi';
import { getAllUsersDD } from '../../api/userApi';
import { getProductOptions } from '../../api/productApi';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const EditLeadModal = ({ isOpen, onClose, onSuccess, leadId }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [attemptedNext, setAttemptedNext] = useState(false); // Track if user clicked Next button
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        location: '',
        country: '',
        address: '',
        pincode: '',
        gst: '',
        leadStatusId: '',
        leadTypeId: '',
        leadSourceId: '',
        userId: '',
        productMappings: []
    });

    const { user } = useAuth();
    const [leadTypeOptions, setLeadTypeOptions] = useState([]);
    const [sourceOptions, setSourceOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [usersOptions, setUsersOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);

    // Fetch lead details by ID
    const fetchLeadDetails = async () => {
        if (!leadId) return;

        try {
            setLoading(true);
            const response = await getLeadById(leadId);
            const leadData = response[0][0] || {};
            const productMappings = response[1] || [];

            // Populate form with existing data
            const formDataToSet = {
                name: leadData.LeadName || '',
                contact: leadData.LeadPhoneNumber || '',
                email: leadData.Email || '',
                location: leadData.LeadAddress || '',
                country: leadData.Country || '',
                address: leadData.Address || '',
                pincode: leadData.Pincode || '',
                gst: leadData.GSTNumber || '',
                leadStatusId: leadData.LeadStatusId?.toString() || '',
                leadTypeId: leadData.LeadTypeId?.toString() || '',
                leadSourceId: leadData.LeadSourceId?.toString() || '',
                userId: user.IsAdmin ? (leadData.UserId?.toString() || '') : user.UserId,
                productMappings: productMappings.map(product => ({
                    ProductId: product.ProductId,
                    ProductName: product.ProductName,
                    Quantity: product.Quantity
                }))
            };

            setFormData(formDataToSet);

        } catch (error) {
            console.error('Error fetching lead details:', error);
            toast.error('Failed to fetch lead details');
        } finally {
            setLoading(false);
        }
    };

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
            console.error('Error fetching products:', err);
        }
    };

    // Load dropdown options and lead details
    useEffect(() => {
        if (isOpen) {
            getLeadTypes();
            getSources();
            getStatuses();
            getUsers();
            getProducts();
            fetchLeadDetails();
        }
    }, [isOpen, leadId]);

    // Set userId for non-admin users after form data is loaded
    useEffect(() => {
        if (!user.IsAdmin && user.UserId) {
            setFormData(prev => ({
                ...prev,
                userId: user.UserId
            }));
        }
    }, [user.UserId, user.IsAdmin]);


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
                { ProductId: null, ProductName: '', Quantity: 1 }  // Explicitly set ProductId to null
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
        const required = ['name', 'contact', 'email', 'location', 'country', 'pincode', 'address', 'leadStatusId', 'leadTypeId', 'leadSourceId'];

        // Include userId only for admin
        if (user.IsAdmin) required.push('userId');

        return required.every(field => formData[field] && formData[field].toString().trim() !== '');
    };

    const validateStep2 = () => {
        return formData.productMappings.length > 0 &&
            formData.productMappings.every(p =>
                (p.ProductId || p.ProductName) && p.Quantity > 0
            );
    };

    // Check if individual field is invalid
    const isFieldInvalid = (fieldName) => {
        return attemptedNext && (!formData[fieldName] || formData[fieldName].toString().trim() === '');
    };

    // Validate contact number format
    const isContactValid = () => {
        return /^[0-9]{10}$/.test(formData.contact);
    };

    // Validate email format
    const isEmailValid = () => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    };

    // Validate pincode format (6 digits)
    const isPincodeValid = () => {
        return /^[0-9]{6}$/.test(formData.pincode);
    };

    const handleNext = () => {
        setAttemptedNext(true);

        // Validate contact number format
        if (formData.contact && !isContactValid()) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (validateStep1()) {
            setCurrentStep(2);
            setAttemptedNext(false); // Reset for step 2
        } else {
            toast.error("Please fill in all required fields.");
        }
    };

    const handleBack = () => {
        setCurrentStep(1);
        setAttemptedNext(false);
    };

    const handleStepClick = (step) => {
        if (step === 1) {
            setCurrentStep(1);
            setAttemptedNext(false);
        } else if (step === 2) {
            // Only allow going to step 2 if step 1 is valid, but don't show validation errors
            if (formData.contact && !isContactValid()) {
                return;
            }
            if (formData.email && !isEmailValid()) {
                return;
            }
            if (formData.pincode && !isPincodeValid()) {
                return;
            }

            if (validateStep1()) {
                setCurrentStep(2);
                setAttemptedNext(false);
            }
        }
    };

    const handleSubmit = async () => {
        if (validateStep2()) {
            // Parse location into city, state, pincode, address
            const locationParts = formData.location.split(',').map(part => part.trim());

            const submitData = {
                lead: {
                    id: leadId,
                    name: formData.name,
                    contact: formData.contact,
                    email: formData.email,
                    city: locationParts[0] || '',
                    state: locationParts[1] || '',
                    country: formData.country,
                    pincode: formData.pincode,
                    address: formData.address,
                    leadStatusId: formData.leadStatusId,
                    leadTypeId: formData.leadTypeId,
                    leadSourceId: formData.leadSourceId,
                    userId: user.IsAdmin ? formData.userId : user.UserId,
                    productMappings: formData.productMappings
                }
                
            };

            try {
                const response = await updateLeadById(leadId, submitData);
                if (response.status == 201) {
                    toast.success(response.data[0].Message);
                    onSuccess();
                    handleClose();
                }
                else {
                    toast.error(response.data[0].Message);
                }
            } catch (error) {
                console.error("Error updating lead:", error);
                toast.error("Failed to update lead");
            }
        } else {
            toast.error("Please select at least one product and ensure all quantities are valid.");
        }
    };

    const handleClose = () => {
        setCurrentStep(1);
        setAttemptedNext(false);
        setFormData({
            name: '',
            contact: '',
            email: '',
            location: '',
            country: '',
            pincode: '',
            gst: '',
            leadStatusId: '',
            leadTypeId: '',
            leadSourceId: '',
            userId: '',
            productMappings: []
        });
        setLoading(true);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-end z-50 overflow-y-auto">
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
                            <h2 className="text-xl font-semibold text-gray-900">Edit lead</h2>
                            <p className="text-sm text-gray-600">Update the details of the lead.</p>
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
                    {loading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        </div>
                    ) : (
                        <>
                            {/* Step Indicator */}
                            <div className="flex items-center mb-6">
                                <button
                                    onClick={() => handleStepClick(1)}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${currentStep >= 1 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                                        }`}
                                >
                                    {currentStep > 1 ? '✓' : '1'}
                                </button>
                                <div className={`flex-1 h-0.5 mx-3 ${currentStep > 1 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                                <button
                                    onClick={() => handleStepClick(2)}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${currentStep >= 2 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                                        }`}
                                >
                                    2
                                </button>
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
                                                <span className="text-red-500">*</span> Lead's full name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                placeholder="John Doe"
                                                className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 ${isFieldInvalid('name')
                                                    ? 'bg-red-100 focus:bg-red-50 focus:ring-red-500'
                                                    : 'bg-gray-200 focus:bg-white'
                                                    }`}
                                            />
                                        </div>

                                        {/* Lead's mobile number */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <span className="text-red-500">*</span> Lead's mobile number
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.contact}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Allow only digits
                                                    if (/^\d*$/.test(value)) {
                                                        handleInputChange('contact', value);
                                                    }
                                                }}
                                                placeholder="XXXXXXXXXX"
                                                className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 ${isFieldInvalid('contact') || (attemptedNext && formData.contact && !isContactValid())
                                                    ? 'bg-red-100 focus:bg-red-50 focus:ring-red-500'
                                                    : 'bg-gray-200 focus:bg-white'
                                                    }`}
                                            />
                                            {attemptedNext && formData.contact && !isContactValid() && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    Please enter a valid 10-digit mobile number.
                                                </p>
                                            )}
                                        </div>

                                        {/* Lead's email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <span className="text-red-500">*</span> Lead's email
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                placeholder="john.doe@example.com"
                                                className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 ${isFieldInvalid('email') || (attemptedNext && formData.email && !isEmailValid())
                                                    ? 'bg-red-100 focus:bg-red-50 focus:ring-red-500'
                                                    : 'bg-gray-200 focus:bg-white'
                                                    }`}
                                            />
                                            {attemptedNext && formData.email && !isEmailValid() && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    Please enter a valid email address.
                                                </p>
                                            )}
                                        </div>

                                        {/* Lead's location */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <span className="text-red-500">*</span> Lead's Location (City, State)
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => handleInputChange('location', e.target.value)}
                                                placeholder="Ahmedabad, Gujarat"
                                                className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 ${isFieldInvalid('location')
                                                    ? 'bg-red-100 focus:bg-red-50 focus:ring-red-500'
                                                    : 'bg-gray-200 focus:bg-white'
                                                    }`}
                                            />
                                        </div>

                                        {/* Lead's country */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <span className="text-red-500">*</span> Lead's country
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.country}
                                                onChange={(e) => handleInputChange('country', e.target.value)}
                                                placeholder="India"
                                                className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 ${isFieldInvalid('country')
                                                    ? 'bg-red-100 focus:bg-red-50 focus:ring-red-500'
                                                    : 'bg-gray-200 focus:bg-white'
                                                    }`}
                                            />
                                        </div>

                                        {/* Lead Address */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <span className="text-red-500">*</span> Lead's Address
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                placeholder="Address"
                                                className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 ${isFieldInvalid('address')
                                                    ? 'bg-red-100 focus:bg-red-50 focus:ring-red-500'
                                                    : 'bg-gray-200 focus:bg-white'
                                                    }`}
                                            />
                                        </div>

                                        {/* Lead's pincode */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <span className="text-red-500">*</span> Lead's pincode
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.pincode}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Allow only digits and limit to 6 characters
                                                    if (/^\d*$/.test(value) && value.length <= 6) {
                                                        handleInputChange('pincode', value);
                                                    }
                                                }}
                                                placeholder="380001"
                                                className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 ${isFieldInvalid('pincode') || (attemptedNext && formData.pincode && !isPincodeValid())
                                                    ? 'bg-red-100 focus:bg-red-50 focus:ring-red-500'
                                                    : 'bg-gray-200 focus:bg-white'
                                                    }`}
                                            />
                                            {attemptedNext && formData.pincode && !isPincodeValid() && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    Please enter a valid 6-digit pincode.
                                                </p>
                                            )}
                                        </div>

                                        {/* Lead's GST */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                GST Number
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.gst}
                                                onChange={(e) => handleInputChange('gst', e.target.value)}
                                                placeholder="GST Number (Optional)"
                                                className="w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
                                            />
                                        </div>

                                        {/* Lead type */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <span className="text-red-500">*</span> Lead type
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={formData.leadTypeId}
                                                    onChange={(e) => handleInputChange('leadTypeId', e.target.value)}
                                                    className={`w-full px-4 py-3 border-0 rounded text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-500 ${isFieldInvalid('leadTypeId')
                                                        ? 'bg-red-100 focus:bg-red-50 focus:ring-red-500'
                                                        : 'bg-gray-200 focus:bg-white'
                                                        }`}
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
                                                <span className="text-red-500">*</span> Lead source
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={formData.leadSourceId}
                                                    onChange={(e) => handleInputChange('leadSourceId', e.target.value)}
                                                    className={`w-full px-4 py-3 border-0 rounded text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-500 ${isFieldInvalid('leadSourceId')
                                                        ? 'bg-red-100 focus:bg-red-50 focus:ring-red-500'
                                                        : 'bg-gray-200 focus:bg-white'
                                                        }`}
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
                                                <span className="text-red-500">*</span> Lead status
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={formData.leadStatusId}
                                                    onChange={(e) => handleInputChange('leadStatusId', e.target.value)}
                                                    className={`w-full px-4 py-3 border-0 rounded text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-500 ${isFieldInvalid('leadStatusId')
                                                        ? 'bg-red-100 focus:bg-red-50 focus:ring-red-500'
                                                        : 'bg-gray-200 focus:bg-white'
                                                        }`}
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
                                                <span className="text-red-500">*</span> User
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={user.IsAdmin ? formData.userId : user.UserId} // Admin can select, non-admin stays fixed
                                                    onChange={(e) => handleInputChange('userId', e.target.value)}
                                                    disabled={!user.IsAdmin} // Non-admin cannot change
                                                    className={`w-full px-4 py-3 border-0 rounded text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-500 ${isFieldInvalid('userId')
                                                        ? 'bg-red-100 focus:bg-red-50 focus:ring-red-500'
                                                        : user.IsAdmin ? 'bg-gray-200 focus:bg-white' : 'bg-gray-100 cursor-not-allowed'
                                                        }`}
                                                >
                                                    {user.IsAdmin ? (
                                                        <>
                                                            <option value="">Select user</option>
                                                            {usersOptions.map(u => (
                                                                <option key={u.UserId} value={u.UserId}>{u.Name}</option>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <option value={user.UserId}>{user.Name}</option>
                                                    )}
                                                </select>

                                                {user.IsAdmin && (
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                )}
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
                                                <div key={index} className="mb-4">
                                                    {/* Show IndiaMart product name if ProductId is null/undefined */}
                                                    {(!product.ProductId && product.ProductName) ? (
                                                        <div className="space-y-2">
                                                            <div className="flex gap-2 items-start">
                                                                <div className="flex-1">
                                                                    <input
                                                                        type="text"
                                                                        value={product.ProductName || ''}
                                                                        disabled
                                                                        className="w-full px-4 py-3 bg-yellow-50 border border-yellow-300 rounded text-gray-700 cursor-not-allowed"
                                                                    />
                                                                    <p className="text-xs text-yellow-700 mt-1">
                                                                        ⚠️ This is an IndiaMart product (not in our product list). You can keep it or replace it below.
                                                                    </p>
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

                                                            {/* Option to replace with real product */}
                                                            <div className="flex gap-2 items-center pl-2">
                                                                <span className="text-xs text-gray-600">Replace with:</span>
                                                                <div className="flex-1 relative">
                                                                    <select
                                                                        value=""
                                                                        onChange={(e) => {
                                                                            if (e.target.value) {
                                                                                updateProduct(index, 'ProductId', e.target.value);
                                                                            }
                                                                        }}
                                                                        className="w-full px-3 py-2 bg-gray-200 border-0 rounded text-sm text-gray-700 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
                                                                    >
                                                                        <option value="">Select a product from our list</option>
                                                                        {productOptions.map(prod => (
                                                                            <option key={prod.productId} value={prod.productId}>{prod.productName}</option>
                                                                        ))}
                                                                    </select>
                                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        /* Regular product dropdown for real products */
                                                        <div className="flex gap-2 items-start">
                                                            <div className="flex-1 relative">
                                                                <select
                                                                    value={product.ProductId || ''}
                                                                    onChange={(e) => updateProduct(index, 'ProductId', e.target.value)}
                                                                    className="w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
                                                                >
                                                                    <option value="">Select product</option>
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
                                        className="w-full py-3 bg-green-800 text-white rounded font-medium hover:bg-green-900 transition-colors"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleBack}
                                            className="flex-1 py-3 bg-gray-300 text-gray-700 rounded font-medium hover:bg-gray-400 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!validateStep2()}
                                            className="flex-1 py-3 bg-green-800 text-white rounded font-medium hover:bg-green-900 transition-colors disabled:!bg-gray-400 disabled:!cursor-not-allowed"
                                        >
                                            Update Lead
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditLeadModal;