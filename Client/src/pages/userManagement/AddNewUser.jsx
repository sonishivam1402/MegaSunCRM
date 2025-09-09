import { useState, useEffect } from 'react';
import { createNewUser, getAllUserTypeNames } from '../../api/userApi';
import { toast } from 'react-toastify';

const AddUserModal = ({ isOpen, onClose, onUserCreated }) => {

  const [userTypeOptions, setUserTypeOptions] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const initialFormData = {
    name: '',
    contact: '',
    email: '',
    password: '',
    address: '',
    userTypeId: '',
    designation: '',
    gst: '',
    imageFile: null
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file select
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare FormData for multipart request
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await createNewUser(data);

      if (res?.status === 201) {
        toast.success("User created successfully:");
        onUserCreated();
        onClose();
        setFormData(initialFormData);
      } else {
        console.warn(res.data.Message);
        toast.error(res.data.Message);
      }
    } catch (err) {
      console.error("Error creating user:", err);
      if (err.response) {
        toast.error(err.response.data?.message || "Failed to create user.");
      }
      else if (err.request) {
        toast.error("No response from server. Please check your connection.");
      }
      else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData(prev => ({
      ...prev,
      imageFile: null,
      profileImagePath: ''
    }));

    // Clear the file input
    const fileInput = document.getElementById('imageFile');
    if (fileInput) {
      fileInput.value = '';
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-end z-50 overflow-y-auto">
      <div className="bg-[#F0EEE4] w-200 h-screen max-w-2xl">
        {/* Header */}
        <div className="p-3 px-6 border-b border-gray-200">
          <div className='flex items-center justify-between'>
            <h2 className="text-[32px] font-bold">Add New User</h2>
            <button
              onClick={() => { onClose(), setFormData(initialFormData) }}
              className="text-[#242425] text-xl font-light hover:cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13M1 1L13 13" stroke="#242425" stroke-width="1.5" stroke-linecap="round" />
              </svg>

            </button>
          </div>
          <p className="text-sm text-gray-600">Add in the details of the new user.</p>
        </div>

        {/* Content */}
        <div className="p-3 px-6">

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className='w-full xs: flex justify-between items-center gap-5'>

                {/* User's full name */}
                <div className='w-full'>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User's Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400   bg-gray-50"
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div className='w-full'>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="XXXXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400   bg-gray-50"
                    min={1000000000}
                    max={9999999999}
                    required
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400   bg-gray-50"
                    required
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400   bg-gray-50"
                    required
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400   bg-gray-50"
                  />
                </div>

                {/*GST Id*/}
                {/* <div className='w-full'>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Id
                  </label>
                  <input
                    type="text"
                    name="gst"
                    value={formData.gst}
                    onChange={handleInputChange}
                    placeholder="GST Id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400   bg-gray-50"
                    required
                  />
                </div> */}

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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400   bg-gray-50"
                    required
                  />
                </div>
              </div>

              <div className='w-full xs: flex justify-between items-center gap-5'>


                {/* User type */}
                <div className='w-full'>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Type
                  </label>
                  <div className="relative">
                    <select
                      name="userTypeId"
                      value={formData.userTypeId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none   text-gray-500 bg-gray-50"
                      required
                    >
                      <option value="">Select Role</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload User Profile Picture</label>
                <div className="border-2 border-dashed border-[#0000006E] rounded-sm bg-[#00000012] p-3 text-center h-40">
                  <div className="flex flex-col items-center justify-center h-full">
                    {previewImage ? (
                      // Show image with cancel option
                      <div className='relative'>
                        <img
                          src={previewImage}
                          alt="Profile Preview"
                          className="w-25 h-25 object-cover"
                        />
                        <div className="flex gap-3">
                          <input
                            type="file"
                            id="imageFile"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                            hidden
                          />
                          {/* <label
                          htmlFor="imageFile"
                          className="text-sm text-green-600 underline hover:text-green-700 cursor-pointer"
                        >
                          Change Image
                        </label> */}
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute -top-2 left-24 text-sm bg-green-900 text-white w-5 h-5 rounded-full cursor-pointer"
                          >
                            x
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Show upload option when no image
                      <>
                        <svg width="78" height="59" viewBox="0 0 78 59" fill="none" xmlns="http://www.w3.org/2000/svg" className='mb-5'>
                          <path d="M6.71739 52.3506H5.08698C4.13482 52.3506 3.22499 51.9772 2.54999 51.3143C1.87825 50.6513 1.5 49.7502 1.5 48.8103V5.04025C1.5 4.1005 1.87826 3.19931 2.54999 2.53631C3.22173 1.87332 4.13474 1.5 5.08698 1.5H67.6956C68.6478 1.5 69.5609 1.87333 70.2326 2.53631C70.9044 3.1993 71.2826 4.10042 71.2826 5.04025V6.64942H72.913C73.8652 6.64942 74.7783 7.02275 75.45 7.68573C76.1218 8.34872 76.5 9.24984 76.5 10.1897V53.9598C76.5 54.8995 76.1217 55.8007 75.45 56.4637C74.7783 57.1267 73.8653 57.5 72.913 57.5H10.3044C9.35221 57.5 8.43913 57.1267 7.76738 56.4637C7.09564 55.8007 6.71739 54.8996 6.71739 53.9598V52.3506ZM69.326 35.0971V5.04099C69.326 4.61617 69.1565 4.20423 68.85 3.90169C68.5434 3.59916 68.1293 3.43181 67.6956 3.43181H5.08697C4.65327 3.43181 4.23916 3.60238 3.93263 3.90169C3.62611 4.20422 3.45655 4.61295 3.45655 5.04099V42.8213L22.7024 26.1981C23.0709 25.8795 23.622 25.8795 23.9905 26.1981L31.9177 33.0436L48.7895 18.4736C49.158 18.155 49.7091 18.155 50.0775 18.4736L69.3234 35.0935L69.326 35.0971ZM3.45673 45.3894V48.8137C3.45673 49.2385 3.62955 49.6505 3.93281 49.953C4.23934 50.2555 4.65346 50.4229 5.08715 50.4229H67.6958C68.1295 50.4229 68.5436 50.2523 68.8502 49.953C69.1567 49.6505 69.3262 49.2417 69.3262 48.8137V37.6654L49.435 20.4853L32.5633 35.0553C32.1948 35.3739 31.6437 35.3739 31.2752 35.0553L23.348 28.2098L3.45673 45.3894ZM8.67412 52.354V53.9631C8.67412 54.3912 8.84368 54.7999 9.1502 55.1024C9.45673 55.405 9.87085 55.5723 10.3045 55.5723H72.9132C73.3469 55.5723 73.761 55.4017 74.0675 55.1024C74.3741 54.7999 74.5436 54.3912 74.5436 53.9631V10.1898C74.5436 9.76171 74.3741 9.35299 74.0675 9.05045C73.761 8.74792 73.3469 8.58057 72.9132 8.58057H71.2828V48.8103C71.2828 49.7501 70.9045 50.6513 70.2328 51.3143C69.5611 51.9772 68.648 52.3506 67.6958 52.3506H8.67421L8.67412 52.354ZM15.5219 9.22735C18.9394 9.22735 21.7176 11.9662 21.7176 15.3423C21.7176 18.7152 18.9394 21.4573 15.5219 21.4573C12.1012 21.4573 9.32625 18.7152 9.32625 15.3423C9.32625 11.9662 12.1012 9.22735 15.5219 9.22735ZM15.5219 11.1584C13.1806 11.1584 11.2828 13.0347 11.2828 15.3423C11.2828 17.6531 13.1806 19.5262 15.5219 19.5262C17.86 19.5262 19.761 17.6531 19.761 15.3423C19.761 13.0347 17.8632 11.1584 15.5219 11.1584Z" fill="#0D4715" stroke="#0D4715" stroke-width="2" />
                        </svg>

                        <input
                          type="file"
                          id="imageFile"
                          accept="image/png, image/jpeg"
                          onChange={handleFileChange}
                          hidden
                        />
                        <label
                          htmlFor="imageFile"
                          className="text-sm text-green-800 underline hover:text-green-900 cursor-pointer"
                        >
                          Upload from Device
                        </label>
                        <p className="text-xs text-gray-400 mt-2">Max file size: 12 mb (png, jpeg)</p>
                      </>
                    )}

                  </div>
                </div>
              </div>


              {/* Confirm button */}
              <div>
                <button
                  type="submit"
                  //onClick={handleSubmit}
                  className="w-full bg-green-800 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-green-900 hover:cursor-pointer  focus:ring-offset-2"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  );
};

export default AddUserModal;