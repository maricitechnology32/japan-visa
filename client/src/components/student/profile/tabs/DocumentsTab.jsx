import { CheckCircle, FileText, Plus, X } from 'lucide-react';
import DocumentUploadCard from '../DocumentUploadCard';
import { InputGroup, SectionHeader } from '../ProfileShared';

export default function DocumentsTab({ 
  formData, 
  isAddingDoc, 
  setIsAddingDoc, 
  newDocTitle, 
  setNewDocTitle, 
  handleAddDynamicDoc, 
  handleDocumentUpdate, 
  handleDynamicDocUpload, 
  removeDynamicDoc 
}) {
  return (
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
  );
}