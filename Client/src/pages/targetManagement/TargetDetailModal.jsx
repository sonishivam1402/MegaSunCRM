import React, { useEffect, useState, useCallback } from 'react';
import { getTargetByUserId } from '../../api/targetApi';
import CloseIcon from '../../assets/icons/CloseIcon';
import OrderTargetModal from './OrderTargetModal';

const TargetDetailModal = ({ isOpen, onClose, userId }) => {
    const [targetData, setTargetData] = useState(null);
    const [collections, setCollections] = useState([]);
    const [pageSize, setPageSize] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const totalPages = Math.ceil(totalRecords / pageSize);

    // Fetch target data by user ID
    const fetchTargetData = useCallback(async (page = 1, limit = 50) => {
        if (!userId) return;

        try {
            setLoading(true);
            const offset = (page - 1) * limit;

            const response = await getTargetByUserId({ userId, offset, limit });
            //console.log(response.data);

            if (response && response.data) {
                setTargetData(response.data);
                setCollections(response.data[0] || []);
                setTotalRecords(response.data?.[1]?.[0]?.["Total Count"] || 0);
            }

        } catch (err) {
            console.error('Error fetching target data:', err);
            setCollections([]);
            setTotalRecords(0);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setPageNumber(page);
            fetchTargetData(page, pageSize);
        }
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPageNumber(1);
        fetchTargetData(1, newPageSize);
    };

    useEffect(() => {
        if (isOpen && userId) {
            fetchTargetData(pageNumber, pageSize);
        }
    }, [isOpen, userId]);

    const handleModal = (data) => {
        setIsOpenOrderModal(true);
        setSelectedData(data);
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-end z-50 overflow-y-auto">
            <div className="w-400 max-w-5xl h-full bg-[#f1f0e9] shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Collection List
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Table - Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                            <span className="ml-2">Loading...</span>
                        </div>
                    ) : (
                        <div className="rounded">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            MONTH - YEAR
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            TARGET
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            COLLECTION
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            AVERAGE
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            ACTION
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {collections.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                No collections found
                                            </td>
                                        </tr>
                                    ) : (
                                        collections.map((collection) => (
                                            <tr key={collection.TargetID}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {collection.MonthYear}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    Rs. {collection.Target?.toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                                                    Rs. {collection.Collection?.toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                                                    {collection.Average}%
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleModal(collection)}
                                                        className="p-2 text-gray-600 hover:text-gray-900"
                                                        title="View details"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Show</span>
                        <div className="relative">
                            <select
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                className="appearance-none bg-white hover:cursor-pointer rounded px-3 py-2 pr-8 text-sm border border-gray-300"
                            >
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                            </select>
                            <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-600">entries</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        Showing {totalRecords === 0 ? 0 : ((pageNumber - 1) * pageSize) + 1} to {Math.min(pageNumber * pageSize, totalRecords)} of {totalRecords} entries
                    </div>

                    <div className="flex items-center border border-gray-300 rounded">
                        {/* Previous button */}
                        <button
                            onClick={() => handlePageChange(pageNumber - 1)}
                            disabled={pageNumber === 1 || loading}
                            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:!opacity-50 disabled:!cursor-not-allowed border-r border-gray-300"
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
                            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:!opacity-50 disabled:!cursor-not-allowed border-l border-gray-300"
                        >
                            <img src="/icons/Right_arrow.png" alt="Next" className="w-2 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {isOpenOrderModal && (
                <OrderTargetModal
                    isOpen={isOpenOrderModal}
                    onClose={() => {setIsOpenOrderModal(false), setSelectedData(null)}}
                    data={selectedData}
                />
            )}

        </div>
    );
};

export default TargetDetailModal;