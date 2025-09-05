import { useState, useEffect } from 'react';
import { createNewUser, getAllUserTypeNames } from '../../api/userApi';

const AddUserModal = ({ isOpen, onClose, onUserCreated }) => {

  const [userTypeOptions, setUserTypeOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    password: '',
    address: '',
    userTypeId: '',
    designation: '',
    gst: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getUserTypeNames = async () => {
    try {
      const res = await getAllUserTypeNames();
      setUserTypeOptions(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserTypeNames();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await createNewUser(formData);
      if (res?.status === 201) {
        alert("User created successfully:");
        onUserCreated();
        onClose();
      } else {
        console.warn(res.data.Message);
        alert(res.data.Message);
      }
    } catch (err) {
      console.error("Error creating user:", err);
      if (err.response) {
        alert(err.response.data?.message || "Failed to create user.");
      }
      else if (err.request) {
        alert("No response from server. Please check your connection.");
      }
      else {
        alert("An unexpected error occurred.");
      }
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-end z-50">
      <div className="bg-white w-200 h-screen max-w-2xl">
        {/* Header */}
        <div className="p-3 px-6 border-b border-gray-200">
          <div className='flex items-center justify-between'>
            <h2 className="text-2xl font-medium text-gray-900">Add new user</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-light"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 my-3">Add in the details of the new user.</p>
        </div>

        {/* Content */}
        <div className="p-3 px-6">

          <div className="space-y-6">

            <div className='w-full xs: flex justify-between items-center gap-5'>
              {/* User's full name */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User's full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>

              {/* Mobile Number */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="XXXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            <div className='w-full xs: flex justify-between items-center gap-5'>
              {/* Email Id */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Id
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>

              {/*Password*/}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            <div className='w-full xs: flex justify-between items-center gap-5'>
              {/* Designation */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Designation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>

              {/*GST Id*/}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GST Id
                </label>
                <input
                  type="text"
                  name="gst"
                  value={formData.gst}
                  onChange={handleInputChange}
                  placeholder="GST Id"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            <div className='w-full xs: flex justify-between items-center gap-5'>
              {/* Address */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="City, State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>

              {/* User type */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User type
                </label>
                <div className="relative">
                  <select
                    name="userTypeId"
                    value={formData.userTypeId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 bg-gray-50"
                  >
                    <option value="">Select role</option>
                    {userTypeOptions.map((op, index) => (
                      <option key={index} value={op.UserTypeId}>{op.Name}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Upload user profile pic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload user profile pic
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 py-6 text-center bg-gray-50">
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium text-gray-700 mb-1">Drop files here</p>
                  <p className="text-xs text-gray-500 mb-2">or</p>
                  <button
                    type="button"
                    className="text-sm text-green-600 underline hover:text-green-700"
                  >
                    Upload from Device
                  </button>
                  <p className="text-xs text-gray-400 mt-2">Max file size: 12 mb (png, jpeg)</p>
                </div>
              </div>
            </div>

            {/* Confirm button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default AddUserModal;