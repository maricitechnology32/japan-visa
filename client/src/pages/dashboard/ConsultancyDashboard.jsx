// // // import { GraduationCap, Loader2, Mail, Search, UserPlus } from 'lucide-react';
// // // import { useEffect, useState } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { toast } from 'react-toastify';
// // // import { getStudents, inviteStudent, reset } from '../../features/students/studentSlice';

// // // export default function ConsultancyDashboard() {
// // //   const dispatch = useDispatch();
// // //   const { students, isLoading, isError, isSuccess, message } = useSelector((state) => state.students);
// // //   const { user } = useSelector((state) => state.auth);

// // //   const [showInviteForm, setShowInviteForm] = useState(false);
// // //   const [formData, setFormData] = useState({ name: '', email: '' });

// // //   // 1. DATA FETCHING EFFECT - Runs only ONCE on mount
// // //   useEffect(() => {
// // //     dispatch(getStudents());

// // //     return () => {
// // //       dispatch(reset());
// // //     };
// // //   }, [dispatch]); 

// // //   // 2. NOTIFICATION EFFECT - Runs only when error/success state changes
// // //   useEffect(() => {
// // //     if (isError) {
// // //       toast.error(message);
// // //     }
// // //     // Only show success toast if it's an invite action (not just data fetching)
// // //     // We check if message exists to avoid empty toasts
// // //     if (isSuccess && message) {
// // //       toast.success(message);
// // //     }
// // //   }, [isError, isSuccess, message]);

// // //   const handleInvite = async (e) => {
// // //     e.preventDefault();
// // //     if (!formData.name || !formData.email) return toast.error("Name and Email required");
    
// // //     await dispatch(inviteStudent(formData));
// // //     setShowInviteForm(false);
// // //     setFormData({ name: '', email: '' });
// // //   };

// // //   return (
// // //     <div className="space-y-6">
// // //       {/* Header Section */}
// // //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// // //         <div>
// // //           <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
// // //           <p className="text-gray-500">Manage visa applicants for {user?.name}</p>
// // //         </div>
// // //         <button 
// // //           onClick={() => setShowInviteForm(!showInviteForm)}
// // //           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
// // //         >
// // //           <UserPlus size={18} /> Invite Student
// // //         </button>
// // //       </div>

// // //       {/* Invite Form (Collapsible) */}
// // //       {showInviteForm && (
// // //         <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 animate-in slide-in-from-top-2">
// // //             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
// // //                 <Mail className="text-green-600" size={20} /> Send Invitation
// // //             </h3>
// // //             <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4 items-end">
// // //                 <div className="w-full">
// // //                     <label className="text-xs font-semibold uppercase text-gray-500">Full Name</label>
// // //                     <input 
// // //                         className="w-full border p-2 rounded mt-1" 
// // //                         placeholder="e.g. John Doe"
// // //                         value={formData.name}
// // //                         onChange={(e) => setFormData({...formData, name: e.target.value})}
// // //                     />
// // //                 </div>
// // //                 <div className="w-full">
// // //                     <label className="text-xs font-semibold uppercase text-gray-500">Email Address</label>
// // //                     <input 
// // //                         className="w-full border p-2 rounded mt-1" 
// // //                         placeholder="student@example.com"
// // //                         value={formData.email}
// // //                         onChange={(e) => setFormData({...formData, email: e.target.value})}
// // //                     />
// // //                 </div>
// // //                 <button disabled={isLoading} className="bg-green-600 text-white px-6 py-2.5 rounded hover:bg-green-700 w-full md:w-auto flex justify-center">
// // //                     {isLoading ? <Loader2 className="animate-spin" /> : 'Send Invite'}
// // //                 </button>
// // //             </form>
// // //         </div>
// // //       )}

// // //       {/* Student List */}
// // //       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// // //         <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
// // //             <h3 className="font-semibold text-gray-700">All Students ({students?.length || 0})</h3>
// // //             <div className="relative">
// // //                 <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
// // //                 <input placeholder="Search students..." className="pl-8 pr-4 py-2 border rounded-md text-sm w-64" />
// // //             </div>
// // //         </div>
        
// // //         <div className="overflow-x-auto">
// // //             <table className="w-full text-left text-sm">
// // //                 <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
// // //                     <tr>
// // //                         <th className="px-6 py-3">Student Name</th>
// // //                         <th className="px-6 py-3">Contact</th>
// // //                         <th className="px-6 py-3">Profile Status</th>
// // //                         <th className="px-6 py-3">Joined Date</th>
// // //                         <th className="px-6 py-3 text-right">Actions</th>
// // //                     </tr>
// // //                 </thead>
// // //                 <tbody className="divide-y divide-gray-100">
// // //                     {(!students || students.length === 0) && (
// // //                         <tr>
// // //                             <td colSpan="5" className="text-center py-8 text-gray-400">
// // //                                 {isLoading ? "Loading students..." : "No students found. Invite one above!"}
// // //                             </td>
// // //                         </tr>
// // //                     )}
// // //                     {students?.map((student) => (
// // //                         <tr key={student._id} className="hover:bg-gray-50 transition-colors">
// // //                             <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
// // //                                 <div className="bg-green-100 p-2 rounded-full">
// // //                                     <GraduationCap size={16} className="text-green-600" />
// // //                                 </div>
// // //                                 {student.personalInfo?.firstName} {student.personalInfo?.lastName}
// // //                             </td>
// // //                             <td className="px-6 py-4 text-gray-600">
// // //                                 {student.personalInfo?.email}
// // //                             </td>
// // //                             <td className="px-6 py-4">
// // //                                 <span className={`px-2 py-1 rounded-full text-xs font-semibold 
// // //                                     ${student.profileStatus === 'submitted' ? 'bg-green-100 text-green-800' : 
// // //                                       student.profileStatus === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
// // //                                       'bg-gray-100 text-gray-800'}`}>
// // //                                     {student.profileStatus.toUpperCase()}
// // //                                 </span>
// // //                             </td>
// // //                             <td className="px-6 py-4 text-gray-500">
// // //                                 {new Date(student.createdAt).toLocaleDateString()}
// // //                             </td>
// // //                             <td className="px-6 py-4 text-right">
// // //                                 <button className="text-green-600 hover:text-green-800 font-medium text-xs">View Profile</button>
// // //                             </td>
// // //                         </tr>
// // //                     ))}
// // //                 </tbody>
// // //             </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { Eye, GraduationCap, Loader2, Mail, Search, UserPlus } from 'lucide-react';
// // import { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
// // import { toast } from 'react-toastify';
// // import { getStudents, inviteStudent, reset } from '../../features/students/studentSlice';

// // export default function ConsultancyDashboard() {
// //   const navigate = useNavigate(); // 2. Initialize hook
// //   const dispatch = useDispatch();
// //   const { students, isLoading, isError, isSuccess, message } = useSelector((state) => state.students);
// //   const { user } = useSelector((state) => state.auth);

// //   const [showInviteForm, setShowInviteForm] = useState(false);
// //   const [formData, setFormData] = useState({ name: '', email: '' });

// //   useEffect(() => {
// //     dispatch(getStudents());
// //     return () => { dispatch(reset()); };
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (isError) toast.error(message);
// //     if (isSuccess && message) toast.success(message);
// //   }, [isError, isSuccess, message]);

// //   const handleInvite = async (e) => {
// //     e.preventDefault();
// //     if (!formData.name || !formData.email) return toast.error("Name and Email required");
// //     await dispatch(inviteStudent(formData));
// //     setShowInviteForm(false);
// //     setFormData({ name: '', email: '' });
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// //         <div>
// //           <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
// //           <p className="text-gray-500">Manage visa applicants for {user?.name}</p>
// //         </div>
// //         <button 
// //           onClick={() => setShowInviteForm(!showInviteForm)}
// //           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
// //         >
// //           <UserPlus size={18} /> Invite Student
// //         </button>
// //       </div>

// //       {showInviteForm && (
// //         <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 animate-in slide-in-from-top-2">
// //             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
// //                 <Mail className="text-green-600" size={20} /> Send Invitation
// //             </h3>
// //             <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4 items-end">
// //                 <div className="w-full">
// //                     <label className="text-xs font-semibold uppercase text-gray-500">Full Name</label>
// //                     <input className="w-full border p-2 rounded mt-1" placeholder="e.g. John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
// //                 </div>
// //                 <div className="w-full">
// //                     <label className="text-xs font-semibold uppercase text-gray-500">Email Address</label>
// //                     <input className="w-full border p-2 rounded mt-1" placeholder="student@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
// //                 </div>
// //                 <button disabled={isLoading} className="bg-green-600 text-white px-6 py-2.5 rounded hover:bg-green-700 w-full md:w-auto flex justify-center">
// //                     {isLoading ? <Loader2 className="animate-spin" /> : 'Send Invite'}
// //                 </button>
// //             </form>
// //         </div>
// //       )}

// //       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //         <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
// //             <h3 className="font-semibold text-gray-700">All Students ({students?.length || 0})</h3>
// //             <div className="relative">
// //                 <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
// //                 <input placeholder="Search students..." className="pl-8 pr-4 py-2 border rounded-md text-sm w-64" />
// //             </div>
// //         </div>
        
// //         <div className="overflow-x-auto">
// //             <table className="w-full text-left text-sm">
// //                 <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
// //                     <tr>
// //                         <th className="px-6 py-3">Student Name</th>
// //                         <th className="px-6 py-3">Contact</th>
// //                         <th className="px-6 py-3">Profile Status</th>
// //                         <th className="px-6 py-3">Joined Date</th>
// //                         <th className="px-6 py-3 text-right">Actions</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-100">
// //                     {(!students || students.length === 0) && (
// //                         <tr>
// //                             <td colSpan="5" className="text-center py-8 text-gray-400">
// //                                 {isLoading ? "Loading..." : "No students found."}
// //                             </td>
// //                         </tr>
// //                     )}
// //                     {students?.map((student) => (
// //                         <tr key={student._id} className="hover:bg-gray-50 transition-colors">
// //                             <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
// //                                 <div className="bg-green-100 p-2 rounded-full">
// //                                     <GraduationCap size={16} className="text-green-600" />
// //                                 </div>
// //                                 {student.personalInfo?.firstName} {student.personalInfo?.lastName}
// //                             </td>
// //                             <td className="px-6 py-4 text-gray-600">{student.personalInfo?.email}</td>
// //                             <td className="px-6 py-4">
// //                                 <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.profileStatus === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
// //                                     {student.profileStatus.toUpperCase()}
// //                                 </span>
// //                             </td>
// //                             <td className="px-6 py-4 text-gray-500">{new Date(student.createdAt).toLocaleDateString()}</td>
// //                             <td className="px-6 py-4 text-right">
// //                                 {/* 3. Connect Button to Route */}
// //                                 <button 
// //                                     onClick={() => navigate(`/dashboard/student/${student._id}`)}
// //                                     className="text-green-600 hover:text-green-800 font-medium text-xs flex items-center justify-end gap-1 ml-auto"
// //                                 >
// //                                     <Eye size={14} /> View Profile
// //                                 </button>
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import { Eye, Filter, GraduationCap, Loader2, Mail, Search, Settings, Shield, UserPlus } from 'lucide-react';
// // import { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from 'react-toastify';
// // import { getStudents, inviteStudent, reset } from '../../features/students/studentSlice';
// // import StaffManagement from './StaffManagement';


// // export default function ConsultancyDashboard() {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
  
// //   const { students, isLoading, isError, isSuccess, message } = useSelector((state) => state.students);
// //   const { user } = useSelector((state) => state.auth);

// //   // UI State
// //   const [activeTab, setActiveTab] = useState('students');
// //   const [showInviteForm, setShowInviteForm] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');
  
  
// //   // Form State
// //   const [formData, setFormData] = useState({ name: '', email: '' });

// //   // --- PERMISSIONS ---
// //   // Only Admin or Manager can see/access Staff Management
// //   const canManageStaff = user?.role === 'consultancy_admin' || user?.subRole === 'manager';

// //   // --- EFFECTS ---
// //   useEffect(() => {
// //     // Fetch students only when on the students tab
// //     if (activeTab === 'students') {
// //         dispatch(getStudents());
// //     }
// //     return () => { dispatch(reset()); };
// //   }, [dispatch, activeTab]);

// //   useEffect(() => {
// //     if (isError) toast.error(message);
// //     if (isSuccess && message) toast.success(message);
// //   }, [isError, isSuccess, message]);

// //   // --- HANDLERS ---
// //   const handleInvite = async (e) => {
// //     e.preventDefault();
// //     if (!formData.name || !formData.email) return toast.error("Name and Email required");
// //     await dispatch(inviteStudent(formData));
// //     setShowInviteForm(false);
// //     setFormData({ name: '', email: '' });
// //   };

// //   // Filtering Logic
// //   const filteredStudents = students?.filter(student => {
// //     const matchesSearch = (student.personalInfo?.firstName + ' ' + student.personalInfo?.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                           student.personalInfo?.email.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesStatus = statusFilter === 'all' || student.profileStatus === statusFilter;
// //     return matchesSearch && matchesStatus;
// //   });

// //   return (
// //     <div className="space-y-6">
      
// //       {/* Tab Navigation */}
// //       <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-1">
// //         <div className="flex gap-6">
// //             <button 
// //                 onClick={() => setActiveTab('students')}
// //                 className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'students' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
// //             >
// //                 <GraduationCap size={18} /> Students
// //             </button>
            
// //             {canManageStaff && (
// //                 <button 
// //                     onClick={() => setActiveTab('staff')}
// //                     className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'staff' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
// //                 >
// //                     <Shield size={18} /> Staff Management
// //                 </button>
// //             )}
// //         </div>
// //       </div>

// //       {/* --- TAB CONTENT: STUDENTS --- */}
// //       {activeTab === 'students' && (
// //         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            
// //             {/* Action Bar */}
// //             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// //                 <div>
// //                   <h2 className="text-2xl font-bold text-gray-900">Student List</h2>
// //                   <p className="text-gray-500">Manage and track visa applicants.</p>
// //                 </div>
// //                 <button 
// //                   onClick={() => setShowInviteForm(!showInviteForm)}
// //                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-sm"
// //                 >
// //                   <UserPlus size={18} /> Invite Student
// //                 </button>
// //             </div>

// //             {/* Invite Form */}
// //             {showInviteForm && (
// //                 <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 animate-in slide-in-from-top-2">
// //                     <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
// //                         <Mail className="text-green-600" size={20} /> Send Invitation
// //                     </h3>
// //                     <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4 items-end">
// //                         <div className="w-full">
// //                             <label className="text-xs font-semibold uppercase text-gray-500">Full Name</label>
// //                             <input 
// //                                 className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-green-500 outline-none" 
// //                                 placeholder="e.g. John Doe" 
// //                                 value={formData.name} 
// //                                 onChange={(e) => setFormData({...formData, name: e.target.value})} 
// //                             />
// //                         </div>
// //                         <div className="w-full">
// //                             <label className="text-xs font-semibold uppercase text-gray-500">Email Address</label>
// //                             <input 
// //                                 className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-green-500 outline-none" 
// //                                 placeholder="student@example.com" 
// //                                 value={formData.email} 
// //                                 onChange={(e) => setFormData({...formData, email: e.target.value})} 
// //                             />
// //                         </div>
// //                         <button disabled={isLoading} className="bg-green-600 text-white px-6 py-2.5 rounded hover:bg-green-700 w-full md:w-auto flex justify-center min-w-[120px]">
// //                             {isLoading ? <Loader2 className="animate-spin" /> : 'Send Invite'}
// //                         </button>
// //                     </form>
// //                 </div>
// //             )}

// //             {/* Student Table & Filters */}
// //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //                 {/* Toolbar */}
// //                 <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
// //                     <h3 className="font-semibold text-gray-700 flex items-center gap-2">
// //                         Total Students: <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">{filteredStudents?.length || 0}</span>
// //                     </h3>
                    
// //                     <div className="flex gap-2 w-full md:w-auto">
// //                         {/* Status Filter */}
// //                         <div className="relative">
// //                             <select 
// //                                 className="pl-9 pr-8 py-2 border rounded-md text-sm appearance-none bg-white focus:ring-green-500 focus:border-green-500"
// //                                 value={statusFilter}
// //                                 onChange={(e) => setStatusFilter(e.target.value)}
// //                             >
// //                                 <option value="all">All Status</option>
// //                                 <option value="draft">Draft</option>
// //                                 <option value="submitted">Submitted</option>
// //                                 <option value="verified">Verified</option>
// //                             </select>
// //                             <Filter className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
// //                         </div>

// //                         {/* Search */}
// //                         <div className="relative flex-1 md:flex-none">
// //                             <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
// //                             <input 
// //                                 placeholder="Search name or email..." 
// //                                 className="pl-9 pr-4 py-2 border rounded-md text-sm w-full md:w-64 focus:ring-green-500 focus:border-green-500 outline-none" 
// //                                 value={searchTerm}
// //                                 onChange={(e) => setSearchTerm(e.target.value)}
// //                             />
// //                         </div>
// //                     </div>
// //                 </div>
                
// //                 {/* Table */}
// //                 <div className="overflow-x-auto">
// //                     <table className="w-full text-left text-sm">
// //                         <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
// //                             <tr>
// //                                 <th className="px-6 py-3">Student Name</th>
// //                                 <th className="px-6 py-3">Contact</th>
// //                                 <th className="px-6 py-3">Status</th>
// //                                 <th className="px-6 py-3">Joined Date</th>
// //                                 <th className="px-6 py-3 text-right">Actions</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody className="divide-y divide-gray-100">
// //                             {(!filteredStudents || filteredStudents.length === 0) && (
// //                                 <tr>
// //                                     <td colSpan="5" className="text-center py-12 text-gray-400 bg-white">
// //                                         {isLoading ? (
// //                                             <div className="flex justify-center items-center gap-2"><Loader2 className="animate-spin" /> Loading...</div>
// //                                         ) : "No students found matching your filters."}
// //                                     </td>
// //                                 </tr>
// //                             )}
// //                             {filteredStudents?.map((student) => (
// //                                 <tr key={student._id} className="hover:bg-gray-50 transition-colors group bg-white">
// //                                     <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
// //                                         <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition">
// //                                             <GraduationCap size={16} className="text-green-600" />
// //                                         </div>
// //                                         <div>
// //                                             <div>{student.personalInfo?.firstName} {student.personalInfo?.lastName}</div>
// //                                             <div className="text-xs text-gray-400 font-normal sm:hidden">{student.personalInfo?.email}</div>
// //                                         </div>
// //                                     </td>
// //                                     <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">{student.personalInfo?.email}</td>
// //                                     <td className="px-6 py-4">
// //                                         <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border
// //                                             ${student.profileStatus === 'submitted' ? 'bg-green-50 text-green-700 border-green-200' : 
// //                                               student.profileStatus === 'verified' ? 'bg-green-50 text-green-700 border-green-200' :
// //                                               'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
// //                                             {student.profileStatus?.charAt(0).toUpperCase() + student.profileStatus?.slice(1)}
// //                                         </span>
// //                                     </td>
// //                                     <td className="px-6 py-4 text-gray-500 text-xs">
// //                                         {new Date(student.createdAt).toLocaleDateString()}
// //                                     </td>
// //                                     <td className="px-6 py-4 text-right">
// //                                         <button 
// //                                             onClick={() => navigate(`/dashboard/student/${student._id}`)}
// //                                             className="text-green-600 hover:text-green-800 font-medium text-xs flex items-center justify-end gap-1 ml-auto border border-green-100 px-3 py-1.5 rounded hover:bg-green-50 transition"
// //                                         >
// //                                             <Eye size={14} /> View Profile
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             </div>
// //         </div>
// //       )}

// //       {/* --- TAB CONTENT: STAFF MANAGEMENT (Admin Only) --- */}
// //       {activeTab === 'staff' && canManageStaff && (
// //           <StaffManagement />
// //       )}

// //       {/* NEW: Settings Tab */}
// //             {canManageStaff && (
// //                 <button 
// //                     onClick={() => setActiveTab('settings')}
// //                     className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
// //                 >
// //                     <Settings size={18} /> Settings & QR
// //                 </button>
// //             )}

// //     </div>
// //   );
// // }


// import { Eye, Filter, GraduationCap, Loader2, Mail, Search, Settings, Shield, UserPlus } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { getStudents, inviteStudent, reset } from '../../features/students/studentSlice';

// // Import Sub-Components
// import ConsultancySettings from './ConsultancySettings';
// import StaffManagement from './StaffManagement';

// export default function ConsultancyDashboard() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const { students, isLoading, isError, isSuccess, message } = useSelector((state) => state.students);
//   const { user } = useSelector((state) => state.auth);

//   // UI State
//   const [activeTab, setActiveTab] = useState('students');
//   const [showInviteForm, setShowInviteForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
  
//   // Form State
//   const [formData, setFormData] = useState({ name: '', email: '' });

//   // --- PERMISSIONS ---
//   // Only Admin or Manager can see/access Staff Management & Settings
//   const canManageStaff = user?.role === 'consultancy_admin' || user?.subRole === 'manager';

//   // --- EFFECTS ---
//   useEffect(() => {
//     // Fetch students only when on the students tab
//     if (activeTab === 'students') {
//         dispatch(getStudents());
//     }
//     return () => { dispatch(reset()); };
//   }, [dispatch, activeTab]);

//   useEffect(() => {
//     if (isError) toast.error(message);
//     if (isSuccess && message) toast.success(message);
//   }, [isError, isSuccess, message]);

//   // --- HANDLERS ---
//   const handleInvite = async (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email) return toast.error("Name and Email required");
//     await dispatch(inviteStudent(formData));
//     setShowInviteForm(false);
//     setFormData({ name: '', email: '' });
//   };

//   // Filtering Logic
//   const filteredStudents = students?.filter(student => {
//     const fullName = (student.personalInfo?.firstName + ' ' + student.personalInfo?.lastName).toLowerCase();
//     const email = student.personalInfo?.email?.toLowerCase() || '';
//     const search = searchTerm.toLowerCase();
    
//     const matchesSearch = fullName.includes(search) || email.includes(search);
//     const matchesStatus = statusFilter === 'all' || student.profileStatus === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="space-y-6">
      
//       {/* Tab Navigation */}
//       <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-1">
//         <div className="flex gap-6 overflow-x-auto">
//             <button 
//                 onClick={() => setActiveTab('students')}
//                 className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'students' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//             >
//                 <GraduationCap size={18} /> Students
//             </button>
            
//             {canManageStaff && (
//                 <>
//                     <button 
//                         onClick={() => setActiveTab('staff')}
//                         className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'staff' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                     >
//                         <Shield size={18} /> Staff Management
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('settings')}
//                         className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                     >
//                         <Settings size={18} /> Settings & QR
//                     </button>
//                 </>
//             )}
//         </div>
//       </div>

//       {/* --- TAB CONTENT: STUDENTS --- */}
//       {activeTab === 'students' && (
//         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            
//             {/* Action Bar */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">Student List</h2>
//                   <p className="text-gray-500">Manage and track visa applicants.</p>
//                 </div>
//                 <button 
//                   onClick={() => setShowInviteForm(!showInviteForm)}
//                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-sm"
//                 >
//                   <UserPlus size={18} /> Invite Student
//                 </button>
//             </div>

//             {/* Invite Form */}
//             {showInviteForm && (
//                 <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 animate-in slide-in-from-top-2">
//                     <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                         <Mail className="text-green-600" size={20} /> Send Invitation
//                     </h3>
//                     <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4 items-end">
//                         <div className="w-full">
//                             <label className="text-xs font-semibold uppercase text-gray-500">Full Name</label>
//                             <input 
//                                 className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-green-500 outline-none" 
//                                 placeholder="e.g. John Doe" 
//                                 value={formData.name} 
//                                 onChange={(e) => setFormData({...formData, name: e.target.value})} 
//                             />
//                         </div>
//                         <div className="w-full">
//                             <label className="text-xs font-semibold uppercase text-gray-500">Email Address</label>
//                             <input 
//                                 className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-green-500 outline-none" 
//                                 placeholder="student@example.com" 
//                                 value={formData.email} 
//                                 onChange={(e) => setFormData({...formData, email: e.target.value})} 
//                             />
//                         </div>
//                         <button disabled={isLoading} className="bg-green-600 text-white px-6 py-2.5 rounded hover:bg-green-700 w-full md:w-auto flex justify-center min-w-[120px]">
//                             {isLoading ? <Loader2 className="animate-spin" /> : 'Send Invite'}
//                         </button>
//                     </form>
//                 </div>
//             )}

//             {/* Student Table & Filters */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//                 {/* Toolbar */}
//                 <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
//                     <h3 className="font-semibold text-gray-700 flex items-center gap-2">
//                         Total Students: <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">{filteredStudents?.length || 0}</span>
//                     </h3>
                    
//                     <div className="flex gap-2 w-full md:w-auto">
//                         {/* Status Filter */}
//                         <div className="relative">
//                             <select 
//                                 className="pl-9 pr-8 py-2 border rounded-md text-sm appearance-none bg-white focus:ring-green-500 focus:border-green-500"
//                                 value={statusFilter}
//                                 onChange={(e) => setStatusFilter(e.target.value)}
//                             >
//                                 <option value="all">All Status</option>
//                                 <option value="lead">Lead (Inquiry)</option>
//                                 <option value="draft">Draft</option>
//                                 <option value="submitted">Submitted</option>
//                                 <option value="verified">Verified</option>
//                             </select>
//                             <Filter className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
//                         </div>

//                         {/* Search */}
//                         <div className="relative flex-1 md:flex-none">
//                             <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
//                             <input 
//                                 placeholder="Search name or email..." 
//                                 className="pl-9 pr-4 py-2 border rounded-md text-sm w-full md:w-64 focus:ring-green-500 focus:border-green-500 outline-none" 
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                 </div>
                
//                 {/* Table */}
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left text-sm">
//                         <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//                             <tr>
//                                 <th className="px-6 py-3">Student Name</th>
//                                 <th className="px-6 py-3">Contact</th>
//                                 <th className="px-6 py-3">Status</th>
//                                 <th className="px-6 py-3">Joined Date</th>
//                                 <th className="px-6 py-3 text-right">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-100">
//                             {(!filteredStudents || filteredStudents.length === 0) && (
//                                 <tr>
//                                     <td colSpan="5" className="text-center py-12 text-gray-400 bg-white">
//                                         {isLoading ? (
//                                             <div className="flex justify-center items-center gap-2"><Loader2 className="animate-spin" /> Loading...</div>
//                                         ) : "No students found matching your filters."}
//                                     </td>
//                                 </tr>
//                             )}
//                             {filteredStudents?.map((student) => (
//                                 <tr key={student._id} className="hover:bg-gray-50 transition-colors group bg-white">
//                                     <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
//                                         <div className={`p-2 rounded-full transition ${student.profileStatus === 'lead' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600 group-hover:bg-green-200'}`}>
//                                             <GraduationCap size={16} />
//                                         </div>
//                                         <div>
//                                             <div>{student.personalInfo?.firstName} {student.personalInfo?.lastName}</div>
//                                             <div className="text-xs text-gray-400 font-normal sm:hidden">{student.personalInfo?.email}</div>
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">{student.personalInfo?.email}</td>
//                                     <td className="px-6 py-4">
//                                         <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border
//                                             ${student.profileStatus === 'submitted' ? 'bg-green-50 text-green-700 border-green-200' : 
//                                               student.profileStatus === 'verified' ? 'bg-green-50 text-green-700 border-green-200' :
//                                               student.profileStatus === 'lead' ? 'bg-purple-50 text-purple-700 border-purple-200' :
//                                               'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
//                                             {student.profileStatus?.charAt(0).toUpperCase() + student.profileStatus?.slice(1)}
//                                         </span>
//                                     </td>
//                                     <td className="px-6 py-4 text-gray-500 text-xs">
//                                         {new Date(student.createdAt).toLocaleDateString()}
//                                     </td>
//                                     <td className="px-6 py-4 text-right">
//                                         <button 
//                                             onClick={() => navigate(`/dashboard/student/${student._id}`)}
//                                             className="text-green-600 hover:text-green-800 font-medium text-xs flex items-center justify-end gap-1 ml-auto border border-green-100 px-3 py-1.5 rounded hover:bg-green-50 transition"
//                                         >
//                                             <Eye size={14} /> View Profile
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//       )}

//       {/* --- TAB CONTENT: STAFF MANAGEMENT (Admin Only) --- */}
//       {activeTab === 'staff' && canManageStaff && (
//           <StaffManagement />
//       )}

//       {/* --- TAB CONTENT: SETTINGS & QR --- */}
//       {activeTab === 'settings' && canManageStaff && (
//           <ConsultancySettings />
//       )}

//     </div>
//   );
// }

import { Building2, Eye, Filter, GraduationCap, Loader2, Mail, Search, Settings, Shield, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getStudents, inviteStudent, reset } from '../../features/students/studentSlice';

// Import Sub-Components
import ConsultancySettings from './ConsultancySettings';
import StaffManagement from './StaffManagement';
import UniversityManager from './UniversityManager';

export default function ConsultancyDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { students, isLoading, isError, isSuccess, message } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);

  // UI State
  const [activeTab, setActiveTab] = useState('students');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '' });

  // --- PERMISSIONS ---
  // 1. Admin/Manager can see Staff & Settings
  const canManageStaff = user?.role === 'consultancy_admin' || user?.subRole === 'manager';
  
  // 2. Admin/Manager/Counselor can see Universities
  const canManageUniversities = canManageStaff || user?.subRole === 'counselor';

  // --- EFFECTS ---
  useEffect(() => {
    if (activeTab === 'students') {
        dispatch(getStudents());
    }
    return () => { dispatch(reset()); };
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (isError) toast.error(message);
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

  // Filtering Logic
  const filteredStudents = students?.filter(student => {
    const fullName = (student.personalInfo?.firstName + ' ' + student.personalInfo?.lastName).toLowerCase();
    const email = student.personalInfo?.email?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    
    const matchesSearch = fullName.includes(search) || email.includes(search);
    const matchesStatus = statusFilter === 'all' || student.profileStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Tab Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-1">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar">
            <button 
                onClick={() => setActiveTab('students')}
                className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'students' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                <GraduationCap size={18} /> Students
            </button>
            
            {canManageUniversities && (
                <button 
                    onClick={() => setActiveTab('universities')}
                    className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'universities' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <Building2 size={18} /> Universities
                </button>
            )}

            {canManageStaff && (
                <>
                    <button 
                        onClick={() => setActiveTab('staff')}
                        className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'staff' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Shield size={18} /> Staff Management
                    </button>
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Settings size={18} /> Settings & QR
                    </button>
                </>
            )}
        </div>
      </div>

      {/* CONTENT AREA */}
      {activeTab === 'students' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
             
             {/* Action Bar */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <div>
                   <h2 className="text-2xl font-bold text-gray-900">Student List</h2>
                   <p className="text-gray-500">Manage and track visa applicants.</p>
                 </div>
                 <button 
                    onClick={() => setShowInviteForm(!showInviteForm)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-sm"
                 >
                    <UserPlus size={18} /> Invite Student
                 </button>
             </div>

             {/* Invite Form */}
             {showInviteForm && (
                 <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 animate-in slide-in-from-top-2">
                     <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Mail className="text-green-600" size={20} /> Send Invitation
                     </h3>
                     <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="w-full">
                            <label className="text-xs font-semibold uppercase text-gray-500">Full Name</label>
                            <input className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. John Doe" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})}/>
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-semibold uppercase text-gray-500">Email Address</label>
                            <input className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-green-500 outline-none" placeholder="student@example.com" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})}/>
                        </div>
                        <button disabled={isLoading} className="bg-green-600 text-white px-6 py-2.5 rounded hover:bg-green-700 w-full md:w-auto flex justify-center min-w-[120px]">
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Send Invite'}
                        </button>
                     </form>
                 </div>
             )}

             {/* Student Table & Filters */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                 <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                        Total Students: <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">{filteredStudents?.length || 0}</span>
                    </h3>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative">
                            <select 
                                className="pl-9 pr-8 py-2 border rounded-md text-sm appearance-none bg-white focus:ring-green-500 focus:border-green-500"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="lead">Lead (Inquiry)</option>
                                <option value="draft">Draft</option>
                                <option value="submitted">Submitted</option>
                                <option value="verified">Verified</option>
                            </select>
                            <Filter className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                        </div>
                        <div className="relative flex-1 md:flex-none">
                            <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                            <input 
                                placeholder="Search name or email..." 
                                className="pl-9 pr-4 py-2 border rounded-md text-sm w-full md:w-64 focus:ring-green-500 focus:border-green-500 outline-none" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                 </div>

                 <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm">
                         <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                             <tr>
                                 <th className="px-6 py-3">Name</th>
                                 <th className="px-6 py-3">Email</th>
                                 <th className="px-6 py-3">Status</th>
                                 <th className="px-6 py-3">Date</th>
                                 <th className="px-6 py-3 text-right">Action</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                             {(!filteredStudents || filteredStudents.length === 0) && (
                                 <tr><td colSpan="5" className="text-center py-12 text-gray-400">No students found.</td></tr>
                             )}
                             {filteredStudents?.map(student => (
                                 <tr key={student._id} className="hover:bg-gray-50 transition-colors group">
                                     <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                         <div className={`p-2 rounded-full transition ${student.profileStatus === 'lead' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
                                             <GraduationCap size={16} />
                                         </div>
                                         {student.personalInfo?.firstName} {student.personalInfo?.lastName}
                                     </td>
                                     <td className="px-6 py-4 text-gray-500">{student.personalInfo?.email}</td>
                                     <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize
                                            ${student.profileStatus === 'submitted' ? 'bg-green-50 text-green-700 border-green-200' : 
                                              student.profileStatus === 'verified' ? 'bg-green-50 text-green-700 border-green-200' :
                                              student.profileStatus === 'lead' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                              'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                            {student.profileStatus}
                                        </span>
                                     </td>
                                     <td className="px-6 py-4 text-gray-500 text-xs">{new Date(student.createdAt).toLocaleDateString()}</td>
                                     <td className="px-6 py-4 text-right">
                                         <button 
                                            onClick={() => navigate(`/dashboard/student/${student._id}`)}
                                            className="text-green-600 hover:text-green-800 font-medium text-xs border border-green-100 px-3 py-1.5 rounded hover:bg-green-50 transition"
                                         >
                                             <Eye size={14} /> View
                                         </button>
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             </div>
          </div>
      )}

      {activeTab === 'universities' && canManageUniversities && <UniversityManager />}
      {activeTab === 'staff' && canManageStaff && <StaffManagement />}
      {activeTab === 'settings' && canManageStaff && <ConsultancySettings />}

    </div>
  );
}