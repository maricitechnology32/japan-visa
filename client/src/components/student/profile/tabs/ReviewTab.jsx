import { Award, BookOpen, Building2, Calendar, DollarSign, FileCheck, FileText, Globe, Mail, MapPin, Phone, User, Users } from 'lucide-react';
import CalendarWidget from '../../../calendar/Calendar'; // Importing the Real-time Calendar
import { ReviewItem } from '../ProfileShared';

export default function ReviewTab({ formData }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* LEFT COLUMN: Main Info */}
        <div className="xl:col-span-2 space-y-6">
            
            {/* Personal Information */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
                    <User className="text-emerald-600" size={20}/> Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                    <ReviewItem label="Full Name" value={`${formData.personalInfo.title} ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`} icon={<User size={16}/>} />
                    <ReviewItem label="Email" value={formData.personalInfo.email} icon={<Mail size={16}/>} />
                    <ReviewItem label="Phone" value={formData.personalInfo.phone} icon={<Phone size={16}/>} />
                    <ReviewItem label="Gender" value={formData.personalInfo.gender} icon={<User size={16}/>} />
                    <ReviewItem label="Date of Birth (BS)" value={formData.personalInfo.dobBS} icon={<Calendar size={16}/>} />
                    <ReviewItem label="Date of Birth (AD)" value={formData.personalInfo.dobAD ? new Date(formData.personalInfo.dobAD).toLocaleDateString() : ''} icon={<Calendar size={16}/>} />
                    <ReviewItem label="Passport No." value={formData.personalInfo.passportNo} icon={<Globe size={16}/>} />
                    <ReviewItem label="Citizenship No." value={formData.personalInfo.citizenshipNo} icon={<FileText size={16}/>} />
                </div>
            </div>

            {/* Address & Family */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <MapPin className="text-emerald-600" size={20}/> Address
                    </h3>
                    <div className="space-y-4">
                        <ReviewItem label="Municipality" value={formData.address.municipality} />
                        <ReviewItem label="Ward No." value={formData.address.wardNo} />
                        <ReviewItem label="District" value={formData.address.district} />
                        <ReviewItem label="Province" value={formData.address.province} />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <Users className="text-emerald-600" size={20}/> Family
                    </h3>
                    <div className="space-y-4">
                        <ReviewItem label="Father" value={formData.familyInfo.fatherName} />
                        <ReviewItem label="Mother" value={formData.familyInfo.motherName} />
                        <ReviewItem label="Spouse" value={formData.familyInfo.spouseName} />
                    </div>
                </div>
            </div>

            {/* Academics */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
                    <Award className="text-emerald-600" size={20}/> Academic History
                </h3>
                {formData.academics.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {formData.academics.map((academic, index) => (
                            <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-wrap gap-6 items-center">
                                <ReviewItem label="Level" value={academic.level} />
                                <ReviewItem label="Institution" value={academic.institution} />
                                <ReviewItem label="Passed Year" value={academic.passedYear} />
                                <div className="ml-auto"><ReviewItem label="GPA" value={academic.grade} /></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 italic">No academic records added.</p>
                )}
            </div>
        </div>

        {/* RIGHT COLUMN: Calendar & Status */}
        <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
                
                {/* Real-time Calendar Widget */}
                <CalendarWidget />

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Building2 className="text-emerald-600" size={20}/> Visa Status
                    </h3>
                    <div className="space-y-4">
                         <ReviewItem label="Intake" value={formData.visaDetails.intake} />
                         <ReviewItem label="Language Status" value={formData.visaDetails.japaneseLanguage.status} />
                         <ReviewItem label="Level" value={formData.visaDetails.japaneseLanguage.level} />
                         <ReviewItem label="Sponsor" value={formData.financialInfo.sponsor} />
                    </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><FileCheck size={20}/></div>
                        <h4 className="font-bold text-indigo-900">Ready to Submit?</h4>
                    </div>
                    <p className="text-sm text-indigo-700 mb-4">Ensure all details above are correct before generating documents.</p>
                </div>
            </div>
        </div>

    </div>
  );
}