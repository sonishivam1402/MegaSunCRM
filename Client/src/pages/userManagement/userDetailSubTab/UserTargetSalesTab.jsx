import React, { useEffect, useState } from 'react';
import { getTargetSalesByUserId } from '../../../api/targetApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserTargetSalesTab = ({ userId }) => {
    const [stats, setStats] = useState({
        totalSales: 0,
        totalNumber: 0,
        dealDone: 0,
        openLeads: 0
    });
    const [chartData, setChartData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Generate year options (current year and 4 years back)
    const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    const fetchTargetSalesData = async () => {
        if (!userId) return;
        
        try {
            setLoading(true);
            setError(null);

            const params = {
                userId,
                year : selectedYear
            }
            
            const response = await getTargetSalesByUserId({userId: params.userId, year : params.year});
            //console.log(response.data)
            
            if (response.data && Array.isArray(response.data) && response.data.length >= 2) {
                // First array contains stats
                const statsData = response.data[0][0];
                if (statsData) {
                    setStats({
                        totalSales: statsData['Total Sales (Amount)'] || 0,
                        totalNumber: statsData['Total Sales (Number)'] || 0,
                        dealDone: statsData['Deal Done'] || 0,
                        openLeads: statsData['Open Leads'] || 0
                    });
                }

                // Second array contains chart data
                const chartDataArray = response.data[1];
                if (chartDataArray && Array.isArray(chartDataArray)) {
                    // Transform the chart data to the format we need
                    const formattedChartData = chartDataArray.map(item => ({
                        month: item.MonthLabel || '',
                        amount: item.Achievement || 0
                    })).filter(item => item.month); // Filter out items without month labels
                    
                    setChartData(formattedChartData);
                }
            }
        } catch (err) {
            console.error('Error fetching target sales data:', err);
            setError('Failed to load target sales data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTargetSalesData();
    }, [userId, selectedYear]);

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
                    <p className="text-sm font-medium text-gray-900">{payload[0].payload.month}</p>
                    <p className="text-sm text-gray-600">
                        {formatCurrency(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading sales data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#f1f0e9] p-6 overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sales</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {/* Total Sales Amount */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Total sales(amount)</span>
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalSales)}</p>
                </div>

                {/* Total Sales Number */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Total sales(number)</span>
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalNumber}</p>
                </div>

                {/* Deal Done */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Deal done</span>
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.dealDone}</p>
                </div>

                {/* Open Leads */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Open Leads</span>
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.openLeads}</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Target achieved in</h3>
                    <div className="relative">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm hover:cursor-pointer"
                        >
                            {yearOptions.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                                dataKey="month" 
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <YAxis 
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                axisLine={{ stroke: '#e5e7eb' }}
                                tickFormatter={(value) => `${value / 1000}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="amount" fill="#6b9080" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-[350px] text-gray-500">
                        No data available for {selectedYear}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserTargetSalesTab;