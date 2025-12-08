// import { Building2, Loader2, Mail, Phone, Plus } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { createConsultancy, getConsultancies } from '../../features/consultancies/consultancySlice';

// export default function SuperAdminDashboard() {
//   const dispatch = useDispatch();
//   const { consultancies, isLoading, isError, message } = useSelector((state) => state.consultancies);

//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     website: ''
//   });

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }
//     dispatch(getConsultancies());
//   }, [dispatch, isError, message]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(!formData.name || !formData.email) return toast.error("Name and Email are required");
    
//     await dispatch(createConsultancy(formData));
//     toast.success("Consultancy added & Invite sent!");
//     setShowForm(false);
//     setFormData({ name: '', email: '', phone: '', address: '', website: '' });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//             <h2 className="text-2xl font-bold text-gray-900">Consultancy Management</h2>
//             <p className="text-gray-500">Manage your SaaS tenants</p>
//         </div>
//         <button 
//             onClick={() => setShowForm(!showForm)}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
//         >
//             <Plus size={20} /> Add Consultancy
//         </button>
//       </div>

//       {/* Add Form */}
//       {showForm && (
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-in slide-in-from-top-2">
//             <h3 className="text-lg font-semibold mb-4">Register New Consultancy</h3>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input 
//                     placeholder="Consultancy Name" 
//                     className="border p-2 rounded"
//                     value={formData.name}
//                     onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 />
//                 <input 
//                     placeholder="Email Address (Admin Login)" 
//                     className="border p-2 rounded"
//                     value={formData.email}
//                     onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 />
//                 <input 
//                     placeholder="Phone Number" 
//                     className="border p-2 rounded"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                 />
//                 <input 
//                     placeholder="Website" 
//                     className="border p-2 rounded"
//                     value={formData.website}
//                     onChange={(e) => setFormData({...formData, website: e.target.value})}
//                 />
//                 <div className="md:col-span-2 flex justify-end gap-2 mt-2">
//                     <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600">Cancel</button>
//                     <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
//                         Register & Send Invite
//                     </button>
//                 </div>
//             </form>
//         </div>
//       )}

//       {/* List */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {isLoading && <Loader2 className="animate-spin" />}
        
//         {consultancies.map((consultancy) => (
//             <div key={consultancy._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//                 <div className="flex items-start justify-between mb-4">
//                     <div className="p-2 bg-green-50 rounded-lg">
//                         <Building2 className="text-green-600" size={24} />
//                     </div>
//                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${consultancy.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         {consultancy.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                 </div>
//                 <h3 className="font-bold text-lg mb-2">{consultancy.name}</h3>
//                 <div className="space-y-2 text-sm text-gray-600">
//                     <div className="flex items-center gap-2">
//                         <Mail size={16} /> {consultancy.email}
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <Phone size={16} /> {consultancy.phone || 'N/A'}
//                     </div>
//                 </div>
//                 <div className="mt-4 pt-4 border-t text-xs text-gray-400">
//                     Joined: {new Date(consultancy.createdAt).toLocaleDateString()}
//                 </div>
//             </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { Building2, Calendar, Loader2, Mail, Phone, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createConsultancy, getConsultancies } from '../../features/consultancies/consultancySlice';

// Import Holiday Manager
import HolidayManager from './HolidayManager';

export default function SuperAdminDashboard() {
  const dispatch = useDispatch();
  const { consultancies, isLoading, isError, message } = useSelector((state) => state.consultancies);

  // UI State
  const [activeTab, setActiveTab] = useState('consultancies'); // 'consultancies', 'holidays'
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    website: ''
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // Only fetch if on consultancies tab
    if (activeTab === 'consultancies') {
        dispatch(getConsultancies());
    }
  }, [dispatch, isError, message, activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email) return toast.error("Name and Email are required");
    
    await dispatch(createConsultancy(formData));
    toast.success("Consultancy added & Invite sent!");
    setShowForm(false);
    setFormData({ name: '', email: '', phone: '', address: '', website: '' });
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-1 gap-4">
          <div className="flex gap-6">
              <button 
                  onClick={() => setActiveTab('consultancies')}
                  className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'consultancies' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                  <Building2 size={18} /> Consultancies
              </button>
              <button 
                  onClick={() => setActiveTab('holidays')}
                  className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'holidays' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                  <Calendar size={18} /> Global Holidays
              </button>
          </div>

          {/* Add Button (Only for Consultancies Tab) */}
          {activeTab === 'consultancies' && (
              <button 
                onClick={() => setShowForm(!showForm)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 mb-2"
              >
                <Plus size={20} /> Add Consultancy
              </button>
          )}
      </div>

      {/* --- TAB 1: CONSULTANCIES --- */}
      {activeTab === 'consultancies' && (
        <div className="animate-in fade-in">
            {/* Add Form */}
            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Register New Consultancy</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Consultancy Name" className="border p-2 rounded" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        <input placeholder="Email Address (Admin Login)" className="border p-2 rounded" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        <input placeholder="Phone Number" className="border p-2 rounded" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                        <input placeholder="Website" className="border p-2 rounded" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} />
                        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Register & Send Invite</button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {isLoading && <div className="col-span-3 flex justify-center py-10"><Loader2 className="animate-spin text-green-600" size={32}/></div>}
                
                {!isLoading && consultancies.map((consultancy) => (
                    <div key={consultancy._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-green-50 rounded-lg"><Building2 className="text-green-600" size={24} /></div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${consultancy.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {consultancy.isActive ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{consultancy.name}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2"><Mail size={16} /> {consultancy.email}</div>
                            <div className="flex items-center gap-2"><Phone size={16} /> {consultancy.phone || 'N/A'}</div>
                        </div>
                        <div className="mt-4 pt-4 border-t text-xs text-gray-400">
                            Joined: {new Date(consultancy.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- TAB 2: HOLIDAYS --- */}
      {activeTab === 'holidays' && (
          <HolidayManager />
      )}

    </div>
  );
}