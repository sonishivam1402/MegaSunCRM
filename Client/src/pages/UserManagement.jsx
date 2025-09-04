import React, { useEffect, useState } from 'react';
import AddUserModal from '../components/AddNewUser';
import { getAllUsers } from '../api/userApi';

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [userTypeFilter, setUserTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [users, SetUsers] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await getAllUsers();
                SetUsers(res);
            } catch (err) {
                console.error(err);
            }
        };

        getUser();
    }, []);


    // const users = [
    //     {
    //         id: 1,
    //         name: 'Ramesh Patel',
    //         mobile: 'XXXXXXXXX',
    //         email: 'ramesh.patel@gmail.com',
    //         userType: 'Salesman',
    //         status: 'Active',
    //         avatar: 'RP'
    //     },
    //     {
    //         id: 2,
    //         name: 'Arjun Kumar',
    //         mobile: 'XXXXXXXXX',
    //         email: 'arjun.kumar@example.com',
    //         userType: 'Admin',
    //         status: 'Inactive',
    //         avatar: 'AK'
    //     },
    //     {
    //         id: 3,
    //         name: 'Neha Sharma',
    //         mobile: 'XXXXXXXXX',
    //         email: 'neha.sharma@example.com',
    //         userType: 'Salesman',
    //         status: 'Active',
    //         avatar: 'NS'
    //     },
    //     {
    //         id: 4,
    //         name: 'Rahul Singh',
    //         mobile: 'XXXXXXXXX',
    //         email: 'rahul.singh@example.com',
    //         userType: 'Salesman',
    //         status: 'Inactive',
    //         avatar: 'RS'
    //     },
    //     {
    //         id: 5,
    //         name: 'Priya Agarwal',
    //         mobile: 'XXXXXXXXX',
    //         email: 'priya.agarwal@example.com',
    //         userType: 'Admin',
    //         status: 'Active',
    //         avatar: 'PA'
    //     },
    //     {
    //         id: 6,
    //         name: 'Suresh Verma',
    //         mobile: 'XXXXXXXXX',
    //         email: 'suresh.verma@example.com',
    //         userType: 'Salesman',
    //         status: 'Active',
    //         avatar: 'SV'
    //     },
    //     {
    //         id: 7,
    //         name: 'Deepak Mishra',
    //         mobile: 'XXXXXXXXX',
    //         email: 'deepak.mishra@example.com',
    //         userType: 'Salesman',
    //         status: 'Active',
    //         avatar: 'DM'
    //     },
    //     {
    //         id: 8,
    //         name: 'Anita Bansal',
    //         mobile: 'XXXXXXXXX',
    //         email: 'anita.bansal@example.com',
    //         userType: 'Salesman',
    //         status: 'Active',
    //         avatar: 'AB'
    //     },
    //     {
    //         id: 9,
    //         name: 'Manish Patel',
    //         mobile: 'XXXXXXXXX',
    //         email: 'manish.patel@example.com',
    //         userType: 'Admin',
    //         status: 'Inactive',
    //         avatar: 'MP'
    //     },
    //     {
    //         id: 10,
    //         name: 'Sonia Rani',
    //         mobile: 'XXXXXXXXX',
    //         email: 'sonia.rani@example.com',
    //         userType: 'Salesman',
    //         status: 'Active',
    //         avatar: 'SR'
    //     }
    // ];

    return (
        <div className="bg-background-color min-h-screen ">
            {/* Controls Section */}
            <div className="p-4 bg-background-color  shadow-sm ">
                {/* Top Controls */}
                <div className="px-6 py-4 ">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium text-gray-900">All User</h2>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-background-color border border-green-900 text-sm font-medium text-green-900 hover:bg-gray-50 flex items-center gap-2">
                                <img
                                    src="/icons/Add.png"
                                    alt="Add"
                                    className="w-[12px] h-[12px]"
                                />
                                Add new user type
                            </button>
                            <button onClick={() => setIsAddUserModalOpen(true)} className="px-4 py-2 bg-background-color border border-green-900 text-sm font-medium text-green-900 hover:bg-gray-50 flex items-center gap-2">
                                <img
                                    src="/icons/Add.png"
                                    alt="Add"
                                    className="w-[12px] h-[12px]"
                                />
                                Add new user
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="px-6 py-4">
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-sm">
                            <img src="/icons/Search.png" alt="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
                            <input
                                type="text"
                                placeholder="Search user name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-b-color rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* User Type Filter */}
                        <div className="relative">
                            <select
                                value={userTypeFilter}
                                onChange={(e) => setUserTypeFilter(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">User type</option>
                                <option value="Admin">Admin</option>
                                <option value="Salesman">Salesman</option>
                            </select>
                            <img src="/icons/chevron-down.svg" alt="Dropdown" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none opacity-50" />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <img src="/icons/chevron-down.svg" alt="Dropdown" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none opacity-50" />
                        </div>

                        {/* Sort and Filter Icons */}
                        <div className="flex items-center gap-2 ml-auto">
                            <button className="p-2 hover:bg-gray-100 rounded">
                                <img src="/icons/sort.svg" alt="Sort" className="w-4 h-4 opacity-50" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded">
                                <img src="/icons/filter.svg" alt="Filter" className="w-4 h-4 opacity-50" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-background-color border-b border-b-color">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MOBILE NUMBER</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL ADDRESS</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USER TYPE</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="bg-background-color divide-y divide-gray-400">
                            {users.map((user) => (
                                <tr key={user.UserId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {/* Add Image Here */}
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
                                        <div className="relative">
                                            <button className="p-1 hover:bg-gray-100 rounded">
                                                <img src="/icons/more-horizontal.svg" alt="More options" className="w-5 h-5 opacity-50" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing 1 to 10 of 10 entries
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50">
                                &lt;
                            </button>
                            <span className="px-3 py-1 text-sm text-gray-700">1/5</span>
                            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            <AddUserModal
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
            />

        </div>
    );
};

export default UserManagement;