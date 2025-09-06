import React, { useState, useEffect } from 'react';
import { getAllUserTypeNames, updateUserById } from '../../api/userApi';

const EditUserModal = ({ isOpen, onClose, userData, onUserEdited }) => {
  const [userTypeOptions, setUserTypeOptions] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    contact: '',
    email: '',
    userTypeId: '',
    designation: '',
    isActive: '',
    profileImagePath: '',
    imageFile: null
  });

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

  // Prefill form data when userData prop changes
  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData.UserId || '',
        name: userData.Name || '',
        contact: userData.Contact || '',
        email: userData.Email || '',
        userTypeId: userData.UserTypeId || '',
        designation: userData.Designation || '',
        isActive: userData.IsActive === true,
        profileImagePath: userData.profileImagePath || '',
        imageFile: null
      });

      // set preview image if already available
      if (userData.profileImagePath) {
        //console.log("image : ", userData.profileImagePath)
        setPreviewImage(userData.profileImagePath);
      }
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.contact || !formData.email || !formData.userTypeId || !formData.designation) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });

      const res = await updateUserById(formData.id, data);
      if (res?.status === 201) {
        alert("User updated successfully:");
        onUserEdited();
        onClose();
      } else {
        console.warn(res.data.Message);
        alert(res.data.Message);
      }
    } catch (err) {
      console.error("Error updating user:", err);
      if (err.response) {
        alert(err.response.data?.message || "Failed to update user.");
      } else if (err.request) {
        alert("No response from server. Please check your connection.");
      } else {
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
            <h2 className="text-2xl font-medium text-gray-900">Edit user</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-light"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 my-3">Edit the details of the user.</p>
        </div>

        {/* Content */}
        <div className="p-3 px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className='w-full flex justify-between items-center gap-5'>
              {/* User's full name */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">User's full name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="XXXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  required
                />
              </div>
            </div>

            <div className='w-full flex justify-between items-center gap-5'>
              {/* Email Id */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Id</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  required
                />
              </div>

              {/* Designation */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Designation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  required
                />
              </div>
            </div>

            <div className='w-full flex justify-between items-center gap-5'>
              {/* User type */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">User type</label>
                <select
                  name="userTypeId"
                  value={formData.userTypeId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  required
                >
                  <option value="">Select role</option>
                  {userTypeOptions.map((op, index) => (
                    <option key={index} value={op.UserTypeId}>{op.Name}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  name="isActive"
                  value={formData.isActive ? "true" : "false"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: e.target.value === "true", 
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            {/* Upload user profile pic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload user profile pic</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 py-6 text-center bg-gray-50 h-55">
                <div className="flex flex-col items-center justify-items-center h-full">
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full mb-3 object-cover"
                    />
                  )}
                  <input
                    type="file"
                    id="imageFile"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    hidden
                  />
                  <label
                    htmlFor="imageFile"
                    className="text-sm text-green-600 underline hover:text-green-700 cursor-pointer"
                  >
                    Upload from Device
                  </label>
                  <p className="text-xs text-gray-400 mt-2">Max file size: 12 mb (png, jpeg)</p>
                </div>
              </div>
            </div>

            {/* Update button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
