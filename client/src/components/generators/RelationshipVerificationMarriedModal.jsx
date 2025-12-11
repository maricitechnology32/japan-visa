

import { Download, LayoutTemplate, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RelationshipVerificationMarriedModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  // 1. Initial State
  const [formData, setFormData] = useState({
    // Dynamic Header Defaults
    municipalityName: 'Bheemdta Municipality',
    wardInfo: '10 No. Ward Office',
    localPlace: 'Jimuwa, Kanchanpur',
    provinceInfo: 'Sudurpashchim Province, Nepal',
    emailPhone: 'E-mail: bhi.na.pa.10jimuwa@gmail.com',
    
    refNo: '2082/083',
    disNo: '323',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    
    applicantName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
    addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
    
    signatoryName: 'Mahesh Chand',
    signatoryDesignation: 'Ward Chairperson',

    relatives: []
  });

  const [includeHeader, setIncludeHeader] = useState(true);

  // Reset/Auto-fill when student changes
  useEffect(() => {
    if(student) {
        const applicantFullName = `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`;
        
        const initialRelatives = [
            { name: `Mr. ${student.familyInfo.fatherName || ''}`, relation: "Applicant's Father" },
            { name: `Mrs. ${student.familyInfo.motherName || ''}`, relation: "Applicant's Mother" },
            { name: applicantFullName, relation: "Applicant" },
            { name: `Mr. ${student.familyInfo.fatherInLawName || ''}`, relation: "Father-in-Law" },
            { name: `Mrs. ${student.familyInfo.motherInLawName || ''}`, relation: "Mother-in-Law" },
            { name: `Mr./Mrs. ${student.familyInfo.spouseName || ''}`, relation: "Applicant's Husband/Wife" }
        ];

        setFormData(prev => ({
            ...prev,
            applicantName: applicantFullName,
            addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
            relatives: initialRelatives
        }));
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRelativeChange = (index, value) => {
    const updatedRelatives = [...formData.relatives];
    updatedRelatives[index].name = value;
    setFormData({ ...formData, relatives: updatedRelatives });
  };

  // 2. Word Document Generator Logic (Single Page Optimized)
  const generateWordDoc = () => {
     
   const tableRows = formData.relatives.map((rel, index) => `
    <tr style="line-height: 8pt; height: 12pt;">
        <td style="border: 1pt solid black; padding: 0; text-align: center; width: 8%; height: 12pt;">${index + 1}</td>
        <td style="border: 1pt solid black; padding: 0 2pt; width: 52%; height: 12pt;">${rel.name}</td>
        <td style="border: 1pt solid black; padding: 0 2pt; width: 40%; height: 12pt;">${rel.relation}</td>
    </tr>
`).join('');



    // Generate Photo Grid Cells
    const photoCells = formData.relatives.map(rel => `
        <td style="text-align: center; vertical-align: top; padding: 5pt 2pt; width: 33%;">
            <div style="width: 80pt; height: 90pt; border: 1pt solid #000; margin: 0 auto; display: block;"></div>
            <div style="margin-top: 2pt; font-weight: bold; font-size: 9pt;">${rel.name}</div>
            <div style="font-size: 8pt;">(${rel.relation})</div>
        </td>
    `);

    // Split photos into 2 rows of 3
    const photoRows = [];
    for (let i = 0; i < photoCells.length; i += 3) {
        photoRows.push(`<tr>${photoCells.slice(i, i + 3).join('')}</tr>`);
    }

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Relationship Verification (Married)</title>
        <style>
          /* PAGE MARGINS: Tightened to fit everything on one page */
          @page {
            size: A4;
            margin: 0.4in 0.6in 0.4in 0.6in; 
          }
          
          body { 
            font-family: 'Times New Roman', serif; 
            font-size: 11pt;
            line-height: 1.1; /* Tighter line height */
          }
          
          /* HEADER STYLES */
          .header-container { text-align: center; color: #C00000; margin-bottom: 5pt; }
          .muni-name { font-size: 18pt; font-weight: bold; margin: 0; }
          .ward-info { font-size: 12pt; font-weight: bold; margin: 0; }
          
          /* LAYOUT TABLES */
          .meta-table { width: 100%; border-collapse: collapse; margin-top: 5pt; margin-bottom: 5pt; font-weight: bold; color: #C00000; }
          .meta-table td { vertical-align: bottom; }
          
          .doc-title { text-align: center; font-size: 14pt; font-weight: bold; text-decoration: underline; margin-top: 5pt; color: #000; }
          .doc-subtitle { text-align: center; font-size: 12pt; font-weight: bold; text-decoration: underline; margin-bottom: 10pt; color: #000; }
          
          p { margin: 3pt 0; text-align: justify; }

          /* DATA TABLE - Dynamic Height, Minimal Padding */
          .data-table { width: 100%; border-collapse: collapse; margin-bottom: 8pt; font-size: 11pt; }
          .data-table td, .data-table th { border: 1pt solid black; padding: 2pt 4pt; vertical-align: middle; }
          
          /* PHOTO TABLE */
          .photo-table { width: 100%; border: none; margin-top: 0pt; border-collapse: collapse; }
          
          /* FOOTER / SIGNATURE */
          .signature-section { margin-top: 15pt; text-align: right; }
          .footer-line { border-top: 1pt solid #C00000; margin-top: 5pt; padding-top: 2pt; text-align: center; color: #C00000; font-size: 9pt; font-weight: bold; }
        </style>
      </head>
      <body>
        
        ${includeHeader ? `
        <div class="header-container">
            <div class="muni-name">${formData.municipalityName}</div>
            <div class="ward-info">${formData.wardInfo}</div>
            <div class="ward-info">${formData.localPlace}</div>
            <div class="ward-info">${formData.provinceInfo}</div>
        </div>
        ` : `<div style="height: 120pt;"></div> `}

        <table class="meta-table">
            <tr>
                <td style="text-align: left;">
                    Ref. No.: ${formData.refNo}<br>
                    Dis. No.: ${formData.disNo}
                </td>
                <td style="text-align: right;">
                    Date: ${formData.date}
                </td>
            </tr>
        </table>

        <div class="doc-title">Relationship Verification Certificate</div>
        <div class="doc-subtitle">To Whom It May Concern</div>

        <p>
            This is to certify that <strong>${formData.applicantName}</strong> the permanent resident of 
            <strong>${formData.addressLine}</strong> has the following relationship with the following family members.
        </p>
        <p>
            This relationship verification certificate is issued in accordance with the Local Government Operation 
            Act B.S. 2074 (2017 A.D.), Chapter 3, Section 12, Sub-section 2, Clause E (1).
        </p>

        <table class="data-table">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="width: 8%; text-align: center;">S.N.</th>
                    <th style="width: 52%;">Name</th>
                    <th style="width: 40%;">Relationship</th>
                </tr>
            </thead>
            <tbody>${tableRows}</tbody>
        </table>

        <p style="font-size: 10pt; margin-bottom: 5pt;">The photographs of the persons mentioned above are attached below.</p>

        <table class="photo-table">
            ${photoRows.join('')}
        </table>

        <div class="signature-section">
            <p style="margin: 0;">.........................................</p>
            <p style="margin: 2pt 0 0 0; font-weight: bold;">${formData.signatoryName}</p>
            <p style="margin: 0;">${formData.signatoryDesignation}</p>
        </div>

        ${includeHeader ? `
        <div class="footer-line">
            ${formData.emailPhone}
        </div>
        ` : ''}

      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Relationship_Married_${formData.applicantName.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-green-600" size={20}/> Relationship Verification (Married)
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col xl:flex-row gap-8">
            
            {/* LEFT COLUMN: EDITABLE FIELDS */}
            <div className="flex-1 space-y-6">
                
                {/* Header Toggle & Config */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2">
                            <LayoutTemplate size={14}/> Header Settings
                        </h4>
                        <label className="flex items-center gap-2 text-xs font-bold text-blue-800 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={includeHeader} 
                                onChange={(e) => setIncludeHeader(e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            Include Header/Footer
                        </label>
                    </div>
                    
                    {includeHeader && (
                        <div className="grid grid-cols-1 gap-3 animate-in slide-in-from-top-2">
                            <input name="municipalityName" value={formData.municipalityName} onChange={handleChange} className="border p-1.5 rounded text-xs w-full font-bold" placeholder="Municipality Name" />
                            <div className="grid grid-cols-2 gap-2">
                                <input name="wardInfo" value={formData.wardInfo} onChange={handleChange} className="border p-1.5 rounded text-xs" placeholder="Ward Info" />
                                <input name="localPlace" value={formData.localPlace} onChange={handleChange} className="border p-1.5 rounded text-xs" placeholder="Place" />
                            </div>
                            <input name="provinceInfo" value={formData.provinceInfo} onChange={handleChange} className="border p-1.5 rounded text-xs w-full" placeholder="Province Info" />
                            <input name="emailPhone" value={formData.emailPhone} onChange={handleChange} className="border p-1.5 rounded text-xs w-full" placeholder="Footer Contact" />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Permanent Address</label>
                        <input name="addressLine" value={formData.addressLine} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
                    </div>
                </div>

                {/* Family Members Table (Editable) */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Family Members (Max 6 for One Page)</h4>
                    </div>
                    
                    <div className="space-y-2">
                        {formData.relatives.map((rel, idx) => (
                            <div key={idx} className="flex gap-2 items-center bg-white p-2 rounded border border-gray-200 shadow-sm">
                                <div className="w-6 text-center text-xs font-bold text-gray-400">{idx + 1}</div>
                                <div className="flex-1 grid grid-cols-2 gap-2">
                                    <input 
                                        value={rel.name} 
                                        onChange={(e) => handleRelativeChange(idx, e.target.value)}
                                        className="w-full border rounded p-1.5 text-sm font-semibold"
                                        placeholder="Name"
                                    />
                                    <div className="text-sm text-gray-500 p-1.5 bg-gray-50 rounded border border-transparent">{rel.relation}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Signatory</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
                            <input name="signatoryName" value={formData.signatoryName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Designation</label>
                            <input name="signatoryDesignation" value={formData.signatoryDesignation} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: PREVIEW */}
            <div className="flex-1 bg-gray-100 rounded-lg p-6 flex justify-center overflow-auto h-[700px]">
                <div className="bg-white shadow-sm p-8 w-full max-w-[210mm] text-[10px] font-serif leading-relaxed text-justify relative min-h-[297mm] flex flex-col">
                    
                    {/* Header Preview */}
                    {includeHeader ? (
                        <div className="text-center text-red-700 mb-2 leading-tight">
                            <h2 className="text-xl font-bold">{formData.municipalityName}</h2>
                            <h3 className="font-bold text-sm">{formData.wardInfo}</h3>
                            <h3 className="font-bold text-sm">{formData.localPlace}, {formData.provinceInfo}</h3>
                        </div>
                    ) : (
                        <div className="h-24 bg-gray-50 border border-dashed border-gray-300 mb-4 flex items-center justify-center text-gray-400 text-xs">
                            (Letterhead Space)
                        </div>
                    )}

                    <div className="flex justify-between font-bold mb-2 text-red-700 text-xs">
                        <div><p>Ref: {formData.refNo}</p><p>Dis: {formData.disNo}</p></div>
                        <p>Date: {formData.date}</p>
                    </div>

                    <div className="text-center font-bold underline mb-4 text-black">
                        <p className="text-sm">Relationship Verification Certificate</p>
                        <p className="mt-1 text-xs">To Whom It May Concern</p>
                    </div>

                    <p>
                        This is to certify that <strong>{formData.applicantName}</strong> the permanent resident of 
                        <strong> {formData.addressLine}</strong> has the following relationship with the following family members.
                    </p>

                    {/* Table Preview */}
                    <table className="w-full border-collapse border border-black mb-2 text-left">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="border border-black p-1 text-center w-8">S.N.</th>
                                <th className="border border-black p-1">Name</th>
                                <th className="border border-black p-1">Relationship</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.relatives.map((rel, idx) => (
                                <tr key={idx}>
                                    <td className="border border-black p-1 text-center">{idx + 1}</td>
                                    <td className="border border-black p-1 font-bold">{rel.name}</td>
                                    <td className="border border-black p-1">{rel.relation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p className="mb-2">The photographs of the persons mentioned above are attached below.</p>

                    {/* Photo Grid Preview */}
                    <div className="grid grid-cols-3 gap-2 justify-center mb-4">
                        {formData.relatives.map((rel, idx) => (
                            <div key={idx} className="text-center">
                                <div className="h-20 w-16 mx-auto border border-black bg-gray-50 mb-1"></div>
                                <p className="font-bold leading-tight text-[9px]">{rel.name}</p>
                                <p className="text-[8px] text-gray-500">({rel.relation})</p>
                            </div>
                        ))}
                    </div>

                    {/* Signature & Footer */}
                    <div className="mt-auto">
                        <div className="flex justify-end mb-2">
                            <div className="text-center w-40"> 
                                <p className="font-bold text-xs">{formData.signatoryName}</p>
                                <p className="text-xs">{formData.signatoryDesignation}</p>
                            </div>
                        </div>
                        {includeHeader && (
                            <div className="border-t-2 border-red-700 pt-2 text-center text-red-700 font-bold text-[9px]">
                                {formData.emailPhone}
                            </div>
                        )}
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
          <button onClick={generateWordDoc} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95 transition">
            <Download size={16} /> Download .DOC Word File
          </button>
        </div>

      </div>
    </div>
  );
}