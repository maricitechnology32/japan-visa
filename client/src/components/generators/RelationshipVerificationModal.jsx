 

import { Download, FileText, Plus, Trash2, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RelationshipVerificationModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  // 1. Initial State
  const [formData, setFormData] = useState({
     
    
    applicantName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
    addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
    
    signatoryName: 'Lob Bahadur Shahi',
    signatoryDesignation: 'Ward Chairperson',

    // Dynamic Relatives List
    relatives: []
  });

  // State to track which relative type is selected for the first row
  const [primaryRelativeType, setPrimaryRelativeType] = useState('father');

  // Reset/Auto-fill when student changes
  useEffect(() => {
    if(student) {
        populateData('father'); // Default to Father
    }
  }, [student]);

  // Helper to populate data based on selection
  const populateData = (type) => {
    setPrimaryRelativeType(type);
    
    const applicantFullName = `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`;
    const initialRelatives = [];

    // 1. Logic for Primary Relative (First Row)
    if (type === 'father') {
        initialRelatives.push({
            name: `Mr. ${student.familyInfo.fatherName || ''}`,
            relation: "Applicant's Father",
            photoUrl: '' 
        });
    } else if (type === 'mother') {
        initialRelatives.push({
            name: `Mrs. ${student.familyInfo.motherName || ''}`,
            relation: "Applicant's Mother",
            photoUrl: '' 
        });
    } else if (type === 'spouse') {
        initialRelatives.push({
            name: `Mrs./Mr. ${student.familyInfo.spouseName || ''}`,
            relation: "Applicant's Spouse",
            photoUrl: '' 
        });
    } else {
        // Custom/Other
        initialRelatives.push({
            name: '',
            relation: '',
            photoUrl: '' 
        });
    }

    // 2. Applicant (Always included as Second Row)
    initialRelatives.push({
        name: applicantFullName,
        relation: "Applicant",
        photoUrl: student.personalInfo.photoUrl || ''
    });

    setFormData(prev => ({
        ...prev,
        applicantName: applicantFullName,
        addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
        relatives: initialRelatives
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Dynamic Relative Handlers ---
  const handleRelativeChange = (index, field, value) => {
    const updatedRelatives = [...formData.relatives];
    updatedRelatives[index][field] = value;
    setFormData({ ...formData, relatives: updatedRelatives });
  };

  const addRelative = () => {
    setFormData({
        ...formData,
        relatives: [...formData.relatives, { name: '', relation: '', photoUrl: '' }]
    });
  };

  const removeRelative = (index) => {
    const updatedRelatives = formData.relatives.filter((_, i) => i !== index);
    setFormData({ ...formData, relatives: updatedRelatives });
  };

  // 2. Word Document Generator Logic
  const generateWordDoc = () => {
    // Generate Rows HTML
    const tableRows = formData.relatives.map((rel, index) => `
        <tr>
            <td style="padding: 5pt; border: 1pt solid black; text-align: center;">${index + 1}</td>
            <td style="padding: 5pt; border: 1pt solid black;">${rel.name}</td>
            <td style="padding: 5pt; border: 1pt solid black;">${rel.relation}</td>
        </tr>
    `).join('');

    // Generate Photo Grid HTML (FOR WORD DOC)
    // We use table cells <td> to ensure they stay in one row
    const photoCells = formData.relatives.map(rel => `
        <td style="text-align: center; vertical-align: top; padding: 10pt;">
            <!-- The Empty Photo Box -->
            <div style="width: 100pt; height: 120pt; border: 1pt solid black; margin: 0 auto; display: block;"></div>
            <!-- Caption -->
            <div style="margin-top: 5pt; font-weight: bold; font-size: 10pt;">${rel.name}</div>
            <div style="font-size: 10pt;">(${rel.relation})</div>
        </td>
    `).join('');

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Relationship Verification</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; }
          
          /* LAYOUT SPACERS */
          .header-space { height: 160pt; } 
          .footer-space { height: 50pt; }
          
          /* CONTENT STYLES */
          p { margin-bottom: 12pt; line-height: 1.5; text-align: justify; }
          .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20pt; font-weight: bold; }
          .meta-left { text-align: left; vertical-align: top; }
          .meta-right { text-align: right; vertical-align: bottom; }
          
          .doc-title { text-align: center; font-size: 16pt; font-weight: bold; text-decoration: underline; text-transform: capitalize; margin-top: 20pt; }
          .doc-subtitle { text-align: center; font-size: 14pt; font-weight: bold; text-decoration: underline; margin-top: 10pt; margin-bottom: 30pt; }

          /* DATA TABLE */
          .data-table { width: 100%; border-collapse: collapse; margin-top: 10pt; margin-bottom: 20pt; }
          .data-table th, .data-table td { border: 1pt solid black; padding: 5pt; text-align: left; vertical-align: middle; }
          
          /* PHOTO TABLE (Ensures horizontal layout) */
          .photo-table { width: 100%; border: none; margin-top: 10pt; page-break-inside: avoid; }
          
          /* SIGNATURE BLOCK */
          .signature-table { width: 100%; margin-top: 40pt; border: none; }
          .sig-td-left { width: 60%; }
          .sig-td-right { width: 40%; text-align: left; vertical-align: bottom; }
          
          .signatory-name { font-weight: bold; font-size: 12pt; margin: 0; padding-bottom: 5pt; }
          .signatory-title { font-size: 12pt; margin: 0; }
        </style>
      </head>
      <body>
        
        <div class="header-space"></div>

        <table class="meta-table">
          
        </table>

        <div class="doc-title">Relationship Verification Certificate</div>
        <div class="doc-subtitle">To Whom It May Concern</div>

        <p>
          This is to certify that <strong>${formData.applicantName}</strong> a permanent resident of 
          <strong>${formData.addressLine}</strong> has the following relationship with the following family members.
        </p>
        <p>
          This relationship verification certificate is issued in accordance with the Local Government Operation Act 
          B.S. 2074 (2017 A.D.) Chapter 3, Section 12, Sub-section 2, Clause E (1).
        </p>

        <!-- RELATIONSHIP TABLE -->
        <table class="data-table">
            <thead>
                <tr style="background-color: #f0f0f0;">
                    <th style="width: 50px; text-align: center;">S.N.</th>
                    <th>Name</th>
                    <th>Relationship</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>

        <p>The photographs of the persons mentioned above are attached below.</p>

        <!-- PHOTO GRID (TABLE LAYOUT FOR WORD) -->
        <table class="photo-table">
            <tr>
                ${photoCells}
            </tr>
        </table>

        <!-- SIGNATURE BLOCK -->
        <table class="signature-table">
            <tr>
                <td class="sig-td-left"></td>
                <td class="sig-td-right">
                    <div style="height: 40pt;">&nbsp;</div>
                    <p class="signatory-name">${formData.signatoryName}</p>
                    <p class="signatory-title">${formData.signatoryDesignation}</p>
                </td>
            </tr>
        </table>

        <div class="footer-space"></div>

      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Relationship_Verification_${formData.applicantName.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-green-600" size={20}/> Relationship Verification Generator
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto">
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT: EDITABLE FIELDS */}
            <div className="flex-1 space-y-6">
                
                {/* 1. Primary Relative Selection */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Users size={14}/> Select Primary Guardian
                    </h4>
                    <div className="flex gap-2">
                        {['father', 'mother', 'spouse', 'other'].map((type) => (
                            <button 
                                key={type}
                                onClick={() => populateData(type)}
                                className={`flex-1 py-1.5 text-xs font-medium rounded border transition-colors capitalize
                                    ${primaryRelativeType === type 
                                        ? 'bg-green-600 text-white border-green-600' 
                                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Permanent Address</label>
                        <input name="addressLine" value={formData.addressLine} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Members Table</h4>
                        <button onClick={addRelative} className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-50 flex items-center gap-1">
                            <Plus size={12}/> Add Row
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {formData.relatives.map((rel, idx) => (
                            <div key={idx} className="flex gap-2 items-start bg-white p-2 rounded border border-gray-200 shadow-sm relative">
                                <div className="w-6 pt-2 text-center text-xs font-bold text-gray-400">{idx + 1}</div>
                                <div className="flex-1 space-y-2">
                                    <div>
                                        <label className="text-[10px] text-gray-500 uppercase font-bold">Name</label>
                                        <input 
                                            placeholder="Full Name" 
                                            value={rel.name} 
                                            onChange={(e) => handleRelativeChange(idx, 'name', e.target.value)}
                                            className="w-full border rounded p-1.5 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-gray-500 uppercase font-bold">Relationship</label>
                                        <input 
                                            placeholder="e.g. Applicant's Father" 
                                            value={rel.relation} 
                                            onChange={(e) => handleRelativeChange(idx, 'relation', e.target.value)}
                                            className="w-full border rounded p-1.5 text-sm"
                                        />
                                    </div>
                                </div>
                                <button onClick={() => removeRelative(idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
                                    <Trash2 size={16}/>
                                </button>
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

            {/* RIGHT: LIVE PREVIEW */}
            <div className="flex-1 bg-gray-100 rounded-lg p-6 flex justify-center overflow-auto h-[600px]">
                <div className="bg-white shadow-sm p-8 w-full max-w-[210mm] text-[10px] font-serif leading-relaxed text-justify relative min-h-[297mm]">
                    
                     

                    <div className="text-center font-bold underline mb-4">
                        <p className="text-sm capitalize">Relationship Verification Certificate</p>
                        <p className="mt-2">To Whom It May Concern</p>
                    </div>

                    <p>
                        This is to certify that <strong>{formData.applicantName}</strong> a permanent resident of 
                        <strong> {formData.addressLine}</strong> has the following relationship with the following family members.
                    </p>
                    <p className="mt-2 mb-4">
                        This relationship verification certificate is issued in accordance with the Local Government Operation Act...
                    </p>

                    {/* TABLE PREVIEW */}
                    <table className="w-full border-collapse border border-black mb-4 text-left">
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

                    <p className="mb-4">The photographs of the persons mentioned above are attached below.</p>

                    {/* PHOTO GRID PREVIEW (EMPTY BOXES) */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        {formData.relatives.map((rel, idx) => (
                            <div key={idx} className="text-center w-28">
                                <div className="h-32 w-24 mx-auto border border-black bg-white mb-1">
                                    {/* Empty box for physical photo */}
                                </div>
                                <p className="font-bold leading-tight">{rel.name}</p>
                                <p className="text-[9px] text-gray-500">({rel.relation})</p>
                            </div>
                        ))}
                    </div>

                    {/* SIGNATURE */}
                    <div className="mt-12 flex justify-end">
                        <div className="text-left w-40"> 
                            <div className="h-10"></div> 
                            <p className="font-bold text-xs">{formData.signatoryName}</p>
                            <p className="text-xs">{formData.signatoryDesignation}</p>
                        </div>
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