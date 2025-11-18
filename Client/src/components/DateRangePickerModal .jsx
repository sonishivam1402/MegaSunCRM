import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';

const DateRangePickerModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date(2025, 7, 17)); // Aug 17, 2025
  const [endDate, setEndDate] = useState(new Date(2025, 8, 3)); // Sep 3, 2025
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [selectingStart, setSelectingStart] = useState(true);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getMonthData = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isInRange = (date, start, end) => {
    return date >= start && date <= end;
  };

  const handleDateClick = (year, month, day) => {
    const clickedDate = new Date(year, month, day);
    
    if (selectingStart) {
      setTempStartDate(clickedDate);
      if (clickedDate > tempEndDate) {
        setTempEndDate(clickedDate);
      }
      setSelectingStart(false);
    } else {
      if (clickedDate < tempStartDate) {
        setTempEndDate(tempStartDate);
        setTempStartDate(clickedDate);
      } else {
        setTempEndDate(clickedDate);
      }
      setSelectingStart(true);
    }
  };

  const handleQuickRange = (range) => {
    const today = new Date();
    let start = new Date();
    
    switch(range) {
      case 'month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case '3months':
        start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        break;
      case '6months':
        start = new Date(today.getFullYear(), today.getMonth() - 5, 1);
        break;
      case 'year':
        start = new Date(today.getFullYear(), 0, 1);
        break;
    }
    
    setTempStartDate(start);
    setTempEndDate(today);
  };

  const handleOK = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setIsModalOpen(false);
  };

  const renderCalendar = (year, month) => {
    const { firstDay, daysInMonth } = getMonthData(year, month);
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isStart = isSameDay(currentDate, tempStartDate);
      const isEnd = isSameDay(currentDate, tempEndDate);
      const inRange = isInRange(currentDate, tempStartDate, tempEndDate);
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(year, month, day)}
          className={`h-10 flex items-center justify-center text-sm
            ${isStart || isEnd ? 'bg-green-700 text-white font-semibold' : ''}
            ${inRange && !isStart && !isEnd ? 'bg-green-100' : ''}
            ${!inRange && !isStart && !isEnd ? 'hover:bg-gray-100' : ''}
            transition-colors`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()].slice(0, 3)} '${date.getFullYear().toString().slice(2)}`;
  };

  return (
    <div className="p-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Calendar size={20} />
        Date Filter
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
            <div className="border-b border-blue-400 p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleQuickRange('month')}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    This month
                  </button>
                  <button
                    onClick={() => handleQuickRange('3months')}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Last 3 months
                  </button>
                  <button
                    onClick={() => handleQuickRange('6months')}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Last 6 months
                  </button>
                  <button
                    onClick={() => handleQuickRange('year')}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Last year
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm text-gray-600 mb-1">START DATE</div>
                  <div className="text-lg font-medium">{formatDate(tempStartDate)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">END DATE</div>
                  <div className="text-lg font-medium">{formatDate(tempEndDate)}</div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-1 hover:bg-gray-100 rounded">‹</button>
                    <div className="flex gap-2">
                      <select 
                        value={tempStartDate.getMonth()}
                        onChange={(e) => setTempStartDate(new Date(tempStartDate.getFullYear(), parseInt(e.target.value), 1))}
                        className="px-2 py-1 border rounded"
                      >
                        {monthNames.map((m, i) => (
                          <option key={i} value={i}>{m}</option>
                        ))}
                      </select>
                      <select 
                        value={tempStartDate.getFullYear()}
                        onChange={(e) => setTempStartDate(new Date(parseInt(e.target.value), tempStartDate.getMonth(), 1))}
                        className="px-2 py-1 border rounded"
                      >
                        {[2024, 2025, 2026].map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">›</button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {daysOfWeek.map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-600 h-8 flex items-center justify-center">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar(tempStartDate.getFullYear(), tempStartDate.getMonth())}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-1 hover:bg-gray-100 rounded">‹</button>
                    <div className="flex gap-2">
                      <select 
                        value={tempEndDate.getMonth()}
                        onChange={(e) => setTempEndDate(new Date(tempEndDate.getFullYear(), parseInt(e.target.value), tempEndDate.getDate()))}
                        className="px-2 py-1 border rounded"
                      >
                        {monthNames.map((m, i) => (
                          <option key={i} value={i}>{m}</option>
                        ))}
                      </select>
                      <select 
                        value={tempEndDate.getFullYear()}
                        onChange={(e) => setTempEndDate(new Date(parseInt(e.target.value), tempEndDate.getMonth(), tempEndDate.getDate()))}
                        className="px-2 py-1 border rounded"
                      >
                        {[2024, 2025, 2026].map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">›</button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {daysOfWeek.map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-600 h-8 flex items-center justify-center">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar(tempEndDate.getFullYear(), tempEndDate.getMonth())}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-4 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleOK}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePickerModal;