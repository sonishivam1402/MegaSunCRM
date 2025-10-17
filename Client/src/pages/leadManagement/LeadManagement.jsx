import React, { useState } from 'react';
import LeadsTab from './LeadsTab';
import LeadTypeTab from './LeadTypeTab';
import LeadSourceTab from './LeadSourceTab';
import { LeadStatusTab } from './LeadStatusTab';
import AddIcon from '../../assets/icons/AddIcon';
import AddLeadTypeModal from './AddLeadTypeModal';
import AddLeadModal from './AddLeadModal';
import AddLeadSourceModal from './AddLeadSourceModal';
import AddLeadStatusModal from './AddLeadStatusModal';
import NewLeadsTab from './NewLeadsTab';
import OpenIcon from '../../assets/icons/OpenIcon';
import { exportLeads } from '../../api/leadApi';
import { useAuth } from '../../context/AuthContext';
import ImportLeadModal from './ImportLeadModal';

const LeadManagement = () => {

    const [activeTab, setActiveTab] = useState('leads');
    const [loading, setLoading] = useState(false);
    const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
    const [importLeadModalOpen, setImportLeadModalOpen] = useState(false);
    const [addTypeModalOpen, setAddTypeModalOpen] = useState(false);
    const [addStatusModalOpen, setAddStatusModalOpen] = useState(false);
    const [addSourceModalOpen, setAddSourceModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const { user, menus } = useAuth();

    const leadMenu = menus.find(item => item.Name === "My Leads");

    const handleNewCreatedData = () => {
        setRefreshKey(prev => prev + 1);
    };

    const handleExport = async () => {
        setLoading(true);
        try {
            const response = await exportLeads();
            const blob = response.data;

            // Try to read filename from Content-Disposition
            let filename = 'export_' + Date.now() + '.csv';
            const disp = response.headers?.['content-disposition'] || '';
            const m = /filename\*=UTF-8''([^;]+)|filename="([^"]+)"/i.exec(disp);
            if (m) filename = decodeURIComponent(m[1] || m[2]);

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');

            // Format as YYYYMMDD_HHMMSS
            const formatted =
                now.getFullYear() +
                pad(now.getMonth() + 1) +
                pad(now.getDate()) + '_' +
                pad(now.getHours()) +
                pad(now.getMinutes()) +
                pad(now.getSeconds());

            a.download = `export_leads_${formatted}.csv`;
            // a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'leads', label: 'All Leads', component: LeadsTab, btnLabel: "Create New Lead", openModal: () => setAddLeadModalOpen(true) },
        { id: 'newLeads', label: 'New Leads', component: NewLeadsTab, btnLabel: "Import New Lead", openModal: () => setImportLeadModalOpen(true) },
        { id: 'leadTypes', label: 'Lead Types', component: LeadTypeTab, btnLabel: "Create New Type", openModal: () => setAddTypeModalOpen(true) },
        { id: 'leadSources', label: 'Lead Sources', component: LeadSourceTab, btnLabel: "Create New Source", openModal: () => setAddSourceModalOpen(true) },
        { id: 'leadStatus', label: 'Lead Status', component: LeadStatusTab, btnLabel: "Create New Status", openModal: () => setAddStatusModalOpen(true) }
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
    const currentTab = tabs.find(tab => tab.id === activeTab);

    return (
        <div className="flex flex-col h-full relative">
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-900"></div>
                        <p className="text-gray-700 font-medium">Exporting leads...</p>
                    </div>
                </div>
            )}

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
                    <div className='flex justify-between items-center gap-2'>
                        {user.IsAdmin && (
                            <button
                                className='p-2 border text-green-900 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                                onClick={handleExport}
                                disabled={loading}
                            >
                                <OpenIcon size={10} className="-rotate-180" /> Export
                            </button>
                        )}
                        {leadMenu?.CreateAccess && (
                            <button
                                className='p-2 border text-green-900 text-sm flex items-center gap-2'
                                onClick={currentTab?.openModal}
                            >
                                {currentTab.btnLabel == "Import New Lead" ? <OpenIcon size={10} /> : <AddIcon size={10} />}    {currentTab?.btnLabel}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto">
                {ActiveComponent && <ActiveComponent refreshKey={refreshKey} />}
            </div>

            {/* All Modals */}
            {/* Add Lead Modal - Uncomment when you create this component */}
            {addLeadModalOpen && (
                <AddLeadModal
                    isOpen={addLeadModalOpen}
                    onClose={() => setAddLeadModalOpen(false)}
                    onSuccess={handleNewCreatedData}
                />
            )}

            {addTypeModalOpen && (
                <AddLeadTypeModal
                    isOpen={addTypeModalOpen}
                    onClose={() => setAddTypeModalOpen(false)}
                    onSuccess={handleNewCreatedData}
                />
            )}

            {/* Add Lead Source Modal - Uncomment when you create this component */}
            {addSourceModalOpen && (
                <AddLeadSourceModal
                    isOpen={addSourceModalOpen}
                    onClose={() => setAddSourceModalOpen(false)}
                    onSuccess={handleNewCreatedData}
                />
            )}

            {/* Add Lead Status Modal - Uncomment when you create this component */}
            {addStatusModalOpen && (
                <AddLeadStatusModal
                    isOpen={addStatusModalOpen}
                    onClose={() => setAddStatusModalOpen(false)}
                    onSuccess={handleNewCreatedData}
                />
            )}

            {importLeadModalOpen && (
                <ImportLeadModal
                    isOpen={importLeadModalOpen}
                    onClose={() => setImportLeadModalOpen(false)}
                    onSuccess={handleNewCreatedData}
                />
            )}

        </div>
    )
}

export default LeadManagement