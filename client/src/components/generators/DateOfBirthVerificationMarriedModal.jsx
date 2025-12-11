import { Calendar, Download, LayoutTemplate, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DateOfBirthVerificationMarriedModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Format: 31st July 2001
    const day = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][(day % 10 > 3) ? 0 : (day % 100 - day % 10 != 10) * day % 10];
    return `${day}${suffix} ${date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}`;
  };

  // 1. Initial State
  const [formData, setFormData] = useState({
    // Header (Bheemdatt Defaults)
    municipalityName: 'Bheemdatt Municipality',
    wardInfo: '10 No. Ward Office',
    localPlace: 'Jimuwa, Kanchanpur',
    provinceInfo: 'Sudurpashchim Province, Nepal',
    footerEmail: 'bhi.na.pa.10jimuwa@gmail.com',

    // Meta
    refNo: '2082/083',
    disNo: '322',
    date: '29th August 2025',

    // Applicant Details
    applicantName: `Mrs. ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
    
    // Relations
    fatherName: `Mr. ${student.familyInfo.fatherName || ''}`,
    motherName: `Mrs. ${student.familyInfo.motherName || ''}`,
    fatherInLawName: `Mr. ${student.familyInfo.fatherInLawName || ''}`,
    motherInLawName: `Mrs. ${student.familyInfo.motherInLawName || ''}`,
    husbandName: `Mr. ${student.familyInfo.spouseName || ''}`,

    // Location & Dates
    addressLine: `Bheemdatt Municipality Ward No. 10, Kanchanpur, Sudurpashchim Province, Nepal`,
    dobBS: student.personalInfo.dobBS || '2058/04/16',
    dobAD: formatDate(student.personalInfo.dobAD) || '31st July 2001',

    // Signatory
    signatoryName: 'Mahesh Chand',
    signatoryDesignation: 'Ward Chairperson',
    signatoryPhone: '+977-9858751654'
  });

  const [includeHeader, setIncludeHeader] = useState(true);

  // Sync with Student Data
  useEffect(() => {
    if(student) {
        setFormData(prev => ({
            ...prev,
            applicantName: `Mrs. ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
            fatherName: `Mr. ${student.familyInfo.fatherName || ''}`,
            motherName: `Mrs. ${student.familyInfo.motherName || ''}`,
            fatherInLawName: `Mr. ${student.familyInfo.fatherInLawName || ''}`,
            motherInLawName: `Mrs. ${student.familyInfo.motherInLawName || ''}`,
            husbandName: `Mr. ${student.familyInfo.spouseName || ''}`,
            dobBS: student.personalInfo.dobBS || prev.dobBS,
            dobAD: formatDate(student.personalInfo.dobAD) || prev.dobAD,
            // Use saved address if exists, else keep Bheemdatt default
            addressLine: student.address.district ? `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal` : prev.addressLine
        }));
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Word Generator
  const generateWordDoc = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Date of Birth Verification (Married)</title>
        <style>
          @page {
            size: A4;
            margin: 0.5in 0.6in 0.4in 0.6in; 
          }
          body { 
            font-family: 'Times New Roman', serif; 
            font-size: 12pt;
            line-height: 1.5; 
          }
          
          /* HEADER (Red) */
          .header-text { text-align: center; color: #b91c1c; margin-bottom: 0; line-height: 1.2; }
          .muni-name { font-size: 20pt; font-weight: bold; margin: 0; }
          .ward-info { font-size: 16pt; font-weight: bold; margin: 0; }
          .address-info { font-size: 14pt; font-weight: bold; margin: 0; }
          
          /* META TABLE */
          .meta-table { width: 100%; border: none; margin-top: 10pt; margin-bottom: 5pt; color: #b91c1c; font-weight: bold; font-size: 11pt; }
          .meta-table td { vertical-align: bottom; }
          
          /* TITLES */
          .doc-title { text-align: center; font-size: 16pt; font-weight: bold; text-decoration: underline; margin-top: 10pt; color: #000; }
          .doc-subtitle { text-align: center; font-size: 14pt; font-weight: bold; margin-top: 5pt; margin-bottom: 20pt; color: #000; }
          
          p { margin: 10pt 0; text-align: justify; font-size: 12pt; line-height: 1.6; }

          /* SIGNATURE */
          .signature-box { margin-top: 60pt; text-align: right; margin-right: 10pt; }
          .sig-line { border-top: 1pt dotted black; width: 140pt; display: inline-block; margin-bottom: 5pt; }
          
          /* FOOTER */
          .footer { border-top: 2pt solid #b91c1c; margin-top: 50pt; padding-top: 5pt; text-align: center; color: #b91c1c; font-weight: bold; font-size: 10pt; }
        </style>
      </head>
      <body>
        
        ${includeHeader ? `
        <div class="header-text">
            <div class="muni-name">${formData.municipalityName}</div>
            <div class="ward-info">${formData.wardInfo}</div>
            <div class="address-info">${formData.localPlace}</div>
            <div class="address-info">${formData.provinceInfo}</div>
        </div>
        ` : `<div style="height: 110pt;"></div>`}

        <table class="meta-table">
            <tr>
                <td style="text-align: left;">Ref. No.: ${formData.refNo}<br>Dis. No.: ${formData.disNo}</td>
                <td style="text-align: right;">Date: ${formData.date}</td>
            </tr>
        </table>

        <div style="border-top: 2pt solid #b91c1c; margin-top: 2pt;"></div>

        <div class="doc-title">Date of Birth Verification Certificate</div>
        <div class="doc-subtitle">To Whom It May Concern</div>

        <p>
            This is to certify that <strong>${formData.applicantName}</strong> daughter of 
            <strong>${formData.fatherName}</strong> and <strong>${formData.motherName}</strong> 
            daughter-in-law of <strong>${formData.fatherInLawName}</strong> and 
            <strong>${formData.motherInLawName}</strong> wife of <strong>${formData.husbandName}</strong> 
            permanent resident of <strong>${formData.addressLine}</strong> was born on 
            <strong>B.S. ${formData.dobBS} (${formData.dobAD} A.D.)</strong>.
        </p>

        <p>
            This birth verification certificate is issued in accordance with the Local Government Operation Act 
            B.S. 2074 (2017 A.D.), Chapter 3, Section 12, Sub-section 2, Clause E (7).
        </p>

        <div class="signature-box">
            <div class="sig-line"></div>
            <div style="font-weight: bold;">${formData.signatoryName}</div>
            <div>${formData.signatoryDesignation}</div>
            <div>${formData.signatoryPhone}</div>
        </div>

        ${includeHeader ? `
        <div class="footer">
            E-mail: ${formData.footerEmail}
        </div>
        ` : ''}

      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Birth_Verify_Married_${formData.applicantName.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="text-red-600" size={20}/> DOB Verification (Married)
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT: EDITABLE FIELDS */}
            <div className="flex-1 space-y-4">
                
                {/* Header Config */}
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-2">
                            <LayoutTemplate size={14}/> Header
                        </h4>
                        <label className="flex items-center gap-2 text-xs font-bold text-red-800 cursor-pointer">
                            <input type="checkbox" checked={includeHeader} onChange={(e) => setIncludeHeader(e.target.checked)} className="rounded text-red-600"/> Letterhead
                        </label>
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                         <input name="refNo" value={formData.refNo} onChange={handleChange} className="border p-1.5 rounded text-xs w-full" placeholder="Ref No" />
                         <input name="date" value={formData.date} onChange={handleChange} className="border p-1.5 rounded text-xs w-full" placeholder="Date" />
                     </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase">Family Details</h4>
                    <input name="applicantName" value={formData.applicantName} onChange={handleChange} className="input-field font-bold" placeholder="Applicant Name (Mrs.)" />
                    
                    <div className="grid grid-cols-2 gap-2">
                        <input name="fatherName" value={formData.fatherName} onChange={handleChange} className="input-field" placeholder="Father" />
                        <input name="motherName" value={formData.motherName} onChange={handleChange} className="input-field" placeholder="Mother" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input name="fatherInLawName" value={formData.fatherInLawName} onChange={handleChange} className="input-field" placeholder="Father-in-Law" />
                        <input name="motherInLawName" value={formData.motherInLawName} onChange={handleChange} className="input-field" placeholder="Mother-in-Law" />
                    </div>
                    <input name="husbandName" value={formData.husbandName} onChange={handleChange} className="input-field" placeholder="Husband" />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                     <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Birth Details</h4>
                     <div className="grid grid-cols-2 gap-2">
                         <input name="dobBS" value={formData.dobBS} onChange={handleChange} className="input-field" placeholder="DOB (BS)" />
                         <input name="dobAD" value={formData.dobAD} onChange={handleChange} className="input-field" placeholder="DOB (AD)" />
                     </div>
                     <textarea name="addressLine" value={formData.addressLine} onChange={handleChange} className="input-field mt-2 h-16" placeholder="Full Address" />
                </div>
            </div>

            {/* RIGHT: PREVIEW */}
            <div className="flex-1 bg-gray-100 rounded-lg p-6 flex justify-center overflow-auto h-[600px]">
                <div className="bg-white shadow-sm p-8 w-full max-w-[210mm] text-[10px] font-serif leading-relaxed text-justify relative min-h-[297mm] flex flex-col">
                    
                    {includeHeader ? (
                        <div className="text-center text-red-700 mb-2">
                            <h2 className="text-xl font-bold">{formData.municipalityName}</h2>
                            <h3 className="font-bold text-sm">{formData.wardInfo}</h3>
                            <h3 className="font-bold text-sm">{formData.localPlace}</h3>
                            <p className="font-bold text-xs">{formData.provinceInfo}</p>
                        </div>
                    ) : <div className="h-24 bg-gray-50 border-dashed border border-gray-300 mb-4 flex items-center justify-center text-xs text-gray-400">Letterhead Space</div>}

                    <div className="flex justify-between font-bold mb-2 text-red-700 text-xs">
                        <div>Ref: {formData.refNo}<br/>Dis: {formData.disNo}</div>
                        <div>Date: {formData.date}</div>
                    </div>
                    <div className="border-t-2 border-red-700 mb-4"></div>

                    <div className="text-center font-bold underline mb-4 text-black">
                        <p className="text-sm">Date of Birth Verification Certificate</p>
                        <p className="mt-1 text-xs">To Whom It May Concern</p>
                    </div>

                    <p>
                        This is to certify that <strong>{formData.applicantName}</strong> daughter of 
                        <strong> {formData.fatherName}</strong> and <strong>{formData.motherName}</strong> 
                        daughter-in-law of <strong>{formData.fatherInLawName}</strong> and 
                        <strong> {formData.motherInLawName}</strong> wife of <strong>{formData.husbandName}</strong> 
                        permanent resident of <strong>{formData.addressLine}</strong> was born on 
                        <strong> B.S. {formData.dobBS} ({formData.dobAD} A.D.)</strong>.
                    </p>

                    <p className="mt-4">
                        This birth verification certificate is issued in accordance with the Local Government Operation Act...
                    </p>

                    <div className="mt-auto">
                        <div className="flex justify-end mb-2 text-right">
                            <div> 
                                <div className="text-xs text-gray-400 mb-2">.....................................</div>
                                <p className="font-bold text-xs">{formData.signatoryName}</p>
                                <p className="text-xs">{formData.signatoryDesignation}</p>
                            </div>
                        </div>
                        {includeHeader && (
                            <div className="border-t-2 border-red-700 pt-2 text-center text-red-700 font-bold text-[10px]">
                                E-mail: {formData.footerEmail}
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition">Cancel</button>
          <button onClick={generateWordDoc} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95 transition">
            <Download size={16} /> Download .DOC
          </button>
        </div>

        <style jsx>{`
            .input-field { width: 100%; border: 1px solid #d1d5db; padding: 6px; border-radius: 6px; font-size: 12px; }
        `}</style>

      </div>
    </div>
  );
}