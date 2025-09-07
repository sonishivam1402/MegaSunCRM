import React, { useState } from 'react';
import AllUsersTab from './AllUsersTab';
import AllUserTypesTab from './AllUserTypesTab';
import AddUserModal from './AddNewUser';
import AddNewUserTypeModal from './AddNewUserType';

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isAddUserTypeModalOpen, setIsAddUserTypeModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleNewCreatedData = () => {
        setRefreshKey(prev => prev + 1);
    };

    const tabs = [
        { id: 'users', label: 'All Users', component: AllUsersTab },
        { id: 'userTypes', label: 'All User Types', component: AllUserTypesTab }
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

    return (
        <div className=" h-full">
            <div className="h-full p-4  relative">
                {/* Header with Tabs and Action Buttons */}
                <div className="px-6 py-4 flex-shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Tabs */}
                        <div className="flex items-center gap-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`text-lg font-medium transition-colors duration-200 pb-2 hover:cursor-pointer border-b-2 ${activeTab === tab.id
                                            ? 'text-gray-900 border-green-900'
                                            : 'text-gray-500 border-transparent hover:text-gray-700'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setIsAddUserTypeModalOpen(true)}
                                className="px-4 py-2  border border-green-900 text-sm font-medium text-green-900 hover:bg-[#00000012] hover:cursor-pointer flex items-center gap-2"
                            >
                                <img
                                    src="/icons/Add.png"
                                    alt="Add"
                                    className="w-[12px] h-[12px]"
                                />
                                Add new user type
                            </button>
                            <button
                                onClick={() => setIsAddUserModalOpen(true)}
                                className="px-4 py-2  border border-green-900 text-sm font-medium text-green-900 hover:bg-[#00000012] hover:cursor-pointer flex items-center gap-2"
                            >
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

                {/* Tab Content */}
                <div className="flex-1">
                    {ActiveComponent && <ActiveComponent refreshKey={refreshKey}/>}
                </div>
            </div>

            {/* Modals */}
            <AddUserModal
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                onUserCreated = {handleNewCreatedData}
            />

            <AddNewUserTypeModal
                isOpen={isAddUserTypeModalOpen}
                onClose={() => setIsAddUserTypeModalOpen(false)}
                onUserCreated = {handleNewCreatedData}
            />
        </div>
    );
};

export default UserManagement;