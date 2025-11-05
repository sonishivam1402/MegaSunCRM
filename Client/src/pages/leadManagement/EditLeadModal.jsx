import React, { useState, useEffect } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import AddIcon from '../../assets/icons/AddIcon';
import TrashIcon from '../../assets/icons/TrashIcon';
import { getAllLeadSourcesDD, getAllLeadStatusDD, getAllLeadTypesDD, getLeadById, updateLeadById } from '../../api/leadApi';
import { getAllUsersDD } from '../../api/userApi';
import { getProductOptions } from '../../api/productApi';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { countryCodes } from '../../utils/Country_Codes';
import countryStatesData from '../../utils/Country_States.json';

const EditLeadModal = ({ isOpen, onClose, onSuccess, leadId }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [attemptedNext, setAttemptedNext] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    contact: '',
    altCountryCode: '+91',
    alternateContact: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
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
  const [availableStates, setAvailableStates] = useState([]);

  // Update available states when country changes
  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countryStatesData.find(c => c.name === formData.country);
      if (selectedCountry && selectedCountry.states) {
        setAvailableStates(selectedCountry.states);
        // Reset state if it's not in the new country's states
        if (formData.state && !selectedCountry.states.includes(formData.state)) {
          setFormData(prev => ({ ...prev, state: '' }));
        }
      } else {
        setAvailableStates([]);
        setFormData(prev => ({ ...prev, state: '' }));
      }
    }
  }, [formData.country]);

  const parsePhone = (phone) => {
    // console.log(phone);
    if (!phone) return { countryCode: "", contact: "" };

    const match = phone.match(/^(\+\d{1,4})[-\s]?(\d{6,15})$/);
    if (match) {
      return {
        countryCode: match[1],
        newContact: match[2],
      };
    }
    return { countryCode: "", newContact: phone };
  };

  // Fetch lead details by ID
  const fetchLeadDetails = async () => {
    if (!leadId) return;

    try {
      setLoading(true);
      const response = await getLeadById(leadId);
      const leadData = response?.[0]?.[0] || {};
      const productMappings = response?.[1] || [];
      let city = leadData.City || '';
      let state = leadData.State || '';
      if ((!city || !state) && leadData.LeadAddress) {
        const parts = String(leadData.LeadAddress).split(',').map(p => p.trim());
        city = city || parts[0] || '';
        state = state || parts[1] || '';
      }

      const { countryCode, newContact } = parsePhone(leadData.LeadPhoneNumber);
      const { countryCode: altCountryCode, newContact: newAltContact } = parsePhone(leadData["Alternate Number"]);

      const formDataToSet = {
        name: leadData.LeadName || '',
        countryCode: countryCode || '+91',
        contact: newContact || '',
        altCountryCode: altCountryCode || '+91',
        alternateContact: newAltContact || '',
        email: leadData.Email || '',
        address: leadData.Address || '',
        city,
        state,
        country: leadData.Country || '',
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

      // Set available states based on loaded country
      if (leadData.Country) {
        const selectedCountry = countryStatesData.find(c => c.name === leadData.Country);
        if (selectedCountry && selectedCountry.states) {
          setAvailableStates(selectedCountry.states);
        }
      }
    } catch (error) {
      console.error('Error fetching lead details:', error);
      toast.error('Failed to fetch lead details');
    } finally {
      setLoading(false);
    }
  };

  // Fetch filter options
  const getLeadTypes = async () => {
    try { const res = await getAllLeadTypesDD(); setLeadTypeOptions(res[0]); }
    catch (err) { console.error('Error fetching lead types:', err); }
  };

  const getSources = async () => {
    try { const res = await getAllLeadSourcesDD(); setSourceOptions(res[0]); }
    catch (err) { console.error('Error fetching sources:', err); }
  };

  const getStatuses = async () => {
    try { const res = await getAllLeadStatusDD(); setStatusOptions(res[0]); }
    catch (err) { console.error('Error fetching statuses:', err); }
  };

  const getUsers = async () => {
    try { const res = await getAllUsersDD(); setUsersOptions(res.data[0]); }
    catch (err) { console.error('Error fetching users:', err); }
  };

  const getProducts = async () => {
    try { const res = await getProductOptions(); setProductOptions(res.data); }
    catch (err) { console.error('Error fetching products:', err); }
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
      setFormData(prev => ({ ...prev, userId: user.UserId }));
    }
  }, [user.UserId, user.IsAdmin]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      productMappings: [
        ...prev.productMappings,
        { ProductId: null, ProductName: '', Quantity: 1 }
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

  // ===================== Validation helpers =====================
  const requiredFields = () => {
    const fields = ['contact', 'state', 'country', 'leadStatusId', 'leadTypeId', 'leadSourceId'];
    if (user.IsAdmin) fields.push('userId');
    return fields;
  };

  const prettyFieldName = {
    name: 'Name',
    contact: 'Mobile number',
    alternateContact: 'Alternate Mobile number',
    email: 'Email',
    address: 'Address',
    city: 'City',
    state: 'State',
    country: 'Country',
    pincode: 'Pincode',
    leadStatusId: 'Lead Status',
    leadTypeId: 'Lead Type',
    leadSourceId: 'Lead Source',
    userId: 'User'
  };

  const getMissingFields = () => requiredFields().filter(f => !formData[f] || formData[f].toString().trim() === '');

  const validateStep1 = () => getMissingFields().length === 0;

  const validateStep2 = () => formData.productMappings.length > 0 && formData.productMappings.every(p => (p.ProductId || p.ProductName) && p.Quantity > 0);

  // Only after Next is clicked
  const isFieldInvalid = (fieldName) => attemptedNext && (!formData[fieldName] || formData[fieldName].toString().trim() === '');

  const isContactValid = () => /^[0-9]+$/.test(formData.contact);
  const isEmailValid = () => formData.email ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) : true;
  const isPincodeValid = () => /^[0-9]{6}$/.test(formData.pincode);

  const handleNext = () => {
    setAttemptedNext(true);

    // Format validations (only if typed)
    if (formData.contact && !isContactValid()) {
      toast.error('Please enter a valid mobile number.');
      return;
    }
    if (formData.email && !isEmailValid()) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (formData.pincode && !isPincodeValid()) {
      toast.error('Please enter a valid 6-digit pincode.');
      return;
    }

    const missing = getMissingFields();
    if (missing.length > 0) {
      const msg = 'Please fill: ' + missing.map(m => prettyFieldName[m]).join(', ') + '.';
      toast.error(msg);
      return;
    }

    setCurrentStep(2);
    setAttemptedNext(false);
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
      if (formData.contact && !isContactValid()) return;
      if (formData.alternateContact && !isContactValid()) return;
      if (formData.email && !isEmailValid()) return;
      if (formData.pincode && !isPincodeValid()) return;
      if (validateStep1()) {
        setCurrentStep(2);
        setAttemptedNext(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) {
      toast.error('Please select at least one product and ensure all quantities are valid.');
      return;
    }

    const submitData = {
      lead: {
        id: leadId,
        name: formData.name,
        contact: formData.countryCode + "-" + formData.contact,
        alternateContact: formData.alternateContact ? formData.altCountryCode + "-" + formData.alternateContact : '',
        email: formData.email,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        address: formData.address,
        gst: formData.gst || '',
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
        toast.success(response.data?.[0]?.Message || 'Lead updated');
        onSuccess && onSuccess();
        handleClose();
      } else {
        toast.error(response.data?.[0]?.Message || response.data?.Message || 'Failed to update lead');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead');
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setAttemptedNext(false);
    setFormData({
      name: '',
      countryCode: '+91',
      contact: '',
      altCountryCode: '+91',
      alternateContact: '',
      email: '',
      address: '',
      city: '',
      state: '',
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

  // Helper to conditionally add red outline ONLY when invalid after Next
  const invalidRing = (field) => (isFieldInvalid(field) ? 'ring-2 ring-red-500' : '');

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
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
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
                <button onClick={() => handleStepClick(1)} className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${currentStep >= 1 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-600 hover:bg-gray-400'}`}>
                  {currentStep > 1 ? '✓' : '1'}
                </button>
                <div className={`flex-1 h-0.5 mx-3 ${currentStep > 1 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                <button onClick={() => handleStepClick(2)} className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${currentStep >= 2 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-600 hover:bg-gray-400'}`}>
                  2
                </button>
              </div>

              <div className="mb-2 px-2">
                <span className="text-xs text-gray-500 font-medium">STEP-{currentStep}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">{currentStep === 1 ? 'Lead details' : 'Product/Item details'}</h3>
              </div>

              <div className="max-h-96 overflow-y-auto px-2">
                {currentStep === 1 ? (
                  <div className="space-y-4">
                    {/* Lead's full name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lead's full name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 outline-none focus:ring-0 bg-gray-200 focus:bg-white`}
                      />
                    </div>

                    {/* Mobile number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2"><span className="text-red-500">*</span> Lead's mobile number</label>
                      <div className='flex items-center gap-5'>
                        <select
                          name='countryCode'
                          value={formData.countryCode}
                          onChange={(e) => handleInputChange('countryCode', e.target.value)}
                          className='w-fit px-4 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-400   bg-gray-50'
                        >
                          {countryCodes.map((c) => (
                            <option key={c.flag} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          value={formData.contact}
                          onChange={(e) => { const v = e.target.value; 
                            if (/^\d*$/.test(v)){
                              if (formData.countryCode === '+91' && v.length > 10) return;
                              handleInputChange('contact', v); }}
                            }
                          placeholder="XXXXXXXXXX"
                          className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 outline-none focus:ring-0 ${isFieldInvalid('contact') || (attemptedNext && formData.contact && !isContactValid()) ? 'bg-red-100' : 'bg-gray-200 focus:bg-white'} ${invalidRing('contact')}`}
                        />
                      </div>
                      {attemptedNext && formData.contact && !isContactValid() && (
                        <p className="mt-1 text-xs text-red-500">Please enter a valid mobile number.</p>
                      )}
                    </div>

                    {/* Alternate Mobile number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Alternate mobile number</label>
                      <div className='flex items-center gap-5'>
                        <select
                          name='countryCode'
                          value={formData.altCountryCode}
                          onChange={(e) => handleInputChange('altCountryCode', e.target.value)}
                          className='w-fit px-4 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-400   bg-gray-50'
                        >
                          {countryCodes.map((c) => (
                            <option key={c.flag} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          value={formData.alternateContact}
                          onChange={(e) => { const v = e.target.value; 
                            if (/^\d*$/.test(v))
                            { if (formData.altCountryCode === '+91' && v.length > 10) return; 
                              handleInputChange('alternateContact', v); }}
                            }
                          placeholder="XXXXXXXXXX"
                          className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 outline-none focus:ring-0 ${!isContactValid() ? 'bg-red-100' : 'bg-gray-200 focus:bg-white'}`}
                        />
                      </div>
                      {attemptedNext && formData.alternateContact && !isContactValid() && (
                        <p className="mt-1 text-xs text-red-500">Please enter a valid mobile number.</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lead's email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john.doe@example.com"
                        className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 outline-none focus:ring-0 ${!isEmailValid() ? 'bg-red-100' : 'bg-gray-200 focus:bg-white'}`}
                      />
                      {attemptedNext && formData.email && !isEmailValid() && (
                        <p className="mt-1 text-xs text-red-500">Please enter a valid email address.</p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lead's Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Address Line 1, Address Line 2"
                        className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 outline-none focus:ring-0 bg-gray-200 focus:bg-white`}
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Ahmedabad"
                        className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 outline-none focus:ring-0 bg-gray-200 focus:bg-white`}
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2"><span className="text-red-500">*</span> Lead's country</label>
                      <div className="relative">
                        <select
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className={`w-full px-4 py-3 border-0 rounded text-gray-700 appearance-none outline-none focus:ring-0 ${isFieldInvalid('country') ? 'bg-red-100' : 'bg-gray-200 focus:bg-white'} ${invalidRing('country')}`}
                        >
                          <option value="">Select country</option>
                          {countryStatesData.map(country => (
                            <option key={country.name} value={country.name}>{country.name}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="text-red-500">*</span> State
                      </label>
                      <div className="relative">
                        <select
                          value={formData.state || ""}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          disabled={!formData.country || availableStates.length === 0}
                          className={`w-full px-4 py-3 border-0 rounded text-gray-700 appearance-none outline-none focus:ring-0 ${isFieldInvalid('state') ? 'bg-red-100' : (!formData.country || availableStates.length === 0) ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-200 focus:bg-white'} ${invalidRing('state')}`}
                        >
                          <option value="" disabled>
                            {!formData.country ? 'Select country first' : availableStates.length === 0 ? 'No states available' : 'Select a state'}
                          </option>
                          {availableStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lead's pincode</label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => { const v = e.target.value; if (/^\d*$/.test(v) && v.length <= 6) handleInputChange('pincode', v); }}
                        placeholder="380001"
                        className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 outline-none focus:ring-0 ${!isPincodeValid() ? 'bg-red-100' : 'bg-gray-200 focus:bg-white'}`}
                      />
                      {attemptedNext && formData.pincode && !isPincodeValid() && (
                        <p className="mt-1 text-xs text-red-500">Please enter a valid 6-digit pincode.</p>
                      )}
                    </div>

                    {/* GST (optional) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                      <input
                        type="text"
                        value={formData.gst}
                        onChange={(e) => handleInputChange('gst', e.target.value)}
                        placeholder="GST Number"
                        className={`w-full px-4 py-3 border-0 rounded text-gray-700 placeholder-gray-500 outline-none focus:ring-0 bg-gray-200 focus:bg-white`}
                      />
                    </div>

                    {/* Lead type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2"><span className="text-red-500">*</span> Lead type</label>
                      <div className="relative">
                        <select
                          value={formData.leadTypeId}
                          onChange={(e) => handleInputChange('leadTypeId', e.target.value)}
                          className={`w-full px-4 py-3 border-0 rounded text-gray-700 appearance-none outline-none focus:ring-0 ${isFieldInvalid('leadTypeId') ? 'bg-red-100' : 'bg-gray-200 focus:bg-white'} ${invalidRing('leadTypeId')}`}
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><span className="text-red-500">*</span> Lead source</label>
                      <div className="relative">
                        <select
                          value={formData.leadSourceId}
                          onChange={(e) => handleInputChange('leadSourceId', e.target.value)}
                          className={`w-full px-4 py-3 border-0 rounded text-gray-700 appearance-none outline-none focus:ring-0 ${isFieldInvalid('leadSourceId') ? 'bg-red-100' : 'bg-gray-200 focus:bg-white'} ${invalidRing('leadSourceId')}`}
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><span className="text-red-500">*</span> Lead status</label>
                      <div className="relative">
                        <select
                          value={formData.leadStatusId}
                          onChange={(e) => handleInputChange('leadStatusId', e.target.value)}
                          className={`w-full px-4 py-3 border-0 rounded text-gray-700 appearance-none outline-none focus:ring-0 ${isFieldInvalid('leadStatusId') ? 'bg-red-100' : 'bg-gray-200 focus:bg-white'} ${invalidRing('leadStatusId')}`}
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><span className="text-red-500">*</span> User</label>
                      <div className="relative">
                        <select
                          value={user.IsAdmin ? formData.userId : user.UserId}
                          onChange={(e) => handleInputChange('userId', e.target.value)}
                          disabled={!user.IsAdmin}
                          className={`w-full px-4 py-3 border-0 rounded text-gray-700 appearance-none outline-none focus:ring-0 ${isFieldInvalid('userId') ? 'bg-red-100' : user.IsAdmin ? 'bg-gray-200 focus:bg-white' : 'bg-gray-100 cursor-not-allowed'} ${invalidRing('userId')}`}
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Interested Item/product</label>
                      {formData.productMappings.map((product, index) => (
                        <div key={index} className="mb-4">
                          {(!product.ProductId && product.ProductName) ? (
                            <div className="space-y-2">
                              <div className="flex gap-2 items-start">
                                <div className="flex-1">
                                  <input type="text" value={product.ProductName || ''} disabled className="w-full px-4 py-3 bg-yellow-50 border border-yellow-300 rounded text-gray-700 cursor-not-allowed" />
                                  <p className="text-xs text-yellow-700 mt-1">⚠️ This is an IndiaMart product (not in our product list). You can keep it or replace it below.</p>
                                </div>
                                <input type="number" value={product.Quantity || 1} onChange={(e) => updateProduct(index, 'Quantity', e.target.value)} placeholder="Qty" min="1" className="w-20 px-3 py-3 bg-gray-200 border-0 rounded text-gray-700 outline-none focus:ring-0 focus:bg-white" />
                                {formData.productMappings.length > 1 && (
                                  <button onClick={() => removeProduct(index)} className="p-3 text-red-600 hover:text-red-800 transition-colors"><TrashIcon size={16} /></button>
                                )}
                              </div>
                              <div className="flex gap-2 items-center pl-2">
                                <span className="text-xs text-gray-600">Replace with:</span>
                                <div className="flex-1 relative">
                                  <select value="" onChange={(e) => { if (e.target.value) updateProduct(index, 'ProductId', e.target.value); }} className="w-full px-3 py-2 bg-gray-200 border-0 rounded text-sm text-gray-700 appearance-none outline-none focus:ring-0 focus:bg-white">
                                    <option value="">Select a product from our list</option>
                                    {productOptions.map(prod => (<option key={prod.productId} value={prod.productId}>{prod.productName}</option>))}
                                  </select>
                                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-2 items-start">
                              <div className="flex-1 relative">
                                <select value={product.ProductId || ''} onChange={(e) => updateProduct(index, 'ProductId', e.target.value)} className="w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 appearance-none outline-none focus:ring-0 focus:bg-white">
                                  <option value="">Select product</option>
                                  {productOptions.map(prod => (<option key={prod.productId} value={prod.productId}>{prod.productName}</option>))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                              </div>
                              <input type="number" value={product.Quantity} onChange={(e) => updateProduct(index, 'Quantity', e.target.value)} placeholder="Qty" className="w-20 px-3 py-3 bg-gray-200 border-0 rounded text-gray-700 outline-none focus:ring-0 focus:bg-white" />
                              {formData.productMappings.length > 1 && (
                                <button onClick={() => removeProduct(index)} className="p-3 text-red-600 hover:text-red-800 transition-colors"><TrashIcon size={16} /></button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}

                      <button onClick={addProduct} className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors mt-3">
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
                  <button onClick={handleNext} className="w-full py-3 bg-green-800 text-white rounded font-medium hover:bg-green-900 transition-colors">Next</button>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={handleBack} className="flex-1 py-3 bg-gray-300 text-gray-700 rounded font-medium hover:bg-gray-400 transition-colors">Back</button>
                    <button onClick={handleSubmit} disabled={!validateStep2()} className="flex-1 py-3 bg-green-800 text-white rounded font-medium hover:bg-green-900 transition-colors disabled:!bg-gray-400 disabled:!cursor-not-allowed">Update Lead</button>
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