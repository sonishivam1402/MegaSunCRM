import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { getDashboardData } from '../api/dashboardApi'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyticsTab, setAnalyticsTab] = useState('targets');
  const [leadStateTab, setLeadStateTab] = useState('chart');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardData();
        setDashboardData(response.DashboardData);
        // console.log(response.DashboardData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!dashboardData) {
    return <div className="min-h-screen flex items-center justify-center">No data available</div>;
  }

  const { permissions, cards, leadSourceChart, leadStateChart, tables } = dashboardData;

  const leadSourceData = Object.entries(leadSourceChart || {})
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const leadStateData = leadStateChart
    ? Object.entries(leadStateChart).map(([name, value]) => ({ name, value }))
    : [];

  const COLORS = ['#f48fb1', '#ce93d8', '#90caf9', '#a5d6a7', '#ffe082'];

  const getStatusLabel = (name) => {
    if (name === 'followups') return 'Follow ups';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const renderTable = (tableKey) => {
    const data = tables?.[tableKey] || [];
    if (!data.length) return null;

    const configs = {
      targets: {
        columns: ['name', 'totalTarget', 'totalCollection', 'performance'],
        headers: { name: 'NAME', totalTarget: 'TARGET', totalCollection: 'COLLECTION', performance: 'PERFORMANCE' }
      },
      followups: {
        columns: ['date', 'leadName', 'city', 'state', 'contact', 'leadSource', 'followupStatus'],
        headers: { date: 'DATE', leadName: 'LEAD NAME', city: 'CITY', state: 'STATE', contact: 'CONTACT', leadSource: 'SOURCE', followupStatus: 'STATUS' }
      },
      quotations: {
        columns: ['date', 'leadName', 'city', 'state', 'contact', 'basicAmount', 'finalAmount', 'leadStatus'],
        headers: { date: 'DATE', leadName: 'LEAD NAME', city: 'CITY', state: 'STATE', contact: 'CONTACT', basicAmount: 'BASIC AMT', finalAmount: 'FINAL AMT', leadStatus: 'STATUS' }
      },
      orders: {
        columns: ['date', 'leadName', 'city', 'state', 'contact', 'basicAmount', 'finalAmount', 'leadStatus'],
        headers: { date: 'DATE', leadName: 'LEAD NAME', city: 'CITY', state: 'STATE', contact: 'CONTACT', basicAmount: 'BASIC AMT', finalAmount: 'FINAL AMT', leadStatus: 'STATUS' }
      }
    };

    const config = configs[tableKey];
    if (!config) return null;

    const formatValue = (col, val) => {
      if (col === 'totalTarget' || col === 'totalCollection') return `₹${(val / 100000).toFixed(1)}L`;
      if (col === 'basicAmount' || col === 'finalAmount') return `₹${(val / 1000).toFixed(1)}K`;
      return val;
    };

    return (
      <div className="overflow-y-auto max-h-96" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        <table className="w-full text-sm">
          <thead className="border-b sticky top-0 bg-[#f1f0e9]">
            <tr className="text-gray-600 font-semibold">
              {config.columns.map((col) => (
                <th key={col} className="text-left py-3 px-2">{config.headers[col]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                {config.columns.map((col) => (
                  <td key={col} className="py-3 px-2 text-gray-800">
                    {formatValue(col, row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Welcome back, {user.Name}</h1>
        <p className="text-gray-600 text-sm">Here's a quick overview of your performance and targets.</p>
      </div>

      <div className="flex flex-col gap-2">
        {/* Lead Analytics Cards */}
        {Boolean(
          permissions.leads === 1 ||
          permissions.followups === 1 ||
          permissions.quotations === 1 ||
          permissions.orders === 1
        ) && (
            <div className="p-6" style={{ paddingBottom: '2rem' }}>
              <div className="flex justify-center items-center gap-4">
                {Object.entries(cards || {})
                  .filter(([key]) => permissions[key] === 1)
                  .map(([key, data]) => (
                    <div key={key} onClick={()=>navigate(data.navigationPath)} className="p-4 border border-gray-200 rounded flex flex-col justify-center w-full hover:cursor-pointer">
                      <div className="mb-3 flex justify-between items-center">
                        <span className="font-semibold text-gray-800">{getStatusLabel(key)}</span>
                        <div
                          className="flex items-center justify-center rounded-md shadow-sm"
                          style={{
                            backgroundColor: data.iconBGColor,
                            width: 32,
                            height: 32,
                            padding: 4,
                          }}
                        >
                          <img
                            src={data.iconPath}
                            alt={data.key}
                            width={20}
                            height={20}
                            className="object-contain"
                          />
                        </div>

                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">All Time</p>
                          <p className="text-sm font-medium text-gray-800">{data.allTime}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">Current Month</p>
                          <p className="text-sm font-medium text-gray-800">{data.currentMonth}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">Today</p>
                          <p className="text-sm font-medium text-gray-800">{data.today}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

        {/* Charts Section */}

        {/* Lead Source Chart */}
        {permissions.leads === 1 && (
          <div className='flex justify-center gap-10 border-y'>
            <div className="p-6 w-full border-r" style={{ paddingBottom: '2rem' }}>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Lead Source Analytics</h2>
              <ResponsiveContainer width="100%" height={Math.max(leadSourceData.length * 40, 180)}>
                <BarChart data={leadSourceData} layout="vertical" margin={{ top: 20, right: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value">
                    {leadSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="m-10 text-sm p-10">
                {leadSourceData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-5">
                    <div className="flex items-center  gap-5">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-gray-800 font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* Lead State Chart */}

            <div className="p-6 w-full" style={{ paddingTop: '2rem' }}>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Lead State Analytics</h2>

              <div className="flex border-b border-gray-300 mb-4">
                <button
                  onClick={() => setLeadStateTab('chart')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${leadStateTab === 'chart'
                    ? 'text-gray-900 border-b-2 border-green-900'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Lead State Chart
                </button>
                <button
                  onClick={() => setLeadStateTab('list')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${leadStateTab === 'list'
                    ? 'text-gray-900 border-b-2 border-green-900'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Lead State List
                </button>
              </div>

              <div className="overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', maxHeight: '400px' }}>
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>

                {leadStateTab === 'chart' ? (
                  <div className="flex flex-col items-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={leadStateData.sort((a, b) => b.value - a.value).slice(0, 5)}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {leadStateData.sort((a, b) => b.value - a.value).slice(0, 5).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="flex flex-col gap-2 mt-2 text-xs w-full">
                      {leadStateData.sort((a, b) => b.value - a.value).slice(0, 5).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-5">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                          <span className="text-gray-600 truncate">{item.name}</span>
                          <span className="text-gray-800 font-semibold ml-auto">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {leadStateData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                        <span className="text-sm font-bold text-gray-800">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}


        {/* Analytics Tables Section */}
        {Boolean(
          permissions.targets === 1 ||
          permissions.followups === 1 ||
          permissions.quotations === 1 ||
          permissions.orders === 1
        ) && (
            <div className="p-6" style={{ paddingTop: '2rem' }}>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Analytics</h2>

              <div className="flex border-b border-gray-300 mb-4">
                {permissions.targets === 1 && (
                  <button
                    onClick={() => setAnalyticsTab('targets')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${analyticsTab === 'targets'
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    Targets Analytics
                  </button>
                )}
                {permissions.followups === 1 && (
                  <button
                    onClick={() => setAnalyticsTab('followups')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${analyticsTab === 'followups'
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    Followup Analytics
                  </button>
                )}
                {permissions.quotations === 1 && (
                  <button
                    onClick={() => setAnalyticsTab('quotations')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${analyticsTab === 'quotations'
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    Quotation Analytics
                  </button>
                )}
                {permissions.orders === 1 && (
                  <button
                    onClick={() => setAnalyticsTab('orders')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${analyticsTab === 'orders'
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    Order Analytics
                  </button>
                )}
              </div>

              {renderTable(analyticsTab)}
            </div>
          )}
      </div>
    </div>
  );
};

export default Dashboard;