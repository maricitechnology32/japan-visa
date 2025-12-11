import { CheckCircle, Eye, Loader2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

export default function DocumentUploadCard({ title, fieldKey, existingUrl, onUpload }) {
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
        } catch (error) { 
            toast.error("Upload failed."); 
        } finally { 
            setIsUploading(false); 
        }
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