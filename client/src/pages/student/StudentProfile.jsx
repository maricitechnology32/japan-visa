


// import {
//     ArrowLeft, Building2,
//     Camera,
//     CheckCircle,
//     ClipboardCheck,
//     Eye,
//     FileText,
//     Globe,
//     Loader2,
//     Mic,
//     Plus,
//     Printer,
//     Save,
//     ShieldCheck,
//     Trash2,
//     Upload,
//     User,
//     X,
//     XCircle
// } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { clearCurrentProfile, getMyProfile, getStudentById, reset, updateProfile, updateStudentStatus } from '../../features/students/studentSlice';
// import api from '../../utils/api';

// // Import Generator Modals
// import AnnualIncomeVerificationModal from '../../components/generators/AnnualIncomeVerificationModal';
// import DateOfBirthVerificationModal from '../../components/generators/DateOfBirthVerificationModal';
// import OccupationVerificationModal from '../../components/generators/OccupationVerificationModal';
// import RelationshipVerificationModal from '../../components/generators/RelationshipVerificationModal';
// import SurnameVerificationModal from '../../components/generators/SurnameVerificationModal';
// import TaxClearanceVerificationModal from '../../components/generators/TaxClearanceVerificationModal';

// // Import University Component
// import BankStatementGeneratorModal from '../../components/generators/BankStatementGeneratorModal';
// import NotificationBell from '../../components/layout/NotificationBell';
// import JapaneseInterview from '../../components/student/JapaneseInterview';
// import UniversityApplications from '../../components/student/UniversityApplications';

// export default function StudentProfile() {
//   const { studentId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const { currentProfile, isLoading, isSuccess, message } = useSelector((state) => state.students);
//   const { user } = useSelector((state) => state.auth);
  
//   const isAdminView = !!studentId;
  
//   // --- PERMISSIONS ---
//   const role = user?.role;
//   const subRole = user?.subRole;

//   const canGenerateDocs = 
//       role === 'consultancy_admin' || 
//       subRole === 'manager' || 
//       subRole === 'document_officer' || 
//       subRole === 'counselor';

//   const canManageUnis = 
//       role === 'consultancy_admin' || 
//       subRole === 'manager' || 
//       subRole === 'counselor';

//   const canViewApplications = true; 

//   const canChangeStatus = 
//       role === 'consultancy_admin' || 
//       subRole === 'manager' || 
//       subRole === 'document_officer';

//   const [activeTab, setActiveTab] = useState('personal');

//   // Form Data State
//   const [formData, setFormData] = useState({
//     personalInfo: { title: 'Mr.', firstName: '', lastName: '', gender: 'Male', dobAD: '', dobBS: '', email: '', phone: '', citizenshipNo: '', citizenshipDistrict: '', citizenshipDate: '', passportNo: '', passportExpiry: '', passportIssuePlace: '', photoUrl: '' },
//     address: { municipality: '', wardNo: '', district: '', province: '', tole: '' },
//     familyInfo: { fatherName: '', motherName: '', grandfatherName: '', spouseName: '', relatives: [] },
//     academics: [],
//     financialInfo: { incomeSources: [], fiscalYears: [], exchangeRate: 134, sponsor: '' },
//     documents: { other: [] },
//     visaDetails: { japaneseLanguage: {}, education: {}, intake: '' }
//   });

//   // UI States
//   const [newDocTitle, setNewDocTitle] = useState('');
//   const [isAddingDoc, setIsAddingDoc] = useState(false);
  
//   // Generator Modal States
//   const [showSurnameModal, setShowSurnameModal] = useState(false);
//   const [showDobModal, setShowDobModal] = useState(false);
//   const [showRelationModal, setShowRelationModal] = useState(false);
//   const [showOccupationModal, setShowOccupationModal] = useState(false);
//   const [showIncomeModal, setShowIncomeModal] = useState(false);
//   const [showBankStatementModal, setshowBankStatementModal] = useState(false);
//   const [showTaxModal, setShowTaxModal] = useState(false);

//   // --- 1. INITIALIZATION ---
//   useEffect(() => {
//     if (isAdminView) {
//         dispatch(getStudentById(studentId));
//     } else {
//         dispatch(getMyProfile());
//     }

//     return () => { 
//         dispatch(reset()); 
//         dispatch(clearCurrentProfile());
//     };
//   }, [dispatch, studentId, isAdminView]);

//   // --- 2. SYNC STATE ---
//   useEffect(() => {
//     if (currentProfile) {
//       setFormData(prev => ({
//         ...prev,
//         ...currentProfile,
//         personalInfo: { ...prev.personalInfo, ...currentProfile.personalInfo },
//         address: { ...prev.address, ...currentProfile.address },
//         familyInfo: { ...prev.familyInfo, ...currentProfile.familyInfo },
//         academics: currentProfile.academics || [],
//         financialInfo: { ...prev.financialInfo, ...currentProfile.financialInfo },
//         documents: { 
//             ...currentProfile.documents, 
//             other: currentProfile.documents?.other || [] 
//         },
//         visaDetails: currentProfile.visaDetails || {}
//       }));
//     }
//   }, [currentProfile]);

//   // --- 3. ALERTS ---
//   useEffect(() => {
//     if (isSuccess && message) toast.success(message);
//     if (isSuccess) dispatch(reset());
//   }, [isSuccess, message, dispatch]);

//   // --- HANDLERS ---
//   const handleSave = () => {
//     if (!currentProfile?._id) return;
//     dispatch(updateProfile({ id: currentProfile._id, data: formData }));
//   };
  
//   const handleStatusChange = (newStatus) => {
//       if (window.confirm(`Change status to ${newStatus}?`)) {
//            dispatch(updateStudentStatus({ id: currentProfile._id, status: newStatus }));
//       }
//   };

//   const updateField = (section, field, value) => {
//     setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
//   };

//   // --- ACADEMIC HELPERS ---
//   const addAcademicRow = () => {
//     setFormData(prev => ({
//       ...prev,
//       academics: [...prev.academics, { level: '', institution: '', passedYear: '', grade: '' }]
//     }));
//   };

//   const updateAcademicRow = (index, field, value) => {
//     const newList = [...formData.academics];
//     newList[index][field] = value;
//     setFormData(prev => ({ ...prev, academics: newList }));
//   };

//   const removeAcademicRow = (index) => {
//     const newList = formData.academics.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, academics: newList }));
//   };

//   // --- DOCUMENT HELPERS ---
//   const handleDocumentUpdate = async (fieldKey, url) => {
//     const updatedDocuments = { ...formData.documents, [fieldKey]: url };
//     setFormData(prev => ({ ...prev, documents: updatedDocuments }));

//     try {
//         await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
//     } catch (error) {
//         console.error("Save failed", error);
//         toast.error("Document uploaded but failed to save.");
//     }
//   };

//   // --- DYNAMIC DOCUMENTS ---
//   const handleAddDynamicDoc = async () => {
//     if (!newDocTitle.trim()) return toast.error("Please enter a document title");
    
//     const newDoc = { title: newDocTitle, url: '' };
//     const updatedOtherDocs = [...(formData.documents.other || []), newDoc];
//     const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };

//     setFormData(prev => ({ ...prev, documents: updatedDocuments }));
//     setNewDocTitle('');
//     setIsAddingDoc(false);

//     try {
//         await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
//         toast.success("Document slot added!");
//     } catch (error) {
//         console.error("Save failed", error);
//         toast.error("Failed to save new document slot.");
//     }
//   };

//   const handleDynamicDocUpload = async (index, url) => {
//     const updatedOtherDocs = formData.documents.other.map((doc, i) => i === index ? { ...doc, url: url } : doc);
//     const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };
//     setFormData(prev => ({ ...prev, documents: updatedDocuments }));

//     try {
//         await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
//     } catch (error) {
//         console.error("Save failed", error);
//     }
//   };

//   const removeDynamicDoc = async (index) => {
//     const updatedOtherDocs = formData.documents.other.filter((_, i) => i !== index);
//     const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };
//     setFormData(prev => ({ ...prev, documents: updatedDocuments }));

//     try {
//         await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
//         toast.success("Document removed.");
//     } catch (error) {
//         console.error("Delete failed", error);
//     }
//   };

//   // --- PROFILE PHOTO ---
//   const handleProfilePhotoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const uploadData = new FormData();
//     uploadData.append('file', file);

//     try {
//         const toastId = toast.loading("Uploading photo...");
//         const res = await api.post('/upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
//         const newPhotoUrl = res.data.url;
//         updateField('personalInfo', 'photoUrl', newPhotoUrl);

//         const updatedProfileData = { ...formData, personalInfo: { ...formData.personalInfo, photoUrl: newPhotoUrl } };
//         await dispatch(updateProfile({ id: currentProfile._id, data: updatedProfileData })).unwrap();
//         toast.dismiss(toastId);
//         toast.success("Profile photo saved!");
//     } catch (error) {
//         toast.dismiss();
//         toast.error("Photo upload failed");
//     }
//   };

//   if (!currentProfile && isLoading) return (
//     <div className="min-h-[60vh] flex flex-col items-center justify-center">
//         <Loader2 className="animate-spin text-green-600 mb-4" size={40}/> 
//         <span className="text-gray-500 font-medium">Loading Student Profile...</span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50/50 pb-20">
      
//       {/* 1. TOP BAR / BREADCRUMB */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         {isAdminView && (
//           <button onClick={() => navigate('/dashboard')} className="group flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors mb-4 text-sm font-medium">
//              <div className="p-1.5 rounded-full bg-white group-hover:bg-green-100 border border-gray-200 group-hover:border-green-200 transition-all">
//                 <ArrowLeft size={16} />
//              </div>
//              Back to Dashboard
//           </button>
//         )}

//         {/* 2. HEADER CARD */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 md:p-8 relative overflow-hidden">
//             {/* Background Pattern Decoration */}
//             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" />

//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
//                 <div className="flex items-center gap-6">
//                     {/* Profile Photo */}
//                     <div className="relative group shrink-0">
//                         <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
//                             {formData.personalInfo.photoUrl ? (
//                                 <img src={formData.personalInfo.photoUrl} alt="Profile" className="h-full w-full object-cover" />
//                             ) : <User size={40} className="text-gray-400" />}
//                         </div>
//                         <label className="absolute bottom-0 right-0 bg-white text-gray-700 p-2 rounded-full hover:bg-green-50 hover:text-green-600 shadow-md border border-gray-200 cursor-pointer transition-all transform hover:scale-105">
//                             <Camera size={16} />
//                             <input type="file" hidden accept="image/*" onChange={handleProfilePhotoUpload} />
//                         </label>
//                     </div>

//                     {/* Name & Details */}
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
//                             {formData.personalInfo.firstName || 'Student'} {formData.personalInfo.lastName}
//                         </h1>
//                         <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
//                             <span className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5
//                                 ${isAdminView ? 'bg-purple-50 text-purple-700 ring-1 ring-purple-200' : 'bg-green-50 text-green-700 ring-1 ring-green-200'}`}>
//                                 <ShieldCheck size={12} />
//                                 {isAdminView ? 'Admin Mode' : 'Applicant'}
//                             </span>
//                             <span className="hidden md:inline">•</span>
//                             <span className="flex items-center gap-1"><Globe size={14}/> {formData.address.district || 'Nepal'}</span>
//                             <span className="hidden md:inline">•</span>
//                             <span className="text-gray-600">{formData.personalInfo.email}</span>
//                         </div>
//                     </div>
//                 </div>
                
//                 {/* Primary Actions */}
//                 <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//                     <div className="mr-2">
//          <NotificationBell />
//      </div>
//                      {/* Status Display */}
//                     <div className={`px-4 py-2 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold
//                          ${currentProfile?.profileStatus === 'verified' ? 'bg-green-50 border-green-200 text-green-700' :
//                            currentProfile?.profileStatus === 'lead' ? 'bg-orange-50 border-orange-200 text-orange-700' :
//                            'bg-gray-50 border-gray-200 text-gray-700'}`}>
//                          <span className="relative flex h-2.5 w-2.5 mr-1">
//                             <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 
//                                 ${currentProfile?.profileStatus === 'verified' ? 'bg-green-400' : 'bg-orange-400'}`}></span>
//                             <span className={`relative inline-flex rounded-full h-2.5 w-2.5 
//                                 ${currentProfile?.profileStatus === 'verified' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
//                          </span>
//                          {currentProfile?.profileStatus?.toUpperCase()}
//                     </div>

//                     <button 
//                         onClick={handleSave}
//                         disabled={isLoading}
//                         className="bg-gray-900 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition shadow-lg shadow-gray-200 hover:shadow-gray-300 disabled:opacity-70 font-medium"
//                     >
//                         {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
//                         Save Changes
//                     </button>
//                 </div>
//             </div>

//             {/* Admin Action Bar (Conditional) */}
//             {isAdminView && canChangeStatus && (
//                 <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3 items-center animate-in fade-in slide-in-from-top-2">
//                     <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Workflow Actions:</span>
//                     {currentProfile?.profileStatus === 'lead' && (
//                         <>
//                             <button onClick={() => handleStatusChange('rejected')} className="px-3 py-1.5 text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg flex items-center gap-1.5 transition">
//                                 <XCircle size={14} /> Reject Profile
//                             </button>
//                             <button onClick={() => handleStatusChange('draft')} className="px-3 py-1.5 text-xs font-bold text-purple-600 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg flex items-center gap-1.5 transition">
//                                 <CheckCircle size={14} /> Approve as Student
//                             </button>
//                         </>
//                     )}
//                     {currentProfile?.profileStatus === 'draft' && (
//                         <button onClick={() => handleStatusChange('verified')} className="px-3 py-1.5 text-xs font-bold text-green-600 bg-white border border-green-200 hover:bg-green-50 rounded-lg flex items-center gap-1.5 transition">
//                             <CheckCircle size={14} /> Verify & Lock Profile
//                         </button>
//                     )}
//                 </div>
//             )}
//         </div>
//       </div>

//       {/* 3. STICKY TABS */}
//       <div className="sticky top-0 z-40 bg-gray-50/90 backdrop-blur-md border-b border-gray-200 shadow-sm mb-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex overflow-x-auto hide-scrollbar gap-6 pt-1">
//                 {['personal', 'address', 'family', 'academics', 'financial', 'documents'].map(tab => (
//                     <TabButton 
//                         key={tab} 
//                         id={tab} 
//                         label={tab.charAt(0).toUpperCase() + tab.slice(1)} 
//                         active={activeTab} 
//                         set={setActiveTab} 
//                     />
//                 ))}

//                 {/* Separator */}
//                 <div className="w-px h-6 bg-gray-300 self-center mx-2 hidden md:block"></div>

//                 {/* Functional Tabs */}
//                 <TabButton id="review" label="Review" icon={<ClipboardCheck size={16}/>} active={activeTab} set={setActiveTab} />
                
//                 {canViewApplications && (
//                      <TabButton id="applications" label="Applications" icon={<Building2 size={16}/>} active={activeTab} set={setActiveTab} highlight />
//                 )}

//                 {isAdminView && canGenerateDocs && (
//                      <TabButton id="generate" label="Generators" icon={<Printer size={16}/>} active={activeTab} set={setActiveTab} color="purple" />
//                 )}

//                 <TabButton id="interview" label="AI Prep" icon={<Mic size={16}/>} active={activeTab} set={setActiveTab} color="red" />
//             </div>
//         </div>
//       </div>

//       {/* 4. MAIN CONTENT AREA */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="min-h-[500px] animate-in fade-in duration-500">
        
//         {/* PERSONAL TAB */}
//         {activeTab === 'personal' && (
//           <div className="space-y-6">
//             <SectionHeader title="Basic Identity" subtitle="Official details as per legal documents." />
            
//             <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
//                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//                     <div className="md:col-span-2">
//                         <InputGroup label="Title" as="select" value={formData.personalInfo.title} onChange={(e) => updateField('personalInfo', 'title', e.target.value)}>
//                             <option>Mr.</option><option>Ms.</option><option>Mrs.</option>
//                         </InputGroup>
//                     </div>
//                     <div className="md:col-span-4"><InputGroup label="First Name" value={formData.personalInfo.firstName} onChange={(e) => updateField('personalInfo', 'firstName', e.target.value)} /></div>
//                     <div className="md:col-span-4"><InputGroup label="Last Name" value={formData.personalInfo.lastName} onChange={(e) => updateField('personalInfo', 'lastName', e.target.value)} /></div>
//                     <div className="md:col-span-2">
//                          <InputGroup label="Gender" as="select" value={formData.personalInfo.gender} onChange={(e) => updateField('personalInfo', 'gender', e.target.value)}>
//                             <option>Male</option><option>Female</option><option>Other</option>
//                         </InputGroup>
//                     </div>
                    
//                     <div className="md:col-span-6"><InputGroup label="Date of Birth (AD)" type="date" value={formData.personalInfo.dobAD ? formData.personalInfo.dobAD.split('T')[0] : ''} onChange={(e) => updateField('personalInfo', 'dobAD', e.target.value)} /></div>
//                     <div className="md:col-span-6"><InputGroup label="Date of Birth (BS)" placeholder="YYYY/MM/DD" value={formData.personalInfo.dobBS} onChange={(e) => updateField('personalInfo', 'dobBS', e.target.value)} /></div>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
//                     <div className="absolute top-0 left-0 w-1 bg-green-500 h-full"></div>
//                     <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-6"><FileText className="text-green-500" size={20}/> Citizenship Details</h3>
//                     <div className="space-y-5">
//                         <InputGroup label="Citizenship No." value={formData.personalInfo.citizenshipNo} onChange={(e) => updateField('personalInfo', 'citizenshipNo', e.target.value)} />
//                         <div className="grid grid-cols-2 gap-5">
//                             <InputGroup label="Issue District" value={formData.personalInfo.citizenshipDistrict} onChange={(e) => updateField('personalInfo', 'citizenshipDistrict', e.target.value)} />
//                             <InputGroup label="Issue Date (BS)" value={formData.personalInfo.citizenshipDate} onChange={(e) => updateField('personalInfo', 'citizenshipDate', e.target.value)} />
//                         </div>
//                     </div>
//                 </div>
                
//                 <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
//                      <div className="absolute top-0 left-0 w-1 bg-green-500 h-full"></div>
//                      <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-6"><Globe className="text-green-500" size={20}/> Passport Details</h3>
//                      <div className="space-y-5">
//                         <InputGroup label="Passport No." value={formData.personalInfo.passportNo} onChange={(e) => updateField('personalInfo', 'passportNo', e.target.value)} />
//                         <div className="grid grid-cols-2 gap-5">
//                             <InputGroup label="Issue Place" value={formData.personalInfo.passportIssuePlace} onChange={(e) => updateField('personalInfo', 'passportIssuePlace', e.target.value)} />
//                             <InputGroup label="Expiry Date (AD)" type="date" value={formData.personalInfo.passportExpiry ? formData.personalInfo.passportExpiry.split('T')[0] : ''} onChange={(e) => updateField('personalInfo', 'passportExpiry', e.target.value)} />
//                         </div>
//                      </div>
//                 </div>
//             </div>
//           </div>
//         )}

//         {/* ADDRESS TAB */}
//         {activeTab === 'address' && (
//             <div className="space-y-6">
//               <SectionHeader title="Permanent Address" subtitle="This information must match your verification documents." />
//               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     <div className="lg:col-span-2">
//                         <InputGroup label="Municipality / VDC" value={formData.address.municipality} onChange={(e) => updateField('address', 'municipality', e.target.value)} />
//                     </div>
//                     <InputGroup label="Ward No." value={formData.address.wardNo} onChange={(e) => updateField('address', 'wardNo', e.target.value)} />
//                     <InputGroup label="Tole / Street" value={formData.address.tole} onChange={(e) => updateField('address', 'tole', e.target.value)} />
//                     <InputGroup label="District" value={formData.address.district} onChange={(e) => updateField('address', 'district', e.target.value)} />
//                     <InputGroup label="Province" value={formData.address.province} onChange={(e) => updateField('address', 'province', e.target.value)} />
//                  </div>
//               </div>
//             </div>
//         )}

//         {/* FAMILY TAB */}
//         {activeTab === 'family' && (
//             <div className="space-y-6">
//               <SectionHeader title="Family Information" subtitle="Required for relationship and income verification." />
//               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <InputGroup label="Father's Full Name" value={formData.familyInfo.fatherName} onChange={(e) => updateField('familyInfo', 'fatherName', e.target.value)} />
//                     <InputGroup label="Mother's Full Name" value={formData.familyInfo.motherName} onChange={(e) => updateField('familyInfo', 'motherName', e.target.value)} />
//                     <InputGroup label="Grandfather's Full Name" value={formData.familyInfo.grandfatherName} onChange={(e) => updateField('familyInfo', 'grandfatherName', e.target.value)} />
//                     <InputGroup label="Spouse Name (Optional)" value={formData.familyInfo.spouseName} onChange={(e) => updateField('familyInfo', 'spouseName', e.target.value)} />
//                  </div>
//               </div>
//             </div>
//         )}

//         {/* ACADEMICS TAB */}
//         {activeTab === 'academics' && (
//              <div className="space-y-6">
//                 <div className="flex justify-between items-end">
//                     <SectionHeader title="Academic History" subtitle="List qualifications in descending order." />
//                     <button onClick={addAcademicRow} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2 transition">
//                         <Plus size={16} /> Add New
//                     </button>
//                 </div>
                
//                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
//                     {formData.academics.length === 0 && (
//                         <div className="text-center py-12 text-gray-400">
//                             <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
//                                 <FileText size={24} />
//                             </div>
//                             <p>No academic records added yet.</p>
//                         </div>
//                     )}
//                     {formData.academics.map((row, index) => (
//                         <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-gray-50 p-4 rounded-xl border border-gray-200 relative group transition-all hover:border-gray-300">
//                             <div className="md:col-span-3"><InputGroup label="Level" placeholder="e.g. +2, Bachelor" value={row.level} onChange={(e) => updateAcademicRow(index, 'level', e.target.value)} /></div>
//                             <div className="md:col-span-5"><InputGroup label="Institution" placeholder="School/College Name" value={row.institution} onChange={(e) => updateAcademicRow(index, 'institution', e.target.value)} /></div>
//                             <div className="md:col-span-2"><InputGroup label="Year" placeholder="Passed Year" value={row.passedYear} onChange={(e) => updateAcademicRow(index, 'passedYear', e.target.value)} /></div>
//                             <div className="md:col-span-1"><InputGroup label="GPA/%" value={row.grade} onChange={(e) => updateAcademicRow(index, 'grade', e.target.value)} /></div>
//                             <div className="md:col-span-1 flex justify-end pb-1">
//                                 <button onClick={() => removeAcademicRow(index)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
//                                     <Trash2 size={18} />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         )}

//         {/* FINANCIAL TAB */}
//         {activeTab === 'financial' && (
//             <div className="space-y-6">
//                <SectionHeader title="Financial Status" subtitle="Data for Annual Income & Tax Clearance." />
//                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
//                   <div className="max-w-md">
//                      <InputGroup label="Current Exchange Rate (1 USD = ? NPR)" type="number" value={formData.financialInfo.exchangeRate} onChange={(e) => updateField('financialInfo', 'exchangeRate', e.target.value)} />
//                   </div>
//                   <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex gap-3 text-yellow-800 text-sm">
//                      <div className="mt-0.5 font-bold text-xl">!</div>
//                      <div>
//                         <p className="font-bold mb-1">Important Note</p>
//                         <p>Income source details for the verification matrix are handled via the specific "Annual Income" generator in the Generators tab. Please consult with the document officer.</p>
//                      </div>
//                   </div>
//                </div>
//             </div>
//         )}

//         {/* DOCUMENTS TAB */}
//         {activeTab === 'documents' && (
//              <div className="space-y-8">
//                 <SectionHeader title="Document Repository" subtitle="Upload high-quality scans. Supported: JPG, PNG, PDF." />
                
//                 {/* Fixed Documents */}
//                 <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
//                     <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2"><CheckCircle size={18} className="text-green-600"/> Mandatory Documents</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         <DocumentUploadCard title="Citizenship (Front)" fieldKey="citizenshipFront" existingUrl={formData.documents?.citizenshipFront} onUpload={handleDocumentUpdate} />
//                         <DocumentUploadCard title="Citizenship (Back)" fieldKey="citizenshipBack" existingUrl={formData.documents?.citizenshipBack} onUpload={handleDocumentUpdate} />
//                         <DocumentUploadCard title="Passport (Bio Page)" fieldKey="passportBio" existingUrl={formData.documents?.passportBio} onUpload={handleDocumentUpdate} />
//                         <DocumentUploadCard title="SLC/SEE Marksheet" fieldKey="slcMarksheet" existingUrl={formData.documents?.slcMarksheet} onUpload={handleDocumentUpdate} />
//                         <DocumentUploadCard title="SLC/SEE Character" fieldKey="slcCharacter" existingUrl={formData.documents?.slcCharacter} onUpload={handleDocumentUpdate} />
//                         <DocumentUploadCard title="+2 Transcript" fieldKey="plus2Transcript" existingUrl={formData.documents?.plus2Transcript} onUpload={handleDocumentUpdate} />
//                     </div>
//                 </div>

//                 {/* Other Documents */}
//                 <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
//                     <div className="flex justify-between items-center mb-6">
//                          <h3 className="font-bold text-gray-800 flex items-center gap-2"><Plus size={18} className="text-green-600"/> Additional Documents</h3>
//                          {!isAddingDoc && (
//                              <button onClick={() => setIsAddingDoc(true)} className="text-sm bg-green-50 text-green-600 hover:bg-green-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition">
//                                  Add Slot
//                              </button>
//                          )}
//                     </div>
                    
//                     {isAddingDoc && (
//                         <div className="bg-green-50/50 p-6 rounded-xl border border-green-100 mb-8 animate-in fade-in slide-in-from-top-2">
//                              <div className="flex gap-4 items-end max-w-lg">
//                                  <div className="flex-1">
//                                      <InputGroup label="Document Title" placeholder="e.g. Work Experience Letter" value={newDocTitle} onChange={(e) => setNewDocTitle(e.target.value)} />
//                                  </div>
//                                  <button onClick={handleAddDynamicDoc} className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 text-sm font-medium transition">Confirm</button>
//                                  <button onClick={() => setIsAddingDoc(false)} className="bg-white border border-gray-300 text-gray-600 px-5 py-2.5 rounded-lg hover:bg-gray-50 text-sm font-medium transition">Cancel</button>
//                              </div>
//                         </div>
//                     )}
                    
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         {formData.documents?.other?.map((doc, index) => (
//                             <div key={index} className="relative group">
//                                 <DocumentUploadCard title={doc.title} fieldKey={`other-${index}`} existingUrl={doc.url} onUpload={(key, url) => handleDynamicDocUpload(index, url)} />
//                                 <button onClick={() => removeDynamicDoc(index)} className="absolute -top-2 -right-2 bg-white text-red-500 p-1.5 rounded-full border shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 transform hover:scale-110 z-10">
//                                     <X size={14} />
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//              </div>
//         )}

//         {/* REVIEW TAB */}
//         {activeTab === 'review' && (
//             <div className="space-y-6">
//                 <SectionHeader title="Profile Review" subtitle="Quick glance summary." />
//                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
//                     <h3 className="font-semibold text-gray-900 mb-6 pb-2 border-b">Personal Summary</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
//                         <ReviewItem label="Full Name" value={`${formData.personalInfo.title} ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`} />
//                         <ReviewItem label="Email" value={formData.personalInfo.email} />
//                         <ReviewItem label="Phone" value={formData.personalInfo.phone} />
//                         <ReviewItem label="Address" value={`${formData.address.municipality}, ${formData.address.district}`} />
//                     </div>
//                 </div>
//             </div>
//         )}

//         {/* APPLICATIONS TAB */}
//         {canViewApplications && activeTab === 'applications' && (
//             <div className="animate-in fade-in">
//                 <UniversityApplications student={currentProfile} />
//             </div>
//         )}

//         {/* GENERATE TAB */}
//         {activeTab === 'generate' && isAdminView && canGenerateDocs && (
//             <div className="space-y-6">
//                 <SectionHeader title="Document Generators" subtitle="Create official legal documents automatically." />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     <GenerationCard title="Birth Verification" desc="Verify Date of Birth in AD & BS formats." icon={FileText} onClick={() => setShowDobModal(true)} />
//                     <GenerationCard title="Relationship Cert" desc="Generate family tree with photos." icon={User} onClick={() => setShowRelationModal(true)} />
//                     <GenerationCard title="Occupation Verification" desc="Validate parental job details." icon={Building2} onClick={() => setShowOccupationModal(true)} />
//                     <GenerationCard title="Surname Verification" desc="Resolve naming discrepancies." icon={CheckCircle} onClick={() => setShowSurnameModal(true)} />
//                     <GenerationCard title="Annual Income" desc="3-Year Income Source Table." icon={ClipboardCheck} onClick={() => setShowIncomeModal(true)} /> 
//                     <GenerationCard title="Bank Statement" desc="Generate statement summaries." icon={Building2} onClick={() => setshowBankStatementModal(true)} /> 
//                     <GenerationCard title="Tax Clearance" desc="Tax status verification docs." icon={ShieldCheck} onClick={() => setShowTaxModal(true)} /> 
//                 </div>
//             </div>
//         )}

//         {activeTab === 'interview' && (
//              <div className="space-y-6">
//                 <SectionHeader title="Mock Interview Room" subtitle="AI-powered preparation for Immigration Interviews." />
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//                     <JapaneseInterview />
//                 </div>
//              </div>
//         )}

//         </div>
//       </div>

//       {/* --- MODALS --- */}
//       <SurnameVerificationModal isOpen={showSurnameModal} onClose={() => setShowSurnameModal(false)} student={currentProfile} />
//       <DateOfBirthVerificationModal isOpen={showDobModal} onClose={() => setShowDobModal(false)} student={currentProfile} />
//       <RelationshipVerificationModal isOpen={showRelationModal} onClose={() => setShowRelationModal(false)} student={currentProfile} />
//       <OccupationVerificationModal isOpen={showOccupationModal} onClose={() => setShowOccupationModal(false)} student={currentProfile} />
//       <TaxClearanceVerificationModal isOpen={showTaxModal} onClose={() => setShowTaxModal(false)} student={currentProfile} />
//       <BankStatementGeneratorModal isOpen={showBankStatementModal} onClose={() => setshowBankStatementModal(false)} student={currentProfile} />
//       {showIncomeModal && <AnnualIncomeVerificationModal isOpen={showIncomeModal} onClose={() => setShowIncomeModal(false)} student={currentProfile} />}
      
//     </div>
//   );
// }

// // --- SUB COMPONENTS ---

// function SectionHeader({ title, subtitle }) {
//     return (
//         <div className="mb-2">
//             <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
//             <p className="text-gray-500">{subtitle}</p>
//         </div>
//     );
// }

// function InputGroup({ label, type = "text", placeholder, value, onChange, as, children }) {
//     return (
//         <div className="w-full">
//             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
//             {as === 'select' ? (
//                 <div className="relative">
//                     <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl appearance-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all text-gray-700" value={value || ''} onChange={onChange}>
//                         {children}
//                     </select>
//                     <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
//                         <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//                     </div>
//                 </div>
//             ) : (
//                 <input 
//                     type={type} 
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder-gray-300 text-gray-700" 
//                     placeholder={placeholder} 
//                     value={value || ''} 
//                     onChange={onChange} 
//                 />
//             )}
//         </div>
//     );
// }

// function TabButton({ id, label, icon, active, set, highlight, color = 'green' }) {
//     const isActive = active === id;
    
//     let activeClass = '';
//     let inactiveClass = 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50';

//     if (highlight) {
//         activeClass = 'text-green-600 bg-green-50 border-b-2 border-green-500';
//         inactiveClass = 'text-green-600/70 hover:text-green-700 hover:bg-green-50/50';
//     } else if (color === 'purple') {
//         activeClass = 'text-purple-600 border-b-2 border-purple-500 bg-purple-50';
//     } else if (color === 'red') {
//         activeClass = 'text-red-600 border-b-2 border-red-500 bg-red-50';
//     } else {
//         activeClass = 'text-gray-900 border-b-2 border-gray-900 bg-gray-100';
//     }

//     return (
//         <button 
//             onClick={() => set(id)} 
//             className={`
//                 pb-3 pt-3 px-4 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap rounded-t-lg
//                 ${isActive ? activeClass : inactiveClass}
//             `}
//         >
//             {icon} {label}
//         </button>
//     );
// }

// function DocumentUploadCard({ title, fieldKey, existingUrl, onUpload }) {
//     const [isUploading, setIsUploading] = useState(false);
//     const fileInputRef = useRef(null);
//     const handleFileSelect = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         e.target.value = '';
//         setIsUploading(true);
//         const formData = new FormData();
//         formData.append('file', file);
//         try {
//             const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//             onUpload(fieldKey, res.data.url);
//             toast.success(`${title} uploaded!`);
//         } catch (error) { toast.error("Upload failed."); } finally { setIsUploading(false); }
//     };

//     return (
//         <div onClick={() => !existingUrl && fileInputRef.current.click()} 
//              className={`
//                 group relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 h-48
//                 ${existingUrl 
//                     ? 'border-green-200 bg-green-50/30' 
//                     : 'border-gray-300 hover:border-green-400 hover:bg-green-50/10 cursor-pointer hover:-translate-y-1 hover:shadow-md'
//                 }
//              `}>
//             <input type="file" hidden ref={fileInputRef} onChange={handleFileSelect} accept="image/*,.pdf" />
            
//             {isUploading ? (
//                 <div className="flex flex-col items-center">
//                      <Loader2 className="animate-spin text-green-500 mb-3" size={28} />
//                      <span className="text-xs text-gray-500 font-medium">Uploading...</span>
//                 </div>
//             ) : existingUrl ? (
//                 <>
//                     <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
//                         <CheckCircle className="text-green-600" size={24}/>
//                     </div>
//                     <p className="text-sm text-gray-800 font-bold mb-1 truncate w-full px-2">{title}</p>
//                     <p className="text-xs text-green-600 font-semibold mb-4 bg-green-100 px-2 py-0.5 rounded">Uploaded</p>
                    
//                     <div className="flex gap-2 relative z-20">
//                         <a href={existingUrl} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()} className="px-3 py-1.5 bg-white border border-green-200 rounded-lg text-xs font-bold text-gray-600 hover:text-green-700 hover:border-green-400 transition flex items-center gap-1 shadow-sm">
//                             <Eye size={12}/> View
//                         </a>
//                         <button onClick={(e)=>{e.stopPropagation();fileInputRef.current.click()}} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:text-green-600 hover:border-green-400 transition flex items-center gap-1 shadow-sm">
//                             <Upload size={12}/> Replace
//                         </button>
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     <div className="h-12 w-12 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center mb-3 transition-colors border border-gray-100 group-hover:border-green-200 shadow-sm">
//                         <Upload className="text-gray-400 group-hover:text-green-600 transition-colors" size={20}/>
//                     </div>
//                     <h4 className="font-semibold text-gray-700 text-sm group-hover:text-green-700 transition-colors mb-1">{title}</h4>
//                     <span className="text-xs text-gray-400 group-hover:text-gray-500">Click to browse</span>
//                 </>
//             )}
//         </div>
//     );
// }

// function GenerationCard({ title, desc, icon: Icon, onClick }) {
//     return (
//         <button onClick={onClick} className="flex flex-col text-left h-full bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-green-400 transition-all duration-300 group hover:-translate-y-1">
//             <div className="bg-gray-50 p-4 rounded-xl w-fit shadow-sm mb-4 border border-gray-100 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
//                 <Icon size={24} className="text-gray-600 group-hover:text-white" />
//             </div>
//             <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
//             <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
//         </button>
//     );
// }

// function ReviewItem({ label, value }) {
//     return (
//         <div>
//             <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">{label}</p>
//             <p className="text-base text-gray-800 font-medium break-words">{value || <span className="text-gray-300 italic">Not set</span>}</p>
//         </div>
//     );
// }



// import {
//     ArrowLeft, Building2,
//     Camera,
//     CheckCircle,
//     ClipboardCheck,
//     Eye,
//     FileText,
//     Globe,
//     Loader2,
//     Mic,
//     Plus,
//     Printer,
//     Save,
//     ShieldCheck,
//     Trash2,
//     Upload,
//     User,
//     X,
//     XCircle
// } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { clearCurrentProfile, getMyProfile, getStudentById, reset, updateProfile, updateStudentStatus } from '../../features/students/studentSlice';
// import api from '../../utils/api';

// // Import Generator Modals
// import AnnualIncomeVerificationModal from '../../components/generators/AnnualIncomeVerificationModal';
// import DateOfBirthVerificationModal from '../../components/generators/DateOfBirthVerificationModal';
// import OccupationVerificationModal from '../../components/generators/OccupationVerificationModal';
// import RelationshipVerificationModal from '../../components/generators/RelationshipVerificationModal';
// import SurnameVerificationModal from '../../components/generators/SurnameVerificationModal';
// import TaxClearanceVerificationModal from '../../components/generators/TaxClearanceVerificationModal';

// // Import University Component
// import BankStatementGeneratorModal from '../../components/generators/BankStatementGeneratorModal';
// import NotificationBell from '../../components/layout/NotificationBell'; // Ensure correct path
// import JapaneseInterview from '../../components/student/JapaneseInterview';
// import UniversityApplications from '../../components/student/UniversityApplications';

// export default function StudentProfile() {
//     const { studentId } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { currentProfile, isLoading, isSuccess, message } = useSelector((state) => state.students);
//     const { user } = useSelector((state) => state.auth);

//     const isAdminView = !!studentId;

//     // --- PERMISSIONS ---
//     const role = user?.role;
//     const subRole = user?.subRole;

//     const canGenerateDocs =
//         role === 'consultancy_admin' ||
//         subRole === 'manager' ||
//         subRole === 'document_officer' ||
//         subRole === 'counselor';

//     const canManageUnis =
//         role === 'consultancy_admin' ||
//         subRole === 'manager' ||
//         subRole === 'counselor';

//     const canViewApplications = true;

//     const canChangeStatus =
//         role === 'consultancy_admin' ||
//         subRole === 'manager' ||
//         subRole === 'document_officer';

//     const [activeTab, setActiveTab] = useState('personal');

//     // Form Data State
//     const [formData, setFormData] = useState({
//         personalInfo: { title: 'Mr.', firstName: '', lastName: '', gender: 'Male', dobAD: '', dobBS: '', email: '', phone: '', citizenshipNo: '', citizenshipDistrict: '', citizenshipDate: '', passportNo: '', passportExpiry: '', passportIssuePlace: '', photoUrl: '' },
//         address: { municipality: '', wardNo: '', district: '', province: '', tole: '' },
//         familyInfo: { fatherName: '', motherName: '', grandfatherName: '', spouseName: '', relatives: [] },
//         academics: [],
//         financialInfo: { incomeSources: [], fiscalYears: [], exchangeRate: 134, sponsor: '' },
//         documents: { other: [] },
//         visaDetails: { japaneseLanguage: {}, education: {}, intake: '' }
//     });

//     // UI States
//     const [newDocTitle, setNewDocTitle] = useState('');
//     const [isAddingDoc, setIsAddingDoc] = useState(false);

//     // Generator Modal States
//     const [showSurnameModal, setShowSurnameModal] = useState(false);
//     const [showDobModal, setShowDobModal] = useState(false);
//     const [showRelationModal, setShowRelationModal] = useState(false);
//     const [showOccupationModal, setShowOccupationModal] = useState(false);
//     const [showIncomeModal, setShowIncomeModal] = useState(false);
//     const [showBankStatementModal, setshowBankStatementModal] = useState(false);
//     const [showTaxModal, setShowTaxModal] = useState(false);

//     // --- 1. INITIALIZATION ---
//     useEffect(() => {
//         if (isAdminView) {
//             dispatch(getStudentById(studentId));
//         } else {
//             dispatch(getMyProfile());
//         }

//         return () => {
//             dispatch(reset());
//             dispatch(clearCurrentProfile());
//         };
//     }, [dispatch, studentId, isAdminView]);

//     // --- 2. SYNC STATE ---
//     useEffect(() => {
//         if (currentProfile) {
//             setFormData(prev => ({
//                 ...prev,
//                 ...currentProfile,
//                 personalInfo: { ...prev.personalInfo, ...currentProfile.personalInfo },
//                 address: { ...prev.address, ...currentProfile.address },
//                 familyInfo: { ...prev.familyInfo, ...currentProfile.familyInfo },
//                 academics: currentProfile.academics || [],
//                 financialInfo: { ...prev.financialInfo, ...currentProfile.financialInfo },
//                 documents: {
//                     ...currentProfile.documents,
//                     other: currentProfile.documents?.other || []
//                 },
//                 visaDetails: currentProfile.visaDetails || {}
//             }));
//         }
//     }, [currentProfile]);

//     // --- 3. ALERTS ---
//     useEffect(() => {
//         if (isSuccess && message) toast.success(message);
//         if (isSuccess) dispatch(reset());
//     }, [isSuccess, message, dispatch]);

//     // --- HANDLERS ---
//     const handleSave = () => {
//         if (!currentProfile?._id) return;
//         dispatch(updateProfile({ id: currentProfile._id, data: formData }));
//     };

//     const handleStatusChange = (newStatus) => {
//         if (window.confirm(`Change status to ${newStatus}?`)) {
//             dispatch(updateStudentStatus({ id: currentProfile._id, status: newStatus }));
//         }
//     };

//     const updateField = (section, field, value) => {
//         setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
//     };

//     // --- ACADEMIC HELPERS ---
//     const addAcademicRow = () => {
//         setFormData(prev => ({
//             ...prev,
//             academics: [...prev.academics, { level: '', institution: '', passedYear: '', grade: '' }]
//         }));
//     };

//     const updateAcademicRow = (index, field, value) => {
//         const newList = [...formData.academics];
//         newList[index][field] = value;
//         setFormData(prev => ({ ...prev, academics: newList }));
//     };

//     const removeAcademicRow = (index) => {
//         const newList = formData.academics.filter((_, i) => i !== index);
//         setFormData(prev => ({ ...prev, academics: newList }));
//     };

//     // --- DOCUMENT HELPERS ---
//     const handleDocumentUpdate = async (fieldKey, url) => {
//         const updatedDocuments = { ...formData.documents, [fieldKey]: url };
//         setFormData(prev => ({ ...prev, documents: updatedDocuments }));

//         try {
//             await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
//         } catch (error) {
//             console.error("Save failed", error);
//             toast.error("Document uploaded but failed to save.");
//         }
//     };

//     // --- DYNAMIC DOCUMENTS ---
//     const handleAddDynamicDoc = async () => {
//         if (!newDocTitle.trim()) return toast.error("Please enter a document title");

//         const newDoc = { title: newDocTitle, url: '' };
//         const updatedOtherDocs = [...(formData.documents.other || []), newDoc];
//         const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };

//         setFormData(prev => ({ ...prev, documents: updatedDocuments }));
//         setNewDocTitle('');
//         setIsAddingDoc(false);

//         try {
//             await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
//             toast.success("Document slot added!");
//         } catch (error) {
//             console.error("Save failed", error);
//             toast.error("Failed to save new document slot.");
//         }
//     };

//     const handleDynamicDocUpload = async (index, url) => {
//         const updatedOtherDocs = formData.documents.other.map((doc, i) => i === index ? { ...doc, url: url } : doc);
//         const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };
//         setFormData(prev => ({ ...prev, documents: updatedDocuments }));

//         try {
//             await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
//         } catch (error) {
//             console.error("Save failed", error);
//         }
//     };

//     const removeDynamicDoc = async (index) => {
//         const updatedOtherDocs = formData.documents.other.filter((_, i) => i !== index);
//         const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };
//         setFormData(prev => ({ ...prev, documents: updatedDocuments }));

//         try {
//             await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
//             toast.success("Document removed.");
//         } catch (error) {
//             console.error("Delete failed", error);
//         }
//     };

//     // --- PROFILE PHOTO ---
//     const handleProfilePhotoUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const uploadData = new FormData();
//         uploadData.append('file', file);

//         try {
//             const toastId = toast.loading("Uploading photo...");
//             const res = await api.post('/upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
//             const newPhotoUrl = res.data.url;
//             updateField('personalInfo', 'photoUrl', newPhotoUrl);

//             const updatedProfileData = { ...formData, personalInfo: { ...formData.personalInfo, photoUrl: newPhotoUrl } };
//             await dispatch(updateProfile({ id: currentProfile._id, data: updatedProfileData })).unwrap();
//             toast.dismiss(toastId);
//             toast.success("Profile photo saved!");
//         } catch (error) {
//             toast.dismiss();
//             toast.error("Photo upload failed");
//         }
//     };

//     if (!currentProfile && isLoading) return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
//             <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
//             <span className="text-slate-500 font-medium">Loading Student Profile...</span>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">

//             {/* 1. TOP NAVIGATION / BREADCRUMB */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                 {isAdminView && (
//                     <button onClick={() => navigate('/dashboard')} className="group flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-medium">
//                         <div className="p-1.5 rounded-full bg-white border border-slate-200 shadow-sm group-hover:border-slate-300 transition-all">
//                             <ArrowLeft size={16} />
//                         </div>
//                         Back to Dashboard
//                     </button>
//                 )}

//                 {/* 2. PROFILE HEADER */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200  relative group">
//                     {/* Decorative Banner */}
//                     <div className="h-32 w-full bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden rounded-t-2xl">
//                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
//                         <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
//                     </div>

//                     <div className="px-8 pb-8 pt-0 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 relative">
                        
//                         {/* Profile Photo & Info */}
//                         <div className="flex items-end gap-6 -mt-12 relative z-10">
//                             <div className="relative group/avatar">
//                                 <div className="h-28 w-28 rounded-full bg-white p-1 shadow-lg">
//                                     <div className="h-full w-full rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-100">
//                                         {formData.personalInfo.photoUrl ? (
//                                             <img src={formData.personalInfo.photoUrl} alt="Profile" className="h-full w-full object-cover" />
//                                         ) : <User size={48} className="text-slate-300" />}
//                                     </div>
//                                 </div>
//                                 <label className="absolute bottom-2 right-2 bg-slate-900 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-emerald-600 transition-all transform hover:scale-110">
//                                     <Camera size={14} />
//                                     <input type="file" hidden accept="image/*" onChange={handleProfilePhotoUpload} />
//                                 </label>
//                             </div>

//                             <div className="">
//                                 <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
//                                     {formData.personalInfo.firstName || 'Student'} {formData.personalInfo.lastName}
//                                 </h1>
//                                 <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-slate-500 font-medium">
//                                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border
//                                         ${isAdminView ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
//                                         <ShieldCheck size={12} />
//                                         {isAdminView ? 'Admin View' : 'Applicant'}
//                                     </span>
//                                     <span className="hidden sm:inline text-slate-300">|</span>
//                                     <span className="flex items-center gap-1.5"><Globe size={14} className="text-slate-400" /> {formData.address.district || 'Nepal'}</span>
//                                     <span className="hidden sm:inline text-slate-300">|</span>
//                                     <span>{formData.personalInfo.email}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Actions Right Side */}
//                         <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
                            
//                             {/* Notification Bell with improved container */}
//                             <div className="mr-2">
//                                 <NotificationBell />
//                             </div>

//                             {/* Status Pill */}
//                             <div className={`px-4 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wide flex items-center gap-2 shadow-sm
//                                 ${currentProfile?.profileStatus === 'verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
//                                   currentProfile?.profileStatus === 'lead' ? 'bg-amber-50 border-amber-200 text-amber-700' :
//                                   'bg-slate-50 border-slate-200 text-slate-700'}`}>
//                                 <span className="relative flex h-2.5 w-2.5">
//                                     <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 
//                                         ${currentProfile?.profileStatus === 'verified' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
//                                     <span className={`relative inline-flex rounded-full h-2.5 w-2.5 
//                                         ${currentProfile?.profileStatus === 'verified' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
//                                 </span>
//                                 {currentProfile?.profileStatus}
//                             </div>

//                             {/* Save Button */}
//                             <button
//                                 onClick={handleSave}
//                                 disabled={isLoading}
//                                 className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed font-medium"
//                             >
//                                 {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
//                                 Save Changes
//                             </button>
//                         </div>
//                     </div>

//                     {/* Admin Workflow Actions */}
//                     {isAdminView && canChangeStatus && (
//                         <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-3 items-center">
//                             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Workflow Actions:</span>
//                             {currentProfile?.profileStatus === 'lead' && (
//                                 <>
//                                     <button onClick={() => handleStatusChange('rejected')} className="px-4 py-2 text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg flex items-center gap-1.5 transition shadow-sm">
//                                         <XCircle size={14} /> Reject
//                                     </button>
//                                     <button onClick={() => handleStatusChange('draft')} className="px-4 py-2 text-xs font-bold text-purple-600 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg flex items-center gap-1.5 transition shadow-sm">
//                                         <CheckCircle size={14} /> Approve as Student
//                                     </button>
//                                 </>
//                             )}
//                             {currentProfile?.profileStatus === 'draft' && (
//                                 <button onClick={() => handleStatusChange('verified')} className="px-4 py-2 text-xs font-bold text-emerald-600 bg-white border border-emerald-200 hover:bg-emerald-50 rounded-lg flex items-center gap-1.5 transition shadow-sm">
//                                     <CheckCircle size={14} /> Verify & Lock
//                                 </button>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* 3. STICKY NAVIGATION TABS */}
//             <div className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur-md border-b border-slate-200 shadow-sm mb-8 transition-all">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex overflow-x-auto hide-scrollbar gap-1 pt-1">
//                         {['personal', 'address', 'family', 'academics', 'financial', 'documents'].map(tab => (
//                             <TabButton
//                                 key={tab}
//                                 id={tab}
//                                 label={tab.charAt(0).toUpperCase() + tab.slice(1)}
//                                 active={activeTab}
//                                 set={setActiveTab}
//                             />
//                         ))}

//                         <div className="w-px h-6 bg-slate-300 self-center mx-3 hidden md:block opacity-50"></div>

//                         <TabButton id="review" label="Review" icon={<ClipboardCheck size={16} />} active={activeTab} set={setActiveTab} />

//                         {canViewApplications && (
//                             <TabButton id="applications" label="Applications" icon={<Building2 size={16} />} active={activeTab} set={setActiveTab} highlight />
//                         )}

//                         {isAdminView && canGenerateDocs && (
//                             <TabButton id="generate" label="Generators" icon={<Printer size={16} />} active={activeTab} set={setActiveTab} color="purple" />
//                         )}

//                         <TabButton id="interview" label="AI Prep" icon={<Mic size={16} />} active={activeTab} set={setActiveTab} color="red" />
//                     </div>
//                 </div>
//             </div>

//             {/* 4. MAIN CONTENT AREA */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="min-h-[600px] animate-in fade-in duration-500">

//                     {/* PERSONAL TAB */}
//                     {activeTab === 'personal' && (
//                         <div className="space-y-8">
//                             <SectionHeader title="Basic Identity" subtitle="Ensure these details match the passport exactly." />

//                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
//                                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//                                     <div className="md:col-span-2">
//                                         <InputGroup label="Title" as="select" value={formData.personalInfo.title} onChange={(e) => updateField('personalInfo', 'title', e.target.value)}>
//                                             <option>Mr.</option><option>Ms.</option><option>Mrs.</option>
//                                         </InputGroup>
//                                     </div>
//                                     <div className="md:col-span-4"><InputGroup label="First Name" value={formData.personalInfo.firstName} onChange={(e) => updateField('personalInfo', 'firstName', e.target.value)} /></div>
//                                     <div className="md:col-span-4"><InputGroup label="Last Name" value={formData.personalInfo.lastName} onChange={(e) => updateField('personalInfo', 'lastName', e.target.value)} /></div>
//                                     <div className="md:col-span-2">
//                                         <InputGroup label="Gender" as="select" value={formData.personalInfo.gender} onChange={(e) => updateField('personalInfo', 'gender', e.target.value)}>
//                                             <option>Male</option><option>Female</option><option>Other</option>
//                                         </InputGroup>
//                                     </div>

//                                     <div className="md:col-span-6"><InputGroup label="Date of Birth (AD)" type="date" value={formData.personalInfo.dobAD ? formData.personalInfo.dobAD.split('T')[0] : ''} onChange={(e) => updateField('personalInfo', 'dobAD', e.target.value)} /></div>
//                                     <div className="md:col-span-6"><InputGroup label="Date of Birth (BS)" placeholder="YYYY/MM/DD" value={formData.personalInfo.dobBS} onChange={(e) => updateField('personalInfo', 'dobBS', e.target.value)} /></div>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-emerald-300 transition-colors">
//                                     <div className="absolute top-0 left-0 w-1.5 bg-emerald-500 h-full"></div>
//                                     <h3 className="font-bold text-slate-800 flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
//                                         <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><FileText size={20} /></div>
//                                         Citizenship Details
//                                     </h3>
//                                     <div className="space-y-5">
//                                         <InputGroup label="Citizenship No." value={formData.personalInfo.citizenshipNo} onChange={(e) => updateField('personalInfo', 'citizenshipNo', e.target.value)} />
//                                         <div className="grid grid-cols-2 gap-5">
//                                             <InputGroup label="Issue District" value={formData.personalInfo.citizenshipDistrict} onChange={(e) => updateField('personalInfo', 'citizenshipDistrict', e.target.value)} />
//                                             <InputGroup label="Issue Date (BS)" value={formData.personalInfo.citizenshipDate} onChange={(e) => updateField('personalInfo', 'citizenshipDate', e.target.value)} />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-emerald-300 transition-colors">
//                                     <div className="absolute top-0 left-0 w-1.5 bg-emerald-500 h-full"></div>
//                                     <h3 className="font-bold text-slate-800 flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
//                                         <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Globe size={20} /></div>
//                                         Passport Details
//                                     </h3>
//                                     <div className="space-y-5">
//                                         <InputGroup label="Passport No." value={formData.personalInfo.passportNo} onChange={(e) => updateField('personalInfo', 'passportNo', e.target.value)} />
//                                         <div className="grid grid-cols-2 gap-5">
//                                             <InputGroup label="Issue Place" value={formData.personalInfo.passportIssuePlace} onChange={(e) => updateField('personalInfo', 'passportIssuePlace', e.target.value)} />
//                                             <InputGroup label="Expiry Date (AD)" type="date" value={formData.personalInfo.passportExpiry ? formData.personalInfo.passportExpiry.split('T')[0] : ''} onChange={(e) => updateField('personalInfo', 'passportExpiry', e.target.value)} />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* ADDRESS TAB */}
//                     {activeTab === 'address' && (
//                         <div className="space-y-6">
//                             <SectionHeader title="Permanent Address" subtitle="This address will appear on all generated legal documents." />
//                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     <div className="lg:col-span-2">
//                                         <InputGroup label="Municipality / VDC" value={formData.address.municipality} onChange={(e) => updateField('address', 'municipality', e.target.value)} />
//                                     </div>
//                                     <InputGroup label="Ward No." value={formData.address.wardNo} onChange={(e) => updateField('address', 'wardNo', e.target.value)} />
//                                     <InputGroup label="Tole / Street" value={formData.address.tole} onChange={(e) => updateField('address', 'tole', e.target.value)} />
//                                     <InputGroup label="District" value={formData.address.district} onChange={(e) => updateField('address', 'district', e.target.value)} />
//                                     <InputGroup label="Province" value={formData.address.province} onChange={(e) => updateField('address', 'province', e.target.value)} />
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* FAMILY TAB */}
//                     {activeTab === 'family' && (
//                         <div className="space-y-6">
//                             <SectionHeader title="Family Information" subtitle="Required for Birth, Relationship, and Income Verification docs." />
//                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                                     <InputGroup label="Father's Full Name" value={formData.familyInfo.fatherName} onChange={(e) => updateField('familyInfo', 'fatherName', e.target.value)} />
//                                     <InputGroup label="Mother's Full Name" value={formData.familyInfo.motherName} onChange={(e) => updateField('familyInfo', 'motherName', e.target.value)} />
//                                     <InputGroup label="Grandfather's Full Name" value={formData.familyInfo.grandfatherName} onChange={(e) => updateField('familyInfo', 'grandfatherName', e.target.value)} />
//                                     <InputGroup label="Spouse Name (Optional)" value={formData.familyInfo.spouseName} onChange={(e) => updateField('familyInfo', 'spouseName', e.target.value)} />
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* ACADEMICS TAB */}
//                     {activeTab === 'academics' && (
//                         <div className="space-y-6">
//                             <div className="flex justify-between items-end">
//                                 <SectionHeader title="Academic History" subtitle="List qualifications in descending order (Masters -> Bachelors -> +2)." />
//                                 <button onClick={addAcademicRow} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 flex items-center gap-2 transition shadow-md hover:shadow-lg">
//                                     <Plus size={16} /> Add Qualification
//                                 </button>
//                             </div>

//                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
//                                 {formData.academics.length === 0 && (
//                                     <div className="text-center py-16 text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
//                                         <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
//                                             <FileText size={24} className="text-slate-300" />
//                                         </div>
//                                         <p className="font-medium">No academic records added yet.</p>
//                                     </div>
//                                 )}
//                                 {formData.academics.map((row, index) => (
//                                     <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 p-6 rounded-xl border border-slate-200 relative group transition-all hover:border-slate-300 hover:shadow-sm">
//                                         <div className="md:col-span-3"><InputGroup label="Level" placeholder="e.g. +2, Bachelor" value={row.level} onChange={(e) => updateAcademicRow(index, 'level', e.target.value)} /></div>
//                                         <div className="md:col-span-5"><InputGroup label="Institution" placeholder="School/College Name" value={row.institution} onChange={(e) => updateAcademicRow(index, 'institution', e.target.value)} /></div>
//                                         <div className="md:col-span-2"><InputGroup label="Year" placeholder="Passed Year" value={row.passedYear} onChange={(e) => updateAcademicRow(index, 'passedYear', e.target.value)} /></div>
//                                         <div className="md:col-span-1"><InputGroup label="GPA/%" value={row.grade} onChange={(e) => updateAcademicRow(index, 'grade', e.target.value)} /></div>
//                                         <div className="md:col-span-1 flex justify-end pb-2">
//                                             <button onClick={() => removeAcademicRow(index)} className="p-3 bg-white text-red-400 border border-slate-200 rounded-xl hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition shadow-sm">
//                                                 <Trash2 size={18} />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* FINANCIAL TAB */}
//                     {activeTab === 'financial' && (
//                         <div className="space-y-6">
//                             <SectionHeader title="Financial Status" subtitle="Data for Annual Income & Tax Clearance." />
//                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
//                                 <div className="max-w-md">
//                                     <InputGroup label="Current Exchange Rate (1 USD = ? NPR)" type="number" value={formData.financialInfo.exchangeRate} onChange={(e) => updateField('financialInfo', 'exchangeRate', e.target.value)} />
//                                 </div>
//                                 <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl flex gap-4 text-amber-800 text-sm items-start">
//                                     <div className="p-2 bg-amber-100 rounded-full shrink-0"><CheckCircle size={16} /></div>
//                                     <div>
//                                         <p className="font-bold mb-1">Important Note</p>
//                                         <p className="leading-relaxed">Income source details for the verification matrix are handled via the specific "Annual Income" generator in the Generators tab. Please consult with the document officer.</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* DOCUMENTS TAB */}
//                     {activeTab === 'documents' && (
//                         <div className="space-y-8">
//                             <SectionHeader title="Document Repository" subtitle="Upload high-quality scans. Supported: JPG, PNG, PDF." />

//                             {/* Fixed Documents */}
//                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
//                                 <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
//                                     <CheckCircle size={20} className="text-emerald-600" /> Mandatory Documents
//                                 </h3>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                                     <DocumentUploadCard title="Citizenship (Front)" fieldKey="citizenshipFront" existingUrl={formData.documents?.citizenshipFront} onUpload={handleDocumentUpdate} />
//                                     <DocumentUploadCard title="Citizenship (Back)" fieldKey="citizenshipBack" existingUrl={formData.documents?.citizenshipBack} onUpload={handleDocumentUpdate} />
//                                     <DocumentUploadCard title="Passport (Bio Page)" fieldKey="passportBio" existingUrl={formData.documents?.passportBio} onUpload={handleDocumentUpdate} />
//                                     <DocumentUploadCard title="SLC/SEE Marksheet" fieldKey="slcMarksheet" existingUrl={formData.documents?.slcMarksheet} onUpload={handleDocumentUpdate} />
//                                     <DocumentUploadCard title="SLC/SEE Character" fieldKey="slcCharacter" existingUrl={formData.documents?.slcCharacter} onUpload={handleDocumentUpdate} />
//                                     <DocumentUploadCard title="+2 Transcript" fieldKey="plus2Transcript" existingUrl={formData.documents?.plus2Transcript} onUpload={handleDocumentUpdate} />
//                                 </div>
//                             </div>

//                             {/* Other Documents */}
//                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
//                                 <div className="flex justify-between items-center mb-6">
//                                     <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
//                                         <Plus size={20} className="text-blue-600" /> Additional Documents
//                                     </h3>
//                                     {!isAddingDoc && (
//                                         <button onClick={() => setIsAddingDoc(true)} className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition border border-blue-200">
//                                             <Plus size={14} /> Add Slot
//                                         </button>
//                                     )}
//                                 </div>

//                                 {isAddingDoc && (
//                                     <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 animate-in fade-in slide-in-from-top-2">
//                                         <div className="flex flex-col sm:flex-row gap-4 items-end max-w-2xl">
//                                             <div className="flex-1 w-full">
//                                                 <InputGroup label="Document Title" placeholder="e.g. Work Experience Letter" value={newDocTitle} onChange={(e) => setNewDocTitle(e.target.value)} />
//                                             </div>
//                                             <div className="flex gap-3">
//                                                 <button onClick={handleAddDynamicDoc} className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 text-sm font-bold transition">Confirm</button>
//                                                 <button onClick={() => setIsAddingDoc(false)} className="bg-white border border-slate-300 text-slate-600 px-6 py-3 rounded-xl hover:bg-slate-50 text-sm font-bold transition">Cancel</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                                     {formData.documents?.other?.map((doc, index) => (
//                                         <div key={index} className="relative group">
//                                             <DocumentUploadCard title={doc.title} fieldKey={`other-${index}`} existingUrl={doc.url} onUpload={(key, url) => handleDynamicDocUpload(index, url)} />
//                                             <button onClick={() => removeDynamicDoc(index)} className="absolute -top-3 -right-3 bg-white text-red-500 p-2 rounded-full border shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:scale-110 z-10">
//                                                 <X size={16} />
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* REVIEW TAB */}
//                     {activeTab === 'review' && (
//                         <div className="space-y-6">
//                             <SectionHeader title="Profile Review" subtitle="Quick glance summary." />
//                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
//                                 <h3 className="font-semibold text-slate-900 mb-6 pb-2 border-b">Personal Summary</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
//                                     <ReviewItem label="Full Name" value={`${formData.personalInfo.title} ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`} />
//                                     <ReviewItem label="Email" value={formData.personalInfo.email} />
//                                     <ReviewItem label="Phone" value={formData.personalInfo.phone} />
//                                     <ReviewItem label="Address" value={`${formData.address.municipality}, ${formData.address.district}`} />
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* APPLICATIONS TAB */}
//                     {canViewApplications && activeTab === 'applications' && (
//                         <div className="animate-in fade-in">
//                             <UniversityApplications student={currentProfile} />
//                         </div>
//                     )}

//                     {/* GENERATE TAB */}
//                     {activeTab === 'generate' && isAdminView && canGenerateDocs && (
//                         <div className="space-y-6">
//                             <SectionHeader title="Document Generators" subtitle="Create official legal documents automatically." />
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 <GenerationCard title="Birth Verification" desc="Verify Date of Birth in AD & BS formats." icon={FileText} onClick={() => setShowDobModal(true)} />
//                                 <GenerationCard title="Relationship Cert" desc="Generate family tree with photos." icon={User} onClick={() => setShowRelationModal(true)} />
//                                 <GenerationCard title="Occupation Verification" desc="Validate parental job details." icon={Building2} onClick={() => setShowOccupationModal(true)} />
//                                 <GenerationCard title="Surname Verification" desc="Resolve naming discrepancies." icon={CheckCircle} onClick={() => setShowSurnameModal(true)} />
//                                 <GenerationCard title="Annual Income" desc="3-Year Income Source Table." icon={ClipboardCheck} onClick={() => setShowIncomeModal(true)} />
//                                 <GenerationCard title="Bank Statement" desc="Generate statement summaries." icon={Building2} onClick={() => setshowBankStatementModal(true)} />
//                                 <GenerationCard title="Tax Clearance" desc="Tax status verification docs." icon={ShieldCheck} onClick={() => setShowTaxModal(true)} />
//                             </div>
//                         </div>
//                     )}

//                     {activeTab === 'interview' && (
//                         <div className="space-y-6">
//                             <SectionHeader title="Mock Interview Room" subtitle="AI-powered preparation for Immigration Interviews." />
//                             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//                                 <JapaneseInterview />
//                             </div>
//                         </div>
//                     )}

//                 </div>
//             </div>

//             {/* --- MODALS --- */}
//             <SurnameVerificationModal isOpen={showSurnameModal} onClose={() => setShowSurnameModal(false)} student={currentProfile} />
//             <DateOfBirthVerificationModal isOpen={showDobModal} onClose={() => setShowDobModal(false)} student={currentProfile} />
//             <RelationshipVerificationModal isOpen={showRelationModal} onClose={() => setShowRelationModal(false)} student={currentProfile} />
//             <OccupationVerificationModal isOpen={showOccupationModal} onClose={() => setShowOccupationModal(false)} student={currentProfile} />
//             <TaxClearanceVerificationModal isOpen={showTaxModal} onClose={() => setShowTaxModal(false)} student={currentProfile} />
//             <BankStatementGeneratorModal isOpen={showBankStatementModal} onClose={() => setshowBankStatementModal(false)} student={currentProfile} />
//             {showIncomeModal && <AnnualIncomeVerificationModal isOpen={showIncomeModal} onClose={() => setShowIncomeModal(false)} student={currentProfile} />}

//         </div>
//     );
// }

// // --- SUB COMPONENTS ---

// function SectionHeader({ title, subtitle }) {
//     return (
//         <div className="mb-2">
//             <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
//             <p className="text-slate-500 font-medium">{subtitle}</p>
//         </div>
//     );
// }

// function InputGroup({ label, type = "text", placeholder, value, onChange, as, children }) {
//     return (
//         <div className="w-full group">
//             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-emerald-600 transition-colors">{label}</label>
//             {as === 'select' ? (
//                 <div className="relative">
//                     <select className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl appearance-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-700 font-medium" value={value || ''} onChange={onChange}>
//                         {children}
//                     </select>
//                     <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
//                         <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
//                     </div>
//                 </div>
//             ) : (
//                 <input
//                     type={type}
//                     className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder-slate-300 text-slate-700 font-medium"
//                     placeholder={placeholder}
//                     value={value || ''}
//                     onChange={onChange}
//                 />
//             )}
//         </div>
//     );
// }

// function TabButton({ id, label, icon, active, set, highlight, color = 'green' }) {
//     const isActive = active === id;

//     let activeClass = '';
//     let inactiveClass = 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50';

//     if (highlight) {
//         activeClass = 'text-blue-600 bg-blue-50 border-b-2 border-blue-500';
//         inactiveClass = 'text-blue-600/70 hover:text-blue-700 hover:bg-blue-50/50';
//     } else if (color === 'purple') {
//         activeClass = 'text-purple-600 border-b-2 border-purple-500 bg-purple-50';
//     } else if (color === 'red') {
//         activeClass = 'text-red-600 border-b-2 border-red-500 bg-red-50';
//     } else {
//         activeClass = 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/50';
//     }

//     return (
//         <button
//             onClick={() => set(id)}
//             className={`
//                 py-3 px-5 text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap rounded-t-xl
//                 ${isActive ? activeClass : inactiveClass}
//             `}
//         >
//             {icon} {label}
//         </button>
//     );
// }

// function DocumentUploadCard({ title, fieldKey, existingUrl, onUpload }) {
//     const [isUploading, setIsUploading] = useState(false);
//     const fileInputRef = useRef(null);
//     const handleFileSelect = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         e.target.value = '';
//         setIsUploading(true);
//         const formData = new FormData();
//         formData.append('file', file);
//         try {
//             const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//             onUpload(fieldKey, res.data.url);
//             toast.success(`${title} uploaded!`);
//         } catch (error) { toast.error("Upload failed."); } finally { setIsUploading(false); }
//     };

//     return (
//         <div onClick={() => !existingUrl && fileInputRef.current.click()}
//             className={`
//                 group relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 h-48
//                 ${existingUrl
//                     ? 'border-emerald-200 bg-emerald-50/30'
//                     : 'border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/10 cursor-pointer hover:-translate-y-1 hover:shadow-md'
//                 }
//              `}>
//             <input type="file" hidden ref={fileInputRef} onChange={handleFileSelect} accept="image/*,.pdf" />

//             {isUploading ? (
//                 <div className="flex flex-col items-center animate-pulse">
//                     <Loader2 className="animate-spin text-emerald-500 mb-3" size={28} />
//                     <span className="text-xs text-slate-500 font-medium">Uploading...</span>
//                 </div>
//             ) : existingUrl ? (
//                 <>
//                     <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3 text-emerald-600">
//                         <CheckCircle size={24} />
//                     </div>
//                     <p className="text-sm text-slate-800 font-bold mb-1 truncate w-full px-2">{title}</p>
//                     <p className="text-xs text-emerald-600 font-bold mb-4 bg-emerald-100 px-2 py-0.5 rounded">UPLOADED</p>

//                     <div className="flex gap-2 relative z-20 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
//                         <a href={existingUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs font-bold text-slate-600 hover:text-emerald-700 hover:border-emerald-400 transition flex items-center gap-1 shadow-sm">
//                             <Eye size={12} /> View
//                         </a>
//                         <button onClick={(e) => { e.stopPropagation(); fileInputRef.current.click() }} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-400 transition flex items-center gap-1 shadow-sm">
//                             <Upload size={12} /> Replace
//                         </button>
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     <div className="h-12 w-12 rounded-full bg-slate-50 group-hover:bg-white flex items-center justify-center mb-3 transition-colors border border-slate-100 group-hover:border-emerald-200 shadow-sm">
//                         <Upload className="text-slate-400 group-hover:text-emerald-600 transition-colors" size={20} />
//                     </div>
//                     <h4 className="font-semibold text-slate-700 text-sm group-hover:text-emerald-700 transition-colors mb-1">{title}</h4>
//                     <span className="text-xs text-slate-400 group-hover:text-slate-500 font-medium">Click to browse</span>
//                 </>
//             )}
//         </div>
//     );
// }

// function GenerationCard({ title, desc, icon: Icon, onClick }) {
//     return (
//         <button onClick={onClick} className="flex flex-col text-left h-full bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-400 transition-all duration-300 group hover:-translate-y-1">
//             <div className="bg-slate-50 p-4 rounded-xl w-fit shadow-sm mb-4 border border-slate-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
//                 <Icon size={24} className="text-slate-600 group-hover:text-white" />
//             </div>
//             <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
//             <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
//         </button>
//     );
// }

// function ReviewItem({ label, value }) {
//     return (
//         <div>
//             <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">{label}</p>
//             <p className="text-base text-slate-800 font-bold break-words">{value || <span className="text-slate-300 font-normal italic">Not set</span>}</p>
//         </div>
//     );
// }

import {
    ArrowLeft, Award, Building2,
    Calendar,
    Camera,
    CheckCircle,
    ClipboardCheck,
    DollarSign,
    Eye,
    FileCheck,
    FileText,
    Globe,
    Loader2,
    Mail,
    MapPin,
    Mic,
    PenTool,
    Phone,
    Plus,
    Printer,
    Save,
    ShieldCheck,
    Trash2,
    Upload,
    User,
    X,
    XCircle
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCurrentProfile, getMyProfile, getStudentById, reset, updateProfile, updateStudentStatus } from '../../features/students/studentSlice';
import api from '../../utils/api';

// Import Generator Modals
import AnnualIncomeVerificationModal from '../../components/generators/AnnualIncomeVerificationModal';
import DateOfBirthVerificationModal from '../../components/generators/DateOfBirthVerificationModal';
import OccupationVerificationModal from '../../components/generators/OccupationVerificationModal';
import RelationshipVerificationModal from '../../components/generators/RelationshipVerificationModal';
import SurnameVerificationModal from '../../components/generators/SurnameVerificationModal';
import TaxClearanceVerificationModal from '../../components/generators/TaxClearanceVerificationModal';

// Import University Component
import BankStatementGeneratorModal from '../../components/generators/BankStatementGeneratorModal';
import NotificationBell from '../../components/layout/NotificationBell';
import JapaneseInterview from '../../components/student/JapaneseInterview';
import SopWritingAssistant from '../../components/student/SopWritingAssistant';
import UniversityApplications from '../../components/student/UniversityApplications';

export default function StudentProfile() {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentProfile, isLoading, isSuccess, message } = useSelector((state) => state.students);
    const { user } = useSelector((state) => state.auth);

    const isAdminView = !!studentId;

    // --- PERMISSIONS ---
    const role = user?.role;
    const subRole = user?.subRole;

    const canGenerateDocs =
        role === 'consultancy_admin' ||
        subRole === 'manager' ||
        subRole === 'document_officer' ||
        subRole === 'counselor';

    const canManageUnis =
        role === 'consultancy_admin' ||
        subRole === 'manager' ||
        subRole === 'counselor';

    const canViewApplications = true;

    const canChangeStatus =
        role === 'consultancy_admin' ||
        subRole === 'manager' ||
        subRole === 'document_officer';

    const [activeTab, setActiveTab] = useState('personal');

    // Form Data State
    const [formData, setFormData] = useState({
        personalInfo: { title: 'Mr.', firstName: '', lastName: '', gender: 'Male', dobAD: '', dobBS: '', email: '', phone: '', citizenshipNo: '', citizenshipDistrict: '', citizenshipDate: '', passportNo: '', passportExpiry: '', passportIssuePlace: '', photoUrl: '' },
        address: { municipality: '', wardNo: '', district: '', province: '', tole: '' },
        familyInfo: { fatherName: '', motherName: '', grandfatherName: '', spouseName: '', relatives: [] },
        academics: [],
        financialInfo: { incomeSources: [], fiscalYears: [], exchangeRate: 134, sponsor: '' },
        documents: { other: [] },
        visaDetails: { japaneseLanguage: {}, education: {}, intake: '' }
    });

    // UI States
    const [newDocTitle, setNewDocTitle] = useState('');
    const [isAddingDoc, setIsAddingDoc] = useState(false);

    // Generator Modal States
    const [showSurnameModal, setShowSurnameModal] = useState(false);
    const [showDobModal, setShowDobModal] = useState(false);
    const [showRelationModal, setShowRelationModal] = useState(false);
    const [showOccupationModal, setShowOccupationModal] = useState(false);
    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [showBankStatementModal, setshowBankStatementModal] = useState(false);
    const [showTaxModal, setShowTaxModal] = useState(false);

    // --- 1. INITIALIZATION ---
    useEffect(() => {
        if (isAdminView) {
            dispatch(getStudentById(studentId));
        } else {
            dispatch(getMyProfile());
        }

        return () => {
            dispatch(reset());
            dispatch(clearCurrentProfile());
        };
    }, [dispatch, studentId, isAdminView]);

    // --- 2. SYNC STATE ---
    useEffect(() => {
        if (currentProfile) {
            setFormData(prev => ({
                ...prev,
                ...currentProfile,
                personalInfo: { ...prev.personalInfo, ...currentProfile.personalInfo },
                address: { ...prev.address, ...currentProfile.address },
                familyInfo: { ...prev.familyInfo, ...currentProfile.familyInfo },
                academics: currentProfile.academics || [],
                financialInfo: { ...prev.financialInfo, ...currentProfile.financialInfo },
                documents: {
                    ...currentProfile.documents,
                    other: currentProfile.documents?.other || []
                },
                visaDetails: currentProfile.visaDetails || {}
            }));
        }
    }, [currentProfile]);

    // --- 3. ALERTS ---
    useEffect(() => {
        if (isSuccess && message) toast.success(message);
        if (isSuccess) dispatch(reset());
    }, [isSuccess, message, dispatch]);

    // --- HANDLERS ---
    const handleSave = () => {
        if (!currentProfile?._id) return;
        dispatch(updateProfile({ id: currentProfile._id, data: formData }));
    };

    const handleStatusChange = (newStatus) => {
        if (window.confirm(`Change status to ${newStatus}?`)) {
            dispatch(updateStudentStatus({ id: currentProfile._id, status: newStatus }));
        }
    };

    const updateField = (section, field, value) => {
        setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    };

    // --- ACADEMIC HELPERS ---
    const addAcademicRow = () => {
        setFormData(prev => ({
            ...prev,
            academics: [...prev.academics, { level: '', institution: '', passedYear: '', grade: '' }]
        }));
    };

    const updateAcademicRow = (index, field, value) => {
        const newList = [...formData.academics];
        newList[index][field] = value;
        setFormData(prev => ({ ...prev, academics: newList }));
    };

    const removeAcademicRow = (index) => {
        const newList = formData.academics.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, academics: newList }));
    };

    // --- DOCUMENT HELPERS ---
    const handleDocumentUpdate = async (fieldKey, url) => {
        const updatedDocuments = { ...formData.documents, [fieldKey]: url };
        setFormData(prev => ({ ...prev, documents: updatedDocuments }));

        try {
            await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
        } catch (error) {
            console.error("Save failed", error);
            toast.error("Document uploaded but failed to save.");
        }
    };

    // --- DYNAMIC DOCUMENTS ---
    const handleAddDynamicDoc = async () => {
        if (!newDocTitle.trim()) return toast.error("Please enter a document title");

        const newDoc = { title: newDocTitle, url: '' };
        const updatedOtherDocs = [...(formData.documents.other || []), newDoc];
        const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };

        setFormData(prev => ({ ...prev, documents: updatedDocuments }));
        setNewDocTitle('');
        setIsAddingDoc(false);

        try {
            await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
            toast.success("Document slot added!");
        } catch (error) {
            console.error("Save failed", error);
            toast.error("Failed to save new document slot.");
        }
    };

    const handleDynamicDocUpload = async (index, url) => {
        const updatedOtherDocs = formData.documents.other.map((doc, i) => i === index ? { ...doc, url: url } : doc);
        const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };
        setFormData(prev => ({ ...prev, documents: updatedDocuments }));

        try {
            await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
        } catch (error) {
            console.error("Save failed", error);
        }
    };

    const removeDynamicDoc = async (index) => {
        const updatedOtherDocs = formData.documents.other.filter((_, i) => i !== index);
        const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };
        setFormData(prev => ({ ...prev, documents: updatedDocuments }));

        try {
            await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
            toast.success("Document removed.");
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    // --- PROFILE PHOTO ---
    const handleProfilePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const toastId = toast.loading("Uploading photo...");
            const res = await api.post('/upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
            const newPhotoUrl = res.data.url;
            updateField('personalInfo', 'photoUrl', newPhotoUrl);

            const updatedProfileData = { ...formData, personalInfo: { ...formData.personalInfo, photoUrl: newPhotoUrl } };
            await dispatch(updateProfile({ id: currentProfile._id, data: updatedProfileData })).unwrap();
            toast.dismiss(toastId);
            toast.success("Profile photo saved!");
        } catch (error) {
            toast.dismiss();
            toast.error("Photo upload failed");
        }
    };

    if (!currentProfile && isLoading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-50">
            <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
                <Loader2 className="animate-spin text-emerald-600 mb-4 relative z-10" size={48} />
            </div>
            <span className="text-slate-600 font-semibold text-lg mt-4">Loading Profile...</span>
            <span className="text-slate-400 text-sm mt-1">Please wait</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">

            {/* TOP NAVIGATION */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {isAdminView && (
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all mb-6 text-sm font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </button>
                )}

                {/* PROFILE HEADER - Important: No 'overflow-hidden' on parent so bell dropdown can show */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 relative group">
                    
                    {/* Gradient Banner - Rounded top only */}
                    <div className="h-32 sm:h-40 w-full bg-gradient-to-r from-emerald-600 to-teal-500 relative rounded-t-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                            {/* Notification Bell lives here */}
                            <NotificationBell />
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="px-6 sm:px-8 pb-8">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                            
                            {/* Avatar & Info */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 z-10 relative">
                                <div className="relative group/avatar">
                                    <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-xl ring-1 ring-slate-100">
                                        <div className="h-full w-full rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
                                            {formData.personalInfo.photoUrl ? (
                                                <img src={formData.personalInfo.photoUrl} alt="Profile" className="h-full w-full object-cover" />
                                            ) : <User size={48} className="text-slate-400" />}
                                        </div>
                                    </div>
                                    <label className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2.5 rounded-xl cursor-pointer shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-110">
                                        <Camera size={16} />
                                        <input type="file" hidden accept="image/*" onChange={handleProfilePhotoUpload} />
                                    </label>
                                </div>

                                <div className="text-center sm:text-left mb-2">
                                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                                        {formData.personalInfo.firstName || 'Student'} {formData.personalInfo.lastName}
                                    </h1>
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-slate-500 font-medium">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm
                                            ${isAdminView ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                            <ShieldCheck size={12} />
                                            {isAdminView ? 'Admin View' : 'Applicant'}
                                        </span>
                                        <span className="hidden sm:inline text-slate-300">|</span>
                                        <span className="flex items-center gap-1.5"><Globe size={14} className="text-slate-400" /> {formData.address.district || 'Nepal'}</span>
                                        <span className="hidden sm:inline text-slate-300">|</span>
                                        <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-400" /> {formData.personalInfo.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
                                {/* Status Badge */}
                                <div className={`px-5 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm
                                    ${currentProfile?.profileStatus === 'verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                                      currentProfile?.profileStatus === 'lead' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                      'bg-slate-50 border-slate-200 text-slate-700'}`}>
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 
                                            ${currentProfile?.profileStatus === 'verified' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 
                                            ${currentProfile?.profileStatus === 'verified' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                                    </span>
                                    {currentProfile?.profileStatus}
                                </div>

                                {/* Save Button */}
                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-70 font-semibold text-sm"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Admin Actions Bar */}
                    {isAdminView && canChangeStatus && (
                        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl">
                            <div className="flex flex-wrap gap-3 items-center">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 w-full sm:w-auto mb-2 sm:mb-0">Workflow Actions:</span>
                                {currentProfile?.profileStatus === 'lead' && (
                                    <>
                                        <button onClick={() => handleStatusChange('rejected')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
                                            <XCircle size={14} /> Reject
                                        </button>
                                        <button onClick={() => handleStatusChange('draft')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-purple-600 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
                                            <CheckCircle size={14} /> Approve
                                        </button>
                                    </>
                                )}
                                {currentProfile?.profileStatus === 'draft' && (
                                    <button onClick={() => handleStatusChange('verified')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-emerald-600 bg-white border border-emerald-200 hover:bg-emerald-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
                                        <CheckCircle size={14} /> Verify & Lock
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* STICKY TABS */}
            <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm mb-8 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto hide-scrollbar gap-1 pt-1">
                        {[
                            { id: 'personal', label: 'Personal', icon: <User size={14} /> },
                            { id: 'address', label: 'Address', icon: <MapPin size={14} /> },
                            { id: 'family', label: 'Family', icon: <User size={14} /> },
                            { id: 'academics', label: 'Academics', icon: <Award size={14} /> },
                            { id: 'financial', label: 'Financial', icon: <DollarSign size={14} /> },
                            { id: 'documents', label: 'Documents', icon: <FileText size={14} /> }
                        ].map(tab => (
                            <TabButton key={tab.id} {...tab} active={activeTab} set={setActiveTab} />
                        ))}

                        <div className="w-px h-6 bg-slate-300 self-center mx-2 hidden lg:block opacity-50"></div>

                        <TabButton id="review" label="Review" icon={<ClipboardCheck size={14} />} active={activeTab} set={setActiveTab} />

                        {canViewApplications && (
                            <TabButton id="applications" label="Applications" icon={<Building2 size={14} />} active={activeTab} set={setActiveTab} highlight />
                        )}

                        {isAdminView && canGenerateDocs && (
                            <TabButton id="generate" label="Generators" icon={<Printer size={14} />} active={activeTab} set={setActiveTab} color="purple" />
                        )}
                        
                        <TabButton id="sop" label="SOP Writer" icon={<PenTool size={14} />} active={activeTab} set={setActiveTab} color="purple" />
                        <TabButton id="interview" label="AI Prep" icon={<Mic size={14} />} active={activeTab} set={setActiveTab} color="red" />
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="min-h-[600px] pb-12">

                    {/* PERSONAL TAB */}
                    {activeTab === 'personal' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SectionHeader title="Basic Identity" subtitle="Ensure these details match the passport exactly." icon={<User className="text-emerald-600"/>} />

                            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div className="md:col-span-2">
                                        <InputGroup label="Title" as="select" value={formData.personalInfo.title} onChange={(e) => updateField('personalInfo', 'title', e.target.value)}>
                                            <option>Mr.</option><option>Ms.</option><option>Mrs.</option>
                                        </InputGroup>
                                    </div>
                                    <div className="md:col-span-4"><InputGroup label="First Name" value={formData.personalInfo.firstName} onChange={(e) => updateField('personalInfo', 'firstName', e.target.value)} /></div>
                                    <div className="md:col-span-4"><InputGroup label="Last Name" value={formData.personalInfo.lastName} onChange={(e) => updateField('personalInfo', 'lastName', e.target.value)} /></div>
                                    <div className="md:col-span-2">
                                        <InputGroup label="Gender" as="select" value={formData.personalInfo.gender} onChange={(e) => updateField('personalInfo', 'gender', e.target.value)}>
                                            <option>Male</option><option>Female</option><option>Other</option>
                                        </InputGroup>
                                    </div>

                                    <div className="md:col-span-6"><InputGroup label="Date of Birth (AD)" type="date" value={formData.personalInfo.dobAD ? formData.personalInfo.dobAD.split('T')[0] : ''} onChange={(e) => updateField('personalInfo', 'dobAD', e.target.value)} icon={<Calendar size={16}/>} /></div>
                                    <div className="md:col-span-6"><InputGroup label="Date of Birth (BS)" placeholder="YYYY/MM/DD" value={formData.personalInfo.dobBS} onChange={(e) => updateField('personalInfo', 'dobBS', e.target.value)} icon={<Calendar size={16}/>} /></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <InfoCard title="Citizenship Details" icon={FileText} color="emerald">
                                    <div className="space-y-5">
                                        <InputGroup label="Citizenship No." value={formData.personalInfo.citizenshipNo} onChange={(e) => updateField('personalInfo', 'citizenshipNo', e.target.value)} />
                                        <div className="grid grid-cols-2 gap-5">
                                            <InputGroup label="Issue District" value={formData.personalInfo.citizenshipDistrict} onChange={(e) => updateField('personalInfo', 'citizenshipDistrict', e.target.value)} />
                                            <InputGroup label="Issue Date (BS)" value={formData.personalInfo.citizenshipDate} onChange={(e) => updateField('personalInfo', 'citizenshipDate', e.target.value)} />
                                        </div>
                                    </div>
                                </InfoCard>

                                <InfoCard title="Passport Details" icon={Globe} color="emerald">
                                    <div className="space-y-5">
                                        <InputGroup label="Passport No." value={formData.personalInfo.passportNo} onChange={(e) => updateField('personalInfo', 'passportNo', e.target.value)} />
                                        <div className="grid grid-cols-2 gap-5">
                                            <InputGroup label="Issue Place" value={formData.personalInfo.passportIssuePlace} onChange={(e) => updateField('personalInfo', 'passportIssuePlace', e.target.value)} />
                                            <InputGroup label="Expiry Date (AD)" type="date" value={formData.personalInfo.passportExpiry ? formData.personalInfo.passportExpiry.split('T')[0] : ''} onChange={(e) => updateField('personalInfo', 'passportExpiry', e.target.value)} />
                                        </div>
                                    </div>
                                </InfoCard>
                            </div>
                        </div>
                    )}

                    {/* ADDRESS TAB */}
                    {activeTab === 'address' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SectionHeader title="Permanent Address" subtitle="This address will appear on all generated legal documents." icon={<MapPin className="text-emerald-600"/>} />
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2">
                                        <InputGroup label="Municipality / VDC" value={formData.address.municipality} onChange={(e) => updateField('address', 'municipality', e.target.value)} />
                                    </div>
                                    <InputGroup label="Ward No." value={formData.address.wardNo} onChange={(e) => updateField('address', 'wardNo', e.target.value)} />
                                    <InputGroup label="Tole / Street" value={formData.address.tole} onChange={(e) => updateField('address', 'tole', e.target.value)} />
                                    <InputGroup label="District" value={formData.address.district} onChange={(e) => updateField('address', 'district', e.target.value)} />
                                    <InputGroup label="Province" value={formData.address.province} onChange={(e) => updateField('address', 'province', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FAMILY TAB */}
                    {activeTab === 'family' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SectionHeader title="Family Information" subtitle="Required for Birth, Relationship, and Income Verification docs." icon={<User className="text-emerald-600"/>} />
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InputGroup label="Father's Full Name" value={formData.familyInfo.fatherName} onChange={(e) => updateField('familyInfo', 'fatherName', e.target.value)} />
                                    <InputGroup label="Mother's Full Name" value={formData.familyInfo.motherName} onChange={(e) => updateField('familyInfo', 'motherName', e.target.value)} />
                                    <InputGroup label="Grandfather's Full Name" value={formData.familyInfo.grandfatherName} onChange={(e) => updateField('familyInfo', 'grandfatherName', e.target.value)} />
                                    <InputGroup label="Spouse Name (Optional)" value={formData.familyInfo.spouseName} onChange={(e) => updateField('familyInfo', 'spouseName', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ACADEMICS TAB */}
                    {activeTab === 'academics' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-end">
                                <SectionHeader title="Academic History" subtitle="List qualifications in descending order (Masters -> Bachelors -> +2)." icon={<Award className="text-emerald-600"/>} />
                                <button onClick={addAcademicRow} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 flex items-center gap-2 transition shadow-md hover:shadow-lg">
                                    <Plus size={16} /> Add Qualification
                                </button>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                                {formData.academics.length === 0 && (
                                    <div className="text-center py-16 text-slate-400 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200">
                                        <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                                            <FileText size={24} className="text-slate-300" />
                                        </div>
                                        <p className="font-semibold text-lg">No academic records added yet.</p>
                                        <p className="text-sm mt-1">Click "Add Qualification" to start.</p>
                                    </div>
                                )}
                                {formData.academics.map((row, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 p-6 rounded-xl border border-slate-200 relative group transition-all hover:border-emerald-300 hover:shadow-sm">
                                        <div className="md:col-span-3"><InputGroup label="Level" placeholder="e.g. +2, Bachelor" value={row.level} onChange={(e) => updateAcademicRow(index, 'level', e.target.value)} /></div>
                                        <div className="md:col-span-5"><InputGroup label="Institution" placeholder="School/College Name" value={row.institution} onChange={(e) => updateAcademicRow(index, 'institution', e.target.value)} /></div>
                                        <div className="md:col-span-2"><InputGroup label="Year" placeholder="Passed Year" value={row.passedYear} onChange={(e) => updateAcademicRow(index, 'passedYear', e.target.value)} /></div>
                                        <div className="md:col-span-1"><InputGroup label="GPA/%" value={row.grade} onChange={(e) => updateAcademicRow(index, 'grade', e.target.value)} /></div>
                                        <div className="md:col-span-1 flex justify-end pb-2">
                                            <button onClick={() => removeAcademicRow(index)} className="p-3 bg-white text-red-400 border border-slate-200 rounded-xl hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition shadow-sm">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FINANCIAL TAB */}
                    {activeTab === 'financial' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SectionHeader title="Financial Status" subtitle="Data for Annual Income & Tax Clearance." icon={<DollarSign className="text-emerald-600"/>} />
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <div className="max-w-md">
                                    <InputGroup label="Current Exchange Rate (1 USD = ? NPR)" type="number" value={formData.financialInfo.exchangeRate} onChange={(e) => updateField('financialInfo', 'exchangeRate', e.target.value)} />
                                </div>
                                <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl flex gap-4 text-amber-800 text-sm items-start">
                                    <div className="p-2 bg-amber-100 rounded-full shrink-0"><CheckCircle size={16} /></div>
                                    <div>
                                        <p className="font-bold mb-1">Important Note</p>
                                        <p className="leading-relaxed">Income source details are handled via the "Annual Income" generator in the Generators tab. Please consult with the document officer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DOCUMENTS TAB */}
                    {activeTab === 'documents' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SectionHeader title="Document Repository" subtitle="Upload high-quality scans. Supported: JPG, PNG, PDF." icon={<FileText className="text-emerald-600"/>} />

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-emerald-100 rounded-xl"><CheckCircle size={20} className="text-emerald-600"/></div>
                                    Mandatory Documents
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    <DocumentUploadCard title="Citizenship (Front)" fieldKey="citizenshipFront" existingUrl={formData.documents?.citizenshipFront} onUpload={handleDocumentUpdate} />
                                    <DocumentUploadCard title="Citizenship (Back)" fieldKey="citizenshipBack" existingUrl={formData.documents?.citizenshipBack} onUpload={handleDocumentUpdate} />
                                    <DocumentUploadCard title="Passport (Bio Page)" fieldKey="passportBio" existingUrl={formData.documents?.passportBio} onUpload={handleDocumentUpdate} />
                                    <DocumentUploadCard title="SLC/SEE Marksheet" fieldKey="slcMarksheet" existingUrl={formData.documents?.slcMarksheet} onUpload={handleDocumentUpdate} />
                                    <DocumentUploadCard title="SLC/SEE Character" fieldKey="slcCharacter" existingUrl={formData.documents?.slcCharacter} onUpload={handleDocumentUpdate} />
                                    <DocumentUploadCard title="+2 Transcript" fieldKey="plus2Transcript" existingUrl={formData.documents?.plus2Transcript} onUpload={handleDocumentUpdate} />
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-3 text-lg">
                                        <div className="p-2 bg-blue-100 rounded-xl"><Plus size={20} className="text-blue-600"/></div>
                                        Additional Documents
                                    </h3>
                                    {!isAddingDoc && (
                                        <button onClick={() => setIsAddingDoc(true)} className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition border border-blue-200">
                                            <Plus size={14} /> Add Slot
                                        </button>
                                    )}
                                </div>

                                {isAddingDoc && (
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 animate-in fade-in slide-in-from-top-2">
                                        <div className="flex flex-col sm:flex-row gap-4 items-end max-w-2xl">
                                            <div className="flex-1 w-full">
                                                <InputGroup label="Document Title" placeholder="e.g. Work Experience Letter" value={newDocTitle} onChange={(e) => setNewDocTitle(e.target.value)} />
                                            </div>
                                            <div className="flex gap-3">
                                                <button onClick={handleAddDynamicDoc} className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 text-sm font-bold transition">Confirm</button>
                                                <button onClick={() => setIsAddingDoc(false)} className="bg-white border border-slate-300 text-slate-600 px-6 py-3 rounded-xl hover:bg-slate-50 text-sm font-bold transition">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {formData.documents?.other?.map((doc, index) => (
                                        <div key={index} className="relative group">
                                            <DocumentUploadCard title={doc.title} fieldKey={`other-${index}`} existingUrl={doc.url} onUpload={(key, url) => handleDynamicDocUpload(index, url)} />
                                            <button onClick={() => removeDynamicDoc(index)} className="absolute -top-3 -right-3 bg-white text-red-500 p-2 rounded-full border shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:scale-110 z-10">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* REVIEW TAB */}
                    {activeTab === 'review' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SectionHeader title="Profile Review" subtitle="Quick glance summary." icon={<ClipboardCheck className="text-emerald-600"/>} />
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
                                    <FileCheck className="text-emerald-600" size={20}/> Personal Summary
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                                    <ReviewItem label="Full Name" value={`${formData.personalInfo.title} ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`} icon={<User size={16}/>} />
                                    <ReviewItem label="Email" value={formData.personalInfo.email} icon={<Mail size={16}/>} />
                                    <ReviewItem label="Phone" value={formData.personalInfo.phone} icon={<Phone size={16}/>} />
                                    <ReviewItem label="Address" value={`${formData.address.municipality}, ${formData.address.district}`} icon={<MapPin size={16}/>} />
                                    <ReviewItem label="Date of Birth" value={formData.personalInfo.dobBS} icon={<Calendar size={16}/>} />
                                    <ReviewItem label="Passport No." value={formData.personalInfo.passportNo} icon={<Globe size={16}/>} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* APPLICATIONS TAB */}
                    {canViewApplications && activeTab === 'applications' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <UniversityApplications student={currentProfile} />
                        </div>
                    )}

                    {/* GENERATE TAB */}
                    {activeTab === 'generate' && isAdminView && canGenerateDocs && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SectionHeader title="Document Generators" subtitle="Create official legal documents automatically." icon={<Printer className="text-purple-600"/>} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <GenerationCard title="Birth Verification" desc="Verify Date of Birth in AD & BS formats." icon={FileText} onClick={() => setShowDobModal(true)} />
                                <GenerationCard title="Relationship Cert" desc="Generate family tree with photos." icon={User} onClick={() => setShowRelationModal(true)} />
                                <GenerationCard title="Occupation Verification" desc="Validate parental job details." icon={Building2} onClick={() => setShowOccupationModal(true)} />
                                <GenerationCard title="Surname Verification" desc="Resolve naming discrepancies." icon={CheckCircle} onClick={() => setShowSurnameModal(true)} />
                                <GenerationCard title="Annual Income" desc="3-Year Income Source Table." icon={ClipboardCheck} onClick={() => setShowIncomeModal(true)} /> 
                                <GenerationCard title="Bank Statement" desc="Generate statement summaries." icon={Building2} onClick={() => setshowBankStatementModal(true)} /> 
                                <GenerationCard title="Tax Clearance" desc="Tax status verification docs." icon={ShieldCheck} onClick={() => setShowTaxModal(true)} /> 
                            </div>
                        </div>
                    )}

                    {/* SOP WRITER TAB */}
                    {activeTab === 'sop' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SectionHeader title="SOP Writing Assistant" subtitle="AI-powered drafting engine for Statement of Purpose (Riyu-sho)." icon={<PenTool className="text-purple-600"/>} />
                            <SopWritingAssistant student={currentProfile} />
                        </div>
                    )}

                    {/* INTERVIEW TAB */}
                    {activeTab === 'interview' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SectionHeader title="Mock Interview Room" subtitle="AI-powered preparation for Immigration Interviews." icon={<Mic className="text-red-600"/>} />
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                                <JapaneseInterview />
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* --- MODALS --- */}
            <SurnameVerificationModal isOpen={showSurnameModal} onClose={() => setShowSurnameModal(false)} student={currentProfile} />
            <DateOfBirthVerificationModal isOpen={showDobModal} onClose={() => setShowDobModal(false)} student={currentProfile} />
            <RelationshipVerificationModal isOpen={showRelationModal} onClose={() => setShowRelationModal(false)} student={currentProfile} />
            <OccupationVerificationModal isOpen={showOccupationModal} onClose={() => setShowOccupationModal(false)} student={currentProfile} />
            <TaxClearanceVerificationModal isOpen={showTaxModal} onClose={() => setShowTaxModal(false)} student={currentProfile} />
            <BankStatementGeneratorModal isOpen={showBankStatementModal} onClose={() => setshowBankStatementModal(false)} student={currentProfile} />
            {showIncomeModal && <AnnualIncomeVerificationModal isOpen={showIncomeModal} onClose={() => setShowIncomeModal(false)} student={currentProfile} />}
            
        </div>
    );
}

// --- SUB COMPONENTS ---

function SectionHeader({ title, subtitle, icon }) {
    return (
        <div className="mb-2">
            <div className="flex items-center gap-3 mb-2">
                {icon}
                <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
            </div>
            <p className="text-slate-500 font-medium pl-9">{subtitle}</p>
        </div>
    );
}

function InfoCard({ title, icon: Icon, color, children }) {
    return (
        <div className={`bg-white p-8 rounded-2xl shadow-lg border border-slate-200 relative overflow-hidden group hover:border-${color}-300 transition-all`}>
            <div className={`absolute top-0 left-0 w-1.5 bg-gradient-to-b from-${color}-500 to-${color}-600 h-full`}></div>
            <h3 className="font-bold text-slate-800 flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className={`p-2 bg-${color}-100 rounded-lg text-${color}-600`}><Icon size={20}/></div>
                <span className="text-lg">{title}</span>
            </h3>
            {children}
        </div>
    );
}

function InputGroup({ label, type = "text", placeholder, value, onChange, as, children, icon }) {
    return (
        <div className="w-full group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-emerald-600 transition-colors">{label}</label>
            {as === 'select' ? (
                <div className="relative">
                    <select className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl appearance-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all text-slate-700 font-medium shadow-sm" value={value || ''} onChange={onChange}>
                        {children}
                    </select>
                    <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    {icon && <div className="absolute left-3 top-3 text-slate-400">{icon}</div>}
                    <input 
                        type={type} 
                        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all placeholder-slate-400 text-slate-700 font-medium shadow-sm`}
                        placeholder={placeholder} 
                        value={value || ''} 
                        onChange={onChange} 
                    />
                </div>
            )}
        </div>
    );
}

function TabButton({ id, label, icon, active, set, highlight, color = 'green' }) {
    const isActive = active === id;
    
    let activeClass = '';
    let inactiveClass = 'text-slate-500 hover:text-slate-800 hover:bg-slate-50';

    if (highlight) {
        activeClass = 'text-blue-700 bg-gradient-to-br from-blue-50 to-blue-100/50 border-b-2 border-blue-500';
        inactiveClass = 'text-blue-600/70 hover:text-blue-700 hover:bg-blue-50/50';
    } else if (color === 'purple') {
        activeClass = 'text-purple-700 border-b-2 border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100/50';
    } else if (color === 'red') {
        activeClass = 'text-red-700 border-b-2 border-red-500 bg-gradient-to-br from-red-50 to-red-100/50';
    } else {
        activeClass = 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/50';
    }

    return (
        <button 
            onClick={() => set(id)} 
            className={`
                py-3 px-5 text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap rounded-t-xl
                ${isActive ? activeClass : inactiveClass}
            `}
        >
            {icon} <span className="hidden sm:inline">{label}</span><span className="sm:hidden">{label.split(' ')[0]}</span>
        </button>
    );
}

function DocumentUploadCard({ title, fieldKey, existingUrl, onUpload }) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        e.target.value = '';
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            onUpload(fieldKey, res.data.url);
            toast.success(`${title} uploaded!`);
        } catch (error) { toast.error("Upload failed."); } finally { setIsUploading(false); }
    };

    return (
        <div onClick={() => !existingUrl && fileInputRef.current.click()} 
             className={`
                group relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 h-48
                ${existingUrl 
                    ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100/30' 
                    : 'border-slate-300 hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50/50 hover:to-transparent cursor-pointer hover:-translate-y-1 hover:shadow-lg'
                }
             `}>
            <input type="file" hidden ref={fileInputRef} onChange={handleFileSelect} accept="image/*,.pdf" />
            
            {isUploading ? (
                <div className="flex flex-col items-center animate-pulse">
                     <Loader2 className="animate-spin text-emerald-600 mb-3" size={32} />
                     <span className="text-xs text-slate-600 font-semibold">Uploading...</span>
                </div>
            ) : existingUrl ? (
                <>
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-3 text-white shadow-md">
                        <CheckCircle size={24}/>
                    </div>
                    <p className="text-sm text-slate-900 font-bold mb-1 truncate w-full px-2">{title}</p>
                    <p className="text-xs text-emerald-700 font-bold mb-4 bg-emerald-200 px-2 py-0.5 rounded-lg">UPLOADED</p>
                    
                    <div className="flex gap-2 relative z-20 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        <a href={existingUrl} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()} className="px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs font-bold text-slate-600 hover:text-emerald-700 hover:border-emerald-400 transition flex items-center gap-1 shadow-sm">
                            <Eye size={12}/> View
                        </a>
                        <button onClick={(e)=>{e.stopPropagation();fileInputRef.current.click()}} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-400 transition flex items-center gap-1 shadow-sm">
                            <Upload size={12}/> Replace
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-white group-hover:to-emerald-50 flex items-center justify-center mb-3 transition-colors border border-slate-200 group-hover:border-emerald-300 shadow-sm">
                        <Upload className="text-slate-400 group-hover:text-emerald-600 transition-colors" size={22}/>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors mb-1">{title}</h4>
                    <span className="text-xs text-slate-500 group-hover:text-slate-600 font-medium">Click to browse</span>
                </>
            )}
        </div>
    );
}

function GenerationCard({ title, desc, icon: Icon, onClick }) {
    return (
        <button onClick={onClick} className="flex flex-col text-left h-full bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 group hover:-translate-y-1">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-2xl w-fit shadow-sm mb-4 border border-slate-200 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:border-emerald-500 transition-colors duration-300">
                <Icon size={24} className="text-slate-600 group-hover:text-white" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{desc}</p>
        </button>
    );
}

function ReviewItem({ label, value, icon }) {
    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100/30 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
                <div className="text-slate-400">{icon}</div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{label}</p>
            </div>
            <p className="text-base text-slate-900 font-bold break-words pl-6">{value || <span className="text-slate-400 font-normal italic">Not set</span>}</p>
        </div>
    );
}