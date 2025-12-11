import { MapPin } from 'lucide-react';
import { InputGroup, SectionHeader } from '../ProfileShared';

export default function AddressTab({ formData, updateField }) {
  return (
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
  );
}