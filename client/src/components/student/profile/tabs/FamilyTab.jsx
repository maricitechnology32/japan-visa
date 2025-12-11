import { User } from 'lucide-react';
import { InputGroup, SectionHeader } from '../ProfileShared';

export default function FamilyTab({ formData, updateField }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="Family Information" subtitle="Required for Birth, Relationship, and Income Verification docs." icon={<User className="text-emerald-600"/>} />
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Father's Full Name" value={formData.familyInfo.fatherName} onChange={(e) => updateField('familyInfo', 'fatherName', e.target.value)} />
                <InputGroup label="Mother's Full Name" value={formData.familyInfo.motherName} onChange={(e) => updateField('familyInfo', 'motherName', e.target.value)} />
                <InputGroup label="Grandfather's Full Name" value={formData.familyInfo.grandfatherName} onChange={(e) => updateField('familyInfo', 'grandfatherName', e.target.value)} />
                <InputGroup label="Spouse Name (Optional)" value={formData.familyInfo.spouseName} onChange={(e) => updateField('familyInfo', 'spouseName', e.target.value)} />
                
                {/* In-Laws Section */}
                <div className="md:col-span-2 border-t border-slate-100 pt-6 mt-2">
                    <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <User size={16} className="text-slate-400" />
                        For Married Applicants (In-Laws)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputGroup label="Father-in-Law's Name" value={formData.familyInfo.fatherInLawName} onChange={(e) => updateField('familyInfo', 'fatherInLawName', e.target.value)} />
                        <InputGroup label="Mother-in-Law's Name" value={formData.familyInfo.motherInLawName} onChange={(e) => updateField('familyInfo', 'motherInLawName', e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}