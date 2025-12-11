


// // // // import {
// // // //     ArrowLeft, Award, BookOpen, Building2,
// // // //     Calendar,
// // // //     Camera,
// // // //     CheckCircle,
// // // //     ClipboardCheck,
// // // //     DollarSign,
// // // //     Eye,
// // // //     FileCheck,
// // // //     FileText,
// // // //     Globe,
// // // //     Loader2,
// // // //     Mail,
// // // //     MapPin,
// // // //     Mic,
// // // //     PenTool,
// // // //     Phone,
// // // //     Plus,
// // // //     Printer,
// // // //     Save,
// // // //     ShieldCheck,
// // // //     Trash2,
// // // //     Upload,
// // // //     User,
// // // //     Users,
// // // //     X,
// // // //     XCircle
// // // // } from 'lucide-react';
// // // // import { useEffect, useRef, useState } from 'react';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { useNavigate, useParams } from 'react-router-dom';
// // // // import { toast } from 'react-toastify';
// // // // import { clearCurrentProfile, getMyProfile, getStudentById, reset, updateProfile, updateStudentStatus } from '../../features/students/studentSlice';
// // // // import api from '../../utils/api';

// // // // // Import Generator Modals
// // // // import AnnualIncomeVerificationModal from '../../components/generators/AnnualIncomeVerificationModal';
// // // // import DateOfBirthVerificationModal from '../../components/generators/DateOfBirthVerificationModal';
// // // // // NEW IMPORT: Date of Birth (Married)
// // // // import DateOfBirthVerificationMarriedModal from '../../components/generators/DateOfBirthVerificationMarriedModal';
// // // // import LanguageCertificateModal from '../../components/generators/LanguageCertificateModal';
// // // // import OccupationVerificationModal from '../../components/generators/OccupationVerificationModal';
// // // // import RelationshipVerificationMarriedModal from '../../components/generators/RelationshipVerificationMarriedModal';
// // // // import RelationshipVerificationModal from '../../components/generators/RelationshipVerificationModal';
// // // // import SurnameVerificationModal from '../../components/generators/SurnameVerificationModal';
// // // // import TaxClearanceVerificationModal from '../../components/generators/TaxClearanceVerificationModal';

// // // // // Import University Component
// // // // import BankStatementGeneratorModal from '../../components/generators/BankStatementGeneratorModal';
// // // // import NotificationBell from '../../components/layout/NotificationBell';
// // // // import JapaneseInterview from '../../components/student/JapaneseInterview';
// // // // import SopWritingAssistant from '../../components/student/SopWritingAssistant';
// // // // import UniversityApplications from '../../components/student/UniversityApplications';

// // // // export default function StudentProfile() {
// // // //     const { studentId } = useParams();
// // // //     const navigate = useNavigate();
// // // //     const dispatch = useDispatch();

// // // //     const { currentProfile, isLoading, isSuccess, message } = useSelector((state) => state.students);
// // // //     const { user } = useSelector((state) => state.auth);

// // // //     const isAdminView = !!studentId;

// // // //     // --- PERMISSIONS ---
// // // //     const role = user?.role;
// // // //     const subRole = user?.subRole;

// // // //     const canGenerateDocs =
// // // //         role === 'consultancy_admin' ||
// // // //         subRole === 'manager' ||
// // // //         subRole === 'document_officer' ||
// // // //         subRole === 'counselor';

// // // //     const canManageUnis =
// // // //         role === 'consultancy_admin' ||
// // // //         subRole === 'manager' ||
// // // //         subRole === 'counselor';

// // // //     const canViewApplications = true;

// // // //     const canChangeStatus =
// // // //         role === 'consultancy_admin' ||
// // // //         subRole === 'manager' ||
// // // //         subRole === 'document_officer';

// // // //     const [activeTab, setActiveTab] = useState('personal');

// // // //     // Form Data State
// // // //     const [formData, setFormData] = useState({
// // // //         personalInfo: { title: 'Mr.', firstName: '', lastName: '', gender: 'Male', dobAD: '', dobBS: '', email: '', phone: '', citizenshipNo: '', citizenshipDistrict: '', citizenshipDate: '', passportNo: '', passportExpiry: '', passportIssuePlace: '', photoUrl: '' },
// // // //         address: { municipality: '', wardNo: '', district: '', province: '', tole: '' },
// // // //         familyInfo: { fatherName: '', motherName: '', grandfatherName: '', spouseName: '', fatherInLawName: '', motherInLawName: '', relatives: [] },
// // // //         academics: [],
// // // //         financialInfo: { incomeSources: [], fiscalYears: [], exchangeRate: 134, sponsor: '' },
// // // //         documents: { other: [] },
// // // //         visaDetails: { japaneseLanguage: { certificateDetails: {} }, education: {}, intake: '' }
// // // //     });

// // // //     // UI States
// // // //     const [newDocTitle, setNewDocTitle] = useState('');
// // // //     const [isAddingDoc, setIsAddingDoc] = useState(false);

// // // //     // Generator Modal States
// // // //     const [showSurnameModal, setShowSurnameModal] = useState(false);
// // // //     const [showDobModal, setShowDobModal] = useState(false);
// // // //     // NEW STATE: DOB Married
// // // //     const [showDobMarriedModal, setShowDobMarriedModal] = useState(false);
// // // //     const [showRelationModal, setShowRelationModal] = useState(false);
// // // //     const [showRelationMarriedModal, setShowRelationMarriedModal] = useState(false);
// // // //     const [showOccupationModal, setShowOccupationModal] = useState(false);
// // // //     const [showIncomeModal, setShowIncomeModal] = useState(false);
// // // //     const [showBankStatementModal, setshowBankStatementModal] = useState(false);
// // // //     const [showTaxModal, setShowTaxModal] = useState(false);
// // // //     const [showLanguageCertModal, setShowLanguageCertModal] = useState(false);

// // // //     // --- 1. INITIALIZATION ---
// // // //     useEffect(() => {
// // // //         if (isAdminView) {
// // // //             dispatch(getStudentById(studentId));
// // // //         } else {
// // // //             dispatch(getMyProfile());
// // // //         }

// // // //         return () => {
// // // //             dispatch(reset());
// // // //             dispatch(clearCurrentProfile());
// // // //         };
// // // //     }, [dispatch, studentId, isAdminView]);

// // // //     // --- 2. SYNC STATE ---
// // // //     useEffect(() => {
// // // //         if (currentProfile) {
// // // //             setFormData(prev => ({
// // // //                 ...prev,
// // // //                 ...currentProfile,
// // // //                 personalInfo: { ...prev.personalInfo, ...currentProfile.personalInfo },
// // // //                 address: { ...prev.address, ...currentProfile.address },
// // // //                 familyInfo: { ...prev.familyInfo, ...currentProfile.familyInfo },
// // // //                 academics: currentProfile.academics || [],
// // // //                 financialInfo: { ...prev.financialInfo, ...currentProfile.financialInfo },
// // // //                 documents: {
// // // //                     ...currentProfile.documents,
// // // //                     other: currentProfile.documents?.other || []
// // // //                 },
// // // //                 visaDetails: currentProfile.visaDetails || { japaneseLanguage: { certificateDetails: {} } }
// // // //             }));
// // // //         }
// // // //     }, [currentProfile]);

// // // //     // --- 3. ALERTS ---
// // // //     useEffect(() => {
// // // //         if (isSuccess && message) toast.success(message);
// // // //         if (isSuccess) dispatch(reset());
// // // //     }, [isSuccess, message, dispatch]);

// // // //     // --- HANDLERS ---
// // // //     const handleSave = () => {
// // // //         if (!currentProfile?._id) return;
// // // //         dispatch(updateProfile({ id: currentProfile._id, data: formData }));
// // // //     };

// // // //     const handleStatusChange = (newStatus) => {
// // // //         if (window.confirm(`Change status to ${newStatus}?`)) {
// // // //             dispatch(updateStudentStatus({ id: currentProfile._id, status: newStatus }));
// // // //         }
// // // //     };

// // // //     const updateField = (section, field, value) => {
// // // //         setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
// // // //     };

// // // //     // --- ACADEMIC HELPERS ---
// // // //     const addAcademicRow = () => {
// // // //         setFormData(prev => ({
// // // //             ...prev,
// // // //             academics: [...prev.academics, { level: '', institution: '', passedYear: '', grade: '' }]
// // // //         }));
// // // //     };

// // // //     const updateAcademicRow = (index, field, value) => {
// // // //         const newList = [...formData.academics];
// // // //         newList[index][field] = value;
// // // //         setFormData(prev => ({ ...prev, academics: newList }));
// // // //     };

// // // //     const removeAcademicRow = (index) => {
// // // //         const newList = formData.academics.filter((_, i) => i !== index);
// // // //         setFormData(prev => ({ ...prev, academics: newList }));
// // // //     };

// // // //     // --- DOCUMENT HELPERS ---
// // // //     const handleDocumentUpdate = async (fieldKey, url) => {
// // // //         const updatedDocuments = { ...formData.documents, [fieldKey]: url };
// // // //         setFormData(prev => ({ ...prev, documents: updatedDocuments }));

// // // //         try {
// // // //             await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
// // // //         } catch (error) {
// // // //             console.error("Save failed", error);
// // // //             toast.error("Document uploaded but failed to save.");
// // // //         }
// // // //     };

// // // //     // --- DYNAMIC DOCUMENTS ---
// // // //     const handleAddDynamicDoc = async () => {
// // // //         if (!newDocTitle.trim()) return toast.error("Please enter a document title");

// // // //         const newDoc = { title: newDocTitle, url: '' };
// // // //         const updatedOtherDocs = [...(formData.documents.other || []), newDoc];
// // // //         const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };

// // // //         setFormData(prev => ({ ...prev, documents: updatedDocuments }));
// // // //         setNewDocTitle('');
// // // //         setIsAddingDoc(false);

// // // //         try {
// // // //             await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
// // // //             toast.success("Document slot added!");
// // // //         } catch (error) {
// // // //             console.error("Save failed", error);
// // // //             toast.error("Failed to save new document slot.");
// // // //         }
// // // //     };

// // // //     const handleDynamicDocUpload = async (index, url) => {
// // // //         const updatedOtherDocs = formData.documents.other.map((doc, i) => i === index ? { ...doc, url: url } : doc);
// // // //         const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };
// // // //         setFormData(prev => ({ ...prev, documents: updatedDocuments }));

// // // //         try {
// // // //             await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
// // // //         } catch (error) {
// // // //             console.error("Save failed", error);
// // // //         }
// // // //     };

// // // //     const removeDynamicDoc = async (index) => {
// // // //         const updatedOtherDocs = formData.documents.other.filter((_, i) => i !== index);
// // // //         const updatedDocuments = { ...formData.documents, other: updatedOtherDocs };
// // // //         setFormData(prev => ({ ...prev, documents: updatedDocuments }));

// // // //         try {
// // // //             await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
// // // //             toast.success("Document removed.");
// // // //         } catch (error) {
// // // //             console.error("Delete failed", error);
// // // //         }
// // // //     };

// // // //     // --- PROFILE PHOTO ---
// // // //     const handleProfilePhotoUpload = async (e) => {
// // // //         const file = e.target.files[0];
// // // //         if (!file) return;

// // // //         const uploadData = new FormData();
// // // //         uploadData.append('file', file);

// // // //         try {
// // // //             const toastId = toast.loading("Uploading photo...");
// // // //             const res = await api.post('/upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
// // // //             const newPhotoUrl = res.data.url;
// // // //             updateField('personalInfo', 'photoUrl', newPhotoUrl);

// // // //             const updatedProfileData = { ...formData, personalInfo: { ...formData.personalInfo, photoUrl: newPhotoUrl } };
// // // //             await dispatch(updateProfile({ id: currentProfile._id, data: updatedProfileData })).unwrap();
// // // //             toast.dismiss(toastId);
// // // //             toast.success("Profile photo saved!");
// // // //         } catch (error) {
// // // //             toast.dismiss();
// // // //             toast.error("Photo upload failed");
// // // //         }
// // // //     };

// // // //     if (!currentProfile && isLoading) return (
// // // //         <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-50">
// // // //             <div className="relative">
// // // //                 <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
// // // //                 <Loader2 className="animate-spin text-emerald-600 mb-4 relative z-10" size={48} />
// // // //             </div>
// // // //             <span className="text-slate-600 font-semibold text-lg mt-4">Loading Profile...</span>
// // // //             <span className="text-slate-400 text-sm mt-1">Please wait</span>
// // // //         </div>
// // // //     );

// // // //     return (
// // // //         <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">

// // // //             {/* TOP NAVIGATION */}
// // // //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// // // //                 {isAdminView && (
// // // //                     <button 
// // // //                         onClick={() => navigate('/dashboard')} 
// // // //                         className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all mb-6 text-sm font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md"
// // // //                     >
// // // //                         <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
// // // //                         Back to Dashboard
// // // //                     </button>
// // // //                 )}

// // // //                 {/* PROFILE HEADER */}
// // // //                 <div className="bg-white rounded-3xl shadow-sm border border-slate-200 relative group">
// // // //                     <div className="h-32 sm:h-40 w-full bg-gradient-to-r from-emerald-600 to-teal-500 relative rounded-t-3xl overflow-hidden">
// // // //                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
// // // //                         <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
// // // //                             {/* Notification Bell lives here */}
// // // //                             <NotificationBell />
// // // //                         </div>
// // // //                     </div>

// // // //                     <div className="px-6 sm:px-8 pb-8">
// // // //                         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                            
// // // //                             <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 z-10 relative">
// // // //                                 <div className="relative group/avatar">
// // // //                                     <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-xl ring-1 ring-slate-100">
// // // //                                         <div className="h-full w-full rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
// // // //                                             {formData.personalInfo.photoUrl ? (
// // // //                                                 <img src={formData.personalInfo.photoUrl} alt="Profile" className="h-full w-full object-cover" />
// // // //                                             ) : <User size={48} className="text-slate-400" />}
// // // //                                         </div>
// // // //                                     </div>
// // // //                                     <label className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2.5 rounded-xl cursor-pointer shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-110">
// // // //                                         <Camera size={16} />
// // // //                                         <input type="file" hidden accept="image/*" onChange={handleProfilePhotoUpload} />
// // // //                                     </label>
// // // //                                 </div>

// // // //                                 <div className="text-center sm:text-left ">
// // // //                                     <h1 className="text-3xl font-bold text-slate-900 tracking-tight lg:mt-20 md:lg:mt-20">
// // // //                                         {formData.personalInfo.firstName || 'Student'} {formData.personalInfo.lastName}
// // // //                                     </h1>
// // // //                                     <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-slate-500 font-medium">
// // // //                                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm
// // // //                                             ${isAdminView ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
// // // //                                             <ShieldCheck size={12} />
// // // //                                             {isAdminView ? 'Admin View' : 'Applicant'}
// // // //                                         </span>
// // // //                                         <span className="hidden sm:inline text-slate-300">|</span>
// // // //                                         <span className="flex items-center gap-1.5"><Globe size={14} className="text-slate-400" /> {formData.address.district || 'Nepal'}</span>
// // // //                                         <span className="hidden sm:inline text-slate-300">|</span>
// // // //                                         <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-400" /> {formData.personalInfo.email}</span>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>

// // // //                             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
// // // //                                 <div className={`px-5 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm
// // // //                                     ${currentProfile?.profileStatus === 'verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
// // // //                                       currentProfile?.profileStatus === 'lead' ? 'bg-amber-50 border-amber-200 text-amber-700' :
// // // //                                       'bg-slate-50 border-slate-200 text-slate-700'}`}>
// // // //                                     <span className="relative flex h-2.5 w-2.5">
// // // //                                         <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 
// // // //                                             ${currentProfile?.profileStatus === 'verified' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
// // // //                                         <span className={`relative inline-flex rounded-full h-2.5 w-2.5 
// // // //                                             ${currentProfile?.profileStatus === 'verified' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
// // // //                                     </span>
// // // //                                     {currentProfile?.profileStatus}
// // // //                                 </div>

// // // //                                 <button
// // // //                                     onClick={handleSave}
// // // //                                     disabled={isLoading}
// // // //                                     className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-70 font-semibold text-sm"
// // // //                                 >
// // // //                                     {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
// // // //                                     Save Changes
// // // //                                 </button>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>

// // // //                     {isAdminView && canChangeStatus && (
// // // //                         <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl">
// // // //                             <div className="flex flex-wrap gap-3 items-center">
// // // //                                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 w-full sm:w-auto mb-2 sm:mb-0">Workflow Actions:</span>
// // // //                                 {currentProfile?.profileStatus === 'lead' && (
// // // //                                     <>
// // // //                                         <button onClick={() => handleStatusChange('rejected')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
// // // //                                             <XCircle size={14} /> Reject
// // // //                                         </button>
// // // //                                         <button onClick={() => handleStatusChange('draft')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-purple-600 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
// // // //                                             <CheckCircle size={14} /> Approve
// // // //                                         </button>
// // // //                                     </>
// // // //                                 )}
// // // //                                 {currentProfile?.profileStatus === 'draft' && (
// // // //                                     <button onClick={() => handleStatusChange('verified')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-emerald-600 bg-white border border-emerald-200 hover:bg-emerald-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
// // // //                                         <CheckCircle size={14} /> Verify & Lock
// // // //                                     </button>
// // // //                                 )}
// // // //                             </div>
// // // //                         </div>
// // // //                     )}
// // // //                 </div>
// // // //             </div>

// // // //             {/* STICKY TABS */}
// // // //             <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm mb-8 transition-all">
// // // //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //                     <div className="flex overflow-x-auto hide-scrollbar gap-1 pt-1">
// // // //                         {[
// // // //                             { id: 'personal', label: 'Personal', icon: <User size={14} /> },
// // // //                             { id: 'address', label: 'Address', icon: <MapPin size={14} /> },
// // // //                             { id: 'family', label: 'Family', icon: <User size={14} /> },
// // // //                             { id: 'academics', label: 'Academics', icon: <Award size={14} /> },
// // // //                             { id: 'financial', label: 'Financial', icon: <DollarSign size={14} /> },
// // // //                             { id: 'documents', label: 'Documents', icon: <FileText size={14} /> }
// // // //                         ].map(tab => (
// // // //                             <TabButton key={tab.id} {...tab} active={activeTab} set={setActiveTab} />
// // // //                         ))}

// // // //                         <div className="w-px h-6 bg-slate-300 self-center mx-2 hidden lg:block opacity-50"></div>

// // // //                         <TabButton id="review" label="Review" icon={<ClipboardCheck size={14} />} active={activeTab} set={setActiveTab} />

// // // //                         {canViewApplications && (
// // // //                             <TabButton id="applications" label="Applications" icon={<Building2 size={14} />} active={activeTab} set={setActiveTab} highlight />
// // // //                         )}

// // // //                         {isAdminView && canGenerateDocs && (
// // // //                             <TabButton id="generate" label="Generators" icon={<Printer size={14} />} active={activeTab} set={setActiveTab} color="purple" />
// // // //                         )}
                        
// // // //                         <TabButton id="sop" label="SOP Writer" icon={<PenTool size={14} />} active={activeTab} set={setActiveTab} color="purple" />
// // // //                         <TabButton id="interview" label="AI Prep" icon={<Mic size={14} />} active={activeTab} set={setActiveTab} color="red" />
// // // //                     </div>
// // // //                 </div>
// // // //             </div>

// // // //             {/* MAIN CONTENT AREA */}
// // // //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //                 <div className="min-h-[600px] pb-12">

// // // //                     {/* PERSONAL TAB */}
// // // //                     {activeTab === 'personal' && (
// // // //                         <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // // //                             <SectionHeader title="Basic Identity" subtitle="Ensure these details match the passport exactly." icon={<User className="text-emerald-600"/>} />

// // // //                             <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
// // // //                                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
// // // //                                     <div className="md:col-span-2">
// // // //                                         <InputGroup label="Title" as="select" value={formData.personalInfo.title} onChange={(e) => updateField('personalInfo', 'title', e.target.value)}>
// // // //                                             <option>Mr.</option><option>Ms.</option><option>Mrs.</option>
// // // //                                         </InputGroup>
// // // //                                     </div>
// // // //                                     <div className="md:col-span-4"><InputGroup label="First Name" value={formData.personalInfo.firstName} onChange={(e) => updateField('personalInfo', 'firstName', e.target.value)} /></div>
// // // //                                     <div className="md:col-span-4"><InputGroup label="Last Name" value={formData.personalInfo.lastName} onChange={(e) => updateField('personalInfo', 'lastName', e.target.value)} /></div>
// // // //                                     <div className="md:col-span-2">
// // // //                                         <InputGroup label="Gender" as="select" value={formData.personalInfo.gender} onChange={(e) => updateField('personalInfo', 'gender', e.target.value)}>
// // // //                                             <option>Male</option><option>Female</option><option>Other</option>
// // // //                                         </InputGroup>
// // // //                                     </div>

// // // //                                     <div className="md:col-span-6"><InputGroup label="Date of Birth (AD)" type="date" value={formData.personalInfo.dobAD ? formData.personalInfo.dobAD.split('T')[0] : ''} onChange={(e) => updateField('personalInfo', 'dobAD', e.target.value)} icon={<Calendar size={16}/>} /></div>
// // // //                                     <div className="md:col-span-6"><InputGroup label="Date of Birth (BS)" placeholder="YYYY/MM/DD" value={formData.personalInfo.dobBS} onChange={(e) => updateField('personalInfo', 'dobBS', e.target.value)} icon={<Calendar size={16}/>} /></div>
// // // //                                 </div>
// // // //                             </div>

// // // //                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // //                                 <InfoCard title="Citizenship Details" icon={FileText} color="emerald">
// // // //                                     <div className="space-y-5">
// // // //                                         <InputGroup label="Citizenship No." value={formData.personalInfo.citizenshipNo} onChange={(e) => updateField('personalInfo', 'citizenshipNo', e.target.value)} />
// // // //                                         <div className="grid grid-cols-2 gap-5">
// // // //                                             <InputGroup label="Issue District" value={formData.personalInfo.citizenshipDistrict} onChange={(e) => updateField('personalInfo', 'citizenshipDistrict', e.target.value)} />
// // // //                                             <InputGroup label="Issue Date (BS)" value={formData.personalInfo.citizenshipDate} onChange={(e) => updateField('personalInfo', 'citizenshipDate', e.target.value)} />
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 </InfoCard>

// // // //                                 <InfoCard title="Passport Details" icon={Globe} color="emerald">
// // // //                                     <div className="space-y-5">
// // // //                                         <InputGroup label="Passport No." value={formData.personalInfo.passportNo} onChange={(e) => updateField('personalInfo', 'passportNo', e.target.value)} />
// // // //                                         <div className="grid grid-cols-2 gap-5">
// // // //                                             <InputGroup label="Issue Place" value={formData.personalInfo.passportIssuePlace} onChange={(e) => updateField('personalInfo', 'passportIssuePlace', e.target.value)} />
// // // //                                             <InputGroup label="Expiry Date (AD)" type="date" value={formData.personalInfo.passportExpiry ? formData.personalInfo.passportExpiry.split('T')[0] : ''} onChange={(e) => updateField('personalInfo', 'passportExpiry', e.target.value)} />
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 </InfoCard>
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* ADDRESS TAB */}
// // // //                     {activeTab === 'address' && (
// // // //                         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // // //                             <SectionHeader title="Permanent Address" subtitle="This address will appear on all generated legal documents." icon={<MapPin className="text-emerald-600"/>} />
// // // //                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// // // //                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //                                     <div className="lg:col-span-2">
// // // //                                         <InputGroup label="Municipality / VDC" value={formData.address.municipality} onChange={(e) => updateField('address', 'municipality', e.target.value)} />
// // // //                                     </div>
// // // //                                     <InputGroup label="Ward No." value={formData.address.wardNo} onChange={(e) => updateField('address', 'wardNo', e.target.value)} />
// // // //                                     <InputGroup label="Tole / Street" value={formData.address.tole} onChange={(e) => updateField('address', 'tole', e.target.value)} />
// // // //                                     <InputGroup label="District" value={formData.address.district} onChange={(e) => updateField('address', 'district', e.target.value)} />
// // // //                                     <InputGroup label="Province" value={formData.address.province} onChange={(e) => updateField('address', 'province', e.target.value)} />
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* FAMILY TAB */}
// // // //                     {activeTab === 'family' && (
// // // //                         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // // //                             <SectionHeader title="Family Information" subtitle="Required for Birth, Relationship, and Income Verification docs." icon={<User className="text-emerald-600"/>} />
// // // //                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// // // //                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // //                                     <InputGroup label="Father's Full Name" value={formData.familyInfo.fatherName} onChange={(e) => updateField('familyInfo', 'fatherName', e.target.value)} />
// // // //                                     <InputGroup label="Mother's Full Name" value={formData.familyInfo.motherName} onChange={(e) => updateField('familyInfo', 'motherName', e.target.value)} />
// // // //                                     <InputGroup label="Grandfather's Full Name" value={formData.familyInfo.grandfatherName} onChange={(e) => updateField('familyInfo', 'grandfatherName', e.target.value)} />
// // // //                                     <InputGroup label="Spouse Name (Optional)" value={formData.familyInfo.spouseName} onChange={(e) => updateField('familyInfo', 'spouseName', e.target.value)} />
                                    
// // // //                                     {/* In-Laws Section */}
// // // //                                     <div className="md:col-span-2 border-t border-slate-100 pt-6 mt-2">
// // // //                                         <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
// // // //                                             <User size={16} className="text-slate-400" />
// // // //                                             For Married Applicants (In-Laws)
// // // //                                         </h4>
// // // //                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // //                                             <InputGroup label="Father-in-Law's Name" value={formData.familyInfo.fatherInLawName} onChange={(e) => updateField('familyInfo', 'fatherInLawName', e.target.value)} />
// // // //                                             <InputGroup label="Mother-in-Law's Name" value={formData.familyInfo.motherInLawName} onChange={(e) => updateField('familyInfo', 'motherInLawName', e.target.value)} />
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* ACADEMICS TAB */}
// // // //                     {activeTab === 'academics' && (
// // // //                         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // // //                             <div className="flex justify-between items-end">
// // // //                                 <SectionHeader title="Academic History" subtitle="List qualifications in descending order (Masters -> Bachelors -> +2)." icon={<Award className="text-emerald-600"/>} />
// // // //                                 <button onClick={addAcademicRow} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 flex items-center gap-2 transition shadow-md hover:shadow-lg">
// // // //                                     <Plus size={16} /> Add Qualification
// // // //                                 </button>
// // // //                             </div>

// // // //                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
// // // //                                 {formData.academics.length === 0 && (
// // // //                                     <div className="text-center py-16 text-slate-400 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200">
// // // //                                         <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
// // // //                                             <FileText size={24} className="text-slate-300" />
// // // //                                         </div>
// // // //                                         <p className="font-semibold text-lg">No academic records added yet.</p>
// // // //                                         <p className="text-sm mt-1">Click "Add Qualification" to start.</p>
// // // //                                     </div>
// // // //                                 )}
// // // //                                 {formData.academics.map((row, index) => (
// // // //                                     <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 p-6 rounded-xl border border-slate-200 relative group transition-all hover:border-emerald-300 hover:shadow-sm">
// // // //                                         <div className="md:col-span-3"><InputGroup label="Level" placeholder="e.g. +2, Bachelor" value={row.level} onChange={(e) => updateAcademicRow(index, 'level', e.target.value)} /></div>
// // // //                                         <div className="md:col-span-5"><InputGroup label="Institution" placeholder="School/College Name" value={row.institution} onChange={(e) => updateAcademicRow(index, 'institution', e.target.value)} /></div>
// // // //                                         <div className="md:col-span-2"><InputGroup label="Year" placeholder="Passed Year" value={row.passedYear} onChange={(e) => updateAcademicRow(index, 'passedYear', e.target.value)} /></div>
// // // //                                         <div className="md:col-span-1"><InputGroup label="GPA/%" value={row.grade} onChange={(e) => updateAcademicRow(index, 'grade', e.target.value)} /></div>
// // // //                                         <div className="md:col-span-1 flex justify-end pb-2">
// // // //                                             <button onClick={() => removeAcademicRow(index)} className="p-3 bg-white text-red-400 border border-slate-200 rounded-xl hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition shadow-sm">
// // // //                                                 <Trash2 size={18} />
// // // //                                             </button>
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 ))}
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* FINANCIAL TAB */}
// // // //                     {activeTab === 'financial' && (
// // // //                         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // // //                             <SectionHeader title="Financial Status" subtitle="Data for Annual Income & Tax Clearance." icon={<DollarSign className="text-emerald-600"/>} />
// // // //                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// // // //                                 <div className="max-w-md">
// // // //                                     <InputGroup label="Current Exchange Rate (1 USD = ? NPR)" type="number" value={formData.financialInfo.exchangeRate} onChange={(e) => updateField('financialInfo', 'exchangeRate', e.target.value)} />
// // // //                                 </div>
// // // //                                 <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl flex gap-4 text-amber-800 text-sm items-start">
// // // //                                     <div className="p-2 bg-amber-100 rounded-full shrink-0"><CheckCircle size={16} /></div>
// // // //                                     <div>
// // // //                                         <p className="font-bold mb-1">Important Note</p>
// // // //                                         <p className="leading-relaxed">Income source details are handled via the "Annual Income" generator in the Generators tab. Please consult with the document officer.</p>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* DOCUMENTS TAB */}
// // // //                     {activeTab === 'documents' && (
// // // //                         <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // // //                             <SectionHeader title="Document Repository" subtitle="Upload high-quality scans. Supported: JPG, PNG, PDF." icon={<FileText className="text-emerald-600"/>} />

// // // //                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// // // //                                 <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3 text-lg">
// // // //                                     <div className="p-2 bg-emerald-100 rounded-xl"><CheckCircle size={20} className="text-emerald-600"/></div>
// // // //                                     Mandatory Documents
// // // //                                 </h3>
// // // //                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // //                                     <DocumentUploadCard title="Citizenship (Front)" fieldKey="citizenshipFront" existingUrl={formData.documents?.citizenshipFront} onUpload={handleDocumentUpdate} />
// // // //                                     <DocumentUploadCard title="Citizenship (Back)" fieldKey="citizenshipBack" existingUrl={formData.documents?.citizenshipBack} onUpload={handleDocumentUpdate} />
// // // //                                     <DocumentUploadCard title="Passport (Bio Page)" fieldKey="passportBio" existingUrl={formData.documents?.passportBio} onUpload={handleDocumentUpdate} />
// // // //                                     <DocumentUploadCard title="SLC/SEE Marksheet" fieldKey="slcMarksheet" existingUrl={formData.documents?.slcMarksheet} onUpload={handleDocumentUpdate} />
// // // //                                     <DocumentUploadCard title="SLC/SEE Character" fieldKey="slcCharacter" existingUrl={formData.documents?.slcCharacter} onUpload={handleDocumentUpdate} />
// // // //                                     <DocumentUploadCard title="+2 Transcript" fieldKey="plus2Transcript" existingUrl={formData.documents?.plus2Transcript} onUpload={handleDocumentUpdate} />
// // // //                                 </div>
// // // //                             </div>

// // // //                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// // // //                                 <div className="flex justify-between items-center mb-6">
// // // //                                     <h3 className="font-bold text-slate-800 flex items-center gap-3 text-lg">
// // // //                                         <div className="p-2 bg-blue-100 rounded-xl"><Plus size={20} className="text-blue-600"/></div>
// // // //                                         Additional Documents
// // // //                                     </h3>
// // // //                                     {!isAddingDoc && (
// // // //                                         <button onClick={() => setIsAddingDoc(true)} className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition border border-blue-200">
// // // //                                             <Plus size={14} /> Add Slot
// // // //                                         </button>
// // // //                                     )}
// // // //                                 </div>

// // // //                                 {isAddingDoc && (
// // // //                                     <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 animate-in fade-in slide-in-from-top-2">
// // // //                                         <div className="flex flex-col sm:flex-row gap-4 items-end max-w-2xl">
// // // //                                             <div className="flex-1 w-full">
// // // //                                                 <InputGroup label="Document Title" placeholder="e.g. Work Experience Letter" value={newDocTitle} onChange={(e) => setNewDocTitle(e.target.value)} />
// // // //                                             </div>
// // // //                                             <div className="flex gap-3">
// // // //                                                 <button onClick={handleAddDynamicDoc} className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 text-sm font-bold transition">Confirm</button>
// // // //                                                 <button onClick={() => setIsAddingDoc(false)} className="bg-white border border-slate-300 text-slate-600 px-6 py-3 rounded-xl hover:bg-slate-50 text-sm font-bold transition">Cancel</button>
// // // //                                             </div>
// // // //                                         </div>
// // // //                                     </div>
// // // //                                 )}

// // // //                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // //                                     {formData.documents?.other?.map((doc, index) => (
// // // //                                         <div key={index} className="relative group">
// // // //                                             <DocumentUploadCard title={doc.title} fieldKey={`other-${index}`} existingUrl={doc.url} onUpload={(key, url) => handleDynamicDocUpload(index, url)} />
// // // //                                             <button onClick={() => removeDynamicDoc(index)} className="absolute -top-3 -right-3 bg-white text-red-500 p-2 rounded-full border shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:scale-110 z-10">
// // // //                                                 <X size={16} />
// // // //                                             </button>
// // // //                                         </div>
// // // //                                     ))}
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* REVIEW TAB */}
// // // //                     {activeTab === 'review' && (
// // // //                         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // // //                             <SectionHeader title="Profile Review" subtitle="Quick glance summary." icon={<ClipboardCheck className="text-emerald-600"/>} />
// // // //                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// // // //                                 <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
// // // //                                     <FileCheck className="text-emerald-600" size={20}/> Personal Summary
// // // //                                 </h3>
// // // //                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
// // // //                                     <ReviewItem label="Full Name" value={`${formData.personalInfo.title} ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`} icon={<User size={16}/>} />
// // // //                                     <ReviewItem label="Email" value={formData.personalInfo.email} icon={<Mail size={16}/>} />
// // // //                                     <ReviewItem label="Phone" value={formData.personalInfo.phone} icon={<Phone size={16}/>} />
// // // //                                     <ReviewItem label="Address" value={`${formData.address.municipality}, ${formData.address.district}`} icon={<MapPin size={16}/>} />
// // // //                                     <ReviewItem label="Date of Birth" value={formData.personalInfo.dobBS} icon={<Calendar size={16}/>} />
// // // //                                     <ReviewItem label="Passport No." value={formData.personalInfo.passportNo} icon={<Globe size={16}/>} />
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* APPLICATIONS TAB */}
// // // //                     {canViewApplications && activeTab === 'applications' && (
// // // //                         <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
// // // //                             <UniversityApplications student={currentProfile} />
// // // //                         </div>
// // // //                     )}

// // // //                     {/* GENERATE TAB */}
// // // //                     {activeTab === 'generate' && isAdminView && canGenerateDocs && (
// // // //                         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // // //                             <SectionHeader title="Document Generators" subtitle="Create official legal documents automatically." icon={<Printer className="text-purple-600"/>} />
// // // //                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //                                 <GenerationCard title="Birth Verification" desc="Verify Date of Birth in AD & BS formats." icon={FileText} onClick={() => setShowDobModal(true)} />
// // // //                                 <GenerationCard title="Birth Verification (Married)" desc="Includes in-laws." icon={Calendar} onClick={() => setShowDobMarriedModal(true)} />
// // // //                                 <GenerationCard title="Relationship Cert" desc="Standard family tree with photos." icon={User} onClick={() => setShowRelationModal(true)} />
                                
// // // //                                 {/* Married Relationship */}
// // // //                                 <GenerationCard title="Relationship (Married)" desc="For married applicants (includes in-laws)." icon={Users} onClick={() => setShowRelationMarriedModal(true)} />
                                
// // // //                                 <GenerationCard title="Occupation Verification" desc="Validate parental job details." icon={Building2} onClick={() => setShowOccupationModal(true)} />
// // // //                                 <GenerationCard title="Surname Verification" desc="Resolve naming discrepancies." icon={CheckCircle} onClick={() => setShowSurnameModal(true)} />
// // // //                                 <GenerationCard title="Annual Income" desc="3-Year Income Source Table." icon={ClipboardCheck} onClick={() => setShowIncomeModal(true)} /> 
// // // //                                 <GenerationCard title="Bank Statement" desc="Generate statement summaries." icon={Building2} onClick={() => setshowBankStatementModal(true)} /> 
// // // //                                 <GenerationCard title="Tax Clearance" desc="Tax status verification docs." icon={ShieldCheck} onClick={() => setShowTaxModal(true)} /> 
                                
// // // //                                 {/* NEW: Language Certificate */}
// // // //                                 <GenerationCard title="Language Certificate" desc="Japanese language proficiency cert." icon={BookOpen} onClick={() => setShowLanguageCertModal(true)} /> 
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                     {/* SOP WRITER TAB */}
// // // //                     {activeTab === 'sop' && (
// // // //                         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // // //                             <SectionHeader title="SOP Writing Assistant" subtitle="AI-powered drafting engine for Statement of Purpose (Riyu-sho)." icon={<PenTool className="text-purple-600"/>} />
// // // //                             <SopWritingAssistant student={currentProfile} />
// // // //                         </div>
// // // //                     )}

// // // //                     {/* INTERVIEW TAB */}
// // // //                     {activeTab === 'interview' && (
// // // //                         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // // //                             <SectionHeader title="Mock Interview Room" subtitle="AI-powered preparation for Immigration Interviews." icon={<Mic className="text-red-600"/>} />
// // // //                             <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
// // // //                                 <JapaneseInterview />
// // // //                             </div>
// // // //                         </div>
// // // //                     )}

// // // //                 </div>
// // // //             </div>

// // // //             {/* --- MODALS --- */}
// // // //             <SurnameVerificationModal isOpen={showSurnameModal} onClose={() => setShowSurnameModal(false)} student={currentProfile} />
// // // //             <DateOfBirthVerificationModal isOpen={showDobModal} onClose={() => setShowDobModal(false)} student={currentProfile} />
// // // //             <DateOfBirthVerificationMarriedModal isOpen={showDobMarriedModal} onClose={() => setShowDobMarriedModal(false)} student={currentProfile} />
// // // //             <RelationshipVerificationModal isOpen={showRelationModal} onClose={() => setShowRelationModal(false)} student={currentProfile} />
// // // //             <RelationshipVerificationMarriedModal isOpen={showRelationMarriedModal} onClose={() => setShowRelationMarriedModal(false)} student={currentProfile} />
// // // //             <OccupationVerificationModal isOpen={showOccupationModal} onClose={() => setShowOccupationModal(false)} student={currentProfile} />
// // // //             <TaxClearanceVerificationModal isOpen={showTaxModal} onClose={() => setShowTaxModal(false)} student={currentProfile} />
// // // //             <BankStatementGeneratorModal isOpen={showBankStatementModal} onClose={() => setshowBankStatementModal(false)} student={currentProfile} />
// // // //             {showIncomeModal && <AnnualIncomeVerificationModal isOpen={showIncomeModal} onClose={() => setShowIncomeModal(false)} student={currentProfile} />}
            
// // // //             {/* NEW MODAL */}
// // // //             {showLanguageCertModal && (
// // // //                 <LanguageCertificateModal 
// // // //                     isOpen={showLanguageCertModal} 
// // // //                     onClose={() => setShowLanguageCertModal(false)} 
// // // //                     student={currentProfile} 
// // // //                 />
// // // //             )}
            
// // // //         </div>
// // // //     );
// // // // }

// // // // // --- SUB COMPONENTS ---

// // // // function SectionHeader({ title, subtitle, icon }) {
// // // //     return (
// // // //         <div className="mb-2">
// // // //             <div className="flex items-center gap-3 mb-2">
// // // //                 {icon}
// // // //                 <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
// // // //             </div>
// // // //             <p className="text-slate-500 font-medium pl-9">{subtitle}</p>
// // // //         </div>
// // // //     );
// // // // }

// // // // function InfoCard({ title, icon: Icon, color, children }) {
// // // //     return (
// // // //         <div className={`bg-white p-8 rounded-2xl shadow-lg border border-slate-200 relative overflow-hidden group hover:border-${color}-300 transition-all`}>
// // // //             <div className={`absolute top-0 left-0 w-1.5 bg-gradient-to-b from-${color}-500 to-${color}-600 h-full`}></div>
// // // //             <h3 className="font-bold text-slate-800 flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// // // //                 <div className={`p-2 bg-${color}-100 rounded-lg text-${color}-600`}><Icon size={20}/></div>
// // // //                 <span className="text-lg">{title}</span>
// // // //             </h3>
// // // //             {children}
// // // //         </div>
// // // //     );
// // // // }

// // // // function InputGroup({ label, type = "text", placeholder, value, onChange, as, children, icon }) {
// // // //     return (
// // // //         <div className="w-full group">
// // // //             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-emerald-600 transition-colors">{label}</label>
// // // //             {as === 'select' ? (
// // // //                 <div className="relative">
// // // //                     <select className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl appearance-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all text-slate-700 font-medium shadow-sm" value={value || ''} onChange={onChange}>
// // // //                         {children}
// // // //                     </select>
// // // //                     <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
// // // //                         <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
// // // //                     </div>
// // // //                 </div>
// // // //             ) : (
// // // //                 <div className="relative">
// // // //                     {icon && <div className="absolute left-3 top-3 text-slate-400">{icon}</div>}
// // // //                     <input 
// // // //                         type={type} 
// // // //                         className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all placeholder-slate-400 text-slate-700 font-medium shadow-sm`}
// // // //                         placeholder={placeholder} 
// // // //                         value={value || ''} 
// // // //                         onChange={onChange} 
// // // //                     />
// // // //                 </div>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // }

// // // // function TabButton({ id, label, icon, active, set, highlight, color = 'green' }) {
// // // //     const isActive = active === id;
    
// // // //     let activeClass = '';
// // // //     let inactiveClass = 'text-slate-500 hover:text-slate-800 hover:bg-slate-50';

// // // //     if (highlight) {
// // // //         activeClass = 'text-blue-700 bg-gradient-to-br from-blue-50 to-blue-100/50 border-b-2 border-blue-500';
// // // //         inactiveClass = 'text-blue-600/70 hover:text-blue-700 hover:bg-blue-50/50';
// // // //     } else if (color === 'purple') {
// // // //         activeClass = 'text-purple-700 border-b-2 border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100/50';
// // // //     } else if (color === 'red') {
// // // //         activeClass = 'text-red-700 border-b-2 border-red-500 bg-gradient-to-br from-red-50 to-red-100/50';
// // // //     } else {
// // // //         activeClass = 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/50';
// // // //     }

// // // //     return (
// // // //         <button 
// // // //             onClick={() => set(id)} 
// // // //             className={`
// // // //                 py-3 px-5 text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap rounded-t-xl
// // // //                 ${isActive ? activeClass : inactiveClass}
// // // //             `}
// // // //         >
// // // //             {icon} <span className="hidden sm:inline">{label}</span><span className="sm:hidden">{label.split(' ')[0]}</span>
// // // //         </button>
// // // //     );
// // // // }

// // // // function DocumentUploadCard({ title, fieldKey, existingUrl, onUpload }) {
// // // //     const [isUploading, setIsUploading] = useState(false);
// // // //     const fileInputRef = useRef(null);
// // // //     const handleFileSelect = async (e) => {
// // // //         const file = e.target.files[0];
// // // //         if (!file) return;
// // // //         e.target.value = '';
// // // //         setIsUploading(true);
// // // //         const formData = new FormData();
// // // //         formData.append('file', file);
// // // //         try {
// // // //             const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
// // // //             onUpload(fieldKey, res.data.url);
// // // //             toast.success(`${title} uploaded!`);
// // // //         } catch (error) { toast.error("Upload failed."); } finally { setIsUploading(false); }
// // // //     };

// // // //     return (
// // // //         <div onClick={() => !existingUrl && fileInputRef.current.click()} 
// // // //              className={`
// // // //                 group relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 h-48
// // // //                 ${existingUrl 
// // // //                     ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100/30' 
// // // //                     : 'border-slate-300 hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50/50 hover:to-transparent cursor-pointer hover:-translate-y-1 hover:shadow-lg'
// // // //                 }
// // // //              `}>
// // // //             <input type="file" hidden ref={fileInputRef} onChange={handleFileSelect} accept="image/*,.pdf" />
            
// // // //             {isUploading ? (
// // // //                 <div className="flex flex-col items-center animate-pulse">
// // // //                      <Loader2 className="animate-spin text-emerald-600 mb-3" size={32} />
// // // //                      <span className="text-xs text-slate-600 font-semibold">Uploading...</span>
// // // //                 </div>
// // // //             ) : existingUrl ? (
// // // //                 <>
// // // //                     <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-3 text-white shadow-md">
// // // //                         <CheckCircle size={24}/>
// // // //                     </div>
// // // //                     <p className="text-sm text-slate-900 font-bold mb-1 truncate w-full px-2">{title}</p>
// // // //                     <p className="text-xs text-emerald-700 font-bold mb-4 bg-emerald-200 px-2 py-0.5 rounded-lg">UPLOADED</p>
                    
// // // //                     <div className="flex gap-2 relative z-20 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
// // // //                         <a href={existingUrl} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()} className="px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs font-bold text-slate-600 hover:text-emerald-700 hover:border-emerald-400 transition flex items-center gap-1 shadow-sm">
// // // //                             <Eye size={12}/> View
// // // //                         </a>
// // // //                         <button onClick={(e)=>{e.stopPropagation();fileInputRef.current.click()}} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-400 transition flex items-center gap-1 shadow-sm">
// // // //                             <Upload size={12}/> Replace
// // // //                         </button>
// // // //                     </div>
// // // //                 </>
// // // //             ) : (
// // // //                 <>
// // // //                     <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-white group-hover:to-emerald-50 flex items-center justify-center mb-3 transition-colors border border-slate-200 group-hover:border-emerald-300 shadow-sm">
// // // //                         <Upload className="text-slate-400 group-hover:text-emerald-600 transition-colors" size={22}/>
// // // //                     </div>
// // // //                     <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors mb-1">{title}</h4>
// // // //                     <span className="text-xs text-slate-500 group-hover:text-slate-600 font-medium">Click to browse</span>
// // // //                 </>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // }

// // // // function GenerationCard({ title, desc, icon: Icon, onClick }) {
// // // //     return (
// // // //         <button onClick={onClick} className="flex flex-col text-left h-full bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 group hover:-translate-y-1">
// // // //             <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-2xl w-fit shadow-sm mb-4 border border-slate-200 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:border-emerald-50 transition-colors duration-300">
// // // //                 <Icon size={24} className="text-slate-600 group-hover:text-white" />
// // // //             </div>
// // // //             <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
// // // //             <p className="text-sm text-slate-600 leading-relaxed font-medium">{desc}</p>
// // // //         </button>
// // // //     );
// // // // }

// // // // function ReviewItem({ label, value, icon }) {
// // // //     return (
// // // //         <div className="bg-gradient-to-br from-slate-50 to-slate-100/30 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-md">
// // // //             <div className="flex items-center gap-2 mb-2">
// // // //                 <div className="text-slate-400">{icon}</div>
// // // //                 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{label}</p>
// // // //             </div>
// // // //             <p className="text-base text-slate-900 font-bold break-words pl-6">{value || <span className="text-slate-400 font-normal italic">Not set</span>}</p>
// // // //         </div>
// // // //     );
// // // // }


// // // import {
// // //     ArrowLeft, Award, BookOpen, Building2,
// // //     Calendar,
// // //     Camera,
// // //     CheckCircle,
// // //     ClipboardCheck,
// // //     DollarSign,
// // //     FileCheck,
// // //     FileText,
// // //     Globe,
// // //     Loader2,
// // //     Mail,
// // //     MapPin,
// // //     Mic,
// // //     PenTool,
// // //     Phone,
// // //     Printer,
// // //     Save,
// // //     ShieldCheck,
// // //     User,
// // //     Users,
// // //     XCircle
// // // } from 'lucide-react';
// // // import { useEffect, useState } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { useNavigate, useParams } from 'react-router-dom';
// // // import { toast } from 'react-toastify';
// // // import { clearCurrentProfile, getMyProfile, getStudentById, reset, updateProfile, updateStudentStatus } from '../../features/students/studentSlice';
// // // import api from '../../utils/api';

// // // // --- IMPORT SUB-COMPONENTS ---
// // // import NotificationBell from '../../components/layout/NotificationBell';
// // // import { GenerationCard, ReviewItem, TabButton } from '../../components/student/profile/ProfileShared'; // Shared UI
// // // // TAB IMPORTS
// // // import AcademicsTab from '../../components/student/profile/tabs/AcademicsTab';
// // // import AddressTab from '../../components/student/profile/tabs/AddressTab';
// // // import DocumentsTab from '../../components/student/profile/tabs/DocumentsTab';
// // // import FamilyTab from '../../components/student/profile/tabs/FamilyTab';
// // // import FinancialTab from '../../components/student/profile/tabs/FinancialTab';
// // // import PersonalTab from '../../components/student/profile/tabs/PersonalTab';

// // // // Import Generators
// // // import AnnualIncomeVerificationModal from '../../components/generators/AnnualIncomeVerificationModal';
// // // import BankStatementGeneratorModal from '../../components/generators/BankStatementGeneratorModal';
// // // import DateOfBirthVerificationMarriedModal from '../../components/generators/DateOfBirthVerificationMarriedModal';
// // // import DateOfBirthVerificationModal from '../../components/generators/DateOfBirthVerificationModal';
// // // import LanguageCertificateModal from '../../components/generators/LanguageCertificateModal';
// // // import OccupationVerificationModal from '../../components/generators/OccupationVerificationModal';
// // // import RelationshipVerificationMarriedModal from '../../components/generators/RelationshipVerificationMarriedModal';
// // // import RelationshipVerificationModal from '../../components/generators/RelationshipVerificationModal';
// // // import SurnameVerificationModal from '../../components/generators/SurnameVerificationModal';
// // // import TaxClearanceVerificationModal from '../../components/generators/TaxClearanceVerificationModal';

// // // // Import Tools
// // // import JapaneseInterview from '../../components/student/JapaneseInterview';
// // // import SopWritingAssistant from '../../components/student/SopWritingAssistant';
// // // import UniversityApplications from '../../components/student/UniversityApplications';

// // // export default function StudentProfile() {
// // //     const { studentId } = useParams();
// // //     const navigate = useNavigate();
// // //     const dispatch = useDispatch();

// // //     const { currentProfile, isLoading, isSuccess, message } = useSelector((state) => state.students);
// // //     const { user } = useSelector((state) => state.auth);

// // //     const isAdminView = !!studentId;
// // //     const role = user?.role;
// // //     const subRole = user?.subRole;

// // //     const canGenerateDocs = role === 'consultancy_admin' || subRole === 'manager' || subRole === 'document_officer' || subRole === 'counselor';
// // //     const canViewApplications = true;
// // //     const canChangeStatus = role === 'consultancy_admin' || subRole === 'manager' || subRole === 'document_officer';

// // //     const [activeTab, setActiveTab] = useState('personal');
// // //     const [formData, setFormData] = useState({
// // //         personalInfo: { title: 'Mr.', firstName: '', lastName: '', gender: 'Male', dobAD: '', dobBS: '', email: '', phone: '', citizenshipNo: '', citizenshipDistrict: '', citizenshipDate: '', passportNo: '', passportExpiry: '', passportIssuePlace: '', photoUrl: '' },
// // //         address: { municipality: '', wardNo: '', district: '', province: '', tole: '' },
// // //         familyInfo: { fatherName: '', motherName: '', grandfatherName: '', spouseName: '', fatherInLawName: '', motherInLawName: '', relatives: [] },
// // //         academics: [],
// // //         financialInfo: { incomeSources: [], fiscalYears: [], exchangeRate: 134, sponsor: '' },
// // //         documents: { other: [] },
// // //         visaDetails: { japaneseLanguage: { certificateDetails: {} }, education: {}, intake: '' }
// // //     });

// // //     // UI States for Docs
// // //     const [newDocTitle, setNewDocTitle] = useState('');
// // //     const [isAddingDoc, setIsAddingDoc] = useState(false);

// // //     // Modals state
// // //     const [showSurnameModal, setShowSurnameModal] = useState(false);
// // //     const [showDobModal, setShowDobModal] = useState(false);
// // //     const [showDobMarriedModal, setShowDobMarriedModal] = useState(false);
// // //     const [showRelationModal, setShowRelationModal] = useState(false);
// // //     const [showRelationMarriedModal, setShowRelationMarriedModal] = useState(false);
// // //     const [showOccupationModal, setShowOccupationModal] = useState(false);
// // //     const [showIncomeModal, setShowIncomeModal] = useState(false);
// // //     const [showBankStatementModal, setshowBankStatementModal] = useState(false);
// // //     const [showTaxModal, setShowTaxModal] = useState(false);
// // //     const [showLanguageCertModal, setShowLanguageCertModal] = useState(false);

// // //     // --- INITIALIZATION & EFFECTS ---
// // //     useEffect(() => {
// // //         if (isAdminView) dispatch(getStudentById(studentId));
// // //         else dispatch(getMyProfile());
// // //         return () => { dispatch(reset()); dispatch(clearCurrentProfile()); };
// // //     }, [dispatch, studentId, isAdminView]);

// // //     useEffect(() => {
// // //         if (currentProfile) {
// // //             setFormData(prev => ({
// // //                 ...prev,
// // //                 ...currentProfile,
// // //                 personalInfo: { ...prev.personalInfo, ...currentProfile.personalInfo },
// // //                 address: { ...prev.address, ...currentProfile.address },
// // //                 familyInfo: { ...prev.familyInfo, ...currentProfile.familyInfo },
// // //                 academics: currentProfile.academics || [],
// // //                 financialInfo: { ...prev.financialInfo, ...currentProfile.financialInfo },
// // //                 documents: { ...currentProfile.documents, other: currentProfile.documents?.other || [] },
// // //                 visaDetails: currentProfile.visaDetails || { japaneseLanguage: { certificateDetails: {} } }
// // //             }));
// // //         }
// // //     }, [currentProfile]);

// // //     useEffect(() => {
// // //         if (isSuccess && message) toast.success(message);
// // //         if (isSuccess) dispatch(reset());
// // //     }, [isSuccess, message, dispatch]);

// // //     // --- SHARED HANDLERS ---
// // //     const handleSave = () => {
// // //         if (!currentProfile?._id) return;
// // //         dispatch(updateProfile({ id: currentProfile._id, data: formData }));
// // //     };

// // //     const handleStatusChange = (newStatus) => {
// // //         if (window.confirm(`Change status to ${newStatus}?`)) {
// // //             dispatch(updateStudentStatus({ id: currentProfile._id, status: newStatus }));
// // //         }
// // //     };

// // //     const updateField = (section, field, value) => {
// // //         setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
// // //     };

// // //     // --- TAB SPECIFIC HANDLERS ---
// // //     const addAcademicRow = () => {
// // //         setFormData(prev => ({ ...prev, academics: [...prev.academics, { level: '', institution: '', passedYear: '', grade: '' }] }));
// // //     };

// // //     const updateAcademicRow = (index, field, value) => {
// // //         const newList = [...formData.academics];
// // //         newList[index][field] = value;
// // //         setFormData(prev => ({ ...prev, academics: newList }));
// // //     };

// // //     const removeAcademicRow = (index) => {
// // //         const newList = formData.academics.filter((_, i) => i !== index);
// // //         setFormData(prev => ({ ...prev, academics: newList }));
// // //     };

// // //     const handleDocumentUpdate = async (fieldKey, url) => {
// // //         const updatedDocuments = { ...formData.documents, [fieldKey]: url };
// // //         setFormData(prev => ({ ...prev, documents: updatedDocuments }));
// // //         try {
// // //             await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
// // //         } catch (error) { toast.error("Document saved failed."); }
// // //     };

// // //     const handleAddDynamicDoc = async () => {
// // //         if (!newDocTitle.trim()) return toast.error("Enter a title");
// // //         const newDoc = { title: newDocTitle, url: '' };
// // //         const updatedDocs = { ...formData.documents, other: [...(formData.documents.other || []), newDoc] };
// // //         setFormData(prev => ({ ...prev, documents: updatedDocs }));
// // //         setNewDocTitle(''); setIsAddingDoc(false);
// // //         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); toast.success("Added!"); } catch (e) { toast.error("Failed."); }
// // //     };

// // //     const handleDynamicDocUpload = async (index, url) => {
// // //         const updatedOther = formData.documents.other.map((doc, i) => i === index ? { ...doc, url } : doc);
// // //         const updatedDocs = { ...formData.documents, other: updatedOther };
// // //         setFormData(prev => ({ ...prev, documents: updatedDocs }));
// // //         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); } catch (e) { console.error(e); }
// // //     };

// // //     const removeDynamicDoc = async (index) => {
// // //         const updatedOther = formData.documents.other.filter((_, i) => i !== index);
// // //         const updatedDocs = { ...formData.documents, other: updatedOther };
// // //         setFormData(prev => ({ ...prev, documents: updatedDocs }));
// // //         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); toast.success("Removed."); } catch (e) { console.error(e); }
// // //     };

// // //     const handleProfilePhotoUpload = async (e) => {
// // //         const file = e.target.files[0];
// // //         if (!file) return;
// // //         const uploadData = new FormData();
// // //         uploadData.append('file', file);
// // //         try {
// // //             const toastId = toast.loading("Uploading photo...");
// // //             const res = await api.post('/upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
// // //             const newPhotoUrl = res.data.url;
// // //             updateField('personalInfo', 'photoUrl', newPhotoUrl);
// // //             const updatedProfileData = { ...formData, personalInfo: { ...formData.personalInfo, photoUrl: newPhotoUrl } };
// // //             await dispatch(updateProfile({ id: currentProfile._id, data: updatedProfileData })).unwrap();
// // //             toast.dismiss(toastId);
// // //             toast.success("Profile photo saved!");
// // //         } catch (error) { toast.dismiss(); toast.error("Photo upload failed"); }
// // //     };

// // //     if (!currentProfile && isLoading) return (
// // //         <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-50">
// // //             <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
// // //             <span className="text-slate-600 font-semibold text-lg">Loading Profile...</span>
// // //         </div>
// // //     );

// // //     return (
// // //         <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
// // //             {/* TOP BAR */}
// // //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// // //                 {isAdminView && (
// // //                     <button onClick={() => navigate('/dashboard')} className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all mb-6 text-sm font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md">
// // //                         <ArrowLeft size={16} /> Back to Dashboard
// // //                     </button>
// // //                 )}
                
// // //                 {/* HEADER */}
// // //                 <div className="bg-white rounded-3xl shadow-sm border border-slate-200 relative group">
// // //                     <div className="h-32 sm:h-40 w-full bg-gradient-to-r from-emerald-600 to-teal-500 relative rounded-t-3xl overflow-hidden">
// // //                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
// // //                         <div className="absolute top-4 right-4 z-20"><NotificationBell /></div>
// // //                     </div>
// // //                     <div className="px-6 sm:px-8 pb-8">
// // //                         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
// // //                             <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 z-10 relative">
// // //                                 <div className="relative group/avatar">
// // //                                     <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-xl ring-1 ring-slate-100">
// // //                                         <div className="h-full w-full rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
// // //                                             {formData.personalInfo.photoUrl ? (
// // //                                                 <img src={formData.personalInfo.photoUrl} alt="Profile" className="h-full w-full object-cover" />
// // //                                             ) : <User size={48} className="text-slate-400" />}
// // //                                         </div>
// // //                                     </div>
// // //                                     <label className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2.5 rounded-xl cursor-pointer shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-110">
// // //                                         <Camera size={16} />
// // //                                         <input type="file" hidden accept="image/*" onChange={handleProfilePhotoUpload} />
// // //                                     </label>
// // //                                 </div>
// // //                                 <div className="text-center sm:text-left mb-2">
// // //                                     <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
// // //                                         {formData.personalInfo.firstName || 'Student'} {formData.personalInfo.lastName}
// // //                                     </h1>
// // //                                     <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-slate-500 font-medium">
// // //                                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm ${isAdminView ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
// // //                                             <ShieldCheck size={12} /> {isAdminView ? 'Admin View' : 'Applicant'}
// // //                                         </span>
// // //                                         <span className="hidden sm:inline text-slate-300">|</span>
// // //                                         <span className="flex items-center gap-1.5"><Globe size={14} className="text-slate-400" /> {formData.address.district || 'Nepal'}</span>
// // //                                         <span className="flex items-center gap-1.5 ml-2"><Mail size={14} className="text-slate-400" /> {formData.personalInfo.email}</span>
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
// // //                                 <div className={`px-5 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm bg-slate-50 border-slate-200 text-slate-700`}>
// // //                                     {currentProfile?.profileStatus}
// // //                                 </div>
// // //                                 <button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md">
// // //                                     {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Changes
// // //                                 </button>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                     {/* Admin Workflow Actions */}
// // //                     {isAdminView && canChangeStatus && (
// // //                         <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl">
// // //                             <div className="flex flex-wrap gap-3 items-center">
// // //                                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 w-full sm:w-auto mb-2 sm:mb-0">Workflow Actions:</span>
// // //                                 {currentProfile?.profileStatus === 'lead' && (
// // //                                     <>
// // //                                         <button onClick={() => handleStatusChange('rejected')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><XCircle size={14} /> Reject</button>
// // //                                         <button onClick={() => handleStatusChange('draft')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-purple-600 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><CheckCircle size={14} /> Approve</button>
// // //                                     </>
// // //                                 )}
// // //                                 {currentProfile?.profileStatus === 'draft' && (
// // //                                     <button onClick={() => handleStatusChange('verified')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-emerald-600 bg-white border border-emerald-200 hover:bg-emerald-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><CheckCircle size={14} /> Verify & Lock</button>
// // //                                 )}
// // //                             </div>
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //             </div>

// // //             {/* TABS */}
// // //             <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm mb-8 transition-all">
// // //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //                     <div className="flex overflow-x-auto hide-scrollbar gap-1 pt-1">
// // //                         {[
// // //                             { id: 'personal', label: 'Personal', icon: <User size={14} /> },
// // //                             { id: 'address', label: 'Address', icon: <MapPin size={14} /> },
// // //                             { id: 'family', label: 'Family', icon: <User size={14} /> },
// // //                             { id: 'academics', label: 'Academics', icon: <Award size={14} /> },
// // //                             { id: 'financial', label: 'Financial', icon: <DollarSign size={14} /> },
// // //                             { id: 'documents', label: 'Documents', icon: <FileText size={14} /> }
// // //                         ].map(tab => (
// // //                             <TabButton key={tab.id} {...tab} active={activeTab} set={setActiveTab} />
// // //                         ))}
// // //                         <div className="w-px h-6 bg-slate-300 self-center mx-2 hidden lg:block opacity-50"></div>
// // //                         <TabButton id="review" label="Review" icon={<ClipboardCheck size={14} />} active={activeTab} set={setActiveTab} />
// // //                         {canViewApplications && <TabButton id="applications" label="Applications" icon={<Building2 size={14} />} active={activeTab} set={setActiveTab} highlight />}
// // //                         {isAdminView && canGenerateDocs && <TabButton id="generate" label="Generators" icon={<Printer size={14} />} active={activeTab} set={setActiveTab} color="purple" />}
// // //                         <TabButton id="sop" label="SOP Writer" icon={<PenTool size={14} />} active={activeTab} set={setActiveTab} color="purple" />
// // //                         <TabButton id="interview" label="AI Prep" icon={<Mic size={14} />} active={activeTab} set={setActiveTab} color="red" />
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //             {/* CONTENT AREA */}
// // //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[600px] pb-12">
// // //                 {activeTab === 'personal' && <PersonalTab formData={formData} updateField={updateField} />}
// // //                 {activeTab === 'address' && <AddressTab formData={formData} updateField={updateField} />}
// // //                 {activeTab === 'family' && <FamilyTab formData={formData} updateField={updateField} />}
// // //                 {activeTab === 'academics' && <AcademicsTab formData={formData} addAcademicRow={addAcademicRow} updateAcademicRow={updateAcademicRow} removeAcademicRow={removeAcademicRow} />}
// // //                 {activeTab === 'financial' && <FinancialTab formData={formData} updateField={updateField} />}
// // //                 {activeTab === 'documents' && <DocumentsTab formData={formData} isAddingDoc={isAddingDoc} setIsAddingDoc={setIsAddingDoc} newDocTitle={newDocTitle} setNewDocTitle={setNewDocTitle} handleAddDynamicDoc={handleAddDynamicDoc} handleDocumentUpdate={handleDocumentUpdate} handleDynamicDocUpload={handleDynamicDocUpload} removeDynamicDoc={removeDynamicDoc} />}

// // //                 {activeTab === 'review' && (
// // //                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // //                         <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// // //                             <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
// // //                                 <FileCheck className="text-emerald-600" size={20}/> Personal Summary
// // //                             </h3>
// // //                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
// // //                                 <ReviewItem label="Full Name" value={`${formData.personalInfo.title} ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`} icon={<User size={16}/>} />
// // //                                 <ReviewItem label="Email" value={formData.personalInfo.email} icon={<Mail size={16}/>} />
// // //                                 <ReviewItem label="Phone" value={formData.personalInfo.phone} icon={<Phone size={16}/>} />
// // //                                 <ReviewItem label="Address" value={`${formData.address.municipality}, ${formData.address.district}`} icon={<MapPin size={16}/>} />
// // //                                 <ReviewItem label="Date of Birth" value={formData.personalInfo.dobBS} icon={<Calendar size={16}/>} />
// // //                                 <ReviewItem label="Passport No." value={formData.personalInfo.passportNo} icon={<Globe size={16}/>} />
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 )}

// // //                 {canViewApplications && activeTab === 'applications' && (
// // //                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
// // //                         <UniversityApplications student={currentProfile} />
// // //                     </div>
// // //                 )}

// // //                 {activeTab === 'generate' && isAdminView && canGenerateDocs && (
// // //                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // //                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                             <GenerationCard title="Birth Verification" desc="Verify Date of Birth in AD & BS formats." icon={FileText} onClick={() => setShowDobModal(true)} />
// // //                             <GenerationCard title="Birth Verification (Married)" desc="Includes in-laws." icon={Calendar} onClick={() => setShowDobMarriedModal(true)} />
// // //                             <GenerationCard title="Relationship Cert" desc="Standard family tree with photos." icon={User} onClick={() => setShowRelationModal(true)} />
// // //                             <GenerationCard title="Relationship (Married)" desc="For married applicants (includes in-laws)." icon={Users} onClick={() => setShowRelationMarriedModal(true)} />
// // //                             <GenerationCard title="Occupation Verification" desc="Validate parental job details." icon={Building2} onClick={() => setShowOccupationModal(true)} />
// // //                             <GenerationCard title="Surname Verification" desc="Resolve naming discrepancies." icon={CheckCircle} onClick={() => setShowSurnameModal(true)} />
// // //                             <GenerationCard title="Annual Income" desc="3-Year Income Source Table." icon={ClipboardCheck} onClick={() => setShowIncomeModal(true)} /> 
// // //                             <GenerationCard title="Bank Statement" desc="Generate statement summaries." icon={Building2} onClick={() => setshowBankStatementModal(true)} /> 
// // //                             <GenerationCard title="Tax Clearance" desc="Tax status verification docs." icon={ShieldCheck} onClick={() => setShowTaxModal(true)} /> 
// // //                             <GenerationCard title="Language Certificate" desc="Japanese language proficiency cert." icon={BookOpen} onClick={() => setShowLanguageCertModal(true)} /> 
// // //                         </div>
// // //                     </div>
// // //                 )}

// // //                 {activeTab === 'sop' && (
// // //                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // //                         <SopWritingAssistant student={currentProfile} />
// // //                     </div>
// // //                 )}

// // //                 {activeTab === 'interview' && (
// // //                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// // //                         <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
// // //                             <JapaneseInterview />
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //             </div>

// // //             {/* MODALS */}
// // //             <SurnameVerificationModal isOpen={showSurnameModal} onClose={() => setShowSurnameModal(false)} student={currentProfile} />
// // //             <DateOfBirthVerificationModal isOpen={showDobModal} onClose={() => setShowDobModal(false)} student={currentProfile} />
// // //             <DateOfBirthVerificationMarriedModal isOpen={showDobMarriedModal} onClose={() => setShowDobMarriedModal(false)} student={currentProfile} />
// // //             <RelationshipVerificationModal isOpen={showRelationModal} onClose={() => setShowRelationModal(false)} student={currentProfile} />
// // //             <RelationshipVerificationMarriedModal isOpen={showRelationMarriedModal} onClose={() => setShowRelationMarriedModal(false)} student={currentProfile} />
// // //             <OccupationVerificationModal isOpen={showOccupationModal} onClose={() => setShowOccupationModal(false)} student={currentProfile} />
// // //             <TaxClearanceVerificationModal isOpen={showTaxModal} onClose={() => setShowTaxModal(false)} student={currentProfile} />
// // //             <BankStatementGeneratorModal isOpen={showBankStatementModal} onClose={() => setshowBankStatementModal(false)} student={currentProfile} />
// // //             {showIncomeModal && <AnnualIncomeVerificationModal isOpen={showIncomeModal} onClose={() => setShowIncomeModal(false)} student={currentProfile} />}
// // //             {showLanguageCertModal && <LanguageCertificateModal isOpen={showLanguageCertModal} onClose={() => setShowLanguageCertModal(false)} student={currentProfile} />}

// // //         </div>
// // //     );
// // // }

// // import {
// //     ArrowLeft, Award, BookOpen, Building2,
// //     Calendar,
// //     Camera,
// //     CheckCircle,
// //     ClipboardCheck,
// //     DollarSign,
// //     FileText,
// //     Globe,
// //     Loader2,
// //     Mail,
// //     MapPin,
// //     Mic,
// //     PenTool,
// //     Phone,
// //     Printer,
// //     Save,
// //     ShieldCheck,
// //     User,
// //     Users,
// //     XCircle
// // } from 'lucide-react';
// // import { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { toast } from 'react-toastify';
// // import { clearCurrentProfile, getMyProfile, getStudentById, reset, updateProfile, updateStudentStatus } from '../../features/students/studentSlice';
// // import api from '../../utils/api';

// // // --- IMPORT SUB-COMPONENTS ---
// // import NotificationBell from '../../components/layout/NotificationBell';
// // import { GenerationCard, ReviewItem, TabButton } from '../../components/student/profile/ProfileShared'; // Shared UI
// // // TAB IMPORTS
// // import AcademicsTab from '../../components/student/profile/tabs/AcademicsTab';
// // import AddressTab from '../../components/student/profile/tabs/AddressTab';
// // import DocumentsTab from '../../components/student/profile/tabs/DocumentsTab';
// // import FamilyTab from '../../components/student/profile/tabs/FamilyTab';
// // import FinancialTab from '../../components/student/profile/tabs/FinancialTab';
// // import PersonalTab from '../../components/student/profile/tabs/PersonalTab';

// // // Import Generators
// // import AnnualIncomeVerificationModal from '../../components/generators/AnnualIncomeVerificationModal';
// // import BankStatementGeneratorModal from '../../components/generators/BankStatementGeneratorModal';
// // import DateOfBirthVerificationMarriedModal from '../../components/generators/DateOfBirthVerificationMarriedModal';
// // import DateOfBirthVerificationModal from '../../components/generators/DateOfBirthVerificationModal';
// // import LanguageCertificateModal from '../../components/generators/LanguageCertificateModal';
// // import OccupationVerificationModal from '../../components/generators/OccupationVerificationModal';
// // import RelationshipVerificationMarriedModal from '../../components/generators/RelationshipVerificationMarriedModal';
// // import RelationshipVerificationModal from '../../components/generators/RelationshipVerificationModal';
// // import SurnameVerificationModal from '../../components/generators/SurnameVerificationModal';
// // import TaxClearanceVerificationModal from '../../components/generators/TaxClearanceVerificationModal';

// // // Import Tools
// // import JapaneseInterview from '../../components/student/JapaneseInterview';
// // import SopWritingAssistant from '../../components/student/SopWritingAssistant';
// // import UniversityApplications from '../../components/student/UniversityApplications';

// // export default function StudentProfile() {
// //     const { studentId } = useParams();
// //     const navigate = useNavigate();
// //     const dispatch = useDispatch();

// //     const { currentProfile, isLoading, isSuccess, message } = useSelector((state) => state.students);
// //     const { user } = useSelector((state) => state.auth);

// //     const isAdminView = !!studentId;
// //     const role = user?.role;
// //     const subRole = user?.subRole;

// //     const canGenerateDocs = role === 'consultancy_admin' || subRole === 'manager' || subRole === 'document_officer' || subRole === 'counselor';
// //     const canViewApplications = true;
// //     const canChangeStatus = role === 'consultancy_admin' || subRole === 'manager' || subRole === 'document_officer';

// //     const [activeTab, setActiveTab] = useState('personal');
// //     const [formData, setFormData] = useState({
// //         personalInfo: { title: 'Mr.', firstName: '', lastName: '', gender: 'Male', dobAD: '', dobBS: '', email: '', phone: '', citizenshipNo: '', citizenshipDistrict: '', citizenshipDate: '', passportNo: '', passportExpiry: '', passportIssuePlace: '', photoUrl: '' },
// //         address: { municipality: '', wardNo: '', district: '', province: '', tole: '' },
// //         familyInfo: { fatherName: '', motherName: '', grandfatherName: '', spouseName: '', fatherInLawName: '', motherInLawName: '', relatives: [] },
// //         academics: [],
// //         financialInfo: { incomeSources: [], fiscalYears: [], exchangeRate: 134, sponsor: '' },
// //         documents: { other: [] },
// //         visaDetails: { japaneseLanguage: { certificateDetails: {} }, education: {}, intake: '' }
// //     });

// //     // UI States for Docs
// //     const [newDocTitle, setNewDocTitle] = useState('');
// //     const [isAddingDoc, setIsAddingDoc] = useState(false);

// //     // Modals state
// //     const [showSurnameModal, setShowSurnameModal] = useState(false);
// //     const [showDobModal, setShowDobModal] = useState(false);
// //     const [showDobMarriedModal, setShowDobMarriedModal] = useState(false);
// //     const [showRelationModal, setShowRelationModal] = useState(false);
// //     const [showRelationMarriedModal, setShowRelationMarriedModal] = useState(false);
// //     const [showOccupationModal, setShowOccupationModal] = useState(false);
// //     const [showIncomeModal, setShowIncomeModal] = useState(false);
// //     const [showBankStatementModal, setshowBankStatementModal] = useState(false);
// //     const [showTaxModal, setShowTaxModal] = useState(false);
// //     const [showLanguageCertModal, setShowLanguageCertModal] = useState(false);

// //     // --- INITIALIZATION & EFFECTS ---
// //     useEffect(() => {
// //         if (isAdminView) dispatch(getStudentById(studentId));
// //         else dispatch(getMyProfile());
// //         return () => { dispatch(reset()); dispatch(clearCurrentProfile()); };
// //     }, [dispatch, studentId, isAdminView]);

// //     useEffect(() => {
// //         if (currentProfile) {
// //             setFormData(prev => ({
// //                 ...prev,
// //                 ...currentProfile,
// //                 personalInfo: { ...prev.personalInfo, ...currentProfile.personalInfo },
// //                 address: { ...prev.address, ...currentProfile.address },
// //                 familyInfo: { ...prev.familyInfo, ...currentProfile.familyInfo },
// //                 academics: currentProfile.academics || [],
// //                 financialInfo: { ...prev.financialInfo, ...currentProfile.financialInfo },
// //                 documents: { ...currentProfile.documents, other: currentProfile.documents?.other || [] },
// //                 visaDetails: currentProfile.visaDetails || { japaneseLanguage: { certificateDetails: {} } }
// //             }));
// //         }
// //     }, [currentProfile]);

// //     useEffect(() => {
// //         if (isSuccess && message) toast.success(message);
// //         if (isSuccess) dispatch(reset());
// //     }, [isSuccess, message, dispatch]);

// //     // --- HANDLERS ---
// //     const handleSave = () => {
// //         if (!currentProfile?._id) return;
// //         dispatch(updateProfile({ id: currentProfile._id, data: formData }));
// //     };

// //     const handleStatusChange = (newStatus) => {
// //         if (window.confirm(`Change status to ${newStatus}?`)) {
// //             dispatch(updateStudentStatus({ id: currentProfile._id, status: newStatus }));
// //         }
// //     };

// //     const updateField = (section, field, value) => {
// //         setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
// //     };

// //     // --- TAB SPECIFIC HANDLERS ---
// //     const addAcademicRow = () => {
// //         setFormData(prev => ({ ...prev, academics: [...prev.academics, { level: '', institution: '', passedYear: '', grade: '' }] }));
// //     };

// //     const updateAcademicRow = (index, field, value) => {
// //         const newList = [...formData.academics];
// //         newList[index][field] = value;
// //         setFormData(prev => ({ ...prev, academics: newList }));
// //     };

// //     const removeAcademicRow = (index) => {
// //         const newList = formData.academics.filter((_, i) => i !== index);
// //         setFormData(prev => ({ ...prev, academics: newList }));
// //     };

// //     const handleDocumentUpdate = async (fieldKey, url) => {
// //         const updatedDocuments = { ...formData.documents, [fieldKey]: url };
// //         setFormData(prev => ({ ...prev, documents: updatedDocuments }));
// //         try {
// //             await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap();
// //         } catch (error) { toast.error("Document saved failed."); }
// //     };

// //     const handleAddDynamicDoc = async () => {
// //         if (!newDocTitle.trim()) return toast.error("Enter a title");
// //         const newDoc = { title: newDocTitle, url: '' };
// //         const updatedDocs = { ...formData.documents, other: [...(formData.documents.other || []), newDoc] };
// //         setFormData(prev => ({ ...prev, documents: updatedDocs }));
// //         setNewDocTitle(''); setIsAddingDoc(false);
// //         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); toast.success("Added!"); } catch (e) { toast.error("Failed."); }
// //     };

// //     const handleDynamicDocUpload = async (index, url) => {
// //         const updatedOther = formData.documents.other.map((doc, i) => i === index ? { ...doc, url } : doc);
// //         const updatedDocs = { ...formData.documents, other: updatedOther };
// //         setFormData(prev => ({ ...prev, documents: updatedDocs }));
// //         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); } catch (e) { console.error(e); }
// //     };

// //     const removeDynamicDoc = async (index) => {
// //         const updatedOther = formData.documents.other.filter((_, i) => i !== index);
// //         const updatedDocs = { ...formData.documents, other: updatedOther };
// //         setFormData(prev => ({ ...prev, documents: updatedDocs }));
// //         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); toast.success("Removed."); } catch (e) { console.error(e); }
// //     };

// //     const handleProfilePhotoUpload = async (e) => {
// //         const file = e.target.files[0];
// //         if (!file) return;
// //         const uploadData = new FormData();
// //         uploadData.append('file', file);
// //         try {
// //             const toastId = toast.loading("Uploading photo...");
// //             const res = await api.post('/upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
// //             const newPhotoUrl = res.data.url;
// //             updateField('personalInfo', 'photoUrl', newPhotoUrl);
// //             const updatedProfileData = { ...formData, personalInfo: { ...formData.personalInfo, photoUrl: newPhotoUrl } };
// //             await dispatch(updateProfile({ id: currentProfile._id, data: updatedProfileData })).unwrap();
// //             toast.dismiss(toastId);
// //             toast.success("Profile photo saved!");
// //         } catch (error) { toast.dismiss(); toast.error("Photo upload failed"); }
// //     };

// //     if (!currentProfile && isLoading) return (
// //         <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-50">
// //             <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
// //             <span className="text-slate-600 font-semibold text-lg">Loading Profile...</span>
// //         </div>
// //     );

// //     return (
// //         <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
// //             {/* TOP BAR */}
// //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// //                 {isAdminView && (
// //                     <button onClick={() => navigate('/dashboard')} className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all mb-6 text-sm font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md">
// //                         <ArrowLeft size={16} /> Back to Dashboard
// //                     </button>
// //                 )}
                
// //                 {/* HEADER */}
// //                 <div className="bg-white rounded-3xl shadow-sm border border-slate-200 relative group">
// //                     <div className="h-32 sm:h-40 w-full bg-gradient-to-r from-emerald-600 to-teal-500 relative rounded-t-3xl overflow-hidden">
// //                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
// //                         <div className="absolute top-4 right-4 z-20"><NotificationBell /></div>
// //                     </div>
// //                     <div className="px-6 sm:px-8 pb-8">
// //                         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
// //                             <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 z-10 relative">
// //                                 <div className="relative group/avatar">
// //                                     <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-xl ring-1 ring-slate-100">
// //                                         <div className="h-full w-full rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
// //                                             {formData.personalInfo.photoUrl ? (
// //                                                 <img src={formData.personalInfo.photoUrl} alt="Profile" className="h-full w-full object-cover" />
// //                                             ) : <User size={48} className="text-slate-400" />}
// //                                         </div>
// //                                     </div>
// //                                     <label className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2.5 rounded-xl cursor-pointer shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-110">
// //                                         <Camera size={16} />
// //                                         <input type="file" hidden accept="image/*" onChange={handleProfilePhotoUpload} />
// //                                     </label>
// //                                 </div>
// //                                 <div className="text-center sm:text-left mb-2">
// //                                     <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
// //                                         {formData.personalInfo.firstName || 'Student'} {formData.personalInfo.lastName}
// //                                     </h1>
// //                                     <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-slate-500 font-medium">
// //                                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm ${isAdminView ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
// //                                             <ShieldCheck size={12} /> {isAdminView ? 'Admin View' : 'Applicant'}
// //                                         </span>
// //                                         <span className="hidden sm:inline text-slate-300">|</span>
// //                                         <span className="flex items-center gap-1.5"><Globe size={14} className="text-slate-400" /> {formData.address.district || 'Nepal'}</span>
// //                                         <span className="flex items-center gap-1.5 ml-2"><Mail size={14} className="text-slate-400" /> {formData.personalInfo.email}</span>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
// //                                 <div className={`px-5 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm bg-slate-50 border-slate-200 text-slate-700`}>
// //                                     {currentProfile?.profileStatus}
// //                                 </div>
// //                                 <button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md">
// //                                     {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Changes
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                     {/* Admin Workflow Actions */}
// //                     {isAdminView && canChangeStatus && (
// //                         <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl">
// //                             <div className="flex flex-wrap gap-3 items-center">
// //                                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 w-full sm:w-auto mb-2 sm:mb-0">Workflow Actions:</span>
// //                                 {currentProfile?.profileStatus === 'lead' && (
// //                                     <>
// //                                         <button onClick={() => handleStatusChange('rejected')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><XCircle size={14} /> Reject</button>
// //                                         <button onClick={() => handleStatusChange('draft')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-purple-600 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><CheckCircle size={14} /> Approve</button>
// //                                     </>
// //                                 )}
// //                                 {currentProfile?.profileStatus === 'draft' && (
// //                                     <button onClick={() => handleStatusChange('verified')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-emerald-600 bg-white border border-emerald-200 hover:bg-emerald-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><CheckCircle size={14} /> Verify & Lock</button>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>

// //             {/* TABS */}
// //             <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm mb-8 transition-all">
// //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //                     <div className="flex overflow-x-auto hide-scrollbar gap-1 pt-1">
// //                         {[
// //                             { id: 'personal', label: 'Personal', icon: <User size={14} /> },
// //                             { id: 'address', label: 'Address', icon: <MapPin size={14} /> },
// //                             { id: 'family', label: 'Family', icon: <User size={14} /> },
// //                             { id: 'academics', label: 'Academics', icon: <Award size={14} /> },
// //                             { id: 'financial', label: 'Financial', icon: <DollarSign size={14} /> },
// //                             { id: 'documents', label: 'Documents', icon: <FileText size={14} /> }
// //                         ].map(tab => (
// //                             <TabButton key={tab.id} {...tab} active={activeTab} set={setActiveTab} />
// //                         ))}
// //                         <div className="w-px h-6 bg-slate-300 self-center mx-2 hidden lg:block opacity-50"></div>
// //                         <TabButton id="review" label="Review" icon={<ClipboardCheck size={14} />} active={activeTab} set={setActiveTab} />
// //                         {canViewApplications && <TabButton id="applications" label="Applications" icon={<Building2 size={14} />} active={activeTab} set={setActiveTab} highlight />}
// //                         {isAdminView && canGenerateDocs && <TabButton id="generate" label="Generators" icon={<Printer size={14} />} active={activeTab} set={setActiveTab} color="purple" />}
// //                         <TabButton id="sop" label="SOP Writer" icon={<PenTool size={14} />} active={activeTab} set={setActiveTab} color="purple" />
// //                         <TabButton id="interview" label="AI Prep" icon={<Mic size={14} />} active={activeTab} set={setActiveTab} color="red" />
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* CONTENT AREA */}
// //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[600px] pb-12">
// //                 {activeTab === 'personal' && <PersonalTab formData={formData} updateField={updateField} />}
// //                 {activeTab === 'address' && <AddressTab formData={formData} updateField={updateField} />}
// //                 {activeTab === 'family' && <FamilyTab formData={formData} updateField={updateField} />}
// //                 {activeTab === 'academics' && <AcademicsTab formData={formData} addAcademicRow={addAcademicRow} updateAcademicRow={updateAcademicRow} removeAcademicRow={removeAcademicRow} />}
// //                 {activeTab === 'financial' && <FinancialTab formData={formData} updateField={updateField} />}
// //                 {activeTab === 'documents' && <DocumentsTab formData={formData} isAddingDoc={isAddingDoc} setIsAddingDoc={setIsAddingDoc} newDocTitle={newDocTitle} setNewDocTitle={setNewDocTitle} handleAddDynamicDoc={handleAddDynamicDoc} handleDocumentUpdate={handleDocumentUpdate} handleDynamicDocUpload={handleDynamicDocUpload} removeDynamicDoc={removeDynamicDoc} />}

// //                 {/* REVIEW TAB */}
// //                 {activeTab === 'review' && (
// //                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        
// //                         {/* Personal Information */}
// //                         <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// //                             <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
// //                                 <User className="text-emerald-600" size={20}/> Personal Information
// //                             </h3>
// //                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
// //                                 <ReviewItem label="Full Name" value={`${formData.personalInfo.title} ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`} icon={<User size={16}/>} />
// //                                 <ReviewItem label="Email" value={formData.personalInfo.email} icon={<Mail size={16}/>} />
// //                                 <ReviewItem label="Phone" value={formData.personalInfo.phone} icon={<Phone size={16}/>} />
// //                                 <ReviewItem label="Gender" value={formData.personalInfo.gender} icon={<User size={16}/>} />
// //                                 <ReviewItem label="Date of Birth (BS)" value={formData.personalInfo.dobBS} icon={<Calendar size={16}/>} />
// //                                 <ReviewItem label="Date of Birth (AD)" value={formData.personalInfo.dobAD ? new Date(formData.personalInfo.dobAD).toLocaleDateString() : ''} icon={<Calendar size={16}/>} />
// //                                 <ReviewItem label="Passport No." value={formData.personalInfo.passportNo} icon={<Globe size={16}/>} />
// //                                 <ReviewItem label="Citizenship No." value={formData.personalInfo.citizenshipNo} icon={<FileText size={16}/>} />
// //                             </div>
// //                         </div>

// //                         {/* Address */}
// //                         <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// //                             <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
// //                                 <MapPin className="text-emerald-600" size={20}/> Permanent Address
// //                             </h3>
// //                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
// //                                 <ReviewItem label="Municipality" value={formData.address.municipality} />
// //                                 <ReviewItem label="Ward No." value={formData.address.wardNo} />
// //                                 <ReviewItem label="Tole/Street" value={formData.address.tole} />
// //                                 <ReviewItem label="District" value={formData.address.district} />
// //                                 <ReviewItem label="Province" value={formData.address.province} />
// //                             </div>
// //                         </div>

// //                         {/* Family Information */}
// //                         <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// //                             <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
// //                                 <Users className="text-emerald-600" size={20}/> Family Details
// //                             </h3>
// //                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
// //                                 <ReviewItem label="Father's Name" value={formData.familyInfo.fatherName} />
// //                                 <ReviewItem label="Mother's Name" value={formData.familyInfo.motherName} />
// //                                 <ReviewItem label="Grandfather's Name" value={formData.familyInfo.grandfatherName} />
// //                                 <ReviewItem label="Spouse's Name" value={formData.familyInfo.spouseName} />
// //                                 <ReviewItem label="Father-in-Law" value={formData.familyInfo.fatherInLawName} />
// //                                 <ReviewItem label="Mother-in-Law" value={formData.familyInfo.motherInLawName} />
// //                             </div>
// //                         </div>

// //                         {/* Academics */}
// //                         <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// //                             <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
// //                                 <Award className="text-emerald-600" size={20}/> Academic History
// //                             </h3>
// //                             {formData.academics.length > 0 ? (
// //                                 <div className="space-y-4">
// //                                     {formData.academics.map((academic, index) => (
// //                                         <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-4">
// //                                             <ReviewItem label="Level" value={academic.level} />
// //                                             <ReviewItem label="Institution" value={academic.institution} />
// //                                             <ReviewItem label="Passed Year" value={academic.passedYear} />
// //                                             <ReviewItem label="GPA/Percentage" value={academic.grade} />
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             ) : (
// //                                 <p className="text-slate-500 italic">No academic records added.</p>
// //                             )}
// //                         </div>

// //                         {/* Financial & Visa */}
// //                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// //                                 <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
// //                                     <DollarSign className="text-emerald-600" size={20}/> Financial Info
// //                                 </h3>
// //                                 <div className="space-y-4">
// //                                     <ReviewItem label="Sponsor" value={formData.financialInfo.sponsor} />
// //                                     <ReviewItem label="Exchange Rate" value={`1 USD = ${formData.financialInfo.exchangeRate} NPR`} />
// //                                     <div>
// //                                         <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Income Sources</p>
// //                                         <ul className="list-disc list-inside text-sm text-slate-700">
// //                                             {formData.financialInfo.incomeSources?.map((src, i) => (
// //                                                 <li key={i}>{src.sourceName}</li>
// //                                             ))}
// //                                         </ul>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
// //                                 <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
// //                                     <BookOpen className="text-emerald-600" size={20}/> Visa / Language
// //                                 </h3>
// //                                 <div className="space-y-4">
// //                                      <ReviewItem label="Intake" value={formData.visaDetails.intake} />
// //                                      <ReviewItem label="Language Status" value={formData.visaDetails.japaneseLanguage.status} />
// //                                      <ReviewItem label="Test Name" value={formData.visaDetails.japaneseLanguage.testName} />
// //                                      <ReviewItem label="Level/Score" value={formData.visaDetails.japaneseLanguage.level} />
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {canViewApplications && activeTab === 'applications' && (
// //                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
// //                         <UniversityApplications student={currentProfile} />
// //                     </div>
// //                 )}

// //                 {activeTab === 'generate' && isAdminView && canGenerateDocs && (
// //                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// //                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //                             <GenerationCard title="Birth Verification" desc="Verify Date of Birth in AD & BS formats." icon={FileText} onClick={() => setShowDobModal(true)} />
// //                             <GenerationCard title="Birth Verification (Married)" desc="Includes in-laws." icon={Calendar} onClick={() => setShowDobMarriedModal(true)} />
// //                             <GenerationCard title="Relationship Cert" desc="Standard family tree with photos." icon={User} onClick={() => setShowRelationModal(true)} />
// //                             <GenerationCard title="Relationship (Married)" desc="For married applicants (includes in-laws)." icon={Users} onClick={() => setShowRelationMarriedModal(true)} />
// //                             <GenerationCard title="Occupation Verification" desc="Validate parental job details." icon={Building2} onClick={() => setShowOccupationModal(true)} />
// //                             <GenerationCard title="Surname Verification" desc="Resolve naming discrepancies." icon={CheckCircle} onClick={() => setShowSurnameModal(true)} />
// //                             <GenerationCard title="Annual Income" desc="3-Year Income Source Table." icon={ClipboardCheck} onClick={() => setShowIncomeModal(true)} /> 
// //                             <GenerationCard title="Bank Statement" desc="Generate statement summaries." icon={Building2} onClick={() => setshowBankStatementModal(true)} /> 
// //                             <GenerationCard title="Tax Clearance" desc="Tax status verification docs." icon={ShieldCheck} onClick={() => setShowTaxModal(true)} /> 
// //                             <GenerationCard title="Language Certificate" desc="Japanese language proficiency cert." icon={BookOpen} onClick={() => setShowLanguageCertModal(true)} /> 
// //                         </div>
// //                     </div>
// //                 )}

// //                 {activeTab === 'sop' && (
// //                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// //                         <SopWritingAssistant student={currentProfile} />
// //                     </div>
// //                 )}

// //                 {activeTab === 'interview' && (
// //                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// //                         <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
// //                             <JapaneseInterview />
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>

// //             {/* MODALS */}
// //             <SurnameVerificationModal isOpen={showSurnameModal} onClose={() => setShowSurnameModal(false)} student={currentProfile} />
// //             <DateOfBirthVerificationModal isOpen={showDobModal} onClose={() => setShowDobModal(false)} student={currentProfile} />
// //             <DateOfBirthVerificationMarriedModal isOpen={showDobMarriedModal} onClose={() => setShowDobMarriedModal(false)} student={currentProfile} />
// //             <RelationshipVerificationModal isOpen={showRelationModal} onClose={() => setShowRelationModal(false)} student={currentProfile} />
// //             <RelationshipVerificationMarriedModal isOpen={showRelationMarriedModal} onClose={() => setShowRelationMarriedModal(false)} student={currentProfile} />
// //             <OccupationVerificationModal isOpen={showOccupationModal} onClose={() => setShowOccupationModal(false)} student={currentProfile} />
// //             <TaxClearanceVerificationModal isOpen={showTaxModal} onClose={() => setShowTaxModal(false)} student={currentProfile} />
// //             <BankStatementGeneratorModal isOpen={showBankStatementModal} onClose={() => setshowBankStatementModal(false)} student={currentProfile} />
// //             {showIncomeModal && <AnnualIncomeVerificationModal isOpen={showIncomeModal} onClose={() => setShowIncomeModal(false)} student={currentProfile} />}
// //             {showLanguageCertModal && <LanguageCertificateModal isOpen={showLanguageCertModal} onClose={() => setShowLanguageCertModal(false)} student={currentProfile} />}

// //         </div>
// //     );
// // }


// import {
//     ArrowLeft, Award, BookOpen, Building2,
//     Calendar,
//     Camera,
//     CheckCircle,
//     ClipboardCheck,
//     DollarSign,
//     FileText,
//     Globe,
//     Loader2,
//     Mail,
//     MapPin,
//     Mic,
//     PenTool,
//     Printer,
//     Save,
//     ShieldCheck,
//     User,
//     Users,
//     XCircle
// } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { clearCurrentProfile, getMyProfile, getStudentById, reset, updateProfile, updateStudentStatus } from '../../features/students/studentSlice';
// import api from '../../utils/api';

// // --- SHARED COMPONENTS ---
// import NotificationBell from '../../components/layout/NotificationBell';
// import { GenerationCard, TabButton } from '../../components/student/profile/ProfileShared';

// // --- TABS ---
// import AcademicsTab from '../../components/student/profile/tabs/AcademicsTab';
// import AddressTab from '../../components/student/profile/tabs/AddressTab';
// import DocumentsTab from '../../components/student/profile/tabs/DocumentsTab';
// import FamilyTab from '../../components/student/profile/tabs/FamilyTab';
// import FinancialTab from '../../components/student/profile/tabs/FinancialTab';
// import PersonalTab from '../../components/student/profile/tabs/PersonalTab';
// import ReviewTab from '../../components/student/profile/tabs/ReviewTab';

// // --- GENERATORS ---
// import AnnualIncomeVerificationModal from '../../components/generators/AnnualIncomeVerificationModal';
// import BankStatementGeneratorModal from '../../components/generators/BankStatementGeneratorModal';
// import DateOfBirthVerificationMarriedModal from '../../components/generators/DateOfBirthVerificationMarriedModal';
// import DateOfBirthVerificationModal from '../../components/generators/DateOfBirthVerificationModal';
// import LanguageCertificateModal from '../../components/generators/LanguageCertificateModal';
// import OccupationVerificationModal from '../../components/generators/OccupationVerificationModal';
// import RelationshipVerificationMarriedModal from '../../components/generators/RelationshipVerificationMarriedModal';
// import RelationshipVerificationModal from '../../components/generators/RelationshipVerificationModal';
// import SurnameVerificationModal from '../../components/generators/SurnameVerificationModal';
// import TaxClearanceVerificationModal from '../../components/generators/TaxClearanceVerificationModal';

// // --- TOOLS ---
// import JapaneseInterview from '../../components/student/JapaneseInterview';
// import SopWritingAssistant from '../../components/student/SopWritingAssistant';
// import UniversityApplications from '../../components/student/UniversityApplications';

// export default function StudentProfile() {
//     const { studentId } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { currentProfile, isLoading, isSuccess, message } = useSelector((state) => state.students);
//     const { user } = useSelector((state) => state.auth);

//     const isAdminView = !!studentId;
//     const role = user?.role;
//     const subRole = user?.subRole;

//     const canGenerateDocs = role === 'consultancy_admin' || subRole === 'manager' || subRole === 'document_officer' || subRole === 'counselor';
//     const canViewApplications = true;
//     const canChangeStatus = role === 'consultancy_admin' || subRole === 'manager' || subRole === 'document_officer';

//     const [activeTab, setActiveTab] = useState('personal');
    
//     // --- MAIN FORM STATE ---
//     const [formData, setFormData] = useState({
//         personalInfo: { title: 'Mr.', firstName: '', lastName: '', gender: 'Male', dobAD: '', dobBS: '', email: '', phone: '', citizenshipNo: '', citizenshipDistrict: '', citizenshipDate: '', passportNo: '', passportExpiry: '', passportIssuePlace: '', photoUrl: '' },
//         address: { municipality: '', wardNo: '', district: '', province: '', tole: '' },
//         familyInfo: { fatherName: '', motherName: '', grandfatherName: '', spouseName: '', fatherInLawName: '', motherInLawName: '', relatives: [] },
//         academics: [],
//         financialInfo: { incomeSources: [], fiscalYears: [], exchangeRate: 134, sponsor: '' },
//         documents: { other: [] },
//         visaDetails: { japaneseLanguage: { certificateDetails: {} }, education: {}, intake: '' }
//     });

//     // --- UI STATES ---
//     const [newDocTitle, setNewDocTitle] = useState('');
//     const [isAddingDoc, setIsAddingDoc] = useState(false);

//     // --- MODAL STATES ---
//     const [modals, setModals] = useState({
//         surname: false,
//         dob: false,
//         dobMarried: false,
//         relation: false,
//         relationMarried: false,
//         occupation: false,
//         income: false,
//         bank: false,
//         tax: false,
//         language: false
//     });

//     // Helper to toggle modals
//     const toggleModal = (key, value) => setModals(prev => ({ ...prev, [key]: value }));

//     // --- INITIALIZATION ---
//     useEffect(() => {
//         if (isAdminView) dispatch(getStudentById(studentId));
//         else dispatch(getMyProfile());
//         return () => { dispatch(reset()); dispatch(clearCurrentProfile()); };
//     }, [dispatch, studentId, isAdminView]);

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
//                 documents: { ...currentProfile.documents, other: currentProfile.documents?.other || [] },
//                 visaDetails: currentProfile.visaDetails || { japaneseLanguage: { certificateDetails: {} } }
//             }));
//         }
//     }, [currentProfile]);

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

//     // Academics Handlers
//     const addAcademicRow = () => setFormData(prev => ({ ...prev, academics: [...prev.academics, { level: '', institution: '', passedYear: '', grade: '' }] }));
//     const updateAcademicRow = (index, field, value) => {
//         const newList = [...formData.academics];
//         newList[index][field] = value;
//         setFormData(prev => ({ ...prev, academics: newList }));
//     };
//     const removeAcademicRow = (index) => {
//         const newList = formData.academics.filter((_, i) => i !== index);
//         setFormData(prev => ({ ...prev, academics: newList }));
//     };

//     // Document Handlers
//     const handleDocumentUpdate = async (fieldKey, url) => {
//         const updatedDocuments = { ...formData.documents, [fieldKey]: url };
//         setFormData(prev => ({ ...prev, documents: updatedDocuments }));
//         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap(); } catch (error) { toast.error("Failed to save document link."); }
//     };

//     const handleAddDynamicDoc = async () => {
//         if (!newDocTitle.trim()) return toast.error("Enter title");
//         const newDoc = { title: newDocTitle, url: '' };
//         const updatedDocs = { ...formData.documents, other: [...(formData.documents.other || []), newDoc] };
//         setFormData(prev => ({ ...prev, documents: updatedDocs }));
//         setNewDocTitle(''); setIsAddingDoc(false);
//         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); toast.success("Slot added!"); } catch (e) { toast.error("Failed."); }
//     };

//     const handleDynamicDocUpload = async (index, url) => {
//         const updatedOther = formData.documents.other.map((doc, i) => i === index ? { ...doc, url } : doc);
//         const updatedDocs = { ...formData.documents, other: updatedOther };
//         setFormData(prev => ({ ...prev, documents: updatedDocs }));
//         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); } catch (e) { console.error(e); }
//     };

//     const removeDynamicDoc = async (index) => {
//         const updatedOther = formData.documents.other.filter((_, i) => i !== index);
//         const updatedDocs = { ...formData.documents, other: updatedOther };
//         setFormData(prev => ({ ...prev, documents: updatedDocs }));
//         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); toast.success("Removed."); } catch (e) { console.error(e); }
//     };

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
//         } catch (error) { toast.dismiss(); toast.error("Photo upload failed"); }
//     };

//     if (!currentProfile && isLoading) return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-50">
//             <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
//             <span className="text-slate-600 font-semibold text-lg">Loading Profile...</span>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
            
//             {/* TOP BAR */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                 {isAdminView && (
//                     <button onClick={() => navigate('/dashboard')} className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all mb-6 text-sm font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md">
//                         <ArrowLeft size={16} /> Back to Dashboard
//                     </button>
//                 )}
                
//                 {/* HEADER */}
//                 <div className="bg-white rounded-3xl shadow-sm border border-slate-200 relative group">
//                     <div className="h-32 sm:h-40 w-full bg-gradient-to-r from-emerald-600 to-teal-500 relative rounded-t-3xl overflow-hidden">
//                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
//                         <div className="absolute top-4 right-4 z-20"><NotificationBell /></div>
//                     </div>
                    
//                     <div className="px-6 sm:px-8 pb-8">
//                         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                            
//                             <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 z-10 relative">
//                                 <div className="relative group/avatar">
//                                     <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-xl ring-1 ring-slate-100">
//                                         <div className="h-full w-full rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
//                                             {formData.personalInfo.photoUrl ? (
//                                                 <img src={formData.personalInfo.photoUrl} alt="Profile" className="h-full w-full object-cover" />
//                                             ) : <User size={48} className="text-slate-400" />}
//                                         </div>
//                                     </div>
//                                     <label className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2.5 rounded-xl cursor-pointer shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-110">
//                                         <Camera size={16} />
//                                         <input type="file" hidden accept="image/*" onChange={handleProfilePhotoUpload} />
//                                     </label>
//                                 </div>

//                                 <div className="text-center sm:text-left mb-2">
//                                     <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
//                                         {formData.personalInfo.firstName || 'Student'} {formData.personalInfo.lastName}
//                                     </h1>
//                                     <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-slate-500 font-medium">
//                                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm ${isAdminView ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
//                                             <ShieldCheck size={12} /> {isAdminView ? 'Admin View' : 'Applicant'}
//                                         </span>
//                                         <span className="hidden sm:inline text-slate-300">|</span>
//                                         <span className="flex items-center gap-1.5"><Globe size={14} className="text-slate-400" /> {formData.address.district || 'Nepal'}</span>
//                                         <span className="flex items-center gap-1.5 ml-2"><Mail size={14} className="text-slate-400" /> {formData.personalInfo.email}</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
//                                 <div className={`px-5 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm bg-slate-50 border-slate-200 text-slate-700`}>
//                                     {currentProfile?.profileStatus}
//                                 </div>
//                                 <button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md">
//                                     {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Changes
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Admin Workflow Actions */}
//                     {isAdminView && canChangeStatus && (
//                         <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl">
//                             <div className="flex flex-wrap gap-3 items-center">
//                                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 w-full sm:w-auto mb-2 sm:mb-0">Workflow Actions:</span>
//                                 {currentProfile?.profileStatus === 'lead' && (
//                                     <>
//                                         <button onClick={() => handleStatusChange('rejected')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><XCircle size={14} /> Reject</button>
//                                         <button onClick={() => handleStatusChange('draft')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-purple-600 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><CheckCircle size={14} /> Approve</button>
//                                     </>
//                                 )}
//                                 {currentProfile?.profileStatus === 'draft' && (
//                                     <button onClick={() => handleStatusChange('verified')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-emerald-600 bg-white border border-emerald-200 hover:bg-emerald-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><CheckCircle size={14} /> Verify & Lock</button>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* STICKY TABS */}
//             <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm mb-8 transition-all">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex overflow-x-auto hide-scrollbar gap-1 pt-1">
//                         {[
//                             { id: 'personal', label: 'Personal', icon: <User size={14} /> },
//                             { id: 'address', label: 'Address', icon: <MapPin size={14} /> },
//                             { id: 'family', label: 'Family', icon: <Users size={14} /> },
//                             { id: 'academics', label: 'Academics', icon: <Award size={14} /> },
//                             { id: 'financial', label: 'Financial', icon: <DollarSign size={14} /> },
//                             { id: 'documents', label: 'Documents', icon: <FileText size={14} /> }
//                         ].map(tab => (
//                             <TabButton key={tab.id} {...tab} active={activeTab} set={setActiveTab} />
//                         ))}
//                         <div className="w-px h-6 bg-slate-300 self-center mx-2 hidden lg:block opacity-50"></div>
//                         <TabButton id="review" label="Review" icon={<ClipboardCheck size={14} />} active={activeTab} set={setActiveTab} />
//                         {canViewApplications && <TabButton id="applications" label="Applications" icon={<Building2 size={14} />} active={activeTab} set={setActiveTab} highlight />}
//                         {isAdminView && canGenerateDocs && <TabButton id="generate" label="Generators" icon={<Printer size={14} />} active={activeTab} set={setActiveTab} color="purple" />}
//                         <TabButton id="sop" label="SOP Writer" icon={<PenTool size={14} />} active={activeTab} set={setActiveTab} color="purple" />
//                         <TabButton id="interview" label="AI Prep" icon={<Mic size={14} />} active={activeTab} set={setActiveTab} color="red" />
//                     </div>
//                 </div>
//             </div>

//             {/* CONTENT AREA */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[600px] pb-12">
//                 {activeTab === 'personal' && <PersonalTab formData={formData} updateField={updateField} />}
//                 {activeTab === 'address' && <AddressTab formData={formData} updateField={updateField} />}
//                 {activeTab === 'family' && <FamilyTab formData={formData} updateField={updateField} />}
//                 {activeTab === 'academics' && <AcademicsTab formData={formData} addAcademicRow={addAcademicRow} updateAcademicRow={updateAcademicRow} removeAcademicRow={removeAcademicRow} />}
//                 {activeTab === 'financial' && <FinancialTab formData={formData} updateField={updateField} />}
//                 {activeTab === 'documents' && <DocumentsTab formData={formData} isAddingDoc={isAddingDoc} setIsAddingDoc={setIsAddingDoc} newDocTitle={newDocTitle} setNewDocTitle={setNewDocTitle} handleAddDynamicDoc={handleAddDynamicDoc} handleDocumentUpdate={handleDocumentUpdate} handleDynamicDocUpload={handleDynamicDocUpload} removeDynamicDoc={removeDynamicDoc} />}
//                 {activeTab === 'review' && <ReviewTab formData={formData} />}

//                 {/* Applications Tab */}
//                 {canViewApplications && activeTab === 'applications' && (
//                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//                         <UniversityApplications student={currentProfile} />
//                     </div>
//                 )}

//                 {/* Generators Tab */}
//                 {activeTab === 'generate' && isAdminView && canGenerateDocs && (
//                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <GenerationCard title="Birth Verification" desc="Verify Date of Birth in AD & BS formats." icon={FileText} onClick={() => toggleModal('dob', true)} />
//                             <GenerationCard title="Birth Verification (Married)" desc="Includes in-laws." icon={Calendar} onClick={() => toggleModal('dobMarried', true)} />
//                             <GenerationCard title="Relationship Cert" desc="Standard family tree with photos." icon={User} onClick={() => toggleModal('relation', true)} />
//                             <GenerationCard title="Relationship (Married)" desc="For married applicants (includes in-laws)." icon={Users} onClick={() => toggleModal('relationMarried', true)} />
//                             <GenerationCard title="Occupation Verification" desc="Validate parental job details." icon={Building2} onClick={() => toggleModal('occupation', true)} />
//                             <GenerationCard title="Surname Verification" desc="Resolve naming discrepancies." icon={CheckCircle} onClick={() => toggleModal('surname', true)} />
//                             <GenerationCard title="Annual Income" desc="3-Year Income Source Table." icon={ClipboardCheck} onClick={() => toggleModal('income', true)} /> 
//                             <GenerationCard title="Bank Statement" desc="Generate statement summaries." icon={Building2} onClick={() => toggleModal('bank', true)} /> 
//                             <GenerationCard title="Tax Clearance" desc="Tax status verification docs." icon={ShieldCheck} onClick={() => toggleModal('tax', true)} /> 
//                             <GenerationCard title="Language Certificate" desc="Japanese language proficiency cert." icon={BookOpen} onClick={() => toggleModal('language', true)} /> 
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === 'sop' && <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"><SopWritingAssistant student={currentProfile} /></div>}
//                 {activeTab === 'interview' && <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"><div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"><JapaneseInterview /></div></div>}
//             </div>

//             {/* MODALS */}
//             <SurnameVerificationModal isOpen={modals.surname} onClose={() => toggleModal('surname', false)} student={currentProfile} />
//             <DateOfBirthVerificationModal isOpen={modals.dob} onClose={() => toggleModal('dob', false)} student={currentProfile} />
//             <DateOfBirthVerificationMarriedModal isOpen={modals.dobMarried} onClose={() => toggleModal('dobMarried', false)} student={currentProfile} />
//             <RelationshipVerificationModal isOpen={modals.relation} onClose={() => toggleModal('relation', false)} student={currentProfile} />
//             <RelationshipVerificationMarriedModal isOpen={modals.relationMarried} onClose={() => toggleModal('relationMarried', false)} student={currentProfile} />
//             <OccupationVerificationModal isOpen={modals.occupation} onClose={() => toggleModal('occupation', false)} student={currentProfile} />
//             <TaxClearanceVerificationModal isOpen={modals.tax} onClose={() => toggleModal('tax', false)} student={currentProfile} />
//             <BankStatementGeneratorModal isOpen={modals.bank} onClose={() => toggleModal('bank', false)} student={currentProfile} />
//             {modals.income && <AnnualIncomeVerificationModal isOpen={modals.income} onClose={() => toggleModal('income', false)} student={currentProfile} />}
//             {modals.language && <LanguageCertificateModal isOpen={modals.language} onClose={() => toggleModal('language', false)} student={currentProfile} />}

//         </div>
//     );
// }

// import {
//     ArrowLeft, Award, BookOpen, Building2,
//     Calendar,
//     Camera,
//     CheckCircle,
//     ClipboardCheck,
//     DollarSign,
//     FileText,
//     Globe,
//     Loader2,
//     Mail,
//     MapPin,
//     Mic,
//     PenTool,
//     Printer,
//     Save,
//     ShieldCheck,
//     User,
//     Users,
//     XCircle
// } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { clearCurrentProfile, getMyProfile, getStudentById, reset, updateProfile, updateStudentStatus } from '../../features/students/studentSlice';
// import api from '../../utils/api';

// // --- SHARED COMPONENTS ---
// import NotificationBell from '../../components/layout/NotificationBell';
// import { GenerationCard, TabButton } from '../../components/student/profile/ProfileShared'; // Shared UI
// // TAB IMPORTS
// import AcademicsTab from '../../components/student/profile/tabs/AcademicsTab';
// import AddressTab from '../../components/student/profile/tabs/AddressTab';
// import DocumentsTab from '../../components/student/profile/tabs/DocumentsTab';
// import FamilyTab from '../../components/student/profile/tabs/FamilyTab';
// import FinancialTab from '../../components/student/profile/tabs/FinancialTab';
// import PersonalTab from '../../components/student/profile/tabs/PersonalTab';
// import ReviewTab from '../../components/student/profile/tabs/ReviewTab';

// // --- GENERATORS ---
// import AnnualIncomeVerificationModal from '../../components/generators/AnnualIncomeVerificationModal';
// import BankStatementGeneratorModal from '../../components/generators/BankStatementGeneratorModal';
// import DateOfBirthVerificationMarriedModal from '../../components/generators/DateOfBirthVerificationMarriedModal';
// import DateOfBirthVerificationModal from '../../components/generators/DateOfBirthVerificationModal';
// import LanguageCertificateModal from '../../components/generators/LanguageCertificateModal';
// import OccupationVerificationModal from '../../components/generators/OccupationVerificationModal';
// import RelationshipVerificationMarriedModal from '../../components/generators/RelationshipVerificationMarriedModal';
// import RelationshipVerificationModal from '../../components/generators/RelationshipVerificationModal';
// import SurnameVerificationModal from '../../components/generators/SurnameVerificationModal';
// import TaxClearanceVerificationModal from '../../components/generators/TaxClearanceVerificationModal';

// // --- TOOLS ---
// import JapaneseInterview from '../../components/student/JapaneseInterview';
// import SopWritingAssistant from '../../components/student/SopWritingAssistant';
// import UniversityApplications from '../../components/student/UniversityApplications';

// export default function StudentProfile() {
//     const { studentId } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { currentProfile, isLoading, isSuccess, message } = useSelector((state) => state.students);
//     const { user } = useSelector((state) => state.auth);

//     const isAdminView = !!studentId;
//     const role = user?.role;
//     const subRole = user?.subRole;

//     const canGenerateDocs = role === 'consultancy_admin' || subRole === 'manager' || subRole === 'document_officer' || subRole === 'counselor';
//     const canViewApplications = true;
//     const canChangeStatus = role === 'consultancy_admin' || subRole === 'manager' || subRole === 'document_officer';

//     const [activeTab, setActiveTab] = useState('personal');
//     const [formData, setFormData] = useState({
//         personalInfo: { title: 'Mr.', firstName: '', lastName: '', gender: 'Male', dobAD: '', dobBS: '', email: '', phone: '', citizenshipNo: '', citizenshipDistrict: '', citizenshipDate: '', passportNo: '', passportExpiry: '', passportIssuePlace: '', photoUrl: '' },
//         address: { municipality: '', wardNo: '', district: '', province: '', tole: '' },
//         familyInfo: { fatherName: '', motherName: '', grandfatherName: '', spouseName: '', fatherInLawName: '', motherInLawName: '', relatives: [] },
//         academics: [],
//         financialInfo: { incomeSources: [], fiscalYears: [], exchangeRate: 134, sponsor: '' },
//         documents: { other: [] },
//         visaDetails: { japaneseLanguage: { certificateDetails: {} }, education: {}, intake: '' }
//     });

//     const [newDocTitle, setNewDocTitle] = useState('');
//     const [isAddingDoc, setIsAddingDoc] = useState(false);

//     // Modals state
//     const [modals, setModals] = useState({
//         surname: false,
//         dob: false,
//         dobMarried: false,
//         relation: false,
//         relationMarried: false,
//         occupation: false,
//         income: false,
//         bank: false,
//         tax: false,
//         language: false
//     });

//     const toggleModal = (key, value) => setModals(prev => ({ ...prev, [key]: value }));

//     useEffect(() => {
//         if (isAdminView) dispatch(getStudentById(studentId));
//         else dispatch(getMyProfile());
//         return () => { dispatch(reset()); dispatch(clearCurrentProfile()); };
//     }, [dispatch, studentId, isAdminView]);

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
//                 documents: { ...currentProfile.documents, other: currentProfile.documents?.other || [] },
//                 visaDetails: currentProfile.visaDetails || { japaneseLanguage: { certificateDetails: {} } }
//             }));
//         }
//     }, [currentProfile]);

//     useEffect(() => {
//         if (isSuccess && message) toast.success(message);
//         if (isSuccess) dispatch(reset());
//     }, [isSuccess, message, dispatch]);

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

//     // Tab Handlers
//     const addAcademicRow = () => setFormData(prev => ({ ...prev, academics: [...prev.academics, { level: '', institution: '', passedYear: '', grade: '' }] }));
//     const updateAcademicRow = (index, field, value) => {
//         const newList = [...formData.academics];
//         newList[index][field] = value;
//         setFormData(prev => ({ ...prev, academics: newList }));
//     };
//     const removeAcademicRow = (index) => {
//         const newList = formData.academics.filter((_, i) => i !== index);
//         setFormData(prev => ({ ...prev, academics: newList }));
//     };

//     const handleDocumentUpdate = async (fieldKey, url) => {
//         const updatedDocuments = { ...formData.documents, [fieldKey]: url };
//         setFormData(prev => ({ ...prev, documents: updatedDocuments }));
//         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocuments } })).unwrap(); } catch (error) { toast.error("Failed to save document link."); }
//     };

//     const handleAddDynamicDoc = async () => {
//         if (!newDocTitle.trim()) return toast.error("Enter a title");
//         const newDoc = { title: newDocTitle, url: '' };
//         const updatedDocs = { ...formData.documents, other: [...(formData.documents.other || []), newDoc] };
//         setFormData(prev => ({ ...prev, documents: updatedDocs }));
//         setNewDocTitle(''); setIsAddingDoc(false);
//         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); toast.success("Slot added!"); } catch (e) { toast.error("Failed."); }
//     };

//     const handleDynamicDocUpload = async (index, url) => {
//         const updatedOther = formData.documents.other.map((doc, i) => i === index ? { ...doc, url } : doc);
//         const updatedDocs = { ...formData.documents, other: updatedOther };
//         setFormData(prev => ({ ...prev, documents: updatedDocs }));
//         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); } catch (e) { console.error(e); }
//     };

//     const removeDynamicDoc = async (index) => {
//         const updatedOther = formData.documents.other.filter((_, i) => i !== index);
//         const updatedDocs = { ...formData.documents, other: updatedOther };
//         setFormData(prev => ({ ...prev, documents: updatedDocs }));
//         try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: updatedDocs } })).unwrap(); toast.success("Removed."); } catch (e) { console.error(e); }
//     };

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
//         } catch (error) { toast.dismiss(); toast.error("Photo upload failed"); }
//     };

//     if (!currentProfile && isLoading) return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-50">
//             <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
//             <span className="text-slate-600 font-semibold text-lg">Loading Profile...</span>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
//             {/* TOP BAR */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                 {isAdminView && (
//                     <button onClick={() => navigate('/dashboard')} className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all mb-6 text-sm font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md">
//                         <ArrowLeft size={16} /> Back to Dashboard
//                     </button>
//                 )}
                
//                 {/* HEADER */}
//                 <div className="bg-white rounded-3xl shadow-sm border border-slate-200 relative group">
                    
//                     {/* FIXED: Notification Bell moved outside the overflow-hidden banner but positioned on top */}
//                     <div className="absolute top-4 right-4 z-50">
//                         <NotificationBell />
//                     </div>

//                     <div className="h-32 sm:h-40 w-full bg-gradient-to-r from-emerald-600 to-teal-500 relative rounded-t-3xl overflow-hidden">
//                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
//                         {/* Removed Bell from here to fix clipping */}
//                     </div>
                    
//                     <div className="px-6 sm:px-8 pb-8">
//                         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
//                             <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 z-10 relative">
//                                 <div className="relative group/avatar">
//                                     <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-xl ring-1 ring-slate-100">
//                                         <div className="h-full w-full rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
//                                             {formData.personalInfo.photoUrl ? (
//                                                 <img src={formData.personalInfo.photoUrl} alt="Profile" className="h-full w-full object-cover" />
//                                             ) : <User size={48} className="text-slate-400" />}
//                                         </div>
//                                     </div>
//                                     <label className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2.5 rounded-xl cursor-pointer shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-110">
//                                         <Camera size={16} />
//                                         <input type="file" hidden accept="image/*" onChange={handleProfilePhotoUpload} />
//                                     </label>
//                                 </div>
//                                 <div className="text-center sm:text-left lg:mt-20 md:mt-20">
//                                     <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
//                                         {formData.personalInfo.firstName || 'Student'} {formData.personalInfo.lastName}
//                                     </h1>
//                                     <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-slate-500 font-medium">
//                                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm ${isAdminView ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
//                                             <ShieldCheck size={12} /> {isAdminView ? 'Admin View' : 'Applicant'}
//                                         </span>
//                                         <span className="hidden sm:inline text-slate-300">|</span>
//                                         <span className="flex items-center gap-1.5"><Globe size={14} className="text-slate-400" /> {formData.address.district || 'Nepal'}</span>
//                                         <span className="flex items-center gap-1.5 ml-2"><Mail size={14} className="text-slate-400" /> {formData.personalInfo.email}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
//                                 <div className={`px-5 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm bg-slate-50 border-slate-200 text-slate-700`}>
//                                     {currentProfile?.profileStatus}
//                                 </div>
//                                 <button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md">
//                                     {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Changes
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Admin Workflow Actions */}
//                     {isAdminView && canChangeStatus && (
//                         <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl">
//                             <div className="flex flex-wrap gap-3 items-center">
//                                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 w-full sm:w-auto mb-2 sm:mb-0">Workflow Actions:</span>
//                                 {currentProfile?.profileStatus === 'lead' && (
//                                     <>
//                                         <button onClick={() => handleStatusChange('rejected')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><XCircle size={14} /> Reject</button>
//                                         <button onClick={() => handleStatusChange('draft')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-purple-600 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><CheckCircle size={14} /> Approve</button>
//                                     </>
//                                 )}
//                                 {currentProfile?.profileStatus === 'draft' && (
//                                     <button onClick={() => handleStatusChange('verified')} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-emerald-600 bg-white border border-emerald-200 hover:bg-emerald-50 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"><CheckCircle size={14} /> Verify & Lock</button>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* TABS */}
//             <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm mb-8 transition-all">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex overflow-x-auto hide-scrollbar gap-1 pt-1">
//                         {[
//                             { id: 'personal', label: 'Personal', icon: <User size={14} /> },
//                             { id: 'address', label: 'Address', icon: <MapPin size={14} /> },
//                             { id: 'family', label: 'Family', icon: <Users size={14} /> },
//                             { id: 'academics', label: 'Academics', icon: <Award size={14} /> },
//                             { id: 'financial', label: 'Financial', icon: <DollarSign size={14} /> },
//                             { id: 'documents', label: 'Documents', icon: <FileText size={14} /> }
//                         ].map(tab => (
//                             <TabButton key={tab.id} {...tab} active={activeTab} set={setActiveTab} />
//                         ))}
//                         <div className="w-px h-6 bg-slate-300 self-center mx-2 hidden lg:block opacity-50"></div>
//                         <TabButton id="review" label="Review" icon={<ClipboardCheck size={14} />} active={activeTab} set={setActiveTab} />
//                         {canViewApplications && <TabButton id="applications" label="Applications" icon={<Building2 size={14} />} active={activeTab} set={setActiveTab} highlight />}
//                         {isAdminView && canGenerateDocs && <TabButton id="generate" label="Generators" icon={<Printer size={14} />} active={activeTab} set={setActiveTab} color="purple" />}
//                         <TabButton id="sop" label="SOP Writer" icon={<PenTool size={14} />} active={activeTab} set={setActiveTab} color="purple" />
//                         <TabButton id="interview" label="AI Prep" icon={<Mic size={14} />} active={activeTab} set={setActiveTab} color="red" />
//                     </div>
//                 </div>
//             </div>

//             {/* CONTENT AREA */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[600px] pb-12">
//                 {activeTab === 'personal' && <PersonalTab formData={formData} updateField={updateField} />}
//                 {activeTab === 'address' && <AddressTab formData={formData} updateField={updateField} />}
//                 {activeTab === 'family' && <FamilyTab formData={formData} updateField={updateField} />}
//                 {activeTab === 'academics' && <AcademicsTab formData={formData} addAcademicRow={addAcademicRow} updateAcademicRow={updateAcademicRow} removeAcademicRow={removeAcademicRow} />}
//                 {activeTab === 'financial' && <FinancialTab formData={formData} updateField={updateField} />}
//                 {activeTab === 'documents' && <DocumentsTab formData={formData} isAddingDoc={isAddingDoc} setIsAddingDoc={setIsAddingDoc} newDocTitle={newDocTitle} setNewDocTitle={setNewDocTitle} handleAddDynamicDoc={handleAddDynamicDoc} handleDocumentUpdate={handleDocumentUpdate} handleDynamicDocUpload={handleDynamicDocUpload} removeDynamicDoc={removeDynamicDoc} />}
//                 {activeTab === 'review' && <ReviewTab formData={formData} />}

//                 {/* Applications Tab */}
//                 {canViewApplications && activeTab === 'applications' && (
//                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//                         <UniversityApplications student={currentProfile} />
//                     </div>
//                 )}

//                 {/* Generators Tab */}
//                 {activeTab === 'generate' && isAdminView && canGenerateDocs && (
//                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <GenerationCard title="Birth Verification" desc="Verify Date of Birth in AD & BS formats." icon={FileText} onClick={() => toggleModal('dob', true)} />
//                             <GenerationCard title="Birth Verification (Married)" desc="Includes in-laws." icon={Calendar} onClick={() => toggleModal('dobMarried', true)} />
//                             <GenerationCard title="Relationship Cert" desc="Standard family tree with photos." icon={User} onClick={() => toggleModal('relation', true)} />
//                             <GenerationCard title="Relationship (Married)" desc="For married applicants (includes in-laws)." icon={Users} onClick={() => toggleModal('relationMarried', true)} />
//                             <GenerationCard title="Occupation Verification" desc="Validate parental job details." icon={Building2} onClick={() => toggleModal('occupation', true)} />
//                             <GenerationCard title="Surname Verification" desc="Resolve naming discrepancies." icon={CheckCircle} onClick={() => toggleModal('surname', true)} />
//                             <GenerationCard title="Annual Income" desc="3-Year Income Source Table." icon={ClipboardCheck} onClick={() => toggleModal('income', true)} /> 
//                             <GenerationCard title="Bank Statement" desc="Generate statement summaries." icon={Building2} onClick={() => toggleModal('bank', true)} /> 
//                             <GenerationCard title="Tax Clearance" desc="Tax status verification docs." icon={ShieldCheck} onClick={() => toggleModal('tax', true)} /> 
//                             <GenerationCard title="Language Certificate" desc="Japanese language proficiency cert." icon={BookOpen} onClick={() => toggleModal('language', true)} /> 
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === 'sop' && (
//                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//                         <SopWritingAssistant student={currentProfile} />
//                     </div>
//                 )}

//                 {activeTab === 'interview' && (
//                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//                         <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
//                             <JapaneseInterview />
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* MODALS */}
//             <SurnameVerificationModal isOpen={modals.surname} onClose={() => toggleModal('surname', false)} student={currentProfile} />
//             <DateOfBirthVerificationModal isOpen={modals.dob} onClose={() => toggleModal('dob', false)} student={currentProfile} />
//             <DateOfBirthVerificationMarriedModal isOpen={modals.dobMarried} onClose={() => toggleModal('dobMarried', false)} student={currentProfile} />
//             <RelationshipVerificationModal isOpen={modals.relation} onClose={() => toggleModal('relation', false)} student={currentProfile} />
//             <RelationshipVerificationMarriedModal isOpen={modals.relationMarried} onClose={() => toggleModal('relationMarried', false)} student={currentProfile} />
//             <OccupationVerificationModal isOpen={modals.occupation} onClose={() => toggleModal('occupation', false)} student={currentProfile} />
//             <TaxClearanceVerificationModal isOpen={modals.tax} onClose={() => toggleModal('tax', false)} student={currentProfile} />
//             <BankStatementGeneratorModal isOpen={modals.bank} onClose={() => toggleModal('bank', false)} student={currentProfile} />
//             {modals.income && <AnnualIncomeVerificationModal isOpen={modals.income} onClose={() => toggleModal('income', false)} student={currentProfile} />}
//             {modals.language && <LanguageCertificateModal isOpen={modals.language} onClose={() => toggleModal('language', false)} student={currentProfile} />}

//         </div>
//     );
// }

import {
    ArrowLeft,
    BookOpen, Building2,
    Calendar, CheckCircle, ClipboardCheck, DollarSign,
    FileText, Globe, GraduationCap, LayoutTemplate, Loader2,
    Mail, MapPin, Mic, PenTool,
    Printer, Save, ShieldCheck,
    User, Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCurrentProfile, getMyProfile, getStudentById, reset, updateProfile, updateStudentStatus } from '../../features/students/studentSlice';
import api from '../../utils/api';

// --- SHARED COMPONENTS ---
import NotificationBell from '../../components/layout/NotificationBell';
import { GenerationCard, TabButton } from '../../components/student/profile/ProfileShared';

// --- TABS ---
import AcademicsTab from '../../components/student/profile/tabs/AcademicsTab';
import AddressTab from '../../components/student/profile/tabs/AddressTab';
import DocumentsTab from '../../components/student/profile/tabs/DocumentsTab';
import FamilyTab from '../../components/student/profile/tabs/FamilyTab';
import FinancialTab from '../../components/student/profile/tabs/FinancialTab';
import PersonalTab from '../../components/student/profile/tabs/PersonalTab';
import ReviewTab from '../../components/student/profile/tabs/ReviewTab';

// --- GENERATORS & TOOLS ---
import AnnualIncomeVerificationModal from '../../components/generators/AnnualIncomeVerificationModal';
import BankStatementGeneratorModal from '../../components/generators/BankStatementGeneratorModal';
import DateOfBirthVerificationMarriedModal from '../../components/generators/DateOfBirthVerificationMarriedModal';
import DateOfBirthVerificationModal from '../../components/generators/DateOfBirthVerificationModal';
import LanguageCertificateModal from '../../components/generators/LanguageCertificateModal';
import OccupationVerificationModal from '../../components/generators/OccupationVerificationModal';
import RelationshipVerificationMarriedModal from '../../components/generators/RelationshipVerificationMarriedModal';
import RelationshipVerificationModal from '../../components/generators/RelationshipVerificationModal';
import SurnameVerificationModal from '../../components/generators/SurnameVerificationModal';
import TaxClearanceVerificationModal from '../../components/generators/TaxClearanceVerificationModal';

import JapaneseInterview from '../../components/student/JapaneseInterview';
import SopWritingAssistant from '../../components/student/SopWritingAssistant';
import UniversityApplications from '../../components/student/UniversityApplications';

export default function StudentProfile() {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentProfile, isLoading, isSuccess, message } = useSelector((state) => state.students);
    const { user } = useSelector((state) => state.auth);

    // --- PERMISSIONS ---
    const isAdminView = !!studentId;
    const isStudentView = !isAdminView && user?.role === 'student';

    const canEditProfile = !isStudentView;
    const canGenerateDocs = !isStudentView && (user?.role === 'consultancy_admin' || user?.subRole === 'manager' || user?.subRole === 'document_officer');
    const canChangeStatus = !isStudentView && (user?.role === 'consultancy_admin' || user?.subRole === 'manager');

    // --- DEFAULT TAB ---
    const [activeTab, setActiveTab] = useState(isStudentView ? 'applications' : 'personal');

    // --- FORM STATE ---
    const [formData, setFormData] = useState({
        personalInfo: { title: 'Mr.', firstName: '', lastName: '', gender: 'Male', dobAD: '', dobBS: '', email: '', phone: '', citizenshipNo: '', citizenshipDistrict: '', citizenshipDate: '', passportNo: '', passportExpiry: '', passportIssuePlace: '', photoUrl: '' },
        address: { municipality: '', wardNo: '', district: '', province: '', tole: '' },
        familyInfo: { fatherName: '', motherName: '', grandfatherName: '', spouseName: '', fatherInLawName: '', motherInLawName: '', relatives: [] },
        academics: [],
        financialInfo: { incomeSources: [], fiscalYears: [], exchangeRate: 134, sponsor: '' },
        documents: { other: [] },
        visaDetails: { japaneseLanguage: { certificateDetails: {} }, education: {}, intake: '' }
    });

    const [newDocTitle, setNewDocTitle] = useState('');
    const [isAddingDoc, setIsAddingDoc] = useState(false);
    const [modals, setModals] = useState({ surname: false, dob: false, dobMarried: false, relation: false, relationMarried: false, occupation: false, income: false, bank: false, tax: false, language: false });
    
    const toggleModal = (key, value) => setModals(prev => ({ ...prev, [key]: value }));

    // --- INITIALIZATION ---
    useEffect(() => {
        if (isAdminView) dispatch(getStudentById(studentId));
        else dispatch(getMyProfile());
        return () => { dispatch(reset()); dispatch(clearCurrentProfile()); };
    }, [dispatch, studentId, isAdminView]);

    useEffect(() => {
        if (currentProfile) {
            setFormData(prev => ({ ...prev, ...currentProfile, personalInfo: { ...prev.personalInfo, ...currentProfile.personalInfo }, address: { ...prev.address, ...currentProfile.address }, familyInfo: { ...prev.familyInfo, ...currentProfile.familyInfo }, academics: currentProfile.academics || [], financialInfo: { ...prev.financialInfo, ...currentProfile.financialInfo }, documents: { ...currentProfile.documents, other: currentProfile.documents?.other || [] }, visaDetails: currentProfile.visaDetails || { japaneseLanguage: { certificateDetails: {} } } }));
        }
    }, [currentProfile]);

    useEffect(() => {
        if (isSuccess && message) toast.success(message);
        if (isSuccess) dispatch(reset());
    }, [isSuccess, message, dispatch]);

    // --- HANDLERS ---
    const handleSave = () => { if (!currentProfile?._id) return; dispatch(updateProfile({ id: currentProfile._id, data: formData })); };
    const handleStatusChange = (newStatus) => { if (window.confirm(`Change status to ${newStatus}?`)) dispatch(updateStudentStatus({ id: currentProfile._id, status: newStatus })); };
    const updateField = (section, field, value) => setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    
    const addAcademicRow = () => setFormData(prev => ({ ...prev, academics: [...prev.academics, { level: '', institution: '', passedYear: '', grade: '' }] }));
    const updateAcademicRow = (index, field, value) => { const l = [...formData.academics]; l[index][field] = value; setFormData(prev => ({ ...prev, academics: l })); };
    const removeAcademicRow = (index) => { const l = formData.academics.filter((_, i) => i !== index); setFormData(prev => ({ ...prev, academics: l })); };
    
    const handleDocumentUpdate = async (fieldKey, url) => { const d = { ...formData.documents, [fieldKey]: url }; setFormData(prev => ({ ...prev, documents: d })); try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: d } })).unwrap(); } catch (e) { toast.error("Failed."); } };
    const handleAddDynamicDoc = async () => { if (!newDocTitle.trim()) return toast.error("Title needed"); const n = { title: newDocTitle, url: '' }; const d = { ...formData.documents, other: [...(formData.documents.other || []), n] }; setFormData(prev => ({ ...prev, documents: d })); setNewDocTitle(''); setIsAddingDoc(false); try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: d } })).unwrap(); toast.success("Added!"); } catch (e) { toast.error("Failed."); } };
    const handleDynamicDocUpload = async (index, url) => { const o = formData.documents.other.map((d, i) => i === index ? { ...d, url } : d); const d = { ...formData.documents, other: o }; setFormData(prev => ({ ...prev, documents: d })); try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: d } })).unwrap(); } catch (e) { console.error(e); } };
    const removeDynamicDoc = async (index) => { const o = formData.documents.other.filter((_, i) => i !== index); const d = { ...formData.documents, other: o }; setFormData(prev => ({ ...prev, documents: d })); try { await dispatch(updateProfile({ id: currentProfile._id, data: { ...formData, documents: d } })).unwrap(); toast.success("Removed."); } catch (e) { console.error(e); } };
    
    const handleProfilePhotoUpload = async (e) => { const f = e.target.files[0]; if (!f) return; const d = new FormData(); d.append('file', f); try { const t = toast.loading("Uploading..."); const r = await api.post('/upload', d, { headers: { 'Content-Type': 'multipart/form-data' } }); updateField('personalInfo', 'photoUrl', r.data.url); const u = { ...formData, personalInfo: { ...formData.personalInfo, photoUrl: r.data.url } }; await dispatch(updateProfile({ id: currentProfile._id, data: u })).unwrap(); toast.dismiss(t); toast.success("Saved!"); } catch (e) { toast.dismiss(); toast.error("Failed"); } };

    if (!currentProfile && isLoading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-emerald-600 mb-4" size={48} />
            <span className="text-slate-600 font-medium text-lg animate-pulse">Loading Profile...</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
            
            {/* --- TOP BAR --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {isAdminView && (
                    <button onClick={() => navigate('/dashboard')} className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all mb-6 text-sm font-semibold bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md active:scale-95">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                    </button>
                )}
                
                {/* --- HEADER CARD --- */}
                <div className="bg-white rounded-3xl shadow-lg border border-slate-200 relative group overflow-hidden">
                    
                    {/* Background Pattern */}
                    <div className="h-40 w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Notification Bell */}
                    <div className="absolute top-6 right-6 z-50">
                        <NotificationBell />
                    </div>
                    
                    <div className="px-8 pb-8">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                            
                            {/* Avatar & Info */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-14 z-10 relative">
                                <div className="relative group/avatar">
                                    <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-xl ring-1 ring-slate-100/50">
                                        <div className="h-full w-full rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200 relative">
                                            {formData.personalInfo.photoUrl ? (
                                                <img src={formData.personalInfo.photoUrl} alt="Profile" className="h-full w-full object-cover transition-transform duration-500 group-hover/avatar:scale-110" />
                                            ) : <User size={48} className="text-slate-400" />}
                                            
                                            {canEditProfile && (
                                                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer">
                                                    <PenTool className="text-white" size={24}/>
                                                    <input type="file" hidden accept="image/*" onChange={handleProfilePhotoUpload} />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center sm:text-left mb-1">
                                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                                        {formData.personalInfo.firstName || 'Student'} {formData.personalInfo.lastName}
                                    </h1>
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2 text-sm font-medium text-slate-500">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm ${isAdminView ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                            <ShieldCheck size={12} /> {isAdminView ? 'Admin View' : 'Applicant'}
                                        </span>
                                        <div className="flex items-center gap-4 text-slate-400">
                                            <span className="flex items-center gap-1.5 text-slate-600"><Globe size={14} className="text-slate-400"/> {formData.address.district || 'Nepal'}</span>
                                            <span className="flex items-center gap-1.5 text-slate-600"><Mail size={14} className="text-slate-400"/> {formData.personalInfo.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions & Status */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
                                <div className={`px-5 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm 
                                    ${currentProfile?.profileStatus === 'verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                                    {currentProfile?.profileStatus}
                                </div>
                                {canEditProfile && (
                                    <button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-70">
                                        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Changes
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Admin Workflow Bar (Conditionally Rendered) */}
                    {isAdminView && canChangeStatus && (
                        <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <LayoutTemplate size={14}/> Workflow Actions
                            </span>
                            <div className="flex gap-2">
                                {currentProfile?.profileStatus === 'lead' && (
                                    <>
                                        <button onClick={() => handleStatusChange('rejected')} className="px-4 py-2 text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg shadow-sm transition-all">Reject</button>
                                        <button onClick={() => handleStatusChange('draft')} className="px-4 py-2 text-xs font-bold text-purple-600 bg-white border border-purple-200 hover:bg-purple-50 rounded-lg shadow-sm transition-all">Approve Lead</button>
                                    </>
                                )}
                                {currentProfile?.profileStatus === 'draft' && (
                                    <button onClick={() => handleStatusChange('verified')} className="px-4 py-2 text-xs font-bold text-emerald-600 bg-white border border-emerald-200 hover:bg-emerald-50 rounded-lg shadow-sm transition-all flex items-center gap-2">
                                        <ShieldCheck size={14}/> Verify & Lock
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- STICKY TABS --- */}
            <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm mb-8 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto hide-scrollbar gap-1 pt-2">
                        
                        {/* 1. ADMIN DATA TABS */}
                        {!isStudentView && [
                            { id: 'personal', label: 'Personal', icon: <User size={14} /> },
                            { id: 'address', label: 'Address', icon: <MapPin size={14} /> },
                            { id: 'family', label: 'Family', icon: <Users size={14} /> },
                            { id: 'academics', label: 'Academics', icon: <GraduationCap size={14} /> }, // Changed Icon
                            { id: 'financial', label: 'Financial', icon: <DollarSign size={14} /> },
                            { id: 'documents', label: 'Documents', icon: <FileText size={14} /> }
                        ].map(tab => (
                            <TabButton key={tab.id} {...tab} active={activeTab} set={setActiveTab} />
                        ))}

                        <div className="w-px h-6 bg-slate-300 self-center mx-3 hidden lg:block opacity-50"></div>

                        {/* 2. SHARED TABS */}
                        <TabButton id="review" label="Review" icon={<ClipboardCheck size={14} />} active={activeTab} set={setActiveTab} />
                        <TabButton id="applications" label="Applications" icon={<Building2 size={14} />} active={activeTab} set={setActiveTab} highlight />
                        <TabButton id="sop" label="SOP Writer" icon={<PenTool size={14} />} active={activeTab} set={setActiveTab} color="purple" />
                        <TabButton id="interview" label="AI Prep" icon={<Mic size={14} />} active={activeTab} set={setActiveTab} color="red" />

                        {/* 3. ADMIN GENERATORS */}
                        {canGenerateDocs && <TabButton id="generate" label="Generators" icon={<Printer size={14} />} active={activeTab} set={setActiveTab} color="purple" />}
                    </div>
                </div>
            </div>

            {/* --- CONTENT AREA --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[600px] pb-12">
                
                {/* Admin-Only Data Entry Tabs */}
                {!isStudentView && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {activeTab === 'personal' && <PersonalTab formData={formData} updateField={updateField} />}
                        {activeTab === 'address' && <AddressTab formData={formData} updateField={updateField} />}
                        {activeTab === 'family' && <FamilyTab formData={formData} updateField={updateField} />}
                        {activeTab === 'academics' && <AcademicsTab formData={formData} addAcademicRow={addAcademicRow} updateAcademicRow={updateAcademicRow} removeAcademicRow={removeAcademicRow} />}
                        {activeTab === 'financial' && <FinancialTab formData={formData} updateField={updateField} />}
                        {activeTab === 'documents' && <DocumentsTab formData={formData} isAddingDoc={isAddingDoc} setIsAddingDoc={setIsAddingDoc} newDocTitle={newDocTitle} setNewDocTitle={setNewDocTitle} handleAddDynamicDoc={handleAddDynamicDoc} handleDocumentUpdate={handleDocumentUpdate} handleDynamicDocUpload={handleDynamicDocUpload} removeDynamicDoc={removeDynamicDoc} />}
                    </div>
                )}

                {/* Shared Content */}
                {activeTab === 'review' && <div className="animate-in fade-in zoom-in duration-300"><ReviewTab formData={formData} /></div>}
                
                {activeTab === 'applications' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <UniversityApplications student={currentProfile} />
                    </div>
                )}

                {activeTab === 'sop' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <SopWritingAssistant student={currentProfile} />
                    </div>
                )}

                {activeTab === 'interview' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden ring-1 ring-slate-100">
                            <JapaneseInterview />
                        </div>
                    </div>
                )}

                {/* Admin Generators */}
                {activeTab === 'generate' && canGenerateDocs && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <GenerationCard title="Birth Verification" desc="Verify Date of Birth." icon={FileText} onClick={() => toggleModal('dob', true)} />
                            <GenerationCard title="Birth Verification (Married)" desc="Includes in-laws." icon={Calendar} onClick={() => toggleModal('dobMarried', true)} />
                            <GenerationCard title="Relationship Cert" desc="Standard family tree." icon={User} onClick={() => toggleModal('relation', true)} />
                            <GenerationCard title="Relationship (Married)" desc="For married applicants." icon={Users} onClick={() => toggleModal('relationMarried', true)} />
                            <GenerationCard title="Occupation Verification" desc="Validate job details." icon={Building2} onClick={() => toggleModal('occupation', true)} />
                            <GenerationCard title="Surname Verification" desc="Resolve naming discrepancies." icon={CheckCircle} onClick={() => toggleModal('surname', true)} />
                            <GenerationCard title="Annual Income" desc="Income Source Table." icon={ClipboardCheck} onClick={() => toggleModal('income', true)} /> 
                            <GenerationCard title="Bank Statement" desc="Generate statement summaries." icon={Building2} onClick={() => toggleModal('bank', true)} /> 
                            <GenerationCard title="Tax Clearance" desc="Tax status verification." icon={ShieldCheck} onClick={() => toggleModal('tax', true)} /> 
                            <GenerationCard title="Language Certificate" desc="Japanese proficiency." icon={BookOpen} onClick={() => toggleModal('language', true)} /> 
                        </div>
                    </div>
                )}
            </div>

            {/* --- MODALS (Admin Only) --- */}
            {canGenerateDocs && (
                <>
                    <SurnameVerificationModal isOpen={modals.surname} onClose={() => toggleModal('surname', false)} student={currentProfile} />
                    <DateOfBirthVerificationModal isOpen={modals.dob} onClose={() => toggleModal('dob', false)} student={currentProfile} />
                    <DateOfBirthVerificationMarriedModal isOpen={modals.dobMarried} onClose={() => toggleModal('dobMarried', false)} student={currentProfile} />
                    <RelationshipVerificationModal isOpen={modals.relation} onClose={() => toggleModal('relation', false)} student={currentProfile} />
                    <RelationshipVerificationMarriedModal isOpen={modals.relationMarried} onClose={() => toggleModal('relationMarried', false)} student={currentProfile} />
                    <OccupationVerificationModal isOpen={modals.occupation} onClose={() => toggleModal('occupation', false)} student={currentProfile} />
                    <TaxClearanceVerificationModal isOpen={modals.tax} onClose={() => toggleModal('tax', false)} student={currentProfile} />
                    <BankStatementGeneratorModal isOpen={modals.bank} onClose={() => toggleModal('bank', false)} student={currentProfile} />
                    {modals.income && <AnnualIncomeVerificationModal isOpen={modals.income} onClose={() => toggleModal('income', false)} student={currentProfile} />}
                    {modals.language && <LanguageCertificateModal isOpen={modals.language} onClose={() => toggleModal('language', false)} student={currentProfile} />}
                </>
            )}

        </div>
    );
}