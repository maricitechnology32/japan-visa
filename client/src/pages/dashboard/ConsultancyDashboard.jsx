

// import { Building2, GraduationCap, Layout, Settings, Shield } from 'lucide-react'; // Added Layout icon
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { getStudents, inviteStudent, reset } from '../../features/students/studentSlice';

// // Sub-components
// import ConsultancySettings from './ConsultancySettings';
// import StaffManagement from './StaffManagement';
// import UniversityManager from './UniversityManager';
// import KanbanBoard from '../../components/dashboard/KanbanBoard'; // NEW IMPORT

// // Icons for Action Bar
// import { Eye, Filter, Loader2, Mail, Search, UserPlus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// export default function ConsultancyDashboard() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const { students, isLoading, isError, isSuccess, message } = useSelector((state) => state.students);
//   const { user } = useSelector((state) => state.auth);

//   // INTERNAL TABS STATE
//   const [activeTab, setActiveTab] = useState('pipeline'); // Default to Pipeline for better UX

//   // Local State for Student List
//   const [showInviteForm, setShowInviteForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [formData, setFormData] = useState({ name: '', email: '' });

//   // Permissions
//   const canManageStaff = user?.role === 'consultancy_admin' || user?.subRole === 'manager';
//   const canManageUniversities = canManageStaff || user?.subRole === 'counselor';

//   useEffect(() => {
//     // Fetch students if on list or pipeline view
//     if (activeTab === 'students' || activeTab === 'pipeline') {
//         dispatch(getStudents());
//     }
//     return () => { dispatch(reset()); };
//   }, [dispatch, activeTab]);

//   useEffect(() => {
//     if (isError) toast.error(message);
//     if (isSuccess && message) toast.success(message);
//   }, [isError, isSuccess, message]);

//   const handleInvite = async (e) => {
//       e.preventDefault();
//       if (!formData.name || !formData.email) return toast.error("Name and Email required");
//       await dispatch(inviteStudent(formData));
//       setShowInviteForm(false);
//       setFormData({ name: '', email: '' });
//   };

//   const filteredStudents = students?.filter(student => {
//       const matchesSearch = (student.personalInfo?.firstName + ' ' + student.personalInfo?.lastName).toLowerCase().includes(searchTerm.toLowerCase()) || 
//                             student.personalInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = statusFilter === 'all' || student.profileStatus === statusFilter;
//       return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="space-y-6">
      
//       {/* Top Tab Bar */}
//       <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-1">
//         <div className="flex gap-6 overflow-x-auto hide-scrollbar">
//             <button 
//                 onClick={() => setActiveTab('pipeline')}
//                 className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'pipeline' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//             >
//                 <Layout size={18} /> Pipeline
//             </button>
//             <button 
//                 onClick={() => setActiveTab('students')}
//                 className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'students' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//             >
//                 <GraduationCap size={18} /> Student List
//             </button>
            
//             {canManageUniversities && (
//                 <button 
//                     onClick={() => setActiveTab('universities')}
//                     className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'universities' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                 >
//                     <Building2 size={18} /> Universities
//                 </button>
//             )}

//             {canManageStaff && (
//                 <>
//                     <button 
//                         onClick={() => setActiveTab('staff')}
//                         className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'staff' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                     >
//                         <Shield size={18} /> Staff
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('settings')}
//                         className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                     >
//                         <Settings size={18} /> Settings
//                     </button>
//                 </>
//             )}
//         </div>
        
//         {/* Quick Invite Button (Visible on Pipeline/List) */}
//         {(activeTab === 'students' || activeTab === 'pipeline') && (
//              <button 
//                 onClick={() => setShowInviteForm(!showInviteForm)}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-sm transition-colors text-sm mb-2"
//              >
//                <UserPlus size={16} /> Invite
//              </button>
//         )}
//       </div>

//       {/* --- CONTENT RENDER --- */}
      
//       {/* 1. KANBAN PIPELINE */}
//       {activeTab === 'pipeline' && (
//           <div className="animate-in fade-in zoom-in duration-300">
//               <KanbanBoard />
//           </div>
//       )}

//       {/* 2. STAFF, SETTINGS, UNIVERSITIES */}
//       {activeTab === 'staff' && canManageStaff && <StaffManagement />}
//       {activeTab === 'settings' && canManageStaff && <ConsultancySettings />}
//       {activeTab === 'universities' && canManageUniversities && <UniversityManager />}

//       {/* 3. STUDENT LIST (Existing Table) */}
//       {activeTab === 'students' && (
//         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            
//             {showInviteForm && (
//                 <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 animate-in slide-in-from-top-2">
//                     <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-700"><Mail size={20}/> Send Invitation</h3>
//                     <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4 items-end">
//                         <input className="w-full border p-2 rounded" placeholder="Name" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
//                         <input className="w-full border p-2 rounded" placeholder="Email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} />
//                         <button disabled={isLoading} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">{isLoading ? <Loader2 className="animate-spin"/> : 'Send'}</button>
//                     </form>
//                 </div>
//             )}

//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//                  {/* Filters Bar */}
//                  <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
//                     <div className="flex gap-2 w-full md:w-auto ml-auto">
//                         <div className="relative">
//                             <select className="pl-9 pr-8 py-2 border rounded-md text-sm appearance-none bg-white" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//                                 <option value="all">All Status</option>
//                                 <option value="lead">Lead</option>
//                                 <option value="draft">Draft</option>
//                                 <option value="submitted">Submitted</option>
//                                 <option value="verified">Verified</option>
//                             </select>
//                             <Filter className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
//                         </div>
//                         <div className="relative">
//                             <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
//                             <input className="pl-9 pr-4 py-2 border rounded-md text-sm w-64" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                         </div>
//                     </div>
//                  </div>

//                  {/* Table */}
//                  <div className="overflow-x-auto">
//                      <table className="w-full text-left text-sm">
//                          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//                              <tr>
//                                  <th className="px-6 py-3">Name</th>
//                                  <th className="px-6 py-3">Status</th>
//                                  <th className="px-6 py-3 text-right">Action</th>
//                              </tr>
//                          </thead>
//                          <tbody className="divide-y divide-gray-100">
//                              {filteredStudents?.map(student => (
//                                  <tr key={student._id} className="hover:bg-gray-50 transition-colors">
//                                      <td className="px-6 py-4 font-medium flex items-center gap-3">
//                                          <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">{student.personalInfo?.firstName?.[0]}</div>
//                                          <div>{student.personalInfo?.firstName} {student.personalInfo?.lastName}<div className="text-xs text-gray-400 font-normal">{student.personalInfo?.email}</div></div>
//                                      </td>
//                                      <td className="px-6 py-4">
//                                         <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize bg-gray-100 text-gray-700`}>{student.profileStatus}</span>
//                                      </td>
//                                      <td className="px-6 py-4 text-right">
//                                          <button onClick={() => navigate(`/dashboard/student/${student._id}`)} className="text-green-600 hover:text-green-800 font-medium text-xs border border-green-200 px-3 py-1 rounded hover:bg-green-50">View</button>
//                                      </td>
//                                  </tr>
//                              ))}
//                          </tbody>
//                      </table>
//                  </div>
//             </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { Building2, Calendar, GraduationCap, Layout, Settings, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getStudents, inviteStudent, reset } from '../../features/students/studentSlice';

// --- SUB-COMPONENTS ---
import ConsultancySettings from './ConsultancySettings';
import EventCalendar from './EventCalendar'; // NEW IMPORT
import StaffManagement from './StaffManagement';
import UniversityManager from './UniversityManager';
import KanbanBoard from '../../components/dashboard/KanbanBoard';

// --- ICONS & UTILS ---
import { Filter, Loader2, Mail, Search, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ConsultancyDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { students, isLoading, isError, isSuccess, message } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);

  // --- TAB STATE ---
  // Defaulting to 'pipeline' for better UX, added 'calendar' option
  const [activeTab, setActiveTab] = useState('pipeline'); 

  // --- LOCAL STATE (For Student List) ---
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({ name: '', email: '' });

  // --- PERMISSIONS ---
  const canManageStaff = user?.role === 'consultancy_admin' || user?.subRole === 'manager';
  const canManageUniversities = canManageStaff || user?.subRole === 'counselor';

  // --- EFFECTS ---
  useEffect(() => {
    // Only fetch students if we are on a view that needs them
    if (activeTab === 'students' || activeTab === 'pipeline') {
        dispatch(getStudents());
    }
    return () => { dispatch(reset()); };
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (isError && message) toast.error(message);
    if (isSuccess && message) toast.success(message);
  }, [isError, isSuccess, message]);

  // --- HANDLERS ---
  const handleInvite = async (e) => {
      e.preventDefault();
      if (!formData.name || !formData.email) return toast.error("Name and Email required");
      await dispatch(inviteStudent(formData));
      setShowInviteForm(false);
      setFormData({ name: '', email: '' });
  };

  const filteredStudents = students?.filter(student => {
      const matchesSearch = (student.personalInfo?.firstName + ' ' + student.personalInfo?.lastName).toLowerCase().includes(searchTerm.toLowerCase()) || 
                            student.personalInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || student.profileStatus === statusFilter;
      return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* --- TOP TAB NAVIGATION --- */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-1">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar">
            
            {/* 1. Pipeline */}
            <button 
                onClick={() => setActiveTab('pipeline')}
                className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'pipeline' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                <Layout size={18} /> Pipeline
            </button>

            {/* 2. Calendar (NEW) */}
            <button 
                onClick={() => setActiveTab('calendar')}
                className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'calendar' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                <Calendar size={18} /> Calendar
            </button>

            {/* 3. Student List */}
            <button 
                onClick={() => setActiveTab('students')}
                className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'students' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                <GraduationCap size={18} /> Student List
            </button>
            
            {/* 4. Universities */}
            {canManageUniversities && (
                <button 
                    onClick={() => setActiveTab('universities')}
                    className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'universities' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <Building2 size={18} /> Universities
                </button>
            )}

            {/* 5. Admin Settings */}
            {canManageStaff && (
                <>
                    <button 
                        onClick={() => setActiveTab('staff')}
                        className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'staff' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Shield size={18} /> Staff
                    </button>
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Settings size={18} /> Settings
                    </button>
                </>
            )}
        </div>
        
        {/* Quick Action: Invite Student (Visible on List/Pipeline) */}
        {(activeTab === 'students' || activeTab === 'pipeline') && (
             <button 
                onClick={() => setShowInviteForm(!showInviteForm)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-sm transition-colors text-sm mb-2"
             >
               <UserPlus size={16} /> Invite
             </button>
        )}
      </div>

      {/* --- CONTENT AREA --- */}
      
      {/* 1. KANBAN PIPELINE */}
      {activeTab === 'pipeline' && (
          <div className="animate-in fade-in zoom-in duration-300">
              <KanbanBoard />
          </div>
      )}

      {/* 2. EVENT CALENDAR (NEW) */}
      {activeTab === 'calendar' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-[calc(100vh-200px)]">
              <EventCalendar />
          </div>
      )}

      {/* 3. UNIVERSITIES, STAFF, SETTINGS */}
      {activeTab === 'universities' && canManageUniversities && <UniversityManager />}
      {activeTab === 'staff' && canManageStaff && <StaffManagement />}
      {activeTab === 'settings' && canManageStaff && <ConsultancySettings />}

      {/* 4. STUDENT LIST VIEW */}
      {activeTab === 'students' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            
            {showInviteForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100 animate-in slide-in-from-top-2">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-700"><Mail size={20}/> Send Invitation</h3>
                    <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="w-full">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Full Name</label>
                            <input className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-200 outline-none" placeholder="e.g. John Doe" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Email Address</label>
                            <input className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-200 outline-none" placeholder="student@example.com" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} />
                        </div>
                        <button disabled={isLoading} className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition-colors font-medium">
                            {isLoading ? <Loader2 className="animate-spin"/> : 'Send Invite'}
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                 {/* Filters Bar */}
                 <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2 w-full md:w-auto ml-auto">
                        <div className="relative">
                            <select className="pl-9 pr-8 py-2 border rounded-md text-sm appearance-none bg-white focus:ring-2 focus:ring-emerald-200 outline-none cursor-pointer" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="all">All Status</option>
                                <option value="lead">Lead</option>
                                <option value="draft">Draft</option>
                                <option value="submitted">Submitted</option>
                                <option value="verified">Verified</option>
                            </select>
                            <Filter className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                        </div>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                            <input className="pl-9 pr-4 py-2 border rounded-md text-sm w-64 focus:ring-2 focus:ring-emerald-200 outline-none" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                    </div>
                 </div>

                 {/* Table */}
                 <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm">
                         <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
                             <tr>
                                 <th className="px-6 py-3">Student Name</th>
                                 <th className="px-6 py-3">Status</th>
                                 <th className="px-6 py-3 text-right">Action</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                             {filteredStudents?.map(student => (
                                 <tr key={student._id} className="hover:bg-gray-50 transition-colors group">
                                     <td className="px-6 py-4 font-medium flex items-center gap-3">
                                         <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                                            {student.personalInfo?.firstName?.[0] || 'U'}
                                         </div>
                                         <div>
                                            <div className="text-gray-900 font-semibold">{student.personalInfo?.firstName} {student.personalInfo?.lastName}</div>
                                            <div className="text-xs text-gray-400 font-normal">{student.personalInfo?.email}</div>
                                         </div>
                                     </td>
                                     <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border 
                                            ${student.profileStatus === 'verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                              student.profileStatus === 'submitted' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                                              'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                            {student.profileStatus}
                                        </span>
                                     </td>
                                     <td className="px-6 py-4 text-right">
                                         <button 
                                            onClick={() => navigate(`/dashboard/student/${student._id}`)} 
                                            className="text-emerald-600 hover:text-emerald-800 font-medium text-xs border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
                                         >
                                            View Profile
                                         </button>
                                     </td>
                                 </tr>
                             ))}
                             {filteredStudents?.length === 0 && (
                                 <tr>
                                     <td colSpan="3" className="px-6 py-8 text-center text-gray-400 text-sm">
                                         No students found matching your filters.
                                     </td>
                                 </tr>
                             )}
                         </tbody>
                     </table>
                 </div>
            </div>
        </div>
      )}
    </div>
  );
}