import { useEffect, useState, useCallback } from 'react';
import { getAllLeadSources, deleteLeadSource, updateLeadSource } from '../../api/leadApi';
import TrashIcon from '../../assets/icons/TrashIcon';
import EditIcon from '../../assets/icons/EditIcon';
import { toast } from 'react-toastify';
import CloseIcon from '../../assets/icons/CloseIcon';

const LeadSourceTab = () => {
    const [leadSources, setLeadSources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedLeadSource, setSelectedLeadSource] = useState(null);
    const [editingData, setEditingData] = useState({ Name: '', Status: true });
    const [saving, setSaving] = useState(false);

    const getLeadSources = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getAllLeadSources();
            setLeadSources(Array.isArray(res?.[0]) ? res[0] : []);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch lead sources. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getLeadSources();
    }, [getLeadSources]);

    // Delete actions
    const handleDeleteClick = (leadSource) => {
        setSelectedLeadSource(leadSource);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedLeadSource) return;
        setDeleting(true);
        try {
            await deleteLeadSource(selectedLeadSource.LeadSourceId);
            setSelectedLeadSource(null);
            setDeleteModalOpen(false);
            toast.success('Deleted Successfully.');
            await getLeadSources();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete lead source.');
        } finally {
            setDeleting(false);
        }
    };

    // Edit actions
    const handleEditClick = (leadSource) => {
        setSelectedLeadSource(leadSource);
        setEditingData({
            Name: leadSource.Name,
            Status: leadSource.Status,
        });
        setEditModalOpen(true);
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const confirmEdit = async () => {
        if (!selectedLeadSource) return;
        setSaving(true);
        try {
            const response = await updateLeadSource(selectedLeadSource.LeadSourceId, editingData);
            console.log(response)
            if (response.status === 201) {
                toast.success(response.data?.[0]?.Message || 'Updated Successfully.');
                setSelectedLeadSource(null);
                setEditModalOpen(false);
                await getLeadSources();
            } else if (response.status === 200) {
                toast.error('Failed to update lead source.');
            } else {
                toast.error(`Unexpected error (code ${response.status})`);
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="px-6 h-120 flex-1 overflow-y-auto">
                {loading && (
                    <div className="py-6 text-center text-gray-500">Loading...</div>
                )}
                {error && (
                    <div className="py-6 text-center text-red-600">{error}</div>
                )}
                {!loading && !error && (
                    <table className="w-full border-collapse">
                        <thead className="border-b border-b-color">
                            <tr>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lead Source Name
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {leadSources.length > 0 ? (
                                leadSources.map((source) => (
                                    <tr
                                        key={source.LeadSourceId}
                                        className="hover:bg-gray-50 text-center transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-start">
                                            <span className="text-sm font-medium text-gray-900">
                                                {source.Name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${source.Status
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {source.Status ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-3">
                                            <button
                                                aria-label="Delete lead source"
                                                className="p-1 hover:bg-gray-100 rounded"
                                                onClick={() => handleDeleteClick(source)}
                                            >
                                                <TrashIcon size={16} />
                                            </button>
                                            <button
                                                aria-label="Edit lead source"
                                                className="p-1 hover:bg-gray-100 rounded"
                                                onClick={() => handleEditClick(source)}
                                            >
                                                <EditIcon size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="text-center py-6 text-gray-500 italic"
                                    >
                                        No lead sources available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#f1f0e9] border rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Confirm Delete
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete{' '}
                            <span className="font-medium">
                                {selectedLeadSource?.Name}
                            </span>
                            ?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                                onClick={() => {
                                    setSelectedLeadSource(null);
                                    setDeleteModalOpen(false);
                                }}
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                onClick={confirmDelete}
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-end z-50">
                    <div className="bg-[#f1f0e9] rounded-lg shadow-lg p-6 w-full max-w-lg h-full flex flex-col">
                        <div className='flex justify-between items-center shrink-0 mb-4'>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Edit Lead Source
                            </h2>
                            <button
                                className="text-sm rounded bg-gray-200 hover:bg-gray-300"
                                onClick={() => {
                                    setSelectedLeadSource(null);
                                    setEditModalOpen(false);
                                }}
                                disabled={saving}
                            >
                                <CloseIcon/>
                            </button>
                        </div>
                        <div className="space-y-4 flex-1 border-t pt-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="Name"
                                    value={editingData.Name}
                                    onChange={handleEditChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="Status"
                                    checked={editingData.Status}
                                    onChange={handleEditChange}
                                    id="statusCheckbox"
                                />
                                <label htmlFor="statusCheckbox" className="text-sm text-gray-700">
                                    Active
                                </label>
                            </div>
                        </div>
                        <div className="mt-6 shrink-0">
                            <button
                                className="px-4 py-2 w-full text-sm rounded bg-green-800 text-white hover:bg-green-900 disabled:opacity-50"
                                onClick={confirmEdit}
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadSourceTab;