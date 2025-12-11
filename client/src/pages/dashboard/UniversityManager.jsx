// import { Building2, Download, MapPin, Plus, Search } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { addUniversity, getUniversities, importUniversity, reset, searchMaster } from '../../features/universities/universitySlice';

// export default function UniversityManager() {
//   const dispatch = useDispatch();
//   const { universities, masterSearchResults, isLoading, isSuccess, message } = useSelector((state) => state.universities);
  
//   const [showForm, setShowForm] = useState(false);
//   const [activeTab, setActiveTab] = useState('manual'); 
//   const [searchQuery, setSearchQuery] = useState('');
  
//   const [formData, setFormData] = useState({
//       name: '', location: '', type: 'Language School', commissionPercentage: 0
//   });

//   useEffect(() => {
//       dispatch(getUniversities());
//   }, [dispatch]);

//   useEffect(() => {
//       if(isSuccess && message) {
//           toast.success(message);
//           if (activeTab === 'manual') {
//             setShowForm(false);
//             setFormData({ name: '', location: '', type: 'Language School', commissionPercentage: 0 });
//           }
//           dispatch(reset());
//       }
//   }, [isSuccess, message, dispatch, activeTab]);

//   const handleManualSubmit = (e) => {
//       e.preventDefault();
//       dispatch(addUniversity(formData));
//   };

//   const handleSearchMaster = () => {
//       if (searchQuery.length > 2) {
//           dispatch(searchMaster(searchQuery));
//       }
//   };

//   const handleImport = (mUni) => {
//       const commission = prompt(`Enter commission rate for ${mUni.name} (e.g., 15):`);
//       if (commission !== null && !isNaN(commission)) {
//           dispatch(importUniversity({ masterId: mUni._id, commission: Number(commission) }));
//       } else {
//           toast.info("Import cancelled or invalid commission rate.");
//       }
//   };

//   return (
//     <div className="space-y-6">
//        <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">University Database</h2>
//             <p className="text-gray-500">Manage your partner schools.</p>
//           </div>
//           <button onClick={() => setShowForm(!showForm)} className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700">
//              <Plus size={18}/> Add New
//           </button>
//        </div>

//        {showForm && (
//            <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 animate-in slide-in-from-top-2">
               
//                <div className="flex gap-4 border-b mb-4">
//                    <button onClick={() => setActiveTab('manual')} className={`pb-2 px-2 text-sm font-bold ${activeTab === 'manual' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}>Manual Entry</button>
//                    <button onClick={() => setActiveTab('import')} className={`pb-2 px-2 text-sm font-bold ${activeTab === 'import' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}>Import from Master DB</button>
//                </div>

//                {activeTab === 'manual' ? (
//                    <form onSubmit={handleManualSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                        <input className="border p-2 rounded" placeholder="Name (e.g. Tokyo Intl School)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
//                        <input className="border p-2 rounded" placeholder="Location (e.g. Shinjuku, Tokyo)" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
//                        <select className="border p-2 rounded bg-white" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
//                            <option>Language School</option>
//                            <option>University</option>
//                            <option>Vocational College</option>
//                        </select>
//                        <input type="number" className="border p-2 rounded" placeholder="Commission %" value={formData.commissionPercentage} onChange={e => setFormData({...formData, commissionPercentage: e.target.value})} />
                       
//                        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
//                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-500">Cancel</button>
//                            <button disabled={isLoading} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
//                                {isLoading ? 'Saving...' : 'Save School'}
//                            </button>
//                        </div>
//                    </form>
//                ) : (
//                    <div className="space-y-4">
//                        <div className="flex gap-2">
//                            <input 
//                                className="flex-1 border p-2 rounded" 
//                                placeholder="Search global database..." 
//                                value={searchQuery}
//                                onChange={e => setSearchQuery(e.target.value)}
//                            />
//                            <button onClick={handleSearchMaster} className="bg-green-600 text-white px-4 rounded flex items-center gap-2"><Search size={16}/> Search</button>
//                        </div>
//                        <div className="max-h-60 overflow-y-auto border rounded">
//                            {masterSearchResults.map(mUni => (
//                                <div key={mUni._id} className="p-3 border-b flex justify-between items-center hover:bg-gray-50">
//                                    <div>
//                                        <div className="font-bold text-sm">{mUni.name}</div>
//                                        <div className="text-xs text-gray-500">{mUni.location} • {mUni.type}</div>
//                                    </div>
//                                    <button onClick={() => handleImport(mUni)} className="text-green-600 hover:bg-green-50 p-2 rounded"><Download size={18}/> Import</button>
//                                </div>
//                            ))}
//                            {masterSearchResults.length === 0 && searchQuery.length > 2 && <div className="p-4 text-center text-gray-400 text-sm">No results found</div>}
//                        </div>
//                    </div>
//                )}
//            </div>
//        )}

//        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//            {universities.map(uni => (
//                <div key={uni._id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
//                    <div className="flex justify-between items-start mb-2">
//                        <div className="bg-green-50 p-2 rounded-md text-green-600"><Building2 size={20}/></div>
//                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{uni.type}</span>
//                    </div>
//                    <h3 className="font-bold text-gray-900">{uni.name}</h3>
//                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
//                        <MapPin size={14}/> {uni.location}
//                    </div>
//                    {uni.commissionPercentage > 0 && (
//                        <div className="mt-3 pt-3 border-t text-xs font-medium text-green-700">
//                            Commission: {uni.commissionPercentage}%
//                        </div>
//                    )}
//                </div>
//            ))}
//        </div>
//     </div>
//   );
// }

import { Building2, Download, Filter, MapPin, Plus, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addUniversity, getUniversities, importUniversity, reset, searchMaster } from '../../features/universities/universitySlice';

export default function UniversityManager() {
  const dispatch = useDispatch();
  const { universities, masterSearchResults, isLoading, isSuccess, message } = useSelector((state) => state.universities);
  
  // UI State
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add'
  const [activeTab, setActiveTab] = useState('manual'); // 'manual', 'import'
  
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  // Form State
  const [formData, setFormData] = useState({
      name: '', location: '', type: 'Language School', commissionPercentage: 0, intakes: []
  });
  const [masterQuery, setMasterQuery] = useState('');

  // --- 1. INITIALIZATION ---
  useEffect(() => {
      dispatch(getUniversities());
  }, [dispatch]);

  useEffect(() => {
      if(isSuccess && message) {
          toast.success(message);
          if (viewMode === 'add' && activeTab === 'manual') {
            setViewMode('list');
            setFormData({ name: '', location: '', type: 'Language School', commissionPercentage: 0, intakes: [] });
          }
          dispatch(reset());
      }
  }, [isSuccess, message, dispatch, viewMode, activeTab]);

  // --- 2. HANDLERS ---
  const handleManualSubmit = (e) => {
      e.preventDefault();
      dispatch(addUniversity(formData));
  };

  const handleSearchMaster = () => {
      if (masterQuery.length > 2) {
          dispatch(searchMaster(masterQuery));
      } else {
          toast.info("Enter at least 3 characters to search the global DB.");
      }
  };

  const handleImport = (mUni) => {
      const commission = prompt(`Enter commission rate for ${mUni.name} (e.g., 15):`);
      if (commission !== null && !isNaN(commission)) {
          dispatch(importUniversity({ masterId: mUni._id, commission: Number(commission) }));
          // Optional: Switch back to list view after import
          if(window.confirm("University imported! Go back to list?")) {
              setViewMode('list');
          }
      }
  };

  // --- 3. FILTER LOGIC ---
  const filteredUniversities = universities.filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            uni.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || uni.type === filterType;
      // Simple location filter (contains string)
      const matchesLocation = filterLocation === 'All' || uni.location.includes(filterLocation);
      
      return matchesSearch && matchesType && matchesLocation;
  });

  // Extract unique locations for filter dropdown
  const uniqueLocations = ['All', ...new Set(universities.map(u => u.location.split(',')[0].trim()))];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
       
       {/* HEADER */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">University Database</h2>
            <p className="text-slate-500">Search and manage your partner institutions.</p>
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'list' ? 'add' : 'list')} 
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm
                ${viewMode === 'list' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
             {viewMode === 'list' ? <><Plus size={18}/> Add University</> : <><X size={18}/> Cancel Adding</>}
          </button>
       </div>

       {/* MODE: ADD UNIVERSITY */}
       {viewMode === 'add' && (
           <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
               
               {/* Tabs */}
               <div className="flex gap-6 border-b border-slate-100 mb-6">
                   <button onClick={() => setActiveTab('manual')} className={`pb-3 px-1 text-sm font-bold transition-colors ${activeTab === 'manual' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-400 hover:text-slate-600'}`}>
                       Manual Entry
                   </button>
                   <button onClick={() => setActiveTab('import')} className={`pb-3 px-1 text-sm font-bold transition-colors ${activeTab === 'import' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-400 hover:text-slate-600'}`}>
                       Import from Global DB
                   </button>
               </div>

               {activeTab === 'manual' ? (
                   <form onSubmit={handleManualSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-500 uppercase">Institution Name</label>
                           <input className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" placeholder="e.g. Tokyo International School" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                       </div>
                       <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-500 uppercase">Location (City, Prefecture)</label>
                           <input className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" placeholder="e.g. Shinjuku, Tokyo" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
                       </div>
                       <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-500 uppercase">Institution Type</label>
                           <select className="w-full border border-slate-300 p-3 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                               <option>Language School</option>
                               <option>University</option>
                               <option>Vocational College</option>
                           </select>
                       </div>
                       <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-500 uppercase">Commission (%)</label>
                           <input type="number" className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" placeholder="e.g. 15" value={formData.commissionPercentage} onChange={e => setFormData({...formData, commissionPercentage: e.target.value})} />
                       </div>
                       
                       <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                           <button type="submit" disabled={isLoading} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-emerald-700 transition-all flex items-center gap-2">
                               {isLoading ? 'Saving...' : <><Plus size={18}/> Save Institution</>}
                           </button>
                       </div>
                   </form>
               ) : (
                   <div className="space-y-6">
                       <div className="flex gap-3">
                           <div className="relative flex-1">
                               <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
                               <input 
                                   className="w-full border border-slate-300 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" 
                                   placeholder="Search for universities in the global master database..." 
                                   value={masterQuery}
                                   onChange={e => setMasterQuery(e.target.value)}
                                   onKeyDown={e => e.key === 'Enter' && handleSearchMaster()}
                               />
                           </div>
                           <button onClick={handleSearchMaster} className="bg-emerald-600 text-white px-6 rounded-xl font-bold hover:bg-emerald-700 transition-colors">Search DB</button>
                       </div>
                       
                       <div className="border border-slate-200 rounded-xl overflow-hidden">
                           <div className="bg-slate-50 p-3 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">Search Results</div>
                           <div className="max-h-64 overflow-y-auto custom-scrollbar bg-white">
                               {masterSearchResults.length > 0 ? (
                                   masterSearchResults.map(mUni => (
                                       <div key={mUni._id} className="p-4 border-b border-slate-100 flex justify-between items-center hover:bg-emerald-50/50 transition-colors group">
                                           <div>
                                               <div className="font-bold text-slate-800 text-sm group-hover:text-emerald-700">{mUni.name}</div>
                                               <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                                                   <MapPin size={12}/> {mUni.location}
                                                   <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                   {mUni.type}
                                               </div>
                                           </div>
                                           <button onClick={() => handleImport(mUni)} className="text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors">
                                               <Download size={14}/> Import
                                           </button>
                                       </div>
                                   ))
                               ) : (
                                   <div className="p-8 text-center text-slate-400">
                                       <Building2 size={32} className="mx-auto mb-2 opacity-20"/>
                                       <p className="text-sm">Enter a search term above to find schools.</p>
                                   </div>
                               )}
                           </div>
                       </div>
                   </div>
               )}
           </div>
       )}

       {/* MODE: LIST VIEW */}
       {viewMode === 'list' && (
           <div className="space-y-6">
               
               {/* Search & Filter Bar */}
               <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
                   <div className="relative flex-1">
                       <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                       <input 
                           placeholder="Search by name or city..." 
                           className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                           value={searchTerm}
                           onChange={e => setSearchTerm(e.target.value)}
                       />
                   </div>
                   
                   <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                       <div className="relative min-w-[140px]">
                           <Filter className="absolute left-3 top-3 text-slate-400" size={14} />
                           <select 
                               className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 focus:border-emerald-500 outline-none appearance-none cursor-pointer"
                               value={filterType}
                               onChange={e => setFilterType(e.target.value)}
                           >
                               <option value="All">All Types</option>
                               <option>Language School</option>
                               <option>University</option>
                               <option>Vocational College</option>
                           </select>
                       </div>

                       <div className="relative min-w-[140px]">
                           <MapPin className="absolute left-3 top-3 text-slate-400" size={14} />
                           <select 
                               className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 focus:border-emerald-500 outline-none appearance-none cursor-pointer"
                               value={filterLocation}
                               onChange={e => setFilterLocation(e.target.value)}
                           >
                               {uniqueLocations.map(loc => (
                                   <option key={loc} value={loc}>{loc}</option>
                               ))}
                           </select>
                       </div>
                   </div>
               </div>

               {/* Results Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                   {filteredUniversities.map(uni => (
                       <div key={uni._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group relative">
                           <div className="flex justify-between items-start mb-4">
                               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-100 transition-colors">
                                   <Building2 size={24}/>
                               </div>
                               <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider 
                                   ${uni.type === 'University' ? 'bg-blue-50 text-blue-700' : 
                                     uni.type === 'Vocational College' ? 'bg-purple-50 text-purple-700' : 
                                     'bg-amber-50 text-amber-700'}`}>
                                   {uni.type}
                               </span>
                           </div>
                           
                           <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1">{uni.name}</h3>
                           
                           <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
                               <MapPin size={14} className="text-slate-400"/>
                               {uni.location}
                           </div>

                           <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-medium">
                               <div className="text-slate-400">Commission</div>
                               <div className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                                   {uni.commissionPercentage}%
                               </div>
                           </div>
                       </div>
                   ))}
               </div>

               {filteredUniversities.length === 0 && (
                   <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                       <Search size={48} className="mb-4 opacity-20"/>
                       <p>No universities found matching your filters.</p>
                       <button onClick={() => {setSearchTerm(''); setFilterType('All'); setFilterLocation('All');}} className="mt-2 text-emerald-600 font-bold hover:underline">Clear Filters</button>
                   </div>
               )}
           </div>
       )}
    </div>
  );
}