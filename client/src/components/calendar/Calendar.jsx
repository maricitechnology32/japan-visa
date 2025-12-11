// import { Calendar as CalendarIcon, Clock } from 'lucide-react';
// import NepaliDate from 'nepali-date-converter';
// import { useEffect, useState } from 'react';

// export default function Calendar() {
//   const [now, setNow] = useState(new Date());
//   const [nepaliDate, setNepaliDate] = useState(new NepaliDate());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const currentDate = new Date();
//       setNow(currentDate);
//       setNepaliDate(new NepaliDate(currentDate));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Format Helper
//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center text-center space-y-6 h-full relative overflow-hidden group">
      
//       {/* Decorative Background */}
//       <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-blue-500"></div>
//       <div className="absolute -right-10 -top-10 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
//       <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>

//       {/* Header */}
//       <div className="flex items-center gap-2 text-slate-400 font-medium text-xs uppercase tracking-wider z-10">
//         <CalendarIcon size={14} />
//         <span>Real-Time Nepali Calendar</span>
//       </div>

//       {/* Main Calendar Card */}
//       <div className="relative z-10 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden w-full max-w-[280px] transform transition-transform hover:scale-105 duration-300">
//         {/* Red Top Bar (Month) */}
//         <div className="bg-red-600 text-white py-3 px-4">
//           <h3 className="text-2xl font-bold uppercase tracking-widest">
//             {nepaliDate.format('MMMM')}
//           </h3>
//           <p className="text-xs font-medium opacity-90">{nepaliDate.format('YYYY')} B.S.</p>
//         </div>

//         {/* Date Body */}
//         <div className="p-6 flex flex-col items-center justify-center bg-slate-50">
//           <span className="text-6xl font-black text-slate-800 tracking-tighter">
//             {nepaliDate.format('DD')}
//           </span>
//           <span className="text-lg font-bold text-slate-500 mt-1 uppercase">
//             {nepaliDate.format('dddd')}
//           </span>
//         </div>

//         {/* Devanagari Footer */}
//         <div className="bg-slate-100 py-3 px-4 border-t border-slate-200 text-slate-600 font-bold text-sm">
//            {nepaliDate.format('DD MMMM YYYY', 'np')}
//         </div>
//       </div>

//       {/* Real-time Clock */}
//       <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-lg z-10">
//         <Clock size={18} className="text-blue-400 animate-pulse" />
//         <span className="font-mono text-xl font-bold tracking-widest">
//           {formatTime(now)}
//         </span>
//       </div>

//     </div>
//   );
// }

import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import NepaliDate from 'nepali-date-converter';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styling
import { useDispatch, useSelector } from 'react-redux';
import { getHolidays } from '../../features/holidays/holidaySlice';

export default function CalendarWidget() {
  const dispatch = useDispatch();
  const { holidays } = useSelector((state) => state.holidays);
  
  const [now, setNow] = useState(new Date());
  const [nepaliDate, setNepaliDate] = useState(new NepaliDate());
  const [view, setView] = useState('daily'); // 'daily' or 'monthly'

  // 1. Fetch Holidays on Mount
  useEffect(() => {
    dispatch(getHolidays());
  }, [dispatch]);

  // 2. Real-time Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      setNow(currentDate);
      setNepaliDate(new NepaliDate(currentDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  // 3. Helper to check for Holiday
  const getHolidayForDate = (date) => {
    // Format date to YYYY-MM-DD to match backend
    const dateString = date.toLocaleDateString('en-CA'); // YYYY-MM-DD
    return holidays.find(h => h.date === dateString);
  };

  // 4. Custom Tile Content for React-Calendar
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    // Convert AD date to BS
    const bsDate = new NepaliDate(date);
    const holiday = getHolidayForDate(date);

    return (
      <div className="flex flex-col items-center justify-start h-full pt-1">
        {/* Nepali Day Number */}
        <span className="text-[10px] text-slate-400 font-medium">
          {bsDate.format('DD')}
        </span>
        
        {/* Holiday Indicator */}
        {holiday && (
          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500" title={holiday.name}></div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center space-y-6 relative overflow-hidden group min-h-[420px]">
      
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-blue-600"></div>

      {/* Header / Toggle */}
      <div className="flex justify-between items-center w-full z-10 px-2">
        <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
          <CalendarIcon size={14} className="text-red-500"/>
          <span>Nepali Calendar</span>
        </div>
        <button 
            onClick={() => setView(prev => prev === 'daily' ? 'monthly' : 'daily')}
            className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-full transition-colors"
        >
            {view === 'daily' ? 'View Month' : 'View Today'}
        </button>
      </div>

      {/* VIEW 1: DAILY WIDGET (Original) */}
      {view === 'daily' && (
        <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-300">
            <div className="relative bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden w-full max-w-[240px] transform transition-transform hover:scale-105 duration-300">
                {/* Red Top Bar */}
                <div className="bg-red-600 text-white py-4 px-4">
                <h3 className="text-2xl font-bold uppercase tracking-widest leading-none">
                    {nepaliDate.format('MMMM')}
                </h3>
                <p className="text-xs font-medium opacity-80 mt-1">{nepaliDate.format('YYYY')} B.S.</p>
                </div>

                {/* Date Body */}
                <div className="p-6 flex flex-col items-center justify-center bg-slate-50">
                <span className="text-7xl font-black text-slate-800 tracking-tighter leading-none">
                    {nepaliDate.format('DD')}
                </span>
                <span className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-wide">
                    {nepaliDate.format('dddd')}
                </span>
                </div>

                {/* Footer Info */}
                <div className="bg-white py-3 px-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium">
                    <span>{now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} (AD)</span>
                    {getHolidayForDate(now) && (
                        <span className="text-red-600 font-bold flex items-center gap-1">
                            <MapPin size={10}/> Holiday
                        </span>
                    )}
                </div>
            </div>

            {/* Real-time Clock */}
            <div className="mt-8 flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-full shadow-lg">
                <Clock size={16} className="text-blue-400 animate-pulse" />
                <span className="font-mono text-lg font-bold tracking-widest">
                {formatTime(now)}
                </span>
            </div>
        </div>
      )}

      {/* VIEW 2: FULL MONTH CALENDAR */}
      {view === 'monthly' && (
        <div className="w-full animate-in fade-in slide-in-from-right-4 duration-300 custom-calendar-wrapper">
            <Calendar 
                onChange={setNow} 
                value={now} 
                tileContent={tileContent}
                className="w-full border-none font-sans text-sm"
                prevLabel={<ChevronLeft size={16} className="text-slate-400"/>}
                nextLabel={<ChevronRight size={16} className="text-slate-400"/>}
            />
            
            {/* Holiday Legend */}
            <div className="mt-4 w-full text-left bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Events this month</p>
                <div className="space-y-1 max-h-24 overflow-y-auto custom-scrollbar">
                    {holidays
                        .filter(h => h.date.startsWith(now.toISOString().slice(0, 7))) // Filter for current view month
                        .map((h, i) => (
                        <div key={i} className="flex gap-2 items-start text-xs">
                            <span className="text-red-500 font-bold whitespace-nowrap">{h.date.split('-')[2]}:</span>
                            <span className="text-slate-600 truncate" title={h.name}>{h.name}</span>
                        </div>
                    ))}
                    {holidays.filter(h => h.date.startsWith(now.toISOString().slice(0, 7))).length === 0 && (
                        <p className="text-slate-400 italic text-xs">No holidays listed.</p>
                    )}
                </div>
            </div>
        </div>
      )}

      {/* Custom Styles for React Calendar override */}
      <style>{`
        .react-calendar { width: 100%; background: white; border: none; font-family: inherit; }
        .react-calendar__navigation button { min-width: 44px; background: none; font-weight: bold; font-size: 14px; }
        .react-calendar__month-view__weekdays { text-transform: uppercase; font-size: 10px; font-weight: 800; color: #94a3b8; }
        .react-calendar__tile { padding: 6px 0; position: relative; height: 50px; display: flex; flex-direction: column; justify-content: space-between; overflow: visible; }
        .react-calendar__tile--now { background: #eff6ff; color: #2563eb; border-radius: 8px; }
        .react-calendar__tile--now:enabled:hover, .react-calendar__tile--now:enabled:focus { background: #dbeafe; }
        .react-calendar__tile--active { background: #2563eb !important; color: white !important; border-radius: 8px; }
        .react-calendar__tile--active span { color: white !important; }
        .react-calendar__tile abbr { margin-top: 2px; font-weight: bold; font-size: 12px; text-decoration: none; }
      `}</style>

    </div>
  );
} 