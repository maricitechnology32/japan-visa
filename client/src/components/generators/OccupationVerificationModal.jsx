// // // import React, { useState, useEffect } from 'react';
// // // import { X, Download, FileText, UserPen, Plus, Trash2, Briefcase } from 'lucide-react';

// // // export default function OccupationVerificationModal({ isOpen, onClose, student }) {
// // //   if (!isOpen || !student) return null;

// // //   // 1. Initial State
// // //   const [formData, setFormData] = useState({
// // //     refNo: '2082/083',
// // //     disNo: '401',
// // //     date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    
// // //     // Body Variables
// // //     parentName: `Mr. ${student.familyInfo.fatherName || 'Parent Name'}`,
// // //     relation: 'father', // father/mother
// // //     studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
// // //     addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
    
// // //     // Occupation List (Default to empty or pull from Financial Info)
// // //     occupations: [],

// // //     // Signatory
// // //     signatoryName: 'Lob Bahadur Shahi',
// // //     signatoryDesignation: 'Ward Chairperson'
// // //   });

// // //   // Reset/Auto-fill when student changes
// // //   useEffect(() => {
// // //     if(student) {
// // //         // Try to pull occupations from financial info if available, else defaults
// // //         let initialOccupations = student.financialInfo?.incomeSources?.map(src => src.sourceName) || [];
// // //         if (initialOccupations.length === 0) {
// // //             initialOccupations = [
// // //                 "Agriculture Products (Maize & Mustard)",
// // //                 "Animal Husbandry (Goat & Buffalo)",
// // //                 "Vegetable Products (Potato & Cabbage)"
// // //             ];
// // //         }

// // //         setFormData(prev => ({
// // //             ...prev,
// // //             parentName: `Mr. ${student.familyInfo.fatherName}`,
// // //             studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
// // //             addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
// // //             occupations: initialOccupations
// // //         }));
// // //     }
// // //   }, [student]);

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   // --- Dynamic Occupation Handlers ---
// // //   const handleOccupationChange = (index, value) => {
// // //     const updated = [...formData.occupations];
// // //     updated[index] = value;
// // //     setFormData({ ...formData, occupations: updated });
// // //   };

// // //   const addOccupation = () => {
// // //     setFormData({
// // //         ...formData,
// // //         occupations: [...formData.occupations, ""]
// // //     });
// // //   };

// // //   const removeOccupation = (index) => {
// // //     const updated = formData.occupations.filter((_, i) => i !== index);
// // //     setFormData({ ...formData, occupations: updated });
// // //   };

// // //   // 2. Word Document Generator Logic
// // //   const generateWordDoc = () => {
// // //     // Generate Rows HTML
// // //     const tableRows = formData.occupations.map((occ, index) => `
// // //         <tr>
// // //             <td style="padding: 5pt; border: 1pt solid black; text-align: center;">${index + 1}</td>
// // //             <td style="padding: 5pt; border: 1pt solid black;">${occ}</td>
// // //         </tr>
// // //     `).join('');

// // //     const content = `
// // //       <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
// // //       <head>
// // //         <meta charset="utf-8">
// // //         <title>Occupation Verification</title>
// // //         <style>
// // //           body { font-family: 'Times New Roman', serif; font-size: 12pt; }
          
// // //           /* LAYOUT SPACERS */
// // //           .header-space { height: 160pt; } 
// // //           .footer-space { height: 50pt; }
          
// // //           /* CONTENT STYLES */
// // //           p { margin-bottom: 12pt; line-height: 1.5; text-align: justify; }
// // //           .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20pt; font-weight: bold; }
// // //           .meta-left { text-align: left; vertical-align: top; }
// // //           .meta-right { text-align: right; vertical-align: bottom; }
          
// // //           .doc-title { text-align: center; font-size: 16pt; font-weight: bold; text-decoration: underline; text-transform: capitalize; margin-top: 20pt; }
// // //           .doc-subtitle { text-align: center; font-size: 14pt; font-weight: bold; text-decoration: underline; margin-top: 10pt; margin-bottom: 30pt; }

// // //           /* DATA TABLE */
// // //           .data-table { width: 100%; border-collapse: collapse; margin-top: 10pt; margin-bottom: 20pt; }
// // //           .data-table th, .data-table td { border: 1pt solid black; padding: 5pt; text-align: left; vertical-align: middle; }
          
// // //           /* SIGNATURE BLOCK */
// // //           .signature-table { width: 100%; margin-top: 60pt; border: none; }
// // //           .sig-td-left { width: 60%; }
// // //           .sig-td-right { width: 40%; text-align: left; vertical-align: bottom; }
          
// // //           .signatory-name { font-weight: bold; font-size: 12pt; margin: 0; padding-bottom: 5pt; }
// // //           .signatory-title { font-size: 12pt; margin: 0; }
// // //         </style>
// // //       </head>
// // //       <body>
        
// // //         <div class="header-space"></div>

// // //         <table class="meta-table">
// // //           <tr>
// // //             <td class="meta-left">
// // //               Ref. No.: ${formData.refNo}<br>
// // //               Dis. No.: ${formData.disNo}
// // //             </td>
// // //             <td class="meta-right">
// // //               Date: ${formData.date}
// // //             </td>
// // //           </tr>
// // //         </table>

// // //         <div class="doc-title">Occupation Verification Certificate</div>
// // //         <div class="doc-subtitle">To Whom It May Concern</div>

// // //         <p>
// // //           This is to certify that <strong>${formData.parentName}</strong> ${formData.relation} of 
// // //           <strong>${formData.studentName}</strong> the permanent resident of 
// // //           <strong>${formData.addressLine}</strong> is found to be engaged in the following occupations as the means to generate income.
// // //         </p>

// // //         <table class="data-table">
// // //             <thead>
// // //                 <tr style="background-color: #ffffff;">
// // //                     <th style="width: 50px; text-align: center;">S.N.</th>
// // //                     <th>Occupation</th>
// // //                 </tr>
// // //             </thead>
// // //             <tbody>
// // //                 ${tableRows}
// // //             </tbody>
// // //         </table>

// // //         <p>
// // //             Note: According to the Government of Nepal, taxes are exempted for the income from Agriculture. So, it is not necessary to register on PAN. Therefore, <strong>${formData.parentName}</strong> isn’t registered on PAN.
// // //         </p>

// // //         <!-- SIGNATURE BLOCK -->
// // //         <table class="signature-table">
// // //             <tr>
// // //                 <td class="sig-td-left"></td>
// // //                 <td class="sig-td-right">
// // //                     <div style="height: 40pt;">&nbsp;</div>
// // //                     <p class="signatory-name">${formData.signatoryName}</p>
// // //                     <p class="signatory-title">${formData.signatoryDesignation}</p>
// // //                 </td>
// // //             </tr>
// // //         </table>

// // //         <div class="footer-space"></div>

// // //       </body>
// // //       </html>
// // //     `;

// // //     const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
// // //     const url = URL.createObjectURL(blob);
// // //     const link = document.createElement('a');
// // //     link.href = url;
// // //     link.download = `Occupation_Verification_${formData.studentName.replace(/\s+/g, '_')}.doc`;
// // //     document.body.appendChild(link);
// // //     link.click();
// // //     document.body.removeChild(link);
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
// // //       <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh]">
        
// // //         {/* Header */}
// // //         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
// // //           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
// // //             <FileText className="text-green-600" size={20}/> Occupation Verification Generator
// // //           </h3>
// // //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
// // //             <X size={20} />
// // //           </button>
// // //         </div>

// // //         {/* Scrollable Form Body */}
// // //         <div className="p-6 overflow-y-auto">
          
// // //           <div className="flex flex-col lg:flex-row gap-8">
            
// // //             {/* LEFT: EDITABLE FIELDS */}
// // //             <div className="flex-1 space-y-6">
                
// // //                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Verification Details</h4>
                
// // //                 <div>
// // //                     <label className="block text-xs font-semibold text-gray-600 mb-1">Parent Name</label>
// // //                     <input name="parentName" value={formData.parentName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" />
// // //                 </div>
                
// // //                 <div className="grid grid-cols-2 gap-4">
// // //                     <div>
// // //                         <label className="block text-xs font-semibold text-gray-600 mb-1">Relation</label>
// // //                         <select name="relation" value={formData.relation} onChange={handleChange} className="w-full border rounded p-2 text-sm bg-white">
// // //                             <option value="father">father</option>
// // //                             <option value="mother">mother</option>
// // //                         </select>
// // //                     </div>
// // //                 </div>

// // //                 <div>
// // //                     <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
// // //                     <input name="addressLine" value={formData.addressLine} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
// // //                 </div>

// // //                 <div className="bg-green-50 p-4 rounded-lg border border-green-100">
// // //                     <div className="flex justify-between items-center mb-3">
// // //                         <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider">Occupations List</h4>
// // //                         <button onClick={addOccupation} className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded hover:bg-green-300 flex items-center gap-1">
// // //                             <Plus size={12}/> Add Row
// // //                         </button>
// // //                     </div>
                    
// // //                     <div className="space-y-2">
// // //                         {formData.occupations.map((occ, idx) => (
// // //                             <div key={idx} className="flex gap-2">
// // //                                 <div className="w-8 pt-2 text-center text-xs font-bold text-gray-400">{idx + 1}</div>
// // //                                 <input 
// // //                                     value={occ} 
// // //                                     onChange={(e) => handleOccupationChange(idx, e.target.value)}
// // //                                     className="flex-1 border rounded p-2 text-sm"
// // //                                     placeholder="e.g. Agriculture Products"
// // //                                 />
// // //                                 <button onClick={() => removeOccupation(idx)} className="text-red-400 hover:text-red-600 p-2">
// // //                                     <Trash2 size={16}/>
// // //                                 </button>
// // //                             </div>
// // //                         ))}
// // //                     </div>
// // //                 </div>

// // //                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // //                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Signatory</h4>
// // //                     <div className="grid grid-cols-2 gap-4">
// // //                         <div>
// // //                             <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
// // //                             <input name="signatoryName" value={formData.signatoryName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" />
// // //                         </div>
// // //                         <div>
// // //                             <label className="block text-xs font-semibold text-gray-600 mb-1">Designation</label>
// // //                             <input name="signatoryDesignation" value={formData.signatoryDesignation} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //             {/* RIGHT: LIVE PREVIEW */}
// // //             <div className="flex-1 bg-gray-100 rounded-lg p-6 flex justify-center overflow-auto h-[600px]">
// // //                 <div className="bg-white shadow-sm p-8 w-full max-w-[210mm] text-[10px] font-serif leading-relaxed text-justify relative min-h-[297mm]">
                    
// // //                     {/* Header Mockup */}
// // //                     <div className="flex justify-between font-bold mb-4">
// // //                         <div><p>Ref: {formData.refNo}</p><p>Dis: {formData.disNo}</p></div>
// // //                         <p>Date: {formData.date}</p>
// // //                     </div>

// // //                     <div className="text-center font-bold underline mb-4">
// // //                         <p className="text-sm capitalize">Occupation Verification Certificate</p>
// // //                         <p className="mt-2">To Whom It May Concern</p>
// // //                     </div>

// // //                     <p>
// // //                         This is to certify that <strong>{formData.parentName}</strong> {formData.relation} of 
// // //                         <strong> {formData.studentName}</strong> the permanent resident of 
// // //                         <strong> {formData.addressLine}</strong> is found to be engaged in the following occupations as the means to generate income.
// // //                     </p>

// // //                     {/* TABLE PREVIEW */}
// // //                     <table className="w-full border-collapse border border-black mb-4 text-left mt-4">
// // //                         <thead>
// // //                             <tr className="bg-white">
// // //                                 <th className="border border-black p-1 text-center w-8">S.N.</th>
// // //                                 <th className="border border-black p-1">Occupation</th>
// // //                             </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                             {formData.occupations.map((occ, idx) => (
// // //                                 <tr key={idx}>
// // //                                     <td className="border border-black p-1 text-center">{idx + 1}</td>
// // //                                     <td className="border border-black p-1">{occ}</td>
// // //                                 </tr>
// // //                             ))}
// // //                         </tbody>
// // //                     </table>

// // //                     <p className="mt-4 text-justify">
// // //                         Note: According to the Government of Nepal, taxes are exempted for the income from Agriculture. So, it is not necessary to register on PAN. Therefore, <strong>{formData.parentName}</strong> isn’t registered on PAN.
// // //                     </p>

// // //                     {/* SIGNATURE */}
// // //                     <div className="mt-12 flex justify-end">
// // //                         <div className="text-left w-40"> 
// // //                             <div className="h-10"></div> 
// // //                             <p className="font-bold text-xs">{formData.signatoryName}</p>
// // //                             <p className="text-xs">{formData.signatoryDesignation}</p>
// // //                         </div>
// // //                     </div>

// // //                 </div>
// // //             </div>

// // //           </div>
// // //         </div>

// // //         {/* Footer Actions */}
// // //         <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
// // //           <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
// // //             Cancel
// // //           </button>
// // //           <button onClick={generateWordDoc} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95 transition">
// // //             <Download size={16} /> Download .DOC Word File
// // //           </button>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { Download, FileText, Plus, Trash2, X } from 'lucide-react';
// // import { useEffect, useState } from 'react';

// // export default function OccupationVerificationModal({ isOpen, onClose, student }) {
// //   if (!isOpen || !student) return null;

// //   // 1. Initial State
// //   const [formData, setFormData] = useState({
// //     refNo: '2082/083',
// //     disNo: '401',
// //     date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    
// //     // Body Variables
// //     parentName: `Mr. ${student.familyInfo.fatherName || 'Parent Name'}`,
// //     relation: 'father', // father/mother
// //     studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
// //     addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
    
// //     // Occupation List (Default to empty or pull from Financial Info)
// //     occupations: [],

// //     // Signatory
// //     signatoryName: 'Lob Bahadur Shahi',
// //     signatoryDesignation: 'Ward Chairperson'
// //   });

// //   // Reset/Auto-fill when student changes
// //   useEffect(() => {
// //     if(student) {
// //         // Try to pull occupations from financial info if available, else defaults
// //         let initialOccupations = student.financialInfo?.incomeSources?.map(src => src.sourceName) || [];
// //         if (initialOccupations.length === 0) {
// //             initialOccupations = [
// //                 "Agriculture Products (Maize & Mustard)",
// //                 "Animal Husbandry (Goat & Buffalo)",
// //                 "Vegetable Products (Potato & Cabbage)"
// //             ];
// //         }

// //         setFormData(prev => ({
// //             ...prev,
// //             parentName: `Mr. ${student.familyInfo.fatherName}`,
// //             studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
// //             addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
// //             occupations: initialOccupations
// //         }));
// //     }
// //   }, [student]);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // --- Dynamic Occupation Handlers ---
// //   const handleOccupationChange = (index, value) => {
// //     const updated = [...formData.occupations];
// //     updated[index] = value;
// //     setFormData({ ...formData, occupations: updated });
// //   };

// //   const addOccupation = () => {
// //     setFormData({
// //         ...formData,
// //         occupations: [...formData.occupations, ""]
// //     });
// //   };

// //   const removeOccupation = (index) => {
// //     const updated = formData.occupations.filter((_, i) => i !== index);
// //     setFormData({ ...formData, occupations: updated });
// //   };

// //   // 2. Word Document Generator Logic
// //   const generateWordDoc = () => {
// //     // Generate Rows HTML
// //     const tableRows = formData.occupations.map((occ, index) => `
// //         <tr>
// //             <td style="padding: 5pt; border: 1pt solid black; text-align: center;">${index + 1}</td>
// //             <td style="padding: 5pt; border: 1pt solid black;">${occ}</td>
// //         </tr>
// //     `).join('');

// //     const content = `
// //       <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
// //       <head>
// //         <meta charset="utf-8">
// //         <title>Occupation Verification</title>
// //         <style>
// //           body { font-family: 'Times New Roman', serif; font-size: 12pt; }
          
// //           /* LAYOUT SPACERS */
// //           .header-space { height: 160pt; } 
// //           .footer-space { height: 50pt; }
          
// //           /* CONTENT STYLES */
// //           p { margin-bottom: 12pt; line-height: 1.5; text-align: justify; }
// //           .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20pt; font-weight: bold; }
// //           .meta-left { text-align: left; vertical-align: top; }
// //           .meta-right { text-align: right; vertical-align: bottom; }
          
// //           .doc-title { text-align: center; font-size: 16pt; font-weight: bold; text-decoration: underline; text-transform: capitalize; margin-top: 20pt; }
// //           .doc-subtitle { text-align: center; font-size: 14pt; font-weight: bold; text-decoration: underline; margin-top: 10pt; margin-bottom: 30pt; }

// //           /* DATA TABLE */
// //           .data-table { width: 100%; border-collapse: collapse; margin-top: 10pt; margin-bottom: 20pt; }
// //           .data-table th, .data-table td { border: 1pt solid black; padding: 5pt; text-align: left; vertical-align: middle; }
          
// //           /* SIGNATURE BLOCK (Right Aligned) */
// //           .signature-table { width: 100%; margin-top: 60pt; border: none; }
// //           .sig-td-left { width: 60%; }
// //           .sig-td-right { width: 40%; text-align: left; vertical-align: bottom; }
          
// //           .signatory-name { font-weight: bold; font-size: 12pt; margin: 0; padding-bottom: 5pt; }
// //           .signatory-title { font-size: 12pt; margin: 0; }
// //         </style>
// //       </head>
// //       <body>
        
// //         <div class="header-space"></div>

// //         <table class="meta-table">
// //           <tr>
// //             <td class="meta-left">
// //               Ref. No.: ${formData.refNo}<br>
// //               Dis. No.: ${formData.disNo}
// //             </td>
// //             <td class="meta-right">
// //               Date: ${formData.date}
// //             </td>
// //           </tr>
// //         </table>

// //         <div class="doc-title">Occupation Verification Certificate</div>
// //         <div class="doc-subtitle">To Whom It May Concern</div>

// //         <p>
// //           This is to certify that <strong>${formData.parentName}</strong> ${formData.relation} of 
// //           <strong>${formData.studentName}</strong> the permanent resident of 
// //           <strong>${formData.addressLine}</strong> is found to be engaged in the following occupations as the means to generate income.
// //         </p>

// //         <table class="data-table">
// //             <thead>
// //                 <tr style="background-color: #ffffff;">
// //                     <th style="width: 50px; text-align: center;">S.N.</th>
// //                     <th>Occupation</th>
// //                 </tr>
// //             </thead>
// //             <tbody>
// //                 ${tableRows}
// //             </tbody>
// //         </table>

// //         <p>
// //             Note: According to the Government of Nepal, taxes are exempted for the income from Agriculture. So, it is not necessary to register on PAN. Therefore, <strong>${formData.parentName}</strong> isn’t registered on PAN.
// //         </p>

// //         <!-- SIGNATURE BLOCK -->
// //         <table class="signature-table">
// //             <tr>
// //                 <td class="sig-td-left"></td>
// //                 <td class="sig-td-right">
// //                     <div style="height: 40pt;">&nbsp;</div>
// //                     <p class="signatory-name">${formData.signatoryName}</p>
// //                     <p class="signatory-title">${formData.signatoryDesignation}</p>
// //                 </td>
// //             </tr>
// //         </table>

// //         <div class="footer-space"></div>

// //       </body>
// //       </html>
// //     `;

// //     const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement('a');
// //     link.href = url;
// //     link.download = `Occupation_Verification_${formData.studentName.replace(/\s+/g, '_')}.doc`;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
// //       <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh]">
        
// //         {/* Header */}
// //         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
// //           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
// //             <FileText className="text-green-600" size={20}/> Occupation Verification Generator
// //           </h3>
// //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
// //             <X size={20} />
// //           </button>
// //         </div>

// //         {/* Scrollable Form Body */}
// //         <div className="p-6 overflow-y-auto">
          
// //           <div className="flex flex-col lg:flex-row gap-8">
            
// //             {/* LEFT: EDITABLE FIELDS */}
// //             <div className="flex-1 space-y-6">
                
// //                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Verification Details</h4>
                
// //                 <div>
// //                     <label className="block text-xs font-semibold text-gray-600 mb-1">Parent Name</label>
// //                     <input name="parentName" value={formData.parentName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" />
// //                 </div>
                
// //                 <div className="grid grid-cols-2 gap-4">
// //                     <div>
// //                         <label className="block text-xs font-semibold text-gray-600 mb-1">Relation</label>
// //                         <select name="relation" value={formData.relation} onChange={handleChange} className="w-full border rounded p-2 text-sm bg-white">
// //                             <option value="father">father</option>
// //                             <option value="mother">mother</option>
// //                         </select>
// //                     </div>
// //                 </div>

// //                 <div>
// //                     <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
// //                     <input name="addressLine" value={formData.addressLine} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
// //                 </div>

// //                 <div className="bg-green-50 p-4 rounded-lg border border-green-100">
// //                     <div className="flex justify-between items-center mb-3">
// //                         <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider">Occupations List</h4>
// //                         <button onClick={addOccupation} className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded hover:bg-green-300 flex items-center gap-1">
// //                             <Plus size={12}/> Add Row
// //                         </button>
// //                     </div>
                    
// //                     <div className="space-y-2">
// //                         {formData.occupations.map((occ, idx) => (
// //                             <div key={idx} className="flex gap-2">
// //                                 <div className="w-8 pt-2 text-center text-xs font-bold text-gray-400">{idx + 1}</div>
// //                                 <input 
// //                                     value={occ} 
// //                                     onChange={(e) => handleOccupationChange(idx, e.target.value)}
// //                                     className="flex-1 border rounded p-2 text-sm"
// //                                     placeholder="e.g. Agriculture Products"
// //                                 />
// //                                 <button onClick={() => removeOccupation(idx)} className="text-red-400 hover:text-red-600 p-2">
// //                                     <Trash2 size={16}/>
// //                                 </button>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// //                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Signatory</h4>
// //                     <div className="grid grid-cols-2 gap-4">
// //                         <div>
// //                             <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
// //                             <input name="signatoryName" value={formData.signatoryName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" />
// //                         </div>
// //                         <div>
// //                             <label className="block text-xs font-semibold text-gray-600 mb-1">Designation</label>
// //                             <input name="signatoryDesignation" value={formData.signatoryDesignation} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* RIGHT: LIVE PREVIEW */}
// //             <div className="flex-1 bg-gray-100 rounded-lg p-6 flex justify-center overflow-auto h-[600px]">
// //                 <div className="bg-white shadow-sm p-8 w-full max-w-[210mm] text-[10px] font-serif leading-relaxed text-justify relative min-h-[297mm]">
                    
// //                     {/* Header Mockup */}
// //                     <div className="flex justify-between font-bold mb-4">
// //                         <div><p>Ref: {formData.refNo}</p><p>Dis: {formData.disNo}</p></div>
// //                         <p>Date: {formData.date}</p>
// //                     </div>

// //                     <div className="text-center font-bold underline mb-4">
// //                         <p className="text-sm capitalize">Occupation Verification Certificate</p>
// //                         <p className="mt-2">To Whom It May Concern</p>
// //                     </div>

// //                     <p>
// //                         This is to certify that <strong>{formData.parentName}</strong> {formData.relation} of 
// //                         <strong> {formData.studentName}</strong> the permanent resident of 
// //                         <strong> {formData.addressLine}</strong> is found to be engaged in the following occupations as the means to generate income.
// //                     </p>

// //                     {/* TABLE PREVIEW */}
// //                     <table className="w-full border-collapse border border-black mb-4 text-left mt-4">
// //                         <thead>
// //                             <tr className="bg-white">
// //                                 <th className="border border-black p-1 text-center w-8">S.N.</th>
// //                                 <th className="border border-black p-1">Occupation</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {formData.occupations.map((occ, idx) => (
// //                                 <tr key={idx}>
// //                                     <td className="border border-black p-1 text-center">{idx + 1}</td>
// //                                     <td className="border border-black p-1">{occ}</td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>

// //                     <p className="mt-4 text-justify">
// //                         Note: According to the Government of Nepal, taxes are exempted for the income from Agriculture. So, it is not necessary to register on PAN. Therefore, <strong>{formData.parentName}</strong> isn’t registered on PAN.
// //                     </p>

// //                     {/* SIGNATURE */}
// //                     <div className="mt-12 flex justify-end">
// //                         <div className="text-left w-40"> 
// //                             <div className="h-10"></div> 
// //                             <p className="font-bold text-xs">{formData.signatoryName}</p>
// //                             <p className="text-xs">{formData.signatoryDesignation}</p>
// //                         </div>
// //                     </div>
// //                     for int

// //                 </div>
// //             </div>

// //           </div>
// //         </div>

// //         {/* Footer Actions */}
// //         <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
// //           <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
// //             Cancel
// //           </button>
// //           <button onClick={generateWordDoc} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95 transition">
// //             <Download size={16} /> Download .DOC Word File
// //           </button>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// import { Download, FileText, Plus, Trash2, X } from 'lucide-react';
// import { useEffect, useState } from 'react';

// export default function OccupationVerificationModal({ isOpen, onClose, student }) {
//   if (!isOpen || !student) return null;

//   // 1. Initial State
//   const [formData, setFormData] = useState({
//     refNo: '2082/083',
//     disNo: '401',
//     date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    
//     // Body Variables
//     parentName: `Mr. ${student.familyInfo.fatherName || 'Parent Name'}`,
//     relation: 'father', // father/mother
//     studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
//     addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
    
//     // Occupation List (Default to empty or pull from Financial Info)
//     occupations: [],

//     // Signatory
//     signatoryName: 'Lob Bahadur Shahi',
//     signatoryDesignation: 'Ward Chairperson'
//   });

//   // Reset/Auto-fill when student changes
//   useEffect(() => {
//     if(student) {
//         // Try to pull occupations from financial info if available, else defaults
//         let initialOccupations = student.financialInfo?.incomeSources?.map(src => src.sourceName) || [];
//         if (initialOccupations.length === 0) {
//             initialOccupations = [
//                 "Agriculture Products (Maize & Mustard)",
//                 "Animal Husbandry (Goat & Buffalo)",
//                 "Vegetable Products (Potato & Cabbage)"
//             ];
//         }

//         setFormData(prev => ({
//             ...prev,
//             parentName: `Mr. ${student.familyInfo.fatherName}`,
//             studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
//             addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
//             occupations: initialOccupations
//         }));
//     }
//   }, [student]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // --- Dynamic Occupation Handlers ---
//   const handleOccupationChange = (index, value) => {
//     const updated = [...formData.occupations];
//     updated[index] = value;
//     setFormData({ ...formData, occupations: updated });
//   };

//   const addOccupation = () => {
//     setFormData({
//         ...formData,
//         occupations: [...formData.occupations, ""]
//     });
//   };

//   const removeOccupation = (index) => {
//     const updated = formData.occupations.filter((_, i) => i !== index);
//     setFormData({ ...formData, occupations: updated });
//   };

//   // 2. Word Document Generator Logic
//   const generateWordDoc = () => {
//     // Generate Rows HTML
//     const tableRows = formData.occupations.map((occ, index) => `
//         <tr>
//             <td style="padding: 5pt; border: 1pt solid black; text-align: center;">${index + 1}</td>
//             <td style="padding: 5pt; border: 1pt solid black;">${occ}</td>
//         </tr>
//     `).join('');

//     const content = `
//       <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
//       <head>
//         <meta charset="utf-8">
//         <title>Occupation Verification</title>
//         <style>
//           body { font-family: 'Times New Roman', serif; font-size: 12pt; }
          
//           /* LAYOUT SPACERS */
//           .header-space { height: 160pt; } 
//           .footer-space { height: 50pt; }
          
//           /* CONTENT STYLES */
//           p { margin-bottom: 12pt; line-height: 1.5; text-align: justify; }
//           .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20pt; font-weight: bold; }
//           .meta-left { text-align: left; vertical-align: top; }
//           .meta-right { text-align: right; vertical-align: bottom; }
          
//           .doc-title { text-align: center; font-size: 16pt; font-weight: bold; text-decoration: underline; text-transform: capitalize; margin-top: 20pt; }
//           .doc-subtitle { text-align: center; font-size: 14pt; font-weight: bold; text-decoration: underline; margin-top: 10pt; margin-bottom: 30pt; }

//           /* DATA TABLE */
//           .data-table { width: 100%; border-collapse: collapse; margin-top: 10pt; margin-bottom: 20pt; }
//           .data-table th, .data-table td { border: 1pt solid black; padding: 5pt; text-align: left; vertical-align: middle; }
          
//           /* SIGNATURE BLOCK (Right Aligned) */
//           .signature-table { width: 100%; margin-top: 60pt; border: none; }
//           .sig-td-left { width: 60%; }
//           .sig-td-right { width: 40%; text-align: left; vertical-align: bottom; }
          
//           .signatory-name { font-weight: bold; font-size: 12pt; margin: 0; padding-bottom: 5pt; }
//           .signatory-title { font-size: 12pt; margin: 0; }
//         </style>
//       </head>
//       <body>
        
//         <div class="header-space"></div>

        

//         <div class="doc-title">Occupation Verification Certificate</div>
//         <div class="doc-subtitle">To Whom It May Concern</div>

//         <p>
//           This is to certify that <strong>${formData.parentName}</strong> ${formData.relation} of 
//           <strong>${formData.studentName}</strong> the permanent resident of 
//           <strong>${formData.addressLine}</strong> is found to be engaged in the following occupations as the means to generate income.
//         </p>

//         <table class="data-table">
//             <thead>
//                 <tr style="background-color: #ffffff;">
//                     <th style="width: 50px; text-align: center;">S.N.</th>
//                     <th>Occupation</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 ${tableRows}
//             </tbody>
//         </table>

//         <p>
//             Note: According to the Government of Nepal, taxes are exempted for the income from Agriculture. So, it is not necessary to register on PAN. Therefore, <strong>${formData.parentName}</strong> isn’t registered on PAN.
//         </p>

//         <!-- SIGNATURE BLOCK -->
//         <table class="signature-table">
//             <tr>
//                 <td class="sig-td-left"></td>
//                 <td class="sig-td-right">
//                     <div style="height: 40pt;">&nbsp;</div>
//                     <p class="signatory-name">${formData.signatoryName}</p>
//                     <p class="signatory-title">${formData.signatoryDesignation}</p>
//                 </td>
//             </tr>
//         </table>

//         <div class="footer-space"></div>

//       </body>
//       </html>
//     `;

//     const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Occupation_Verification_${formData.studentName.replace(/\s+/g, '_')}.doc`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh]">
        
//         {/* Header */}
//         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
//           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//             <FileText className="text-green-600" size={20}/> Occupation Verification Generator
//           </h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>

//         {/* Scrollable Form Body */}
//         <div className="p-6 overflow-y-auto">
          
//           <div className="flex flex-col lg:flex-row gap-8">
            
//             {/* LEFT: EDITABLE FIELDS */}
//             <div className="flex-1 space-y-6">
                
//                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Verification Details</h4>
                
//                 <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1">Parent Name</label>
//                     <input name="parentName" value={formData.parentName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" />
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-xs font-semibold text-gray-600 mb-1">Relation</label>
//                         <select name="relation" value={formData.relation} onChange={handleChange} className="w-full border rounded p-2 text-sm bg-white">
//                             <option value="father">father</option>
//                             <option value="mother">mother</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
//                     <input name="addressLine" value={formData.addressLine} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
//                 </div>

//                 <div className="bg-green-50 p-4 rounded-lg border border-green-100">
//                     <div className="flex justify-between items-center mb-3">
//                         <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider">Occupations List</h4>
//                         <button onClick={addOccupation} className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded hover:bg-green-300 flex items-center gap-1">
//                             <Plus size={12}/> Add Row
//                         </button>
//                     </div>
                    
//                     <div className="space-y-2">
//                         {formData.occupations.map((occ, idx) => (
//                             <div key={idx} className="flex gap-2">
//                                 <div className="w-8 pt-2 text-center text-xs font-bold text-gray-400">{idx + 1}</div>
//                                 <input 
//                                     value={occ} 
//                                     onChange={(e) => handleOccupationChange(idx, e.target.value)}
//                                     className="flex-1 border rounded p-2 text-sm"
//                                     placeholder="e.g. Agriculture Products"
//                                 />
//                                 <button onClick={() => removeOccupation(idx)} className="text-red-400 hover:text-red-600 p-2">
//                                     <Trash2 size={16}/>
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Signatory</h4>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
//                             <input name="signatoryName" value={formData.signatoryName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" />
//                         </div>
//                         <div>
//                             <label className="block text-xs font-semibold text-gray-600 mb-1">Designation</label>
//                             <input name="signatoryDesignation" value={formData.signatoryDesignation} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* RIGHT: LIVE PREVIEW */}
//             <div className="flex-1 bg-gray-100 rounded-lg p-6 flex justify-center overflow-auto h-[600px]">
//                 <div className="bg-white shadow-sm p-8 w-full max-w-[210mm] text-[10px] font-serif leading-relaxed text-justify relative min-h-[297mm]">
                    
//                     {/* Header Mockup */}
//                     <div className="flex justify-between font-bold mb-4">
//                         <div><p>Ref: {formData.refNo}</p><p>Dis: {formData.disNo}</p></div>
//                         <p>Date: {formData.date}</p>
//                     </div>

//                     <div className="text-center font-bold underline mb-4">
//                         <p className="text-sm capitalize">Occupation Verification Certificate</p>
//                         <p className="mt-2">To Whom It May Concern</p>
//                     </div>

//                     <p>
//                         This is to certify that <strong>{formData.parentName}</strong> {formData.relation} of 
//                         <strong> {formData.studentName}</strong> the permanent resident of 
//                         <strong> {formData.addressLine}</strong> is found to be engaged in the following occupations as the means to generate income.
//                     </p>

//                     {/* TABLE PREVIEW */}
//                     <table className="w-full border-collapse border border-black mb-4 text-left mt-4">
//                         <thead>
//                             <tr className="bg-white">
//                                 <th className="border border-black p-1 text-center w-8">S.N.</th>
//                                 <th className="border border-black p-1">Occupation</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {formData.occupations.map((occ, idx) => (
//                                 <tr key={idx}>
//                                     <td className="border border-black p-1 text-center">{idx + 1}</td>
//                                     <td className="border border-black p-1">{occ}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     <p className="mt-4 text-justify">
//                         Note: According to the Government of Nepal, taxes are exempted for the income from Agriculture. So, it is not necessary to register on PAN. Therefore, <strong>{formData.parentName}</strong> isn’t registered on PAN.
//                     </p>

//                     {/* SIGNATURE */}
//                     <div className="mt-12 flex justify-end">
//                         <div className="text-left w-40"> 
//                             <div className="h-10"></div> 
//                             <p className="font-bold text-xs">{formData.signatoryName}</p>
//                             <p className="text-xs">{formData.signatoryDesignation}</p>
//                         </div>
//                     </div>

//                 </div>
//             </div>

//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
//           <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
//             Cancel
//           </button>
//           <button onClick={generateWordDoc} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95 transition">
//             <Download size={16} /> Download .DOC Word File
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }


import { Download, FileText, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OccupationVerificationModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  // 1. Initial State
  const [formData, setFormData] = useState({
    refNo: '2082/083',
    disNo: '401',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    
    // Body Variables
    parentName: `Mr. ${student.familyInfo.fatherName || 'Parent Name'}`,
    relation: 'father', // father/mother
    studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
    addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
    
    // Occupation List (Default to empty or pull from Financial Info)
    occupations: [],

    // Signatory
    signatoryName: 'Lob Bahadur Shahi',
    signatoryDesignation: 'Ward Chairperson'
  });

  // Reset/Auto-fill when student changes
  useEffect(() => {
    if(student) {
        // Try to pull occupations from financial info if available, else defaults
        let initialOccupations = student.financialInfo?.incomeSources?.map(src => src.sourceName) || [];
        if (initialOccupations.length === 0) {
            initialOccupations = [
                "Agriculture Products (Maize & Mustard)",
                "Animal Husbandry (Goat & Buffalo)",
                "Vegetable Products (Potato & Cabbage)"
            ];
        }

        setFormData(prev => ({
            ...prev,
            parentName: `Mr. ${student.familyInfo.fatherName}`,
            relation: 'father', // Reset to default father
            studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
            addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
            occupations: initialOccupations
        }));
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special Logic: If Relation changes, auto-update Parent Name
    if (name === 'relation') {
        let updatedParentName = formData.parentName;
        
        if (value === 'father') {
            updatedParentName = `Mr. ${student?.familyInfo?.fatherName || ''}`;
        } else if (value === 'mother') {
            updatedParentName = `Mrs. ${student?.familyInfo?.motherName || ''}`;
        }

        setFormData({ 
            ...formData, 
            [name]: value,
            parentName: updatedParentName 
        });
    } else {
        // Normal update for other fields
        setFormData({ ...formData, [name]: value });
    }
  };

  // --- Dynamic Occupation Handlers ---
  const handleOccupationChange = (index, value) => {
    const updated = [...formData.occupations];
    updated[index] = value;
    setFormData({ ...formData, occupations: updated });
  };

  const addOccupation = () => {
    setFormData({
        ...formData,
        occupations: [...formData.occupations, ""]
    });
  };

  const removeOccupation = (index) => {
    const updated = formData.occupations.filter((_, i) => i !== index);
    setFormData({ ...formData, occupations: updated });
  };

  // 2. Word Document Generator Logic
  const generateWordDoc = () => {
    // Generate Rows HTML
    const tableRows = formData.occupations.map((occ, index) => `
        <tr>
            <td style="padding: 5pt; border: 1pt solid black; text-align: center;">${index + 1}</td>
            <td style="padding: 5pt; border: 1pt solid black;">${occ}</td>
        </tr>
    `).join('');

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Occupation Verification</title>
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
          
          /* SIGNATURE BLOCK (Right Aligned) */
          .signature-table { width: 100%; margin-top: 60pt; border: none; }
          .sig-td-left { width: 60%; }
          .sig-td-right { width: 40%; text-align: left; vertical-align: bottom; }
          
          .signatory-name { font-weight: bold; font-size: 12pt; margin: 0; padding-bottom: 5pt; }
          .signatory-title { font-size: 12pt; margin: 0; }
        </style>
      </head>
      <body>
        
        <div class="header-space"></div>

        <table class="meta-table">
          <tr>
            <td class="meta-left">
              Ref. No.: ${formData.refNo}<br>
              Dis. No.: ${formData.disNo}
            </td>
            <td class="meta-right">
              Date: ${formData.date}
            </td>
          </tr>
        </table>

        <div class="doc-title">Occupation Verification Certificate</div>
        <div class="doc-subtitle">To Whom It May Concern</div>

        <p>
          This is to certify that <strong>${formData.parentName}</strong> ${formData.relation} of 
          <strong>${formData.studentName}</strong> the permanent resident of 
          <strong>${formData.addressLine}</strong> is found to be engaged in the following occupations as the means to generate income.
        </p>

        <table class="data-table">
            <thead>
                <tr style="background-color: #ffffff;">
                    <th style="width: 50px; text-align: center;">S.N.</th>
                    <th>Occupation</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>

        <p>
            Note: According to the Government of Nepal, taxes are exempted for the income from Agriculture. So, it is not necessary to register on PAN. Therefore, <strong>${formData.parentName}</strong> isn’t registered on PAN.
        </p>

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
    link.download = `Occupation_Verification_${formData.studentName.replace(/\s+/g, '_')}.doc`;
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
            <FileText className="text-green-600" size={20}/> Occupation Verification Generator
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
                
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Verification Details</h4>
                
                {/* 1. MOVED UP: Relation Selector */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Relation</label>
                        <select name="relation" value={formData.relation} onChange={handleChange} className="w-full border rounded p-2 text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none">
                            <option value="father">father</option>
                            <option value="mother">mother</option>
                        </select>
                    </div>
                </div>

                {/* 2. Parent Name (Auto-updates based on relation) */}
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Parent Name</label>
                    <input name="parentName" value={formData.parentName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
                    <input name="addressLine" value={formData.addressLine} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider">Occupations List</h4>
                        <button onClick={addOccupation} className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded hover:bg-green-300 flex items-center gap-1">
                            <Plus size={12}/> Add Row
                        </button>
                    </div>
                    
                    <div className="space-y-2">
                        {formData.occupations.map((occ, idx) => (
                            <div key={idx} className="flex gap-2">
                                <div className="w-8 pt-2 text-center text-xs font-bold text-gray-400">{idx + 1}</div>
                                <input 
                                    value={occ} 
                                    onChange={(e) => handleOccupationChange(idx, e.target.value)}
                                    className="flex-1 border rounded p-2 text-sm"
                                    placeholder="e.g. Agriculture Products"
                                />
                                <button onClick={() => removeOccupation(idx)} className="text-red-400 hover:text-red-600 p-2">
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
                    
                    {/* Header Mockup */}
                    <div className="flex justify-between font-bold mb-4">
                        <div><p>Ref: {formData.refNo}</p><p>Dis: {formData.disNo}</p></div>
                        <p>Date: {formData.date}</p>
                    </div>

                    <div className="text-center font-bold underline mb-4">
                        <p className="text-sm capitalize">Occupation Verification Certificate</p>
                        <p className="mt-2">To Whom It May Concern</p>
                    </div>

                    <p>
                        This is to certify that <strong>{formData.parentName}</strong> {formData.relation} of 
                        <strong> {formData.studentName}</strong> the permanent resident of 
                        <strong> {formData.addressLine}</strong> is found to be engaged in the following occupations as the means to generate income.
                    </p>

                    {/* TABLE PREVIEW */}
                    <table className="w-full border-collapse border border-black mb-4 text-left mt-4">
                        <thead>
                            <tr className="bg-white">
                                <th className="border border-black p-1 text-center w-8">S.N.</th>
                                <th className="border border-black p-1">Occupation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.occupations.map((occ, idx) => (
                                <tr key={idx}>
                                    <td className="border border-black p-1 text-center">{idx + 1}</td>
                                    <td className="border border-black p-1">{occ}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p className="mt-4 text-justify">
                        Note: According to the Government of Nepal, taxes are exempted for the income from Agriculture. So, it is not necessary to register on PAN. Therefore, <strong>{formData.parentName}</strong> isn’t registered on PAN.
                    </p>

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