import React, { useEffect, useState, useRef, useCallback } from 'react';
import AddIcon from '../../assets/icons/AddIcon';
import { getTargets } from '../../api/targetApi';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import CreateTarget from './CreateTarget';
import TargetDetailModal from './TargetDetailModal';

const Targets = ({ refreshKey }) => {
  const { user } = useAuth();
  // State management
  const [targets, setTargets] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [targetDetailModalOpen, setTargetDetailModalOpen] = useState(false);

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);

  // Fetch targets with pagination
  const fetchTargets = useCallback(async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const offset = (page - 1) * limit;

      const response = await getTargets({ offset, limit });
      //console.log('API Response:', response.data);

      if (response && response.data) {
        setTargets(response.data[0] || []);
        const totalCount = response.data[1]?.[0]?.TotalCount;
        setTotalRecords(totalCount !== undefined ? totalCount : 0);
      } else {
        setTargets([]);
        setTotalRecords(0);
      }
    } catch (err) {
      console.error('API ERROR:', err);
      console.error('Error details:', err.response?.data);
      setTargets([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page);
      fetchTargets(page, pageSize);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPageNumber(1);
    fetchTargets(1, newPageSize);
  };

  // Initial data fetch
  useEffect(() => {
    fetchTargets(pageNumber, pageSize);
  }, [refreshKey]);


  const handleAddTarget = () => {
    setAddModalOpen(true);
  };

  const handleViewTarget = (id) => {
    setSelectedUserId(id)
    setTargetDetailModalOpen(true);
  }


  const handleModalSuccess = () => {
    fetchTargets(1, pageSize);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Target Management</h1>
          <button
            onClick={handleAddTarget}
            className="px-4 py-2 bg-[#0d4715] text-white rounded-md text-sm hover:bg-[#0a3811] flex items-center gap-2"
          >
            <AddIcon color='white' />
            Add new target
          </button>
        </div>

      </div>

      {/* Table */}
      <div className="px-6 flex-1 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">SALES TARGET</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">CURRENT SALES</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PERFORMANCE</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0d4715]"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : targets.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No targets found
                </td>
              </tr>
            ) : (
              targets.map((target) => (
                <tr key={target.TargetID || target.id}>
                  {/* Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium bg-[#cd8b65]">
                          {target.Name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      </div>
                      <span className="text-sm text-gray-900">{target.Name || 'Unknown'}</span>
                      <span className="text-xs text-gray-500">• {target.Contact || 'xxxxxxxxxx'}</span>
                    </div>
                  </td>

                  {/* Sales Target */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-medium text-gray-900">₹{target.TotalTarget?.toLocaleString('en-IN') || '0'}</span>
                  </td>

                  {/* Current Sales */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-medium text-gray-900">₹{target.TotalCollection?.toLocaleString('en-IN') || '0'}</span>
                  </td>

                  {/* Performance */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-medium text-gray-900">{target.PerformancePercentage || '0'}%</span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${target.Status === 'On Track'
                      ? 'bg-yellow-100 text-yellow-800' : target.Status === 'Achieved' ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {target.Status || 'Below target'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleViewTarget(target.UserID)}
                      className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900"
                      title="View details"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Pagination Footer */}
      <div className="px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="appearance-none bg-btn-gray hover:cursor-pointer rounded-s-xs px-3 py-1 pr-8 text-sm"
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

      {addModalOpen && (
        <CreateTarget
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSuccess={handleModalSuccess}
        />
      )}

      {targetDetailModalOpen && (
        <TargetDetailModal
          isOpen={targetDetailModalOpen}
          onClose={() => { setTargetDetailModalOpen(false); setSelectedUserId(null) }}
          userId={selectedUserId}
        />
      )}
    </div>
  );
};

export default Targets;