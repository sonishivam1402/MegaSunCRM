import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { getDashboardData, getDashboardLeadershipData, getDashboardProducts } from '../api/dashboardApi'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLeadershipData, setDashboardLeadershipData] = useState(null);
  const [dashboardProductData, setDashboardProductData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const [analyticsTab, setAnalyticsTab] = useState('targets');
  const [leadStateTab, setLeadStateTab] = useState('chart');
  const { user } = useAuth();
  const navigate = useNavigate();

  // fetch function
  const fetchDashboardProductData = async (start, end) => {
    setProductLoading(true);
    try {
      const response = await getDashboardProducts(start, end);
      setDashboardProductData(response.DashboardData || []);
      // console.log("Dashboard data:", response);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setProductLoading(false);
    }
  };

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

  const fetchDashboardLeadershipData = async () => {
    try {
      const response = await getDashboardLeadershipData();
      setDashboardLeadershipData(response.LeaderboardData);
      // console.log(response.LeaderboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchDashboardLeadershipData();
  }, []);

  useEffect(() => {
    fetchDashboardProductData(startDate, endDate);
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="text-sm font-medium text-gray-900">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-600">
            Target: {formatCurrency(payload[0].payload.totalTarget)}
          </p>
          <p className="text-sm text-gray-600">
            Collection: {formatCurrency(payload[0].payload.totalCollection)}
          </p>
        </div>
      );
    }
    return null;
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

  const formatValue = (key, value) => {
    if (key === "ProductCount") return value || 0;
    return value || "-";
  };

  // column configuration (you already had a config)
  const columns = ["SerialNo", "ProductName", "ProductCount"];

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
                    <div key={key} onClick={() => navigate(data.navigationPath)} className="p-4 border border-gray-200 rounded flex flex-col justify-center w-full hover:cursor-pointer">
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
                <BarChart data={leadSourceData} margin={{ top: 20, right: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name"
                    type="category"
                    tick={{ fontSize: 12 }} />
                  <YAxis type="number"
                    allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value">
                    {leadSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              {/* <div className="m-10 text-sm p-10">
                {leadSourceData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-5">
                    <div className="flex items-center  gap-5">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-gray-800 font-semibold">{item.value}</span>
                  </div>
                ))}
              </div> */}
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


        {/* Product Table */}
        <div className="p-6 rounded-sm border-t">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Product Analytics
            </h2>

            <div className="flex gap-3 items-end">
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Start Date</label>
                <input
                  type="date"
                  className="border rounded px-2 py-1 text-sm"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">End Date</label>
                <input
                  type="date"
                  className="border rounded px-2 py-1 text-sm"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button
                onClick={() => fetchDashboardProductData(startDate, endDate)}
                className="px-4 py-1 h-7.5 bg-green-500 text-white rounded text-sm"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div
            className="max-h-94 rounded-md"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {productLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : dashboardProductData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No product data found.
              </div>
            ) : (
              <div className='flex justify-between items-start gap-5'>
                <div className="w-1/2 max-h-94 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b sticky top-0 bg-[#f1f0e9]">
                      <tr className="text-gray-600 font-semibold">
                        <th className="text-left py-3 px-2">Serial No.</th>
                        <th className="text-left py-3 px-2">Product Name</th>
                        <th className="text-left py-3 px-2">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardProductData.map((row, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          {columns.map((col) => (
                            <td key={col} className="py-3 px-2 text-gray-800">
                              {formatValue(col, row[col])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="w-1/2 flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={dashboardProductData.sort((a, b) => b.ProductCount - a.ProductCount).slice(0, 5)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="ProductCount"
                      >
                        {dashboardProductData.sort((a, b) => b.ProductCount - a.ProductCount).slice(0, 5).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [value, props.payload.ProductName]} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="flex flex-col gap-2 mt-2 text-xs w-full">
                    {dashboardProductData.sort((a, b) => b.value - a.value).slice(0, 5).map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-5">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                        <span className="text-gray-600 truncate">{item.ProductName}</span>
                        <span className="text-gray-800 font-semibold ml-auto">{item.ProductCount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t">
          <h2 className="pb-5 text-xl font-semibold text-gray-800">
            LeaderBoard Analytics
          </h2>
          <div className='flex justify-around items-start gap-2'>
            {dashboardLeadershipData?.all?.length > 0 ? (
              <ResponsiveContainer width="80%" height={350}>
                <BarChart data={dashboardLeadershipData.all}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="totalCollection"
                    fill="#6b9080"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[350px] text-gray-500">
                No data available.
              </div>
            )}
            <div>
              {dashboardLeadershipData?.top3?.length > 0 && (
                <div className="space-y-3">
                  {dashboardLeadershipData.top3.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center border border-gray-200 rounded-md"
                    >
                      {/* Rank */}
                      <div className="w-20 flex items-center justify-center py-6 border-r">
                        <span className="text-3xl font-semibold text-gray-800">
                          {stat.rank}.
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 py-4 px-5">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {stat.name}
                        </p>
                        <p className="text-xl font-semibold text-gray-800">
                          {formatCurrency(stat.totalCollection)}
                        </p>
                      </div>

                      {/* Profile */}
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-6 border">
                        {stat.profileImage ? (
                          <img
                            src={stat.profileImage}
                            alt={stat.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-black text-xl font-semibold">
                            {stat.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;