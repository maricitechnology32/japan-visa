// import { Calendar, Loader2, Trash2 } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { addHoliday, deleteHoliday, getHolidays, reset } from '../../features/holidays/holidaySlice';

// export default function HolidayManager() {
//   const dispatch = useDispatch();
//   const { holidays, isLoading, isSuccess, message } = useSelector((state) => state.holidays);

//   const [formData, setFormData] = useState({ date: '', name: '', type: 'Public' });

//   useEffect(() => {
//     dispatch(getHolidays());
//   }, [dispatch]);

//   useEffect(() => {
//       if(isSuccess && message) {
//           toast.success(message);
//           setFormData({ date: '', name: '', type: 'Public' });
//           dispatch(reset());
//       }
//   }, [isSuccess, message, dispatch]);

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       if(!formData.date || !formData.name) return toast.error("Date and Name required");
//       dispatch(addHoliday(formData));
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-8">
//         <div className="flex items-center gap-3 border-b pb-4">
//             <div className="bg-red-100 p-3 rounded-full text-red-600"><Calendar size={24}/></div>
//             <div>
//                 <h2 className="text-2xl font-bold text-gray-900">Global Holiday Calendar</h2>
//                 <p className="text-gray-500">Manage holidays that affect transaction generation across all consultancies.</p>
//             </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Form */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
//                 <h3 className="font-bold text-gray-800 mb-4">Add New Holiday</h3>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="text-xs font-bold text-gray-500 uppercase">Date</label>
//                         <input type="date" value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} className="w-full border p-2 rounded mt-1"/>
//                     </div>
//                     <div>
//                         <label className="text-xs font-bold text-gray-500 uppercase">Holiday Name</label>
//                         <input placeholder="e.g. Dashain (Phulpati)" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded mt-1"/>
//                     </div>
//                     <div>
//                         <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
//                         <select value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})} className="w-full border p-2 rounded mt-1 bg-white">
//                             <option>Public</option>
//                             <option>Bank</option>
//                             <option>Festival</option>
//                         </select>
//                     </div>
//                     <button disabled={isLoading} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-bold flex justify-center">
//                         {isLoading ? <Loader2 className="animate-spin"/> : 'Add Holiday'}
//                     </button>
//                 </form>
//             </div>

//             {/* List */}
//             <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                 <h3 className="font-bold text-gray-800 mb-4">Upcoming Holidays ({holidays.length})</h3>
//                 <div className="overflow-auto max-h-[500px] space-y-2">
//                     {holidays.length === 0 && <p className="text-gray-400 text-center py-10">No holidays added yet.</p>}
//                     {holidays.map((h) => (
//                         <div key={h._id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50 group">
//                             <div className="flex items-center gap-4">
//                                 <div className="text-center bg-gray-100 px-3 py-1 rounded">
//                                     <div className="text-xs font-bold text-gray-500">{h.date.split('-')[0]}</div>
//                                     <div className="text-sm font-bold text-gray-800">{h.date.split('-').slice(1).join('/')}</div>
//                                 </div>
//                                 <div>
//                                     <h4 className="font-bold text-gray-800">{h.name}</h4>
//                                     <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded">{h.type}</span>
//                                 </div>
//                             </div>
//                             <button onClick={() => dispatch(deleteHoliday(h._id))} className="text-gray-300 hover:text-red-600 p-2 transition">
//                                 <Trash2 size={18}/>
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// }


import { Calendar, CalendarDays, Filter, Globe, Loader2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addHoliday, deleteHoliday, getHolidays, reset } from '../../features/holidays/holidaySlice';

export default function HolidayManager() {
  const dispatch = useDispatch();
  const { holidays, isLoading, isSuccess, message } = useSelector((state) => state.holidays);

  const [formData, setFormData] = useState({ date: '', name: '', type: 'Public' });
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    dispatch(getHolidays());
  }, [dispatch]);

  useEffect(() => {
      if(isSuccess && message) {
          toast.success(message);
          setFormData({ date: '', name: '', type: 'Public' });
          dispatch(reset());
      }
  }, [isSuccess, message, dispatch]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!formData.date || !formData.name) return toast.error("Date and Name required");
      dispatch(addHoliday(formData));
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Public': return 'bg-red-100 text-red-800 border-red-200';
      case 'Bank': return 'bg-green-100 text-green-800 border-green-200';
      case 'Festival': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Public': return '🏛️';
      case 'Bank': return '🏦';
      case 'Festival': return '🎉';
      default: return '📅';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      date: date.getDate(),
      year: date.getFullYear(),
      full: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  };

  const filteredAndSortedHolidays = holidays
    .filter(h => filterType === 'All' || h.type === filterType)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const typeCounts = {
    All: holidays.length,
    Public: holidays.filter(h => h.type === 'Public').length,
    Bank: holidays.filter(h => h.type === 'Bank').length,
    Festival: holidays.filter(h => h.type === 'Festival').length
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-white border border-gray-200 rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <Calendar className="text-red-600" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Global Holiday Calendar</h1>
              <p className="text-gray-600 mt-2">Manage holidays that affect transaction generation across all consultancies.</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
            <Globe size={20} className="text-gray-400" />
            <span className="font-medium text-gray-700">{holidays.length} Holidays</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Form */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <Plus size={20} />
                Add New Holiday
              </h3>
              <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                Required*
              </span>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <CalendarDays size={16} />
                  Holiday Date
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Holiday Name</label>
                <input 
                  placeholder="e.g. Dashain (Phulpati)" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Holiday Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Public', 'Bank', 'Festival'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, type})}
                      className={`p-3 rounded-lg border-2 transition-all ${formData.type === type 
                        ? `${getTypeColor(type)} border-opacity-100 font-semibold` 
                        : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg">{getTypeIcon(type)}</span>
                        <span className="text-xs">{type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl hover:from-red-700 hover:to-red-800 font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    Add Holiday
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Filter size={18} />
              Holiday Overview
            </h4>
            <div className="space-y-3">
              {Object.entries(typeCounts).map(([type, count]) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${filterType === type 
                    ? 'bg-red-50 border border-red-200' 
                    : 'hover:bg-gray-50 border border-transparent'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${type === 'Public' ? 'bg-red-500' : type === 'Bank' ? 'bg-green-500' : type === 'Festival' ? 'bg-purple-500' : 'bg-gray-500'}`} />
                    <span className={`font-medium ${filterType === type ? 'text-red-700' : 'text-gray-700'}`}>
                      {type}
                    </span>
                  </div>
                  <span className={`font-bold ${filterType === type ? 'text-red-600' : 'text-gray-600'}`}>
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Holiday List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-xl">Holiday Calendar</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {filteredAndSortedHolidays.length} holidays found
                    {filterType !== 'All' && ` in ${filterType}`}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
                    <button
                      onClick={() => setSortBy('date')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${sortBy === 'date' 
                        ? 'bg-white shadow-sm text-gray-800' 
                        : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      By Date
                    </button>
                    <button
                      onClick={() => setSortBy('name')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${sortBy === 'name' 
                        ? 'bg-white shadow-sm text-gray-800' 
                        : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      By Name
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-auto max-h-[600px]">
              {filteredAndSortedHolidays.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar size={24} className="text-gray-400" />
                  </div>
                  <h4 className="text-gray-500 font-medium">No holidays found</h4>
                  <p className="text-gray-400 text-sm mt-1">
                    {filterType !== 'All' ? `Try changing the filter or add a new ${filterType.toLowerCase()} holiday.` : 'Add your first holiday to get started.'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredAndSortedHolidays.map((holiday) => {
                    const formattedDate = formatDate(holiday.date);
                    return (
                      <div 
                        key={holiday._id} 
                        className="p-6 hover:bg-gray-50 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            {/* Date Card */}
                            <div className="flex flex-col items-center justify-center min-w-[80px]">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">
                                  {formattedDate.date}
                                </div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {formattedDate.month}
                                </div>
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {formattedDate.day} • {formattedDate.year}
                              </div>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-12 bg-gray-200" />

                            {/* Holiday Details */}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-bold text-gray-900 text-lg">
                                  {holiday.name}
                                </h4>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getTypeColor(holiday.type)}`}>
                                  {getTypeIcon(holiday.type)} {holiday.type}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm">
                                {formattedDate.full}
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <button 
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete "${holiday.name}"?`)) {
                                dispatch(deleteHoliday(holiday._id));
                              }
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg"
                            title="Delete holiday"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Stats */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span>Public Holidays: {typeCounts.Public}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Bank Holidays: {typeCounts.Bank}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span>Festivals: {typeCounts.Festival}</span>
                  </div>
                </div>
                <div className="text-gray-500">
                  Last updated: Today
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}