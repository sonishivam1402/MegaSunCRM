import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Upload, AlertCircle, CheckCircle, Loader, Download, ChevronDown } from 'lucide-react';
import CloseIcon from "../../assets/icons/CloseIcon";
import { importLeads } from '../../api/leadApi';
import { getAllUsersDD } from '../../api/userApi';
//import CloseIcon from "../../assets/icons/CloseIcon";

export default function ImportLeadModal({ isOpen, onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [usersLoading, setUsersLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen && users.length === 0) {
      fetchUsers();
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await getAllUsersDD();
      setUsers(res.data[0] || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setUsersLoading(false);
    }
  };

  const templateData = [
    {
      CompanyName: "Tech Solutions Pvt Ltd",
      Contact: "9876543210",
      City: "Mumbai",
      State: "Maharashtra",
      LeadTypeName: "Retail",
      LeadSourceName: "India Mart",
      LeadStatusName: "New Lead",
      GSTNumber: "27AAPFU0939F1ZV",
      Email: "contact@techsolutions.com",
      Country: "India",
      Address: "123 MG Road, Andheri",
      Pincode: "400058",
      ProductNames: "Solar Panel 500W,Inverter 5KW"
    }
  ];

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads Template");
    XLSX.writeFile(wb, "Leads_Import_Template.xlsx");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setData([]);
    parseFile(selectedFile);
  };

  const parseFile = (file) => {
    const fileType = file.name.split('.').pop().toLowerCase();

    if (fileType === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        complete: (results) => {
          if (results.errors.length > 0) {
            console.error('CSV Parse Error:', results.errors[0].message);
            return;
          }
          const cleanedData = results.data.map(row =>
            Object.keys(row).reduce((acc, key) => {
              const cleanKey = key.trim();
              acc[cleanKey] = row[key]?.trim() || null;
              return acc;
            }, {})
          );
          setData(cleanedData);
        },
        error: (error) => {
          console.error('Parse Error:', error.message);
        }
      });
    } else if (fileType === 'xlsx' || fileType === 'xls') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const workbook = XLSX.read(event.target.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            blankrows: false,
            defval: null
          });

          const cleanedData = jsonData.map(row =>
            Object.keys(row).reduce((acc, key) => {
              const cleanKey = key.trim();
              acc[cleanKey] = row[key]?.toString().trim() || null;
              return acc;
            }, {})
          );

          setData(cleanedData);
        } catch (error) {
          console.error('Excel Parse Error:', error.message);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedUser) {
      return;
    }

    if (data.length === 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await importLeads({ data, selectedUser });
      // console.log(response)
      setResult(response.data);
    } catch (error) {
      setResult({
        success: false,
        message: error.message || 'Failed to import data',
        failedLeads: [],
        failedCount: 0,
        successCount: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setFile(null);
    setData([]);
    setResult(null);
    setSelectedUser('');
  };

  const handleSuccess = () => {
    onSuccess();
    handleClose();
  };

  const selectedUserData = users.find(u => u.UserId === selectedUser);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-end z-50 overflow-y-auto">
      <div className="w-200 max-w-2xl h-full bg-[#f1f0e9] shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Bulk Import Leads
              </h2>
              <p className="text-xs text-gray-500">
                Import leads from CSV or Excel files
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!result ? (
            <div className="space-y-5">
              {/* Download Template */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                <a onClick={downloadTemplate} className='text-green-900 underline font-bold hover:cursor-pointer'>Click Here</a> to  Download Template
                </label>
                {/* <button
                  onClick={downloadTemplate}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-sm hover:bg-gray-50 transition font-medium text-gray-700"
                >
                  <Download size={18} />
                  Download Template
                </button> */}
              </div>

              {/* Upload File */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <label className="block">
                  <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-400 rounded-sm cursor-pointer bg-gray-50 transition">
                    <div className="text-center">
                      <Upload className="mx-auto mb-2 text-gray-600" size={32} />
                      <p className="text-sm font-medium text-gray-700">
                        {file ? file.name : 'Click to upload CSV or Excel'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">CSV, XLS, XLSX</p>
                    </div>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={loading}
                    />
                  </div>
                </label>
              </div>

              {/* Data Count */}
              {data.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-sm p-4">
                  <p className="text-sm font-medium text-gray-700">
                    ✓ {data.length} records loaded
                  </p>
                </div>
              )}

              {/* Assign To Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign To <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    disabled={usersLoading || loading}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm text-left flex justify-between items-center hover:border-gray-400 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <span className={selectedUser ? 'text-gray-800' : 'text-gray-500 text-sm'}>
                      {selectedUserData ? selectedUserData.Name : usersLoading ? 'Loading...' : 'Select a user'}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-600 transition ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg z-10 max-h-48 overflow-y-auto">
                      {users.map(user => (
                        <button
                          key={user.UserId}
                          onClick={() => {
                            setSelectedUser(user.UserId);
                            setDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-100 transition border-b last:border-b-0 text-sm"
                        >
                          <p className="font-medium text-gray-800">{user.Name}</p>
                          {/* <p className="text-xs text-gray-500">{user.UserId}</p> */}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-5">
              {/* Success Message */}
              {result.successCount > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-sm p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h3 className="font-semibold text-green-800 text-sm">Success</h3>
                      <p className="text-green-700 text-sm">
                        {result.successCount} lead{result.successCount !== 1 ? 's' : ''} imported successfully
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Failed Count Summary */}
              {result.failedCount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-sm p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h3 className="font-semibold text-red-800 text-sm">Failed Leads</h3>
                      <p className="text-red-700 text-sm">
                        {result.failedCount} lead{result.failedCount !== 1 ? 's' : ''} failed to import
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Failed Leads Table */}
              {result.failedLeads && result.failedLeads.length > 0 && (
                <div className="overflow-x-auto border border-gray-300 rounded-sm bg-white">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 border-b border-gray-300">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Company</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Contact</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Error</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.failedLeads.map((lead, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                          <td className="px-4 py-3 text-gray-700 text-sm">{lead.CompanyName || '-'}</td>
                          <td className="px-4 py-3 text-gray-700 text-sm">{lead.Contact || '-'}</td>
                          <td className="px-4 py-3">
                            <span className="text-red-600 font-medium text-sm">{lead.errorMessage}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-300">
          {!result ? (
            <button
              onClick={handleSubmit}
              disabled={loading || data.length === 0 || !selectedUser}
              className="w-full bg-[#0d4715] text-white rounded-sm py-3 text-sm font-medium hover:bg-[#0a3811] disabled:!opacity-50 disabled:!cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={16} />
                  Importing...
                </>
              ) : (
                'Import to Database'
              )}
            </button>
          ) : (
            <button
              onClick={handleSuccess}
              className="w-full bg-[#0d4715] text-white rounded-sm py-3 text-sm font-medium hover:bg-[#0a3811] transition-colors"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}