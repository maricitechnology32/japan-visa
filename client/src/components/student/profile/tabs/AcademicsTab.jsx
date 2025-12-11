import { Award, FileText, Plus, Trash2 } from 'lucide-react';
import { InputGroup, SectionHeader } from '../ProfileShared';

export default function AcademicsTab({ formData, addAcademicRow, updateAcademicRow, removeAcademicRow }) {
  return (
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
  );
}