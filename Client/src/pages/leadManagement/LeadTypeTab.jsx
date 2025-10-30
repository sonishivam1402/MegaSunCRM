import { useEffect, useState, useCallback } from 'react';
import { getAllLeadTypes, deleteLeadType, updateLeadType } from '../../api/leadApi';
import TrashIcon from '../../assets/icons/TrashIcon';
import EditIcon from '../../assets/icons/EditIcon';
import { toast } from 'react-toastify';
import CloseIcon from '../../assets/icons/CloseIcon';
import dayjs from "dayjs";

const LeadTypeTab = ({ refreshKey }) => {
    const [leadTypes, setLeadTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedLeadType, setSelectedLeadType] = useState(null);
    const [editingData, setEditingData] = useState({ Name: '', Status: true });
    const [saving, setSaving] = useState(false);

    const getLeadTypes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getAllLeadTypes();
            setLeadTypes(Array.isArray(res?.[0]) ? res[0] : []);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch lead types. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getLeadTypes();
    }, [getLeadTypes, refreshKey]);

    // Delete actions
    const handleDeleteClick = (leadType) => {
        setSelectedLeadType(leadType);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedLeadType) return;
        setDeleting(true);
        try {
            await deleteLeadType(selectedLeadType.LeadTypeId);
            setSelectedLeadType(null);
            setDeleteModalOpen(false);
            toast.success('Deleted Successfully.');
            await getLeadTypes();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete lead type.');
        } finally {
            setDeleting(false);
        }
    };

    // Edit actions
    const handleEditClick = (leadType) => {
        setSelectedLeadType(leadType);
        setEditingData({
            Name: leadType.Name,
            Status: leadType.Status,
        });
        setEditModalOpen(true);
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : name === "Status" ? value === "true" : value,
        }));
    };

    const confirmEdit = async () => {
        if (!selectedLeadType) return;
        setSaving(true);
        try {
            const response = await updateLeadType(selectedLeadType.LeadTypeId, editingData);
            // console.log(response)
            if (response.status === 201) {
                toast.success(response.data?.[0]?.Message || 'Updated Successfully.');
                setSelectedLeadType(null);
                setEditModalOpen(false);
                await getLeadTypes();
            } else if (response.status === 200) {
                toast.error('Failed to update lead type.');
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
                                    Lead Types Name
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created On
                                </th>
                                <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {leadTypes.length > 0 ? (
                                leadTypes.map((leadType) => (
                                    <tr
                                        key={leadType.LeadTypeId}
                                        className="hover:bg-gray-50 text-center transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-start">
                                            <span className="text-sm font-medium text-gray-900">
                                                {leadType.Name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${leadType.Status
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {leadType.Status ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="text-sm text-gray-900">
                                                {dayjs(leadType.CreatedOn).format("DD-MM-YYYY")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-3">
                                            <button
                                                aria-label="Delete lead type"
                                                className="p-1 hover:bg-gray-100 rounded"
                                                onClick={() => handleDeleteClick(leadType)}
                                            >
                                                <TrashIcon size={16} />
                                            </button>
                                            <button
                                                aria-label="Edit lead type"
                                                className="p-1 hover:bg-gray-100 rounded"
                                                onClick={() => handleEditClick(leadType)}
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
                                        No lead types available
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
                                {selectedLeadType?.Name}
                            </span>
                            ?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                                onClick={() => {
                                    setSelectedLeadType(null);
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
                                Edit Lead Type
                            </h2>
                            <button
                                className="text-sm rounded bg-gray-200 hover:bg-gray-300"
                                onClick={() => {
                                    setSelectedLeadType(null);
                                    setEditModalOpen(false);
                                }}
                                disabled={saving}
                            >
                                <CloseIcon />
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    name="Status"
                                    value={editingData.Status}
                                    onChange={handleEditChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    disabled={saving}
                                >
                                    <option value={true}>Active</option>
                                    <option value={false}>Inactive</option>
                                </select>
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

export default LeadTypeTab;
