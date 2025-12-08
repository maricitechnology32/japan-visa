 

import { Download, FileText, UserPen, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SurnameVerificationModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  // Helper to determine relation based on gender/title
  const getRelation = (s) => {
    const gender = s?.personalInfo?.gender;
    const title = s?.personalInfo?.title;
    
    if (gender === 'Male' || title === 'Mr.') return 'son of';
    if (gender === 'Female' || title === 'Ms.' || title === 'Mrs.') return 'daughter of';
    return 'son/daughter of';
  };

  // 1. Initial State
  const [formData, setFormData] = useState({
    refNo: '2082/083',
    disNo: '404',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    
    // Body Variables
    applicantName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
    relation: getRelation(student),
    fatherName: student.familyInfo.fatherName,
    motherName: student.familyInfo.motherName,
    
    // Smart Surname Detection
    parentSurname: student.familyInfo.fatherName?.trim().split(' ').pop() || '',
    applicantSurname: student.personalInfo.lastName || '',
    
    // Signatory Defaults
    signatoryName: 'Lob Bahadur Shahi',
    signatoryDesignation: 'Ward Chairperson'
  });

  // Reset when student changes
  useEffect(() => {
    if(student) {
        setFormData(prev => ({
            ...prev,
            applicantName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
            relation: getRelation(student),
            fatherName: student.familyInfo.fatherName,
            motherName: student.familyInfo.motherName,
            parentSurname: student.familyInfo.fatherName?.trim().split(' ').pop() || '',
            applicantSurname: student.personalInfo.lastName || '',
        }));
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Word Document Generator Logic
  const generateWordDoc = () => {
  const content = `
<html xmlns:o='urn:schemas-microsoft-com:office:office'
      xmlns:w='urn:schemas-microsoft-com:office:word'
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">

<style>
  body {
    font-family: 'Times New Roman', serif;
    font-size: 12pt;
    line-height: 1.8;
    margin: 30pt 40pt;
  }

  /* Header empty spacing to match image */
  .header-space {
    height: 165pt;
  }

  /* Ref/Date empty spacing */
  .meta-space {
    height: 55pt;
  }

  .title {
    text-align: center;
    font-size: 16pt;
    font-weight: bold;
    text-decoration: underline;
    margin-top: 10pt;
  }

  .subtitle {
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
    text-decoration: underline;
    margin-top: 8pt;
    margin-bottom: 20pt;
  }

  p {
    text-align: justify;
  }

  .signature-box {
    margin-top: 80pt;
    text-align: right;
    font-size: 12pt;
  }

  .signature-line {
    margin-bottom: 3pt;
  }
</style>
</head>

<body>

  <!-- EXACT EMPTY SPACING LIKE THE IMAGE -->
  <div class="header-space"></div>
  <div class="meta-space"></div>

  <!-- CERTIFICATE TITLES -->
  <div class="title">SURNAME VERIFICATION CERTIFICATE</div>
  <div class="subtitle">To Whom It May Concern</div>

  <!-- BODY -->
  <p>
    This is to certify that <strong>${formData.applicantName}</strong> ${formData.relation} 
    <strong>Mr. ${formData.fatherName}</strong> and 
    <strong>Mrs. ${formData.motherName}</strong>, despite the use of 
    <strong>“${formData.parentSurname}”</strong> as the parent’s surname.
    <strong>“${formData.applicantSurname}”</strong> is the Applicant’s surname.
    <strong>“${formData.parentSurname}”</strong> & <strong>“${formData.applicantSurname}”</strong>
    belong to the same family name and both are the same surname. This difference is due to personal 
    or cultural naming preferences and should not be considered a discrepancy in official relationships.
  </p>

  <!-- SIGNATURE -->
  <div class="signature-box">
    <div class="signature-line">......................................</div>
    <strong>${formData.signatoryName}</strong><br>
    ${formData.signatoryDesignation}
  </div>

</body>
</html>
`;


    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Surname_Verification_${formData.applicantName.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-green-600" size={20}/> Surname Verification Generator
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto">
          
          {/* Section: Logic Data */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Verification Logic</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Parent's Surname (Conflict)</label>
                <input name="parentSurname" value={formData.parentSurname} onChange={handleChange} className="w-full border-2 border-yellow-100 bg-yellow-50 rounded p-2 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Applicant's Surname (Correct)</label>
                <input name="applicantSurname" value={formData.applicantSurname} onChange={handleChange} className="w-full border-2 border-green-100 bg-green-50 rounded p-2 text-sm font-medium" />
              </div>
            </div>
          </div>

          {/* Section: Signatory Details (Editable) */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <UserPen size={14} /> Signatory Details
             </h4>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Chairperson Name</label>
                    <input 
                        name="signatoryName" 
                        value={formData.signatoryName} 
                        onChange={handleChange} 
                        className="w-full border rounded p-2 text-sm font-bold text-gray-700" 
                        placeholder="e.g. Lob Bahadur Shahi"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Designation</label>
                    <input 
                        name="signatoryDesignation" 
                        value={formData.signatoryDesignation} 
                        onChange={handleChange} 
                        className="w-full border rounded p-2 text-sm text-gray-700" 
                        placeholder="e.g. Ward Chairperson"
                    />
                </div>
             </div>
          </div>

          {/* Section: Preview (Visual Representation) */}
          <div className="border rounded-lg p-8 bg-gray-100 flex justify-center">
             <div className="bg-white shadow-sm p-8 w-full text-[10px] font-serif leading-relaxed text-justify relative">
                {/* Visual Header Mockup */}
                <div className="flex justify-between font-bold mb-4">
                    <div>
                        <p>Ref: {formData.refNo}</p>
                        <p>Dis: {formData.disNo}</p>
                    </div>
                    <p>Date: {formData.date}</p>
                </div>

                <div className="text-center font-bold underline mb-4">
                    <p className="text-sm uppercase">SURNAME VERIFICATION CERTIFICATE</p>
                    <p className="mt-2">To Whom It May Concern</p>
                </div>

                <p>
                    This is to certify that <strong>{formData.applicantName}</strong> {formData.relation} 
                    <strong>Mr. {formData.fatherName}</strong> and <strong>Mrs. {formData.motherName}</strong>...
                    <span className="text-gray-400 italic">(Content omitted for preview)</span>
                </p>

                {/* VISUAL SIGNATURE BLOCK (Right Aligned, No Dash) */}
                <div className="mt-12 flex justify-end">
                    <div className="text-left w-40"> 
                        {/* Space for Signature */}
                        <div className="h-10"></div> 
                        {/* Name (Bold) */}
                        <p className="font-bold text-xs">{formData.signatoryName}</p>
                        {/* Designation (Normal) */}
                        <p className="text-xs">{formData.signatoryDesignation}</p>
                    </div>
                </div>
             </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
            Cancel
          </button>
          <button 
            onClick={generateWordDoc}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95 transition"
          >
            <Download size={16} /> Download .DOC Word File
          </button>
        </div>

      </div>
    </div>
  );
}