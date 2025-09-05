import React, { useEffect, useState } from 'react';
import { getAllUserType } from '../../api/userApi';
import { useAuth } from '../../context/AuthContext';

const AllUserTypesTab = () => {
    const {user} = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [userTypes, setUserTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

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
    }, []);

    // Filter user types based on search and filters
    const filteredUserTypes = userTypes.filter(userType => {
        const matchesSearch = userType.Name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === '' ||
            (statusFilter === 'Active' && userType.IsActive) ||
            (statusFilter === 'Inactive' && !userType.IsActive);

        return matchesSearch && matchesStatus;
    });

    // Calculate pagination
    const totalRecords = filteredUserTypes.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const currentUserTypes = filteredUserTypes.slice(startIndex, endIndex);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, recordsPerPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRecordsPerPageChange = (records) => {
        setRecordsPerPage(records);
        setCurrentPage(1);
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
                            placeholder="Search user type name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-btn-gray rounded-s-xs text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
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

                    {/* Sort and Filter Icons */}
                    {/* <div className="flex items-center gap-2 ml-auto">
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <img src="/icons/Sort.png" alt="Sort" className="w-4 h-5 opacity-50" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <img src="/icons/Filter.png" alt="Filter" className="w-4 h-5 opacity-50" />
                        </button>
                    </div> */}
                </div>
            </div>

            {/* Table */}
            <div className="px-6 h-100 overflow-y-auto">
                <table className="w-full">
                    <thead className="bg-w-primary border-b border-b-color">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">USER TYPE NAME</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                            <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="bg-w-primary divide-y divide-gray-400">
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
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                        userType.IsActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {userType.IsActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="relative">
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <img src="/icons/Meatball_menu.png" alt="More options" className="w-4 h-1 opacity-50" />
                                        </button>
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
                        className="px-2 py-1 text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllUserTypesTab;