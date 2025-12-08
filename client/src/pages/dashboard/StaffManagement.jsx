// import { BadgeCheck, Mail, Shield, Trash2, UserPlus } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { addStaff, getStaff, removeStaff, reset } from '../../features/staff/staffSlice';

// export default function StaffManagement() {
//   const dispatch = useDispatch();
//   const { staffList, isLoading, isError, isSuccess, message } = useSelector((state) => state.staff);

//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ name: '', email: '', subRole: 'receptionist' });

//   useEffect(() => {
//     if (isError) toast.error(message);
//     if (isSuccess && message) toast.success(message);
//     dispatch(reset());
//     dispatch(getStaff());
//   }, [dispatch, isError, isSuccess, message]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email) return toast.error("All fields required");
//     dispatch(addStaff(formData));
//     setShowForm(false);
//     setFormData({ name: '', email: '', subRole: 'receptionist' });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Staff Access Control</h2>
//           <p className="text-gray-500">Manage permissions for your team.</p>
//         </div>
//         <button 
//           onClick={() => setShowForm(!showForm)}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
//         >
//           <UserPlus size={18} /> Add Staff
//         </button>
//       </div>

//       {/* Add Staff Form */}
//       {showForm && (
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 animate-in slide-in-from-top-2">
//             <h3 className="text-lg font-semibold mb-4">New Staff Member</h3>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
//                 <div className="w-full">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
//                     <input className="w-full border p-2 rounded mt-1" placeholder="e.g. Sarah Smith" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
//                 </div>
//                 <div className="w-full">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Email (Login ID)</label>
//                     <input className="w-full border p-2 rounded mt-1" placeholder="staff@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
//                 </div>
//                 <div className="w-full">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Role</label>
//                     <select className="w-full border p-2.5 rounded mt-1 bg-white" value={formData.subRole} onChange={(e) => setFormData({...formData, subRole: e.target.value})}>
//                         <option value="receptionist">Receptionist (View Only)</option>
//                         <option value="document_officer">Document Officer (Full Access)</option>
//                     </select>
//                 </div>
//                 <button disabled={isLoading} className="bg-green-600 text-white px-6 py-2.5 rounded hover:bg-green-700 w-full">
//                     {isLoading ? 'Adding...' : 'Create Login'}
//                 </button>
//             </form>
//         </div>
//       )}

//       {/* Staff List */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <table className="w-full text-left text-sm">
//             <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//                 <tr>
//                     <th className="px-6 py-3">Staff Name</th>
//                     <th className="px-6 py-3">Role</th>
//                     <th className="px-6 py-3">Contact</th>
//                     <th className="px-6 py-3 text-right">Action</th>
//                 </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//                 {staffList.map((staff) => (
//                     <tr key={staff._id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 font-medium flex items-center gap-2">
//                             <div className="bg-green-100 p-2 rounded-full text-green-600">
//                                 <Shield size={16} />
//                             </div>
//                             {staff.name}
//                         </td>
//                         <td className="px-6 py-4">
//                             {staff.subRole === 'document_officer' ? (
//                                 <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
//                                     <BadgeCheck size={12} /> Doc Officer
//                                 </span>
//                             ) : (
//                                 <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
//                                     Receptionist
//                                 </span>
//                             )}
//                         </td>
//                         <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
//                             <Mail size={14} /> {staff.email}
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                             <button 
//                                 onClick={() => dispatch(removeStaff(staff._id))}
//                                 className="text-red-500 hover:bg-red-50 p-2 rounded transition" 
//                                 title="Remove Access"
//                             >
//                                 <Trash2 size={16} />
//                             </button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { BadgeCheck, Loader2, Mail, Shield, Trash2, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addStaff, getStaff, removeStaff, reset } from '../../features/staff/staffSlice';

export default function StaffManagement() {
  const dispatch = useDispatch();
  const { staffList, isLoading, isError, isSuccess, message } = useSelector((state) => state.staff);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subRole: 'receptionist' });

  // Fetch staff list on load
  useEffect(() => {
    dispatch(getStaff());
    
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Handle notifications
  useEffect(() => {
    if (isError && message) {
      toast.error(message);
      dispatch(reset()); // Reset after showing toast
    }
    if (isSuccess && message) {
      toast.success(message);
      dispatch(reset()); // Reset after showing toast
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return toast.error("All fields required");
    dispatch(addStaff(formData));
    setShowForm(false);
    setFormData({ name: '', email: '', subRole: 'receptionist' });
  };

  const handleRemove = (id) => {
      if(window.confirm("Are you sure you want to remove this staff member? They will lose access immediately.")) {
          dispatch(removeStaff(id));
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Staff Access Control</h2>
          <p className="text-gray-500">Manage permissions for your team members.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-sm transition-colors"
        >
          <UserPlus size={18} /> {showForm ? 'Cancel' : 'Add Staff'}
        </button>
      </div>

      {/* Add Staff Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 animate-in slide-in-from-top-2">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Shield size={20} className="text-green-600" />
                Create New Staff Login
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                    <input 
                        className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition" 
                        placeholder="e.g. Sarah Smith" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                </div>
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email (Login ID)</label>
                    <input 
                        className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition" 
                        placeholder="staff@company.com" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                </div>
                <div className="w-full">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role & Permission</label>
                    <select 
                        className="w-full border p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-green-500 outline-none transition" 
                        value={formData.subRole} 
                        onChange={(e) => setFormData({...formData, subRole: e.target.value})}
                    >
                        <option value="receptionist">Receptionist (View & Invite Only)</option>
                        <option value="document_officer">Document Officer (Full Access)</option>
                        <option value="counselor">Counselor (Uni Management)</option>
                    </select>
                </div>
                <button 
                    disabled={isLoading} 
                    className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 w-full font-medium shadow-md flex justify-center items-center"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Create Login'}
                </button>
            </form>
        </div>
      )}

      {/* Staff List Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-700">Active Staff Members ({staffList?.length || 0})</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3">Staff Name</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Contact</th>
                        <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(!staffList || staffList.length === 0) && (
                        <tr>
                            <td colSpan="4" className="text-center py-8 text-gray-400">
                                {isLoading ? "Loading staff list..." : "No staff members added yet."}
                            </td>
                        </tr>
                    )}
                    {staffList?.map((staff) => (
                        <tr key={staff._id} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4 font-medium flex items-center gap-3 text-gray-900">
                                <div className="bg-green-100 p-2 rounded-full text-green-600 group-hover:bg-green-200 transition">
                                    <Shield size={18} />
                                </div>
                                {staff.name}
                            </td>
                            <td className="px-6 py-4">
                                {staff.subRole === 'document_officer' ? (
                                    <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 w-fit border border-green-200">
                                        <BadgeCheck size={12} /> Doc Officer
                                    </span>
                                ) : staff.subRole === 'counselor' ? (
                                    <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 w-fit border border-purple-200">
                                        <BadgeCheck size={12} /> Counselor
                                    </span>
                                ) : (
                                    <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-bold border border-gray-200">
                                        Receptionist
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                                <Mail size={14} /> {staff.email}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    onClick={() => handleRemove(staff._id)}
                                    className="text-gray-400 hover:text-red-600 p-2 rounded transition hover:bg-red-50" 
                                    title="Remove Access"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}