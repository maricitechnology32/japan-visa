import { Calendar, FileText, Globe, User } from 'lucide-react';
import { InfoCard, InputGroup, SectionHeader } from '../ProfileShared';

export default function PersonalTab({ formData, updateField }) {
  return (
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
  );
}