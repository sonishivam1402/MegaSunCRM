import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // Uncomment when using React Router

export default function TopNavbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        profileImage: ''
    });
    const dropdownRef = useRef(null);

    // For demonstration - you can replace this with actual route logic
    const location = useLocation(); // Uncomment when using React Router
    const pageNames = {
        '/': 'Dashboard',
        '/usermanagement': 'User Management',
        '/users/:userId/details': 'User Management',
        '/analytics': 'Analytics',
        '/reports': 'Reports',
        '/settings': 'Settings',
        '/profile': 'Profile',
        '/notifications': 'Notifications'
    };
    const currentPageTitle = pageNames[location.pathname] || 'Dashboard'; // Uncomment when using React Router
    //const currentPageTitle = 'Dashboard'; // Remove this line when using React Router

    // Load user data from localStorage
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
            // Set default values for demo
            setUserProfile({
                name: 'Dhruvil Soni',
                email: 'dhruvil0811@gmail.com',
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
        // Add your change password logic here
        console.log('Change Password clicked');
    };

    const handleSignOut = () => {
        setIsDropdownOpen(false);
        // Add your sign out logic here
        localStorage.removeItem('user');
        console.log('Sign Out clicked');
    };

    return (
        <div className="w-full bg-w-primary border-b border-b-color">
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
                        
                        {/* Profile Image
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                            {userProfile.profileImage ? (
                                <img
                                    src={userProfile.profileImage}
                                    alt="Profile"
                                    className="w-10 h-10 object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#0D4715' }}>
                                    {userProfile.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div> */}

                        {/* Dropdown Menu - Fixed positioning */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
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
        </div>
    );
}