import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUserType } from '../../api/userApi';
import { useAuth } from '../../context/AuthContext';
import EditUserTypeModal from './EditUserTypeModal';

const AllUserTypesTab = ({ refreshKey }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userTypes, setUserTypes] = useState([]);
    const [userTypeInfo, setUserTypeInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isEditUserTypeModalOpen, setIsEditUserTypeModalOpen] = useState(false);
    const dropdownRefs = useRef({});

    // Fetch user types data
    const getUserTypes = async () => {
        try {
            const res = await getAllUserType(user.UserTypeId);
            setUserTypes(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUserTypes();
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

    // Calculate pagination
    const totalRecords = userTypes.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const currentUserTypes = userTypes.slice(startIndex, endIndex);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [recordsPerPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRecordsPerPageChange = (records) => {
        setRecordsPerPage(records);
        setCurrentPage(1);
    };

    const toggleDropdown = (userTypeId) => {
        setActiveDropdown(activeDropdown === userTypeId ? null : userTypeId);
    };

    // Handle Edit Modal
    const handleEdit = (userType) => {
        setUserTypeInfo(userType.UserTypeId);
        setIsEditUserTypeModalOpen(true);
        setActiveDropdown(null);
    };
    
    // Handle details page
    const handleDetails = (userTypeId) => {
        navigate(`/userTypes/${userTypeId}/details`);
        setActiveDropdown(null);
    };

    return (
        <div className="h-full">
            {/* Table */}
            <div className="px-6 h-120 overflow-y-auto">
                <table className="w-full">
                    <thead className=" border-b border-b-color">
                        <tr>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">USER TYPE NAME</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                            <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-400">
                        {currentUserTypes.map((userType, index) => (
                            <tr key={userType.UserTypeId || index} className="hover:bg-gray-50 text-center">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex justify-start items-center gap-2">
                                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                                            <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium bg-blue-500">
                                                {userType.Name.charAt(0).toUpperCase()}
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">{userType.Name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium`}>
                                        {userType.IsAdmin === true ? "Admin" : "Limited"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${userType.IsActive
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {userType.IsActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="relative" ref={el => dropdownRefs.current[userType.UserTypeId] = el}>
                                        <button className="p-1 hover:bg-gray-100 rounded"
                                            onClick={() => toggleDropdown(userType.UserTypeId)}>
                                            <img src="/icons/Meatball_menu.png" alt="More options" className="w-4 h-1 opacity-50" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeDropdown === userType.UserTypeId && (
                                            <div className="absolute right-0 mt-1 w-24 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleDetails(userType.UserTypeId)}
                                                        className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        Details
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(userType)}
                                                        className="block w-full text-left px-4 py-2 text-sm hover:cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
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
            <div className="px-6 py-2">
                <div className="flex items-center justify-between">
                    <div className="w-100 flex justify-start items-center gap-2">
                        <span className="text-sm text-gray-600">Show</span>
                        <div className="w-15 flex items-center justify-center bg-btn-gray rounded-s-xs relative">
                            <select
                                value={recordsPerPage}
                                onChange={(e) => handleRecordsPerPageChange(Number(e.target.value))}
                                className="appearance-none w-full px-1 py-1 text-sm hover:cursor-pointer  "
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
                        className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:!opacity-50 disabled:!cursor-not-allowed"
                    >
                        &lt;
                    </button>
                    <span className="px-3 py-1 text-sm text-gray-700  border-x border-b-color">
                        {currentPage}/{totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 text-sm text-gray-700 disabled:!opacity-50 disabled:!cursor-not-allowed"
                    >
                        &gt;
                    </button>
                </div>
            </div>
            <EditUserTypeModal
                isOpen={isEditUserTypeModalOpen}
                onClose={() => setIsEditUserTypeModalOpen(false)}
                userData={userTypeInfo}
                onUserTypeEdited={getUserTypes}
            />
        </div>
    );
};

export default AllUserTypesTab;