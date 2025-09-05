import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, getAllUserTypeNames } from '../../api/userApi';
import EditUserModal from './EditUserModal';

const AllUsersTab = ({ refreshKey }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [userTypeFilter, setUserTypeFilter] = useState('');
    const [userTypeOptions, setUserTypeOptions] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRefs = useRef({});

    const getUser = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res);
        } catch (err) {
            console.error(err);
        }
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
        getUser();
        getUserTypeNames();
    }, [refreshKey]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeDropdown && dropdownRefs.current[activeDropdown]) {
                if (!dropdownRefs.current[activeDropdown].contains(event.target)) {
                    setActiveDropdown(null);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdown]);

    // Filter users based on search and filters
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.Name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUserType = userTypeFilter === '' || user.UserType === userTypeFilter;
        const matchesStatus = statusFilter === '' ||
            (statusFilter === 'Active' && user.IsActive) ||
            (statusFilter === 'Inactive' && !user.IsActive);

        return matchesSearch && matchesUserType && matchesStatus;
    });

    // Calculate pagination
    const totalRecords = filteredUsers.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, userTypeFilter, statusFilter, recordsPerPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRecordsPerPageChange = (records) => {
        setRecordsPerPage(records);
        setCurrentPage(1);
    };

    const toggleDropdown = (userId) => {
        setActiveDropdown(activeDropdown === userId ? null : userId);
    };

    const handleEdit = (user) => {
        setUserInfo(user);
        setIsEditUserModalOpen(true);
        setActiveDropdown(null);
    };

    const handleDetails = (userId) => {
        navigate(`/users/${userId}/details`);
        setActiveDropdown(null);
    };

    return (
        <div className="h-full">
            {/* Filter Controls */}
            <div className="px-6 py-4">
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-2xs">
                        <img src="/icons/Search.png" alt="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
                        <input
                            type="text"
                            placeholder="Search user name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-btn-gray rounded-s-xs text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* User Type Filter */}
                    <div className="relative">
                        <select
                            value={userTypeFilter}
                            onChange={(e) => setUserTypeFilter(e.target.value)}
                            className="appearance-none bg-btn-gray rounded-s-xs px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">User type</option>
                            {userTypeOptions.map((op, index) => (
                                <option key={index} value={op.Name}>{op.Name}</option>
                            ))}
                        </select>
                        <img src="/icons/Dropdown.png" alt="Dropdown" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-2 pointer-events-none opacity-50" />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none bg-btn-gray rounded-s-xs px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <img src="/icons/Dropdown.png" alt="Dropdown" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-2 pointer-events-none opacity-50" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="px-6 h-100 overflow-y-auto">
                <table className="w-full ">
                    <thead className="bg-w-primary border-b border-b-color">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">MOBILE NUMBER</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL ADDRESS</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">USER TYPE</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                            <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="bg-w-primary divide-y divide-gray-400">
                        {currentUsers.map((user) => (
                            <tr key={user.UserId} className="hover:bg-gray-50 text-center">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex justify-start items-center gap-2">
                                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                                            {user.ProfileImage ? (
                                                <img
                                                    src={user.profileImage}
                                                    alt="Profile"
                                                    className="w-12 h-12 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium bg-g-secondary">
                                                    {user.Name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">{user.Name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.Contact}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.Email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.UserType}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${user.IsActive
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {user.IsActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="relative" ref={el => dropdownRefs.current[user.UserId] = el}>
                                        <button 
                                            className="p-1 hover:bg-gray-100 rounded"
                                            onClick={() => toggleDropdown(user.UserId)}
                                        >
                                            <img src="/icons/Meatball_menu.png" alt="More options" className="w-4 h-1 opacity-50" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeDropdown === user.UserId && (
                                            <div className="absolute right-0 mt-1 w-24 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleDetails(user.UserId)}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        Details
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Records per page and total count */}
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="w-100 flex justify-start items-center gap-2">
                        <span className="text-sm text-gray-600">Show</span>
                        <div className="w-15 flex items-center justify-center bg-btn-gray rounded-s-xs relative">
                            <select
                                value={recordsPerPage}
                                onChange={(e) => handleRecordsPerPageChange(Number(e.target.value))}
                                className="appearance-none w-full px-1 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <img src="/icons/Dropdown.png" alt="Dropdown" className="absolute right-2 ml-2 mt-0.5 w-4 h-2 pointer-events-none opacity-50" />
                        </div>
                        <span className="text-sm text-gray-600">records</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        Showing {startIndex + 1} to {Math.min(endIndex, totalRecords)} of {totalRecords} entries
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex item-centers justify-end px-6">
                <div className=" flex items-center gap-2 px-2 border border-b-color">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        &lt;
                    </button>
                    <span className="px-3 py-1 text-sm text-gray-700 border-x border-b-color">
                        {currentPage}/{totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        &gt;
                    </button>
                </div>
            </div>

            <EditUserModal
                isOpen={isEditUserModalOpen}
                onClose={() => setIsEditUserModalOpen(false)}
                userData={userInfo}
                onUserEdited={getUser}
            />

        </div>
    );
};

export default AllUsersTab;