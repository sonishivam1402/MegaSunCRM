import React, { useState, useEffect } from 'react';

const DateRangePickerModal = ({ isOpen, onClose, onConfirm, initialStartDate, initialEndDate, onClear }) => {
  const [tempStartDate, setTempStartDate] = useState(initialStartDate || new Date());
  const [tempEndDate, setTempEndDate] = useState(initialEndDate || new Date());
  const [selectingStart, setSelectingStart] = useState(true);
  const [validationError, setValidationError] = useState('');

  // Reset temp dates when modal opens or initial dates change
  useEffect(() => {
    if (isOpen) {
      const start = initialStartDate || new Date();
      const end = initialEndDate || new Date();
      setTempStartDate(start);
      setTempEndDate(end);
      setSelectingStart(true);
      validateDates(start, end);
    }
  }, [isOpen, initialStartDate, initialEndDate]);

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

  // Validation function
  const validateDates = (start, end) => {
    // Reset time to compare only dates
    const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDateOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    
    if (startDateOnly > endDateOnly) {
      setValidationError('Start date cannot be greater than end date');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleDateClick = (year, month, day) => {
    const clickedDate = new Date(year, month, day);
    
    if (selectingStart) {
      const newStartDate = clickedDate;
      setTempStartDate(newStartDate);
      if (clickedDate > tempEndDate) {
        setTempEndDate(clickedDate);
      }
      validateDates(newStartDate, clickedDate > tempEndDate ? clickedDate : tempEndDate);
      setSelectingStart(false);
    } else {
      if (clickedDate < tempStartDate) {
        setTempEndDate(tempStartDate);
        setTempStartDate(clickedDate);
        validateDates(clickedDate, tempStartDate);
      } else {
        setTempEndDate(clickedDate);
        validateDates(tempStartDate, clickedDate);
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
    validateDates(start, today);
  };

  const handleOK = () => {
    if (!validateDates(tempStartDate, tempEndDate)) {
      return; // Don't proceed if validation fails
    }
    if (onConfirm) {
      onConfirm(tempStartDate, tempEndDate);
    }
    onClose();
  };

  const handleCancel = () => {
    setTempStartDate(initialStartDate || new Date());
    setTempEndDate(initialEndDate || new Date());
    onClose();
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
    onClose();
  };

  const renderCalendar = (year, month, isStartCalendar = true) => {
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
      
      // Check if this date would be invalid
      let isInvalid = false;
      if (isStartCalendar) {
        // In start date calendar, dates after end date are invalid
        const startDateOnly = new Date(tempStartDate.getFullYear(), tempStartDate.getMonth(), tempStartDate.getDate());
        const endDateOnly = new Date(tempEndDate.getFullYear(), tempEndDate.getMonth(), tempEndDate.getDate());
        const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        isInvalid = currentDateOnly > endDateOnly;
      } else {
        // In end date calendar, dates before start date are invalid
        const startDateOnly = new Date(tempStartDate.getFullYear(), tempStartDate.getMonth(), tempStartDate.getDate());
        const endDateOnly = new Date(tempEndDate.getFullYear(), tempEndDate.getMonth(), tempEndDate.getDate());
        const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        isInvalid = currentDateOnly < startDateOnly;
      }
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(year, month, day)}
          className={`h-10 flex items-center justify-center text-sm
            ${isStart || isEnd ? 'bg-green-700 text-white font-semibold' : ''}
            ${inRange && !isStart && !isEnd ? 'bg-green-100' : ''}
            ${isInvalid ? 'opacity-50 cursor-not-allowed bg-red-50' : ''}
            ${!inRange && !isStart && !isEnd && !isInvalid ? 'hover:bg-gray-100' : ''}
            transition-colors`}
          disabled={isInvalid}
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#f1f0e9] rounded-lg shadow-xl w-full max-w-3xl">
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
                  <div className={`text-lg font-medium ${validationError && tempStartDate > tempEndDate ? 'text-red-600' : ''}`}>
                    {formatDate(tempStartDate)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">END DATE</div>
                  <div className={`text-lg font-medium ${validationError && tempStartDate > tempEndDate ? 'text-red-600' : ''}`}>
                    {formatDate(tempEndDate)}
                  </div>
                </div>
              </div>
              {validationError && (
                <div className="mt-2 text-sm text-red-600">
                  {validationError}
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button 
                      onClick={() => {
                        const newDate = new Date(tempStartDate.getFullYear(), tempStartDate.getMonth() - 1, tempStartDate.getDate());
                        setTempStartDate(newDate);
                        validateDates(newDate, tempEndDate);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    ><img src="/icons/Left_arrow.png" alt="Arrow Left" className="w-2 h-4" /></button>
                    <div className="flex gap-2">
                      <select 
                        value={tempStartDate.getMonth()}
                        onChange={(e) => {
                          const newDate = new Date(tempStartDate.getFullYear(), parseInt(e.target.value), tempStartDate.getDate());
                          setTempStartDate(newDate);
                          validateDates(newDate, tempEndDate);
                        }}
                        className="px-2 py-1 border rounded"
                      >
                        {monthNames.map((m, i) => (
                          <option key={i} value={i}>{m}</option>
                        ))}
                      </select>
                      <select 
                        value={tempStartDate.getFullYear()}
                        onChange={(e) => {
                          const newDate = new Date(parseInt(e.target.value), tempStartDate.getMonth(), tempStartDate.getDate());
                          setTempStartDate(newDate);
                          validateDates(newDate, tempEndDate);
                        }}
                        className="px-2 py-1 border rounded"
                      >
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                    <button 
                      onClick={() => {
                        const newDate = new Date(tempStartDate.getFullYear(), tempStartDate.getMonth() + 1, tempStartDate.getDate());
                        setTempStartDate(newDate);
                        validateDates(newDate, tempEndDate);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    ><img src="/icons/Right_arrow.png" alt="Arrow Right" className="w-2 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {daysOfWeek.map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-600 h-8 flex items-center justify-center">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar(tempStartDate.getFullYear(), tempStartDate.getMonth(), true)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button 
                      onClick={() => {
                        const newDate = new Date(tempEndDate.getFullYear(), tempEndDate.getMonth() - 1, tempEndDate.getDate());
                        setTempEndDate(newDate);
                        validateDates(tempStartDate, newDate);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    ><img src="/icons/Left_arrow.png" alt="Arrow Left" className="w-2 h-4" /></button>
                    <div className="flex gap-2">
                      <select 
                        value={tempEndDate.getMonth()}
                        onChange={(e) => {
                          const newDate = new Date(tempEndDate.getFullYear(), parseInt(e.target.value), tempEndDate.getDate());
                          setTempEndDate(newDate);
                          validateDates(tempStartDate, newDate);
                        }}
                        className="px-2 py-1 border rounded"
                      >
                        {monthNames.map((m, i) => (
                          <option key={i} value={i}>{m}</option>
                        ))}
                      </select>
                      <select 
                        value={tempEndDate.getFullYear()}
                        onChange={(e) => {
                          const newDate = new Date(parseInt(e.target.value), tempEndDate.getMonth(), tempEndDate.getDate());
                          setTempEndDate(newDate);
                          validateDates(tempStartDate, newDate);
                        }}
                        className="px-2 py-1 border rounded"
                      >
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                    <button 
                      onClick={() => {
                        const newDate = new Date(tempEndDate.getFullYear(), tempEndDate.getMonth() + 1, tempEndDate.getDate());
                        setTempEndDate(newDate);
                        validateDates(tempStartDate, newDate);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    ><img src="/icons/Right_arrow.png" alt="Arrow Right" className="w-2 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {daysOfWeek.map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-600 h-8 flex items-center justify-center">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar(tempEndDate.getFullYear(), tempEndDate.getMonth(), false)}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-4 flex justify-between items-center">
              {onClear && (initialStartDate || initialEndDate) && (
                <button
                  onClick={handleClear}
                  className="px-6 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50"
                >
                  Clear
                </button>
              )}
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOK}
                  disabled={!!validationError}
                  className={`px-6 py-2 rounded ${
                    validationError 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
    </div>
  );
};

export default DateRangePickerModal;