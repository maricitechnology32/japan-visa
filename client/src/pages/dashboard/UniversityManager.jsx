import { Building2, Download, MapPin, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addUniversity, getUniversities, importUniversity, reset, searchMaster } from '../../features/universities/universitySlice';

export default function UniversityManager() {
  const dispatch = useDispatch();
  const { universities, masterSearchResults, isLoading, isSuccess, message } = useSelector((state) => state.universities);
  
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('manual'); 
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
      name: '', location: '', type: 'Language School', commissionPercentage: 0
  });

  useEffect(() => {
      dispatch(getUniversities());
  }, [dispatch]);

  useEffect(() => {
      if(isSuccess && message) {
          toast.success(message);
          if (activeTab === 'manual') {
            setShowForm(false);
            setFormData({ name: '', location: '', type: 'Language School', commissionPercentage: 0 });
          }
          dispatch(reset());
      }
  }, [isSuccess, message, dispatch, activeTab]);

  const handleManualSubmit = (e) => {
      e.preventDefault();
      dispatch(addUniversity(formData));
  };

  const handleSearchMaster = () => {
      if (searchQuery.length > 2) {
          dispatch(searchMaster(searchQuery));
      }
  };

  const handleImport = (mUni) => {
      const commission = prompt(`Enter commission rate for ${mUni.name} (e.g., 15):`);
      if (commission !== null && !isNaN(commission)) {
          dispatch(importUniversity({ masterId: mUni._id, commission: Number(commission) }));
      } else {
          toast.info("Import cancelled or invalid commission rate.");
      }
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">University Database</h2>
            <p className="text-gray-500">Manage your partner schools.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700">
             <Plus size={18}/> Add New
          </button>
       </div>

       {showForm && (
           <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 animate-in slide-in-from-top-2">
               
               <div className="flex gap-4 border-b mb-4">
                   <button onClick={() => setActiveTab('manual')} className={`pb-2 px-2 text-sm font-bold ${activeTab === 'manual' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}>Manual Entry</button>
                   <button onClick={() => setActiveTab('import')} className={`pb-2 px-2 text-sm font-bold ${activeTab === 'import' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}>Import from Master DB</button>
               </div>

               {activeTab === 'manual' ? (
                   <form onSubmit={handleManualSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <input className="border p-2 rounded" placeholder="Name (e.g. Tokyo Intl School)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                       <input className="border p-2 rounded" placeholder="Location (e.g. Shinjuku, Tokyo)" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
                       <select className="border p-2 rounded bg-white" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                           <option>Language School</option>
                           <option>University</option>
                           <option>Vocational College</option>
                       </select>
                       <input type="number" className="border p-2 rounded" placeholder="Commission %" value={formData.commissionPercentage} onChange={e => setFormData({...formData, commissionPercentage: e.target.value})} />
                       
                       <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                           <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                           <button disabled={isLoading} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                               {isLoading ? 'Saving...' : 'Save School'}
                           </button>
                       </div>
                   </form>
               ) : (
                   <div className="space-y-4">
                       <div className="flex gap-2">
                           <input 
                               className="flex-1 border p-2 rounded" 
                               placeholder="Search global database..." 
                               value={searchQuery}
                               onChange={e => setSearchQuery(e.target.value)}
                           />
                           <button onClick={handleSearchMaster} className="bg-green-600 text-white px-4 rounded flex items-center gap-2"><Search size={16}/> Search</button>
                       </div>
                       <div className="max-h-60 overflow-y-auto border rounded">
                           {masterSearchResults.map(mUni => (
                               <div key={mUni._id} className="p-3 border-b flex justify-between items-center hover:bg-gray-50">
                                   <div>
                                       <div className="font-bold text-sm">{mUni.name}</div>
                                       <div className="text-xs text-gray-500">{mUni.location} • {mUni.type}</div>
                                   </div>
                                   <button onClick={() => handleImport(mUni)} className="text-green-600 hover:bg-green-50 p-2 rounded"><Download size={18}/> Import</button>
                               </div>
                           ))}
                           {masterSearchResults.length === 0 && searchQuery.length > 2 && <div className="p-4 text-center text-gray-400 text-sm">No results found</div>}
                       </div>
                   </div>
               )}
           </div>
       )}

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {universities.map(uni => (
               <div key={uni._id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
                   <div className="flex justify-between items-start mb-2">
                       <div className="bg-green-50 p-2 rounded-md text-green-600"><Building2 size={20}/></div>
                       <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{uni.type}</span>
                   </div>
                   <h3 className="font-bold text-gray-900">{uni.name}</h3>
                   <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                       <MapPin size={14}/> {uni.location}
                   </div>
                   {uni.commissionPercentage > 0 && (
                       <div className="mt-3 pt-3 border-t text-xs font-medium text-green-700">
                           Commission: {uni.commissionPercentage}%
                       </div>
                   )}
               </div>
           ))}
       </div>
    </div>
  );
}