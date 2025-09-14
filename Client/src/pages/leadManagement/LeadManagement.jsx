import React, { useState } from 'react';
import LeadsTab from './LeadsTab';
import LeadTypeTab from './LeadTypeTab';
import LeadSourceTab from './LeadSourceTab';
import { LeadStatusTab } from './LeadStatusTab';
import AddIcon from '../../assets/icons/AddIcon';

const LeadManagement = () => {

    const [activeTab, setActiveTab] = useState('leads');
    
    const tabs = [
        { id: 'leads', label: 'All Leads', component: LeadsTab, btnLabel : "Create New Lead" },
        { id: 'leadTypes', label: 'Lead Types', component: LeadTypeTab, btnLabel : "Create New Type"  },
        { id: 'leadSources', label: 'Lead Sources', component: LeadSourceTab, btnLabel : "Create New Source"  },
        { id: 'leadStatus', label: 'Lead Status', component: LeadStatusTab, btnLabel : "Create New Status"  }
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
    
    return (
        <div className="flex flex-col h-full  relative">
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
                        <div>
                            <button className='p-2 border text-green-900 text-sm flex items-center gap-2'><AddIcon size={10}/> {tabs.find(tab => tab.id === activeTab)?.btnLabel}</button>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1">
                    {ActiveComponent && <ActiveComponent />}
                </div>
        </div>
    )
}

export default LeadManagement