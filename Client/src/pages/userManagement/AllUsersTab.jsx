import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, getAllUserTypeNames } from '../../api/userApi';
import EditUserModal from './EditUserModal';

const AllUsersTab = ({ refreshKey }) => {
    const navigate = useNavigate();
    
    // State management
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    
    // Filters
    const [userTypeFilter, setUserTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [userTypeOptions, setUserTypeOptions] = useState([]);
    
    // Modal and dropdown states
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRefs = useRef({});
    
    // Debounce timer ref
    const searchTimeoutRef = useRef(null);

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / pageSize);

    // Fetch users with pagination and search
    const fetchUsers = useCallback(async (search = '', page = 1, limit = 10) => {
        console.log('API CALL TRIGGERED:', {
            search: search,
            page: page,
            limit: limit,
            offset: (page - 1) * limit,
            timestamp: new Date().toISOString()
        });
        
        try {
            setLoading(true);
            const offset = (page - 1) * limit;
            const response = await getAllUsers({ 
                search: search, 
                limit: limit, 
                offset: offset 
            });
            
            // console.log('API RESPONSE:', {
            //     usersCount: response?.users?.length || 0,
            //     totalCount: response?.totalRecords?.[0]?.["Total Count"] || 0,
            //     timestamp: new Date().toISOString()
            // });
            
            // Handle the actual API response structure
            if (response && response.users) {
                setUsers(response.users);
                
                // Extract total count from the response structure
                const totalCount = response.totalRecords?.[0]?.["Total Count"] || 0;
                setTotalRecords(totalCount);
            } else {
                // If API returns array directly (fallback)
                setUsers(response || []);
                setTotalRecords(response?.length || 0);
            }
        } catch (err) {
            console.error('API ERROR:', err);
            setUsers([]);
            setTotalRecords(0);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch user types
    const getUserTypeNames = async () => {
        try {
            const res = await getAllUserTypeNames();
            setUserTypeOptions(res);
        } catch (err) {
            console.error('Error fetching user types:', err);
        }
    };

    // Debounced search function
    const debouncedSearch = useCallback((searchValue, page = 1, limit = pageSize) => {
        // console.log('SEARCH INPUT:', {
        //     searchValue: searchValue,
        //     length: searchValue.length,
        //     willTriggerAPI: searchValue.length >= 3,
        //     timestamp: new Date().toISOString()
        // });
        
        // Clear existing timeout
        if (searchTimeoutRef.current) {
            //console.log('CLEARING EXISTING TIMEOUT');
            clearTimeout(searchTimeoutRef.current);
        }

        // If search term is less than 3 characters, don't make any API call
        if (searchValue.length < 3) {
            console.log('NO API CALL - Less than 3 characters');
            return; // No API call for 1-2 characters
        }

        // Only set timeout and make API call if 3+ characters
        console.log('SETTING 1-SECOND TIMEOUT FOR SEARCH');
        searchTimeoutRef.current = setTimeout(() => {
            console.log('TIMEOUT COMPLETED - Making API call');
            fetchUsers(searchValue, page, limit);
        }, 1000);
    }, [pageSize, fetchUsers]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        // console.log('SEARCH CHANGE:', {
        //     oldValue: searchTerm,
        //     newValue: value,
        //     isEmpty: value === '',
        //     timestamp: new Date().toISOString()
        // });
        
        setSearchTerm(value);
        setPageNumber(1); // Reset to first page on search
        
        // If search is cleared (empty), fetch all users immediately
        if (value === '') {
            console.log('SEARCH CLEARED - Immediate API call for all users');
            fetchUsers('', 1, pageSize);
            return;
        }
        
        // Otherwise, use debounced search (only calls API for 3+ chars)
        debouncedSearch(value, 1, pageSize);
    };

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            // console.log('PAGE CHANGE:', {
            //     oldPage: pageNumber,
            //     newPage: page,
            //     searchTerm: searchTerm,
            //     timestamp: new Date().toISOString()
            // });
            
            setPageNumber(page);
            const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
            fetchUsers(currentSearch, page, pageSize);
        }
    };

    // Handle page size change
    const handlePageSizeChange = (newPageSize) => {
        // console.log('PAGE SIZE CHANGE:', {
        //     oldPageSize: pageSize,
        //     newPageSize: newPageSize,
        //     searchTerm: searchTerm,
        //     timestamp: new Date().toISOString()
        // });
        
        setPageSize(newPageSize);
        setPageNumber(1); // Reset to first page
        const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
        fetchUsers(currentSearch, 1, newPageSize);
    };

    // Initial data fetch
    useEffect(() => {
        console.log('INITIAL LOAD - Component mounted or refreshKey changed');
        fetchUsers('', 1, pageSize);
        getUserTypeNames();
    }, [refreshKey, fetchUsers, pageSize]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

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

    // Filter users client-side (for user type and status filters)
    const filteredUsers = users.filter(user => {
        const matchesUserType = userTypeFilter === '' || user.UserType === userTypeFilter;
        const matchesStatus = statusFilter === '' ||
            (statusFilter === 'Active' && user.IsActive) ||
            (statusFilter === 'Inactive' && !user.IsActive);

        return matchesUserType && matchesStatus;
    });

    // Dropdown and modal handlers
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

    const handleUserEdited = () => {
        const currentSearch = searchTerm.length >= 3 ? searchTerm : '';
        fetchUsers(currentSearch, pageNumber, pageSize);
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        const halfVisible = Math.floor(maxVisiblePages / 2);
        
        let startPage = Math.max(1, pageNumber - halfVisible);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        
        return pageNumbers;
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
                            placeholder="Search user name (min 3 chars)"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 bg-btn-gray rounded-s-xs text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {loading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                            </div>
                        )}
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
                <table className="w-full">
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
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                        <span className="ml-2">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.UserId} className="hover:bg-gray-50 text-center">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex justify-start items-center gap-2">
                                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                                                {user.ProfileImage ? (
                                                    <img
                                                        src={user.ProfileImage}
                                                        alt="Profile"
                                                        className="w-8 h-8 object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium bg-g-secondary">
                                                        {user.Name ? user.Name.charAt(0).toUpperCase() : '?'}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">{user.Name || 'N/A'}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.Contact || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.Email || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.UserType || 'N/A'}</td>
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Records per page and total count */}
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Show</span>
                        <div className="relative">
                            <select
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                className="appearance-none bg-btn-gray rounded-s-xs px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                            </select>
                            <img src="/icons/Dropdown.png" alt="Dropdown" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-2 pointer-events-none opacity-50" />
                        </div>
                        <span className="text-sm text-gray-600">records</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        Showing {totalRecords === 0 ? 0 : ((pageNumber - 1) * pageSize) + 1} to {Math.min(pageNumber * pageSize, totalRecords)} of {totalRecords} entries
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end px-6 pb-4">
                <div className="flex items-center border border-gray-300 rounded">
                    {/* Previous button */}
                    <button
                        onClick={() => handlePageChange(pageNumber - 1)}
                        disabled={pageNumber === 1 || loading}
                        className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                    >
                        <img src="/icons/Left_arrow.png" alt="Previous" className="w-2 h-3" />
                    </button>

                    {/* Current page info */}
                    <div className="px-4 py-2 text-sm text-gray-700 min-w-[60px] text-center">
                        {pageNumber}/{totalPages || 1}
                    </div>

                    {/* Next button */}
                    <button
                        onClick={() => handlePageChange(pageNumber + 1)}
                        disabled={pageNumber === totalPages || totalPages === 0 || loading}
                        className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border-l border-gray-300"
                    >
                        <img src="/icons/Right_arrow.png" alt="Previous" className="w-2 h-3" />
                    </button>
                </div>
            </div>

            <EditUserModal
                isOpen={isEditUserModalOpen}
                onClose={() => setIsEditUserModalOpen(false)}
                userData={userInfo}
                onUserEdited={handleUserEdited}
            />
        </div>
    );
};

export default AllUsersTab;