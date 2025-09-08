import { useState, useEffect } from 'react';
import { updateImageByUserId } from '../api/userApi';

const ImageUploadModal = ({ isOpen, onClose, userData, onUserEdit }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState({
        profileImagePath: '',
        imageFile: null
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (userData) {
            setFormData({
                profileImagePath: userData.ProfileImagePath || '',
                imageFile: null
            });
            setPreviewImage(userData.ProfileImagePath || null);
        }
    }, [userData, isOpen]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (12MB limit)
            if (file.size > 12 * 1024 * 1024) {
                alert('File size must be less than 12MB');
                return;
            }

            // Validate file type
            if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
                alert('Only PNG and JPEG files are allowed');
                return;
            }

            setFormData(prev => ({
                ...prev,
                imageFile: file,
                profileImagePath: ''
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        // Revoke the object URL to prevent memory leaks
        if (previewImage && previewImage.startsWith('blob:')) {
            URL.revokeObjectURL(previewImage);
        }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = new FormData();

            if (formData.imageFile) {
                data.append('imageFile', formData.imageFile);
                data.append('id', userData.UserId);
            } else if (formData.profileImagePath) {
                data.append('profileImagePath', formData.profileImagePath);
            }

            const res = await updateImageByUserId(data);
            if (res?.status === 201) {
                alert("Image updated successfully:");
                onUserEdit();
                onClose();
            } else {
                console.warn(res.data.Message);
                alert(res.data.Message);
            }
        } catch (error) {
            console.error('Error updating profile image:', error);
            alert('Failed to update profile image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        handleRemoveImage();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className='bg-[#F0EEE4] rounded-sm shadow-xl w-150 max-w-[90vw] h-100'>
                {/* Header */}
                <div className="px-6 py-4 border-b flex items-center justify-between">
                    <h2 className='text-2xl font-bold'>Profile Picture</h2>
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-2 py-1 text-gray-600 font-medium rounded hover:bg-gray-50 transition-colors"
                        disabled={isLoading}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg bg-[#00000012] p-6 text-center min-h-[220px]">
                            <div className="flex flex-col items-center justify-center h-full">
                                {previewImage ? (
                                    <div className='relative'>
                                        <img
                                            src={previewImage}
                                            alt="Profile Preview"
                                            className="w-30 h-30 object-cover rounded-lg shadow-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute -top-2 -right-2 bg-green-800 hover:bg-green-900 text-white w-6 h-6 rounded-full cursor-pointer flex items-center justify-center text-sm font-bold transition-colors"
                                            disabled={isLoading}
                                        >
                                            ×
                                        </button>
                                        <div className="mt-4">
                                            <input
                                                type="file"
                                                id="imageFile"
                                                accept="image/png,image/jpeg,image/jpg"
                                                onChange={handleFileChange}
                                                hidden
                                                disabled={isLoading}
                                            />
                                            <label
                                                htmlFor="imageFile"
                                                className="text-sm text-green-800 underline hover:text-green-900 cursor-pointer"
                                            >
                                                Change Image
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    // Show upload option when no image
                                    <>
                                        <svg width="78" height="59" viewBox="0 0 78 59" fill="none" xmlns="http://www.w3.org/2000/svg" className='mb-5'>
                                            <path d="M6.71739 52.3506H5.08698C4.13482 52.3506 3.22499 51.9772 2.54999 51.3143C1.87825 50.6513 1.5 49.7502 1.5 48.8103V5.04025C1.5 4.1005 1.87826 3.19931 2.54999 2.53631C3.22173 1.87332 4.13474 1.5 5.08698 1.5H67.6956C68.6478 1.5 69.5609 1.87333 70.2326 2.53631C70.9044 3.1993 71.2826 4.10042 71.2826 5.04025V6.64942H72.913C73.8652 6.64942 74.7783 7.02275 75.45 7.68573C76.1218 8.34872 76.5 9.24984 76.5 10.1897V53.9598C76.5 54.8995 76.1217 55.8007 75.45 56.4637C74.7783 57.1267 73.8653 57.5 72.913 57.5H10.3044C9.35221 57.5 8.43913 57.1267 7.76738 56.4637C7.09564 55.8007 6.71739 54.8996 6.71739 53.9598V52.3506ZM69.326 35.0971V5.04099C69.326 4.61617 69.1565 4.20423 68.85 3.90169C68.5434 3.59916 68.1293 3.43181 67.6956 3.43181H5.08697C4.65327 3.43181 4.23916 3.60238 3.93263 3.90169C3.62611 4.20422 3.45655 4.61295 3.45655 5.04099V42.8213L22.7024 26.1981C23.0709 25.8795 23.622 25.8795 23.9905 26.1981L31.9177 33.0436L48.7895 18.4736C49.158 18.155 49.7091 18.155 50.0775 18.4736L69.3234 35.0935L69.326 35.0971ZM3.45673 45.3894V48.8137C3.45673 49.2385 3.62955 49.6505 3.93281 49.953C4.23934 50.2555 4.65346 50.4229 5.08715 50.4229H67.6958C68.1295 50.4229 68.5436 50.2523 68.8502 49.953C69.1567 49.6505 69.3262 49.2417 69.3262 48.8137V37.6654L49.435 20.4853L32.5633 35.0553C32.1948 35.3739 31.6437 35.3739 31.2752 35.0553L23.348 28.2098L3.45673 45.3894ZM8.67412 52.354V53.9631C8.67412 54.3912 8.84368 54.7999 9.1502 55.1024C9.45673 55.405 9.87085 55.5723 10.3045 55.5723H72.9132C73.3469 55.5723 73.761 55.4017 74.0675 55.1024C74.3741 54.7999 74.5436 54.3912 74.5436 53.9631V10.1898C74.5436 9.76171 74.3741 9.35299 74.0675 9.05045C73.761 8.74792 73.3469 8.58057 72.9132 8.58057H71.2828V48.8103C71.2828 49.7501 70.9045 50.6513 70.2328 51.3143C69.5611 51.9772 68.648 52.3506 67.6958 52.3506H8.67421L8.67412 52.354ZM15.5219 9.22735C18.9394 9.22735 21.7176 11.9662 21.7176 15.3423C21.7176 18.7152 18.9394 21.4573 15.5219 21.4573C12.1012 21.4573 9.32625 18.7152 9.32625 15.3423C9.32625 11.9662 12.1012 9.22735 15.5219 9.22735ZM15.5219 11.1584C13.1806 11.1584 11.2828 13.0347 11.2828 15.3423C11.2828 17.6531 13.1806 19.5262 15.5219 19.5262C17.86 19.5262 19.761 17.6531 19.761 15.3423C19.761 13.0347 17.8632 11.1584 15.5219 11.1584Z" fill="#0D4715" stroke="#0D4715" strokeWidth="2" />
                                        </svg>

                                        <input
                                            type="file"
                                            id="imageFile"
                                            accept="image/png,image/jpeg,image/jpg"
                                            onChange={handleFileChange}
                                            hidden
                                            disabled={isLoading}
                                        />
                                        <label
                                            htmlFor="imageFile"
                                            className="text-sm text-green-800 underline hover:text-green-900 cursor-pointer"
                                        >
                                            Upload from Device
                                        </label>
                                        <p className="text-xs text-gray-400 mt-2">Max file size: 12 MB (PNG, JPEG)</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6 flex gap-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full border border-green-900 text-green-900 py-3 px-4 rounded hover:bg-gray-50 text-sm font-medium transition-colors"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-green-800 text-white py-3 px-4 rounded text-sm font-medium hover:bg-green-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading || (!formData.imageFile && !formData.profileImagePath)}
                        >
                            {isLoading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImageUploadModal;