import React, { useState, useEffect } from 'react';
import { getLeadById, getLeadsDD } from '../../api/leadApi';
import { getAllProducts } from '../../api/productApi';
import { createQuotations } from '../../api/quotation';
import { toast } from 'react-toastify';
import countryStatesData from '../../utils/Country_States.json';
import { useEscapeKey } from '../../utils/useEscapeKey';

const AddNewQuotationModal = ({ isOpen, onClose, onSuccess, id }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingLeadData, setLoadingLeadData] = useState(false);

    // Validation states
    const [validationErrors, setValidationErrors] = useState({});

    // Step 1: Lead Details
    const [selectedLead, setSelectedLead] = useState(id || '');
    const [salesRepresentative, setSalesRepresentative] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const [quotationDate, setQuotationDate] = useState(today);
    const [leadOptions, setLeadOptions] = useState([]);
    const [leadData, setLeadData] = useState({});
    const [productData, setProductData] = useState([]);

    // Step 2: Billing Details (Auto-populated, view only)
    const [billingDetails, setBillingDetails] = useState({
        customerName: '',
        mobileNumber: '',
        gstNumber: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: ''
    });

    // Step 3: Shipping Details
    const [shippingDetails, setShippingDetails] = useState({
        companyName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
    });

    // Step 4: Payment & Tax Details
    const [quotationType, setQuotationType] = useState('domestic');
    const [currency, setCurrency] = useState('rupees');
    const [currencySymbol, setCurrencySymbol] = useState('₹');
    const [productOptions, setProductOptions] = useState([]);

    // Currency symbol mapping
    const currencySymbols = {
        rupees: '₹',
        dollar: '$',
        pound: '£',
        euro: '€'
    };

    // Item rows for step 4
    const [itemRows, setItemRows] = useState([{
        id: 1,
        productId: null,
        itemName: '',
        hsnCode: '',
        qty: '1',
        rate: '100',
        basicAmount: '100.00',
        discount: '10',
        tax: '18%',
        totalAmount: '106.20',
        description: '',
        isExternalProduct: false
    }]);
    const [expectedDispatchDays, setExpectedDispatchDays] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');
    const [notes, setNotes] = useState('');
    const [terms, setTerms] = useState('');
    const [taxFormat, setTaxFormat] = useState('SGST - CGST');
    const [roundOff, setRoundOff] = useState('0.00');

    const [availableStates, setAvailableStates] = useState([]);

    useEscapeKey(() => {
        if (isOpen) onClose();
    });

    // Update available states when shipping country changes
    useEffect(() => {
        if (shippingDetails.country) {
            const selectedCountry = countryStatesData.find(c => c.name === shippingDetails.country);
            if (selectedCountry && selectedCountry.states) {
                setAvailableStates(selectedCountry.states);
                // Reset state if it's not in the new country's states
                if (shippingDetails.state && !selectedCountry.states.includes(shippingDetails.state)) {
                    setShippingDetails(prev => ({ ...prev, state: '' }));
                }
            } else {
                setAvailableStates([]);
                setShippingDetails(prev => ({ ...prev, state: '' }));
            }
        }
    }, [shippingDetails.country]);

    // Validation helper functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobileNumber = (mobile) => {
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobile);
    };

    const validatePincode = (pincode) => {
        const pincodeRegex = /^\d{6}$/;
        return pincodeRegex.test(pincode);
    };

    // Clear specific field error
    const clearFieldError = (fieldName) => {
        setValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fieldName];
            return newErrors;
        });
    };

    const validateStep1 = () => {
        const errors = {};
        let isValid = true;

        if (!selectedLead) {
            errors.selectedLead = 'Please select a lead';
            isValid = false;
        }

        if (!quotationDate) {
            errors.quotationDate = 'Please select quotation date';
            isValid = false;
        }

        // Clear previous step 1 errors and set new ones
        setValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.selectedLead;
            delete newErrors.quotationDate;
            return { ...newErrors, ...errors };
        });
        return isValid;
    };

    const validateStep3 = () => {
        const errors = {};
        let isValid = true;

        // Required field validations
        if (!shippingDetails.companyName.trim()) {
            errors.companyName = 'Company name is required';
            isValid = false;
        }

        if (shippingDetails.email.trim() && !validateEmail(shippingDetails.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!shippingDetails.state) {
            errors.state = 'State is required';
            isValid = false;
        }

        if (shippingDetails.pincode && !validatePincode(shippingDetails.pincode)) {
            errors.pincode = 'Pincode must be 6 digits';
            isValid = false;
        }

        if (!shippingDetails.country.trim()) {
            errors.country = 'Country is required';
            isValid = false;
        }

        // Clear previous step 3 errors and set new ones
        setValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.companyName;
            delete newErrors.email;
            delete newErrors.address;
            delete newErrors.city;
            delete newErrors.state;
            delete newErrors.pincode;
            delete newErrors.country;
            return { ...newErrors, ...errors };
        });
        return isValid;
    };

    // Fetch leads for dropdown
    const fetchLeads = async () => {
        try {
            const response = await getLeadsDD();
            if (response && Array.isArray(response) && response.length >= 1) {
                setLeadOptions(response[0] || []);
            }
        } catch (err) {
            console.error('Error fetching leads:', err);
        }
    };

    // Fetch products for dropdown
    const getProducts = async () => {
        try {
            const res = await getAllProducts({ SearchTerm: '', PageNumber: 1, PageSize: 1000 });
            setProductOptions(res.data.items || []);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    // Initialize on modal open
    useEffect(() => {
        if (isOpen) {
            fetchLeads();
            getProducts();
            const indiaData = countryStatesData.find(c => c.name === 'India');
            if (indiaData && indiaData.states) {
                setAvailableStates(indiaData.states);
            }
        }
    }, [isOpen]);

    // Fetch lead data when lead is selected
    const getData = async (id) => {
        setLoadingLeadData(true);
        try {
            const response = await getLeadById(id);
            const lead = response[0][0];
            const products = response[1] || [];

            setLeadData(lead);
            setProductData(products);
            setSalesRepresentative(lead.AssignedTo || '');
            const addressParts = lead.LeadAddress ? lead.LeadAddress.split(", ") : [];

            setShippingDetails({
                companyName: lead.LeadName || '',
                email: lead.Email || '',
                address: lead.Address || '',
                city: addressParts[0] || '',
                state: addressParts[1] || '',
                pincode: lead.Pincode || '',
                country: lead.Country || 'India',
            });

            // Auto-populate item rows with products from lead
            if (products.length > 0) {
                const populatedItems = products.map((product, index) => {
                    const matchingProduct = productOptions.find(p => p.productId === product.ProductId);
                    const qty = product.Quantity || 1;
                    const rate = matchingProduct?.price || 100;
                    const basicAmount = qty * rate;
                    const gstTax = matchingProduct?.gstTax || 18;

                    return {
                        id: index + 1,
                        productId: product.ProductId || null,
                        itemName: product.ProductName || '',
                        hsnCode: '',
                        qty: qty.toString(),
                        rate: rate.toString(),
                        basicAmount: basicAmount.toFixed(2),
                        discount: '10',
                        tax: `${gstTax}%`,
                        totalAmount: '0.00',
                        description: '',
                        isExternalProduct: !product.ProductId && product.ProductName
                    };
                });
                setItemRows(populatedItems);

                // Recalculate totals for each row
                setTimeout(() => {
                    populatedItems.forEach(item => {
                        handleItemRowChange(item.id, 'qty', item.qty);
                    });
                }, 0);
            }
        } catch (error) {
            console.error('Error fetching lead:', error);
        } finally {
            setLoadingLeadData(false);
        }
    };

    useEffect(() => {
        if (selectedLead) {
            getData(selectedLead);
        }
    }, [selectedLead]);

    const handleNext = () => {
        if (currentStep === 1) {
            if (validateStep1()) {
                setCurrentStep(2);
            }
        } else if (currentStep === 2) {
            setCurrentStep(3);
        } else if (currentStep === 3) {
            if (validateStep3()) {
                setCurrentStep(4);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleItemRowChange = (id, field, value) => {

        // Validate quantity must be greater than 0
        if (field === 'qty') {
            const numValue = parseFloat(value);
            if (numValue <= 0) {
                toast.error('Quantity must be greater than 0');
                return;
            }
        }

        // Validate negative values for qty, rate, and discount
        if (['qty', 'rate', 'discount'].includes(field)) {
            const numValue = parseFloat(value);
            if (numValue < 0) {
                toast.error(`${field === 'qty' ? 'Quantity' : field === 'rate' ? 'Rate' : 'Discount'} cannot be negative`);
                return;
            }
        }

        setItemRows(prevRows => {
            return prevRows.map(row => {
                if (row.id !== id) return row;

                const updatedRow = { ...row, [field]: value };

                // Auto-populate price and GST when product is selected
                if (field === 'itemName' && value) {
                    const selectedProduct = productOptions.find(p => p.productName === value);
                    if (selectedProduct) {
                        updatedRow.productId = selectedProduct.productId;
                        updatedRow.rate = selectedProduct.price?.toString() || '100';
                        updatedRow.tax = `${selectedProduct.gstTax || 18}%`;
                        updatedRow.isExternalProduct = false;
                    }
                }

                // Recalculate amounts when qty, rate, discount, or tax changes
                if (['qty', 'rate', 'discount', 'tax', 'itemName'].includes(field)) {
                    const qty = parseFloat(updatedRow.qty) || 0;
                    const rate = parseFloat(updatedRow.rate) || 0;
                    const discountPercent = parseFloat(updatedRow.discount) || 0;
                    const taxPercent = parseFloat(updatedRow.tax.replace('%', '')) || 0;

                    // Step 1: Basic Amount = Qty × Rate
                    const basicAmount = qty * rate;
                    updatedRow.basicAmount = basicAmount.toFixed(2);

                    // Step 2: Discount = Basic Amount × (Discount % ÷ 100)
                    const discountAmount = basicAmount * (discountPercent / 100);

                    // Step 3: Net Amount (after discount) = Basic Amount – Discount
                    const netAmount = basicAmount - discountAmount;

                    // Step 4: Tax calculation
                    let taxAmount = 0;
                    if (quotationType === 'domestic') {
                        // Net Total × (GST % ÷ 100)
                        taxAmount = netAmount * (taxPercent / 100);
                    } else {
                        // International - No GST
                        taxAmount = 0;
                    }

                    // Step 5: Total Amount (Net Amount + Tax Amount)
                    const totalAmount = netAmount + taxAmount;
                    updatedRow.totalAmount = totalAmount.toFixed(2);
                }

                return updatedRow;
            });
        });
    };

    const handleAddItemRow = () => {
        setItemRows([...itemRows, {
            id: itemRows.length + 1,
            productId: null,
            itemName: '',
            hsnCode: '',
            qty: '1',
            rate: '100',
            basicAmount: '100.00',
            discount: '10',
            tax: '18%',
            totalAmount: '106.20',
            description: '',
            isExternalProduct: false
        }]);
    };

    const handleRemoveItemRow = (id) => {
        if (itemRows.length > 1) {
            setItemRows(itemRows.filter(row => row.id !== id));
        }
    };

    const calculateTotals = () => {
        // Step 1: Calculate Basic Amount (sum of all items: Qty × Rate)
        let basicAmount = 0;
        itemRows.forEach(row => {
            const qty = parseFloat(row.qty) || 0;
            const rate = parseFloat(row.rate) || 0;
            basicAmount += qty * rate;
        });

        // Step 2: Calculate Total Discount
        let totalDiscount = 0;
        itemRows.forEach(row => {
            const qty = parseFloat(row.qty) || 0;
            const rate = parseFloat(row.rate) || 0;
            const discountPercent = parseFloat(row.discount) || 0;
            const itemBasic = qty * rate;
            totalDiscount += itemBasic * (discountPercent / 100);
        });

        // Step 3: Net Total (after discount)
        const netTotal = basicAmount - totalDiscount;

        // Step 4: Tax Calculation
        let sgst = 0;
        let cgst = 0;
        let igst = 0;
        let taxAmount = 0;

        if (quotationType === 'domestic') {
            itemRows.forEach(row => {
                const qty = parseFloat(row.qty) || 0;
                const rate = parseFloat(row.rate) || 0;
                const discountPercent = parseFloat(row.discount) || 0;
                const itemBasic = qty * rate;
                const itemDiscount = itemBasic * (discountPercent / 100);
                const itemNetTotal = itemBasic - itemDiscount;

                const taxPercent = parseFloat(row.tax.replace('%', '')) || 0;

                if (taxFormat === 'SGST - CGST') {
                    // Case B: Intrastate Sale - Split equally between SGST and CGST
                    // CGST = Net Total × (GST % ÷ 200)
                    // SGST = Net Total × (GST % ÷ 200)
                    const itemCGST = itemNetTotal * (taxPercent / 200);
                    const itemSGST = itemNetTotal * (taxPercent / 200);
                    cgst += itemCGST;
                    sgst += itemSGST;
                } else {
                    // Case A: Interstate Sale - IGST only
                    // IGST = Net Total × (GST % ÷ 100)
                    const itemIGST = itemNetTotal * (taxPercent / 100);
                    igst += itemIGST;
                }
            });

            taxAmount = sgst + cgst + igst;
        } else {
            // International - No GST
            sgst = 0;
            cgst = 0;
            igst = 0;
            taxAmount = 0;
        }

        // Step 5: Grand Total = Net Total + Tax Amount + Round Off
        const roundOffValue = parseFloat(roundOff) || 0;
        const grandTotal = netTotal + taxAmount + roundOffValue;

        return {
            basicAmount: basicAmount.toFixed(2),
            discount: totalDiscount.toFixed(2),
            total: netTotal.toFixed(2),
            sgst: sgst.toFixed(2),
            cgst: cgst.toFixed(2),
            igst: igst.toFixed(2),
            taxAmount: taxAmount.toFixed(2),
            roundOff: roundOffValue.toFixed(2),
            grandTotal: grandTotal.toFixed(2)
        };
    };

    const totals = calculateTotals();

    const handleSubmit = async () => {
        setLoading(true);

        const invalidItems = itemRows.filter(row => {
            const rate = parseFloat(row.rate) || 0;
            return rate <= 0;
        });

        if (invalidItems.length > 0) {
            toast.error('All items must have a price greater than zero');
            setLoading(false);
            return;
        }

        try {
            const currencyMap = {
                'rupees': 'INR', 'dollar': 'USD', 'pound': 'GBP', 'euro': 'EUR'
            };

            const productMappings = JSON.stringify(itemRows.map(row => ({
                ProductId: row.productId,
                ProductName: row.itemName,
                HSNCode: row.hsnCode,
                Quantity: parseFloat(row.qty) || 0,
                Rate: parseFloat(row.rate) || 0,
                BasicAmount: parseFloat(row.basicAmount) || 0,
                Discount: parseFloat(row.discount) || 0,
                Tax: parseFloat(row.tax.replace('%', '')) || 0,
                TotalAmount: parseFloat(row.totalAmount) || 0,
                ItemDescription: row.description || ''
            })));

            const finalData = {
                leadId: selectedLead,
                quotationBy: leadData.AssignedTo || null,
                quotationDate: quotationDate,
                shippingCompanyName: shippingDetails.companyName,
                shippingEmailAddress: shippingDetails.email,
                shippingAddress: shippingDetails.address,
                shippingCity: shippingDetails.city,
                shippingState: shippingDetails.state || '',
                shippingPincode: shippingDetails.pincode,
                shippingCountry: shippingDetails.country,
                isDomestic: quotationType === 'domestic',
                currency: currencyMap[currency],
                expectedDispatchDays: parseInt(expectedDispatchDays) || null,
                paymentTerms: paymentTerms,
                notes: notes,
                terms: terms,
                taxFormat: quotationType === 'domestic' ? taxFormat : null,
                basicAmount: parseFloat(totals.basicAmount),
                discount: parseFloat(totals.discount),
                total: parseFloat(totals.total),
                sgst: parseFloat(totals.sgst),
                cgst: parseFloat(totals.cgst),
                igst: parseFloat(totals.igst),
                tax: parseFloat(totals.taxAmount),
                roundOff: parseFloat(roundOff) || 0,
                grandTotal: parseFloat(totals.grandTotal),
                finalAmount: parseFloat(totals.grandTotal),
                productMappings: productMappings
            };

            //console.log('Final Data to Submit:', finalData);
            const response = await createQuotations(finalData);
            if (response.status == 201) {
                toast.success(response.data.Message);
                onSuccess();
                onClose();
            }
            else {
                toast.error(response.data?.[0]?.Message || response.data?.Message || "Something went wrong");
            }
        } catch (error) {
            console.error('Error creating quotation:', error);
        } finally {
            setLoading(false);
        }
    };

    // Update currency when quotation type changes
    const handleQuotationTypeChange = (e) => {
        const newType = e.target.value;
        setQuotationType(newType);

        // If switching to international and currency is rupees, change to dollar
        if (newType === 'international' && currency === 'rupees') {
            setCurrency('dollar');
            setCurrencySymbol('$');
        }
        // If switching to domestic and currency is not rupees, change to rupees
        if (newType === 'domestic' && currency !== 'rupees') {
            setCurrency('rupees');
            setCurrencySymbol('₹');
        }
    };

    // Update currency and symbol
    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setCurrency(newCurrency);
        setCurrencySymbol(currencySymbols[newCurrency]);
    };

    if (!isOpen) return null;

    const renderStepIndicator = () => (
        <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3, 4].map((step, index) => (
                <React.Fragment key={step}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step < currentStep ? 'bg-[#0d4715] text-white' :
                        step === currentStep ? 'bg-[#0d4715] text-white ring-2 ring-[#0d4715] ring-offset-2' :
                            'bg-gray-300 text-gray-600'
                        }`}>
                        {step < currentStep ? '✓' : step}
                    </div>
                    {index < 3 && <div className="w-8 h-0.5 bg-gray-300"></div>}
                </React.Fragment>
            ))}
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Lead details</h3>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select lead *</label>
                <select
                    value={selectedLead}
                    onChange={(e) => {
                        setSelectedLead(e.target.value);
                        clearFieldError('selectedLead');
                    }}
                    className={`w-full px-4 py-3 bg-gray-200 rounded-md text-sm appearance-none cursor-pointer ${validationErrors.selectedLead ? 'border-2 border-red-500' : ''
                        }`}
                    disabled={loading}
                >
                    <option value="">Select a lead</option>
                    {leadOptions.map(lead => (
                        <option key={lead.LeadId} value={lead.LeadId}>{lead.Name}</option>
                    ))}
                </select>
                {validationErrors.selectedLead && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.selectedLead}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sales Representative</label>
                {loadingLeadData ? (
                    <div className="w-full px-4 py-3 bg-gray-200 rounded-md text-sm text-gray-500">
                        Loading...
                    </div>
                ) : (
                    <input
                        type="text"
                        value={salesRepresentative}
                        readOnly
                        className="w-full px-4 py-3 bg-gray-200 rounded-md text-sm text-gray-600 cursor-not-allowed"
                        placeholder="Auto-populated based on lead"
                    />
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quotation date *</label>
                <div className="relative" onClick={() => document.getElementById('quotationDate').showPicker()}>
                    <input
                        id='quotationDate'
                        type="date"
                        value={quotationDate}
                        onChange={(e) => {
                            setQuotationDate(e.target.value);
                            clearFieldError('quotationDate');
                        }}
                        className={`w-full px-4 py-3 bg-gray-200 rounded-md text-sm ${validationErrors.quotationDate ? 'border-2 border-red-500' : ''
                            }`}
                    />
                </div>
                {validationErrors.quotationDate && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.quotationDate}</p>
                )}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Billing details</h3>
            </div>

            {loadingLeadData ? (
                <div className="text-center py-8 text-gray-500">Loading billing details...</div>
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Customer name</label>
                            <input
                                type="text"
                                value={leadData.LeadName || ''}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-200 rounded-md text-sm text-gray-600 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile number</label>
                            <input
                                type="text"
                                value={leadData.LeadPhoneNumber || ''}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-200 rounded-md text-sm text-gray-600 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">GST number</label>
                        <input
                            type="text"
                            value={leadData.GSTNumber || ''}
                            readOnly
                            className="w-full px-4 py-3 bg-gray-200 rounded-md text-sm text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                        <input
                            type="email"
                            value={leadData.Email || ''}
                            readOnly
                            className="w-full px-4 py-3 bg-gray-200 rounded-md text-sm text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <textarea
                            value={leadData.Address || ''}
                            readOnly
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-200 rounded-md text-sm text-gray-600 cursor-not-allowed resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <input
                                type="text"
                                value={leadData.LeadAddress.split(", ")[0] || ''}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-200 rounded-md text-sm text-gray-600 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                            <input
                                type="text"
                                value={leadData.LeadAddress.split(", ")[1] || ''}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-200 rounded-md text-sm text-gray-600 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                            <input
                                type="text"
                                value={leadData.Pincode || ''}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-200 rounded-md text-sm text-gray-600 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                            <input
                                type="text"
                                value={leadData.Country || ''}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-200 rounded-md text-sm text-gray-600 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Shipping details</h3>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                    type="text"
                    value={shippingDetails.companyName}
                    onChange={(e) => {
                        setShippingDetails({ ...shippingDetails, companyName: e.target.value });
                        clearFieldError('companyName');
                    }}
                    placeholder="Company name"
                    className={`w-full px-4 py-3 bg-gray-200 rounded-md text-sm ${validationErrors.companyName ? 'border-2 border-red-500' : ''
                        }`}
                />
                {validationErrors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.companyName}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                <input
                    type="email"
                    value={shippingDetails.email}
                    onChange={(e) => {
                        setShippingDetails({ ...shippingDetails, email: e.target.value });
                        clearFieldError('email');
                    }}
                    placeholder="john.doe@gmail.com"
                    className={`w-full px-4 py-3 bg-gray-200 rounded-md text-sm ${validationErrors.email ? 'border-2 border-red-500' : ''
                        }`}
                />
                {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                    value={shippingDetails.address}
                    onChange={(e) => {
                        setShippingDetails({ ...shippingDetails, address: e.target.value });
                        clearFieldError('address');
                    }}
                    placeholder="Flat No., Street name, Landmark, Area"
                    rows={4}
                    className={`w-full px-4 py-3 bg-gray-200 rounded-md text-sm resize-none`}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                        type='text'
                        placeholder='City'
                        value={shippingDetails.city}
                        onChange={(e) => {
                            setShippingDetails({ ...shippingDetails, city: e.target.value });
                            clearFieldError('city');
                        }}
                        className={`w-full px-4 py-3 bg-gray-200 rounded-md text-sm`}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                    </label>
                    <div className="relative">
                        <select
                            value={shippingDetails.state || ""}
                            onChange={(e) => {
                                setShippingDetails({ ...shippingDetails, state: e.target.value });
                                clearFieldError('state');
                            }}
                            disabled={!shippingDetails.country || availableStates.length === 0}
                            className={`w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 appearance-none outline-none focus:ring-0 ${validationErrors.state ? 'border-2 border-red-500' : ''} ${(!shippingDetails.country || availableStates.length === 0) ? 'cursor-not-allowed opacity-60' : ''}`}
                        >
                            <option value="" disabled>
                                {!shippingDetails.country ? 'Select country first' : availableStates.length === 0 ? 'No states available' : 'Select a state'}
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
                    {validationErrors.state && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.state}</p>
                    )}
                </div>

            </div>

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                    </label>
                    <div className="relative">
                        <select
                            value={shippingDetails.country}
                            onChange={(e) => {
                                setShippingDetails({ ...shippingDetails, country: e.target.value });
                                clearFieldError('country');
                            }}
                            className={`w-full px-4 py-3 bg-gray-200 border-0 rounded text-gray-700 appearance-none outline-none focus:ring-0 ${validationErrors.country ? 'border-2 border-red-500' : ''}`}
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
                    {validationErrors.country && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.country}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    <input
                        type="text"
                        value={shippingDetails.pincode}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setShippingDetails({ ...shippingDetails, pincode: value });
                            clearFieldError('pincode');
                        }}
                        placeholder="123456"
                        className={`w-full px-4 py-3 bg-gray-200 rounded-md text-sm ${validationErrors.pincode ? 'border-2 border-red-500' : ''}`}
                    />
                    {validationErrors.pincode && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.pincode}</p>
                    )}
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6 pr-2">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment & Tax Details</h3>
            </div>

            {/* Quotation Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Quotation Type *</label>
                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="domestic"
                            checked={quotationType === 'domestic'}
                            onChange={handleQuotationTypeChange}
                            className="w-4 h-4 text-[#0d4715]"
                        />
                        <span className="text-sm">Domestic</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="international"
                            checked={quotationType === 'international'}
                            onChange={handleQuotationTypeChange}
                            className="w-4 h-4 text-[#0d4715]"
                        />
                        <span className="text-sm">International</span>
                    </label>
                </div>
            </div>

            {/* Currency Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Currency *</label>
                <div className="flex items-center gap-6">
                    {['Rupees', 'Dollar', 'Pound', 'Euro'].map(curr => {
                        const currValue = curr.toLowerCase();
                        const isDomestic = quotationType === 'domestic';
                        const isDisabled = (isDomestic && currValue !== 'rupees') ||
                            (!isDomestic && currValue === 'rupees');

                        return (
                            <label
                                key={curr}
                                className={`flex items-center gap-2 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                            >
                                <input
                                    type="radio"
                                    value={currValue}
                                    checked={currency === currValue}
                                    onChange={handleCurrencyChange}
                                    disabled={isDisabled}
                                    className="w-4 h-4 text-[#0d4715] disabled:cursor-not-allowed"
                                />
                                <span className="text-sm">{curr}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Item Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-3 py-2 text-left font-medium text-gray-700">Item Name</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">HSN Code</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">Qty</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">Rate</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">Basic Amount</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">Discount (%)</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">Tax</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">Total Amount</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemRows.map((row) => (
                            <tr key={row.id} className="border-b">
                                <td className="px-3 py-2">
                                    {row.isExternalProduct ? (
                                        <div className="space-y-1">
                                            <input
                                                type="text"
                                                value={row.itemName}
                                                disabled
                                                className="w-full px-2 py-1 bg-yellow-50 border border-yellow-300 rounded text-sm cursor-not-allowed"
                                            />
                                            <p className="text-xs text-yellow-700">⚠️ External product</p>
                                            <select
                                                value=""
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        handleItemRowChange(row.id, 'itemName', e.target.value);
                                                    }
                                                }}
                                                className="w-full px-2 py-1 bg-gray-100 rounded text-xs"
                                            >
                                                <option value="">Replace with product from list...</option>
                                                {productOptions.map(product => (
                                                    <option key={product.productId} value={product.productName}>{product.productName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <select
                                            value={row.itemName}
                                            onChange={(e) => handleItemRowChange(row.id, 'itemName', e.target.value)}
                                            className="w-full px-2 py-1 bg-gray-100 rounded text-sm"
                                        >
                                            <option value="">Select item</option>
                                            {productOptions.map(product => (
                                                <option key={product.productId} value={product.productName}>
                                                    {product.productName}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </td>
                                <td className="px-3 py-2">
                                    <input
                                        type="text"
                                        placeholder="HSN Code"
                                        value={row.hsnCode}
                                        onChange={(e) => handleItemRowChange(row.id, 'hsnCode', e.target.value)}
                                        className="w-20 px-2 py-1 bg-gray-100 rounded text-sm"
                                    />
                                </td>
                                <td className="px-3 py-2">
                                    <input
                                        type="number"
                                        value={row.qty}
                                        onChange={(e) => handleItemRowChange(row.id, 'qty', e.target.value)}
                                        className="w-16 px-2 py-1 bg-gray-100 rounded text-sm"
                                    />
                                </td>
                                <td className="px-3 py-2">
                                    <input
                                        type="number"
                                        value={row.rate}
                                        onChange={(e) => handleItemRowChange(row.id, 'rate', e.target.value)}
                                        className="w-20 px-2 py-1 bg-gray-100 rounded text-sm"
                                    />
                                </td>
                                <td className="px-3 py-2 text-gray-700">{row.basicAmount}</td>
                                <td className="px-3 py-2">
                                    <input
                                        type="number"
                                        value={row.discount}
                                        onChange={(e) => handleItemRowChange(row.id, 'discount', e.target.value)}
                                        className="w-16 px-2 py-1 bg-gray-100 rounded text-sm"
                                    />
                                </td>
                                <td className="px-3 py-2">
                                    <select
                                        value={row.tax}
                                        onChange={(e) => handleItemRowChange(row.id, 'tax', e.target.value)}
                                        className="w-20 px-2 py-1 bg-gray-100 rounded text-sm"
                                    >
                                        <option>0%</option>
                                        <option>5%</option>
                                        <option>12%</option>
                                        <option>18%</option>
                                        <option>28%</option>
                                    </select>
                                </td>
                                <td className="px-3 py-2 text-gray-700 font-medium">{row.totalAmount}</td>
                                <td className="px-3 py-2">
                                    {itemRows.length > 1 && (
                                        <button
                                            onClick={() => handleRemoveItemRow(row.id)}
                                            className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-xs"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={handleAddItemRow}
                    className="mt-3 px-4 py-2 bg-[#22c55e] text-white rounded-md text-sm hover:bg-[#16a34a]"
                >
                    Add More Item
                </button>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Dispatch Days</label>
                    <input
                        type="text"
                        value={expectedDispatchDays}
                        onChange={(e) => setExpectedDispatchDays(e.target.value)}
                        placeholder="Expected Dispatch Days"
                        className="w-full px-3 py-2 bg-gray-100 rounded text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms *</label>
                    <input
                        type="text"
                        value={paymentTerms}
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        placeholder="Payment Terms"
                        className="w-full px-3 py-2 bg-gray-100 rounded text-sm"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notes"
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-100 rounded text-sm resize-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Terms</label>
                <input type="text"
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 rounded text-sm"
                />
            </div>

            {/* Total Amount Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Total Amount Details</h4>

                {quotationType === 'domestic' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Tax Format *</label>
                        <select
                            value={taxFormat}
                            onChange={(e) => setTaxFormat(e.target.value)}
                            className="w-full px-3 py-2 bg-white border rounded text-sm"
                        >
                            <option>SGST - CGST</option>
                            <option>IGST</option>
                        </select>
                    </div>
                )}

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Basic Amount ({currencySymbol})</span>
                        <input type="text" value={totals.basicAmount} readOnly className="w-40 px-3 py-1 bg-gray-100 rounded text-right" />
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">(-) Discount ({currencySymbol})</span>
                        <input type="text" value={totals.discount} readOnly className="w-40 px-3 py-1 bg-gray-100 rounded text-right" />
                    </div>
                    <div className="flex justify-between font-medium">
                        <span>Total ({currencySymbol})</span>
                        <input type="text" value={totals.total} readOnly className="w-40 px-3 py-1 bg-gray-100 rounded text-right" />
                    </div>

                    {quotationType === 'domestic' && (
                        <>
                            {taxFormat === 'SGST - CGST' ? (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Add SGST ({currencySymbol})</span>
                                        <input type="text" value={totals.sgst} readOnly className="w-40 px-3 py-1 bg-gray-100 rounded text-right" />
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Add CGST ({currencySymbol})</span>
                                        <input type="text" value={totals.cgst} readOnly className="w-40 px-3 py-1 bg-gray-100 rounded text-right" />
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Add IGST ({currencySymbol})</span>
                                    <input type="text" value={totals.igst} readOnly className="w-40 px-3 py-1 bg-gray-100 rounded text-right" />
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax Amount ({currencySymbol})</span>
                                <input type="text" value={totals.taxAmount} readOnly className="w-40 px-3 py-1 bg-gray-100 rounded text-right" />
                            </div>
                        </>
                    )}

                    <div className="flex justify-between">
                        <span className="text-gray-600">Round Off ({currencySymbol})</span>
                        <input
                            type="number"
                            step="0.01"
                            value={roundOff}
                            onChange={(e) => setRoundOff(e.target.value)}
                            className="w-40 px-3 py-1 bg-white border rounded text-right"
                        />
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t">
                        <span>Grand Total ({currencySymbol})</span>
                        <input type="text" value={totals.grandTotal} readOnly className="w-40 px-3 py-1 bg-gray-200 rounded text-right font-bold" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-end z-50">
            <div className="bg-[#f8f7f2] rounded-lg shadow-xl w-full max-w-6xl h-screen flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-300 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={currentStep === 1 ? onClose : handleBack}
                            className="p-1 hover:bg-gray-200 rounded"
                            disabled={loading || loadingLeadData}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">New quotation</h2>
                            <p className="text-sm text-gray-600">Add in the details of the new quotation</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-200 rounded"
                        disabled={loading}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6 flex-1 overflow-y-auto">
                    {renderStepIndicator()}

                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 uppercase">STEP-{currentStep}</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            {currentStep === 1 && 'Lead details'}
                            {currentStep === 2 && 'Billing details'}
                            {currentStep === 3 && 'Shipping details'}
                            {currentStep === 4 && 'Payment & Tax Details'}
                        </h3>
                    </div>

                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-300 flex-shrink-0">
                    {currentStep < 4 ? (
                        <button
                            onClick={handleNext}
                            disabled={loading || loadingLeadData}
                            className="w-full py-3 bg-[#0d4715] text-white rounded-md font-medium hover:bg-[#0a3811] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingLeadData ? 'Loading...' : 'Next'}
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-3 bg-[#0d4715] text-white rounded-md font-medium hover:bg-[#0a3811] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Confirm'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddNewQuotationModal;