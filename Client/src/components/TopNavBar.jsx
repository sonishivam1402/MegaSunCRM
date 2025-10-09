import { useState, useEffect, useRef } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import ChangePasswordModal from "./ChangePasswordModal";
import { updateUserPassword } from '../api/userApi';
import { toast } from 'react-toastify';

export default function TopNavbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        profileImage: ''
    });
    const dropdownRef = useRef(null);

    const { logout } = useAuth();

    const location = useLocation();
    const pageNames = {
        '/': 'Dashboard',
        '/users': 'User Management',
        '/users/:userId/details': 'User Management',
        '/userTypes/:userTypeId/details': 'User Management',
        '/products': 'Product Management',
        '/leads': 'My Leads',
        '/Followups': 'Follow-ups',
        '/quotation': 'Quotation',
        '/notifications': 'Notifications',
        '/orders': 'Orders'
    };

    let currentPageTitle =  'Dashboard';

    for (const path in pageNames) {
        if (matchPath({ path, exact: true }, location.pathname)) {
            currentPageTitle = pageNames[path];
            break;
        }
    }

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                setUserProfile({
                    name: user.Name || 'User Name',
                    email: user.Email || 'user@example.com',
                    profileImage: user.ProfileImagePath || ''
                });
            } catch (error) {
                console.error('Error parsing user data:', error);
                // Set default values if parsing fails
                setUserProfile({
                    name: 'User Name',
                    email: 'user@example.com',
                    profileImage: ''
                });
            }
        } else {
            console.error('Error parsing user data:', error);
            setUserProfile({
                name: 'User Name',
                email: 'user@example.com',
                profileImage: ''
            });
        }
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleChangePassword = () => {
        setIsDropdownOpen(false);
        setIsChangePasswordOpen(true);
    };

    const handleSignOut = () => {
        setIsDropdownOpen(false);
        logout();
        console.log('Sign Out clicked');
    };

    // Handle API call
    const handlePasswordSubmit = async (newPassword) => {
        try {
            console.log(newPassword);
            const res = await updateUserPassword(newPassword)
            console.log("res: ", res)
            if (res?.status === 201) {
                toast.success("Password updated successfully");
                setIsChangePasswordOpen(false);
            } else {
                console.warn(res.data.MESSAGE);
                toast.error(res.data.MESSAGE);
            }
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="w-full  border-b">
            <div className="h-16 flex items-center justify-between px-6">
                {/* Left side - Page Title */}
                <div className="flex items-center">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {currentPageTitle}
                    </h1>
                </div>

                {/* Right side - Welcome message, Notifications and Profile */}
                <div className="flex items-center space-x-4">

                    {/* Notification Icon */}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 cursor-pointer">
                        <img
                            src="/icons/Notifications.png"
                            alt="Notifications"
                            className="w-[15px] h-[19px]"
                        />
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative flex-shrink-0" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                            {/* Dropdown Arrow */}
                            <img
                                src="/icons/Left_arrow.png"
                                alt="Dropdown"
                                className={`w-[8px] h-[13px] transition-transform duration-200 flex-shrink-0 ${isDropdownOpen ? 'rotate-90' : '-rotate-90'
                                    }`}
                            />
                        </button>

                        {/* Dropdown Menu - Fixed positioning */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-1 w-64 bg-[#f1f0e9] rounded-sm shadow-lg border border-gray-200 z-50">
                                {/* User Info Section */}
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                                            {userProfile.profileImage ? (
                                                <img
                                                    src={userProfile.profileImage}
                                                    alt="Profile"
                                                    className="w-12 h-12 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#0D4715' }}>
                                                    {userProfile.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {userProfile.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {userProfile.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-2">
                                    <button
                                        onClick={handleChangePassword}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Change Password
                                    </button>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Image */}
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                        {userProfile.profileImage ? (
                            <img
                                src={userProfile.profileImage}
                                alt="Profile"
                                className="w-12 h-12 object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#0D4715' }}>
                                {userProfile.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Change Password Modal */}
            <ChangePasswordModal
                isOpen={isChangePasswordOpen}
                onClose={() => setIsChangePasswordOpen(false)}
                onSubmit={handlePasswordSubmit}
            />
        </div>
    );
}