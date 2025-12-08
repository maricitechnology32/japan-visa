// import React, { useState, useEffect } from 'react';
// import { X, Download, FileText, UserPen, Plus, Trash2, DollarSign } from 'lucide-react';

// export default function TaxClearanceVerificationModal({ isOpen, onClose, student }) {
//   if (!isOpen || !student) return null;

//   const formatCurrency = (num) => {
//     return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num || 0);
//   };

//   // 1. Initial State
//   const [formData, setFormData] = useState({
//     refNo: '2082/083',
//     disNo: '403',
//     date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    
//     parentName: `Mr. ${student.familyInfo.fatherName || 'Parent Name'}`,
//     relation: 'father', 
//     studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
//     addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
    
//     fiscalYears: ["2022/2023 A.D.", "2023/2024 A.D.", "2024/2025 A.D."],
    
//     // Income Sources (Dynamic Rows)
//     incomeData: [],

//     // Signatory
//     signatoryName: 'Lob Bahadur Shahi',
//     signatoryDesignation: 'Ward Chairperson'
//   });

//   const [totals, setTotals] = useState({
//     totalNPR: [0, 0, 0]
//   });

//   useEffect(() => {
//     if(student) {
//         let initialIncomeData = student.financialInfo?.incomeSources?.map(src => ({
//             source: src.sourceName,
//             amount1: src.amounts[0] || 0,
//             amount2: src.amounts[1] || 0,
//             amount3: src.amounts[2] || 0,
//             tax: "Nil",
//             status: "Tax Cleared"
//         })) || [];

//         if (initialIncomeData.length === 0) {
//             initialIncomeData = [
//                 { source: "Agriculture Products (Maize & Mustard)", amount1: 958000, amount2: 973000, amount3: 995500, tax: "Nil", status: "Tax Cleared" },
//                 { source: "Animal Husbandry (Goat & Buffalo)", amount1: 675000, amount2: 712500, amount3: 857000, tax: "Nil", status: "Tax Cleared" },
//                 { source: "Vegetable Products (Potato & Cabbage)", amount1: 764600, amount2: 845500, amount3: 947000, tax: "Nil", status: "Tax Cleared" }
//             ];
//         }

//         setFormData(prev => ({
//             ...prev,
//             parentName: `Mr. ${student.familyInfo.fatherName}`,
//             relation: 'father', 
//             studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
//             addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
//             incomeData: initialIncomeData
//         }));
//     }
//   }, [student]);

//   useEffect(() => {
//     const sum1 = formData.incomeData.reduce((acc, row) => acc + Number(row.amount1 || 0), 0);
//     const sum2 = formData.incomeData.reduce((acc, row) => acc + Number(row.amount2 || 0), 0);
//     const sum3 = formData.incomeData.reduce((acc, row) => acc + Number(row.amount3 || 0), 0);

//     setTotals({
//         totalNPR: [sum1, sum2, sum3]
//     });
//   }, [formData.incomeData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleIncomeChange = (index, field, value) => {
//     const updated = [...formData.incomeData];
//     updated[index][field] = value;
//     setFormData({ ...formData, incomeData: updated });
//   };

//   const generateWordDoc = () => {
//     const tableRows = formData.incomeData.map((row, index) => `
//         <tr>
//             <td style="padding: 3pt; border: 1pt solid black; text-align: center;">${index + 1}</td>
//             <td style="padding: 3pt; border: 1pt solid black;">${row.source}</td>
//             <td style="padding: 3pt; border: 1pt solid black; text-align: right;">${formatCurrency(row.amount1)}</td>
//             <td style="padding: 3pt; border: 1pt solid black; text-align: right;">${formatCurrency(row.amount2)}</td>
//             <td style="padding: 3pt; border: 1pt solid black; text-align: right;">${formatCurrency(row.amount3)}</td>
//         </tr>
//     `).join('');

//     const content = `
//       <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
//       <head>
//         <meta charset="utf-8">
//         <title>Tax Clearance Verification</title>
//         <style>
//           body { font-family: 'Times New Roman', serif; font-size: 12pt; margin: 0; } 
//           .header-space { height: 140pt; } 
//           .footer-space { height: 40pt; }
//           p { margin-bottom: 10pt; line-height: 1.4; text-align: justify; }
//           .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 15pt; font-weight: bold; font-size: 11pt; }
//           .meta-left { text-align: left; vertical-align: top; }
//           .meta-right { text-align: right; vertical-align: bottom; }
//           .doc-title { text-align: center; font-size: 16pt; font-weight: bold; text-decoration: underline; text-transform: capitalize; margin-top: 10pt; }
//           .doc-subtitle { text-align: center; font-size: 14pt; font-weight: bold; text-decoration: underline; margin-top: 8pt; margin-bottom: 25pt; }
//           .data-table { width: 100%; border-collapse: collapse; margin-top: 5pt; margin-bottom: 15pt; font-size: 10pt; }
//           .data-table th, .data-table td { border: 1pt solid black; padding: 3pt; }
//           .data-table th { text-align: center; font-weight: bold; background-color: #ffffff; vertical-align: middle; }
//           .signature-table { width: 100%; margin-top: 50pt; border: none; }
//           .sig-td-left { width: 60%; }
//           .sig-td-right { width: 40%; text-align: left; vertical-align: bottom; }
//           .signatory-name { font-weight: bold; font-size: 12pt; margin: 0; padding-bottom: 4pt; }
//           .signatory-title { font-size: 12pt; margin: 0; }
//         </style>
//       </head>
//       <body>
//         <div class="header-space"></div>
//         <table class="meta-table">
//           <tr>
//             <td class="meta-left">Ref. No.: ${formData.refNo}<br>Dis. No.: ${formData.disNo}</td>
//             <td class="meta-right">Date: ${formData.date}</td>
//           </tr>
//         </table>
//         <div class="doc-title">Tax Clearance Verification Certificate</div>
//         <div class="doc-subtitle">To Whom It May Concern</div>
//         <p>
//           This is to certify that <strong>${formData.parentName}</strong> father of 
//           <strong>${formData.studentName}</strong> the permanent resident of 
//           <strong>${formData.addressLine}</strong> has been regularly paying all the government taxes up to fiscal year ${formData.fiscalYears[2]} as per government rules and regulation. 
//           The tax status is given below:
//         </p>
        
//         <div style="text-align: center; font-weight: bold; margin-bottom: 5pt; text-decoration: underline;">Annual Income Per Mentioned Fiscal Year In NPR</div>

//         <table class="data-table">
//             <thead>
//                 <tr>
//                     <th rowspan="2" style="width: 40px;">S.N.</th>
//                     <th rowspan="2">Income Headings</th>
//                     <th>${formData.fiscalYears[0]}</th>
//                     <th>${formData.fiscalYears[1]}</th>
//                     <th>${formData.fiscalYears[2]}</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 ${tableRows}
//                 <tr style="font-weight: bold;">
//                     <td colspan="2" style="text-align: right;">Total Amount (NPR)</td>
//                     <td style="text-align: right;">${formatCurrency(totals.totalNPR[0])}</td>
//                     <td style="text-align: right;">${formatCurrency(totals.totalNPR[1])}</td>
//                     <td style="text-align: right;">${formatCurrency(totals.totalNPR[2])}</td>
//                 </tr>
//                 <tr>
//                     <td colspan="2" style="text-align: right; font-weight: bold;">Tax Amount</td>
//                     <td style="text-align: right;">Nil</td>
//                     <td style="text-align: right;">Nil</td>
//                     <td style="text-align: right;">Nil</td>
//                 </tr>
//                 <tr>
//                     <td colspan="2" style="text-align: right; font-weight: bold;">Income after Tax</td>
//                     <td style="text-align: right;">${formatCurrency(totals.totalNPR[0])}</td>
//                     <td style="text-align: right;">${formatCurrency(totals.totalNPR[1])}</td>
//                     <td style="text-align: right;">${formatCurrency(totals.totalNPR[2])}</td>
//                 </tr>
//                 <tr>
//                     <td colspan="2" style="text-align: right; font-weight: bold;">Status</td>
//                     <td style="text-align: right;">Tax Cleared</td>
//                     <td style="text-align: right;">Tax Cleared</td>
//                     <td style="text-align: right;">Tax Cleared</td>
//                 </tr>
//             </tbody>
//         </table>

//         <p style="font-size: 11pt;">
//             Note: We also state that Government Tax is exemptions for agriculture income according to the Income Tax
//             Act 2058 B.S. (2002 A.D.), Chapter 4 (11) (1). (Source: www.lawcommission.gov.np, www.ird.gov.np).
//             Therefore, no tax has been issued for their agriculture income.
//         </p>

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
//     link.download = `Tax_Clearance_${formData.studentName.replace(/\s+/g, '_')}.doc`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[95vh]">
//         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
//           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//             <FileText className="text-green-600" size={20}/> Tax Clearance Generator
//           </h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
//         </div>
//         <div className="p-6 overflow-y-auto">
//           <div className="flex flex-col xl:flex-row gap-8">
//             <div className="flex-1 space-y-6">
//                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Verification Details</h4>
//                 <div className="bg-green-50 p-4 rounded-lg border border-green-100">
//                     <div className="flex justify-between items-center mb-3">
//                         <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider">Income & Tax Status</h4>
//                     </div>
//                     <div className="space-y-3">
//                         {formData.incomeData.map((row, idx) => (
//                             <div key={idx} className="bg-white p-3 rounded border border-gray-200 shadow-sm">
//                                 <div className="mb-2 font-bold text-sm">{row.source}</div>
//                                 <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
//                                     <div>Y1: {formatCurrency(row.amount1)}</div>
//                                     <div>Y2: {formatCurrency(row.amount2)}</div>
//                                     <div>Y3: {formatCurrency(row.amount3)}</div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-xs font-semibold text-gray-600 mb-1">Parent Name</label>
//                         <input name="parentName" value={formData.parentName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" />
//                     </div>
//                     <div>
//                         <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
//                         <input name="addressLine" value={formData.addressLine} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
//                     </div>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Signatory</h4>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div><label className="block text-xs font-semibold text-gray-600 mb-1">Name</label><input name="signatoryName" value={formData.signatoryName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" /></div>
//                         <div><label className="block text-xs font-semibold text-gray-600 mb-1">Designation</label><input name="signatoryDesignation" value={formData.signatoryDesignation} onChange={handleChange} className="w-full border rounded p-2 text-sm" /></div>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex-1 bg-gray-100 rounded-lg p-6 flex justify-center overflow-auto h-[700px]">
//                 <div className="bg-white shadow-sm p-8 w-full max-w-[210mm] text-[10px] font-serif leading-relaxed text-justify relative min-h-[297mm]">
//                     <div className="flex justify-between font-bold mb-4">
//                         <div><p>Ref: {formData.refNo}</p><p>Dis: {formData.disNo}</p></div>
//                         <p>Date: {formData.date}</p>
//                     </div>
//                     <div className="text-center font-bold underline mb-4">
//                         <p className="text-sm capitalize">Tax Clearance Verification Certificate</p>
//                         <p className="mt-2">To Whom It May Concern</p>
//                     </div>
//                     <p>This is to certify that <strong>{formData.parentName}</strong> father of <strong>{formData.studentName}</strong> the permanent resident of <strong>{formData.addressLine}</strong> has been regularly paying all the government taxes...</p>
//                     <table className="w-full border-collapse border border-black mb-4 text-right text-[9px]">
//                         <thead>
//                             <tr className="bg-gray-100 text-center">
//                                 <th className="border border-black p-1 w-8">S.N.</th>
//                                 <th className="border border-black p-1 text-left">Income Headings</th>
//                                 <th className="border border-black p-1">{formData.fiscalYears[0]}</th>
//                                 <th className="border border-black p-1">{formData.fiscalYears[1]}</th>
//                                 <th className="border border-black p-1">{formData.fiscalYears[2]}</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {formData.incomeData.map((row, idx) => (
//                                 <tr key={idx}><td className="border border-black p-1 text-center">{idx + 1}</td><td className="border border-black p-1 text-left">{row.source}</td><td className="border border-black p-1">{formatCurrency(row.amount1)}</td><td className="border border-black p-1">{formatCurrency(row.amount2)}</td><td className="border border-black p-1">{formatCurrency(row.amount3)}</td></tr>
//                             ))}
//                             <tr className="font-bold bg-gray-50"><td colSpan="2" className="border border-black p-1 text-right">Total (NPR)</td><td className="border border-black p-1">{formatCurrency(totals.totalNPR[0])}</td><td className="border border-black p-1">{formatCurrency(totals.totalNPR[1])}</td><td className="border border-black p-1">{formatCurrency(totals.totalNPR[2])}</td></tr>
//                             <tr><td colSpan="2" className="border border-black p-1 text-right font-bold">Tax Amount</td><td className="border border-black p-1">Nil</td><td className="border border-black p-1">Nil</td><td className="border border-black p-1">Nil</td></tr>
//                             <tr><td colSpan="2" className="border border-black p-1 text-right font-bold">Status</td><td className="border border-black p-1">Tax Cleared</td><td className="border border-black p-1">Tax Cleared</td><td className="border border-black p-1">Tax Cleared</td></tr>
//                         </tbody>
//                     </table>
//                     <p className="mt-2">Note: Government Tax is exemptions for agriculture income...</p>
//                     <div className="mt-12 flex justify-end"><div className="text-left w-40"><div className="h-10"></div><p className="font-bold text-xs">{formData.signatoryName}</p><p className="text-xs">{formData.signatoryDesignation}</p></div></div>
//                 </div>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
//           <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition">Cancel</button>
//           <button onClick={generateWordDoc} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95 transition"><Download size={16} /> Download .DOC Word File</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Download, FileText, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TaxClearanceVerificationModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num || 0);
  };

  // 1. Initial State
  const [formData, setFormData] = useState({
    refNo: '2082/083',
    disNo: '403',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    
    parentName: `Mr. ${student.familyInfo.fatherName || 'Parent Name'}`,
    relation: 'father', 
    studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
    addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
    
    fiscalYears: ["2022/2023 A.D.", "2023/2024 A.D.", "2024/2025 A.D."],
    
    // Income Sources (Dynamic Rows)
    incomeData: [],

    // Signatory
    signatoryName: 'Lob Bahadur Shahi',
    signatoryDesignation: 'Ward Chairperson'
  });

  const [totals, setTotals] = useState({
    totalNPR: [0, 0, 0]
  });

  useEffect(() => {
    if(student) {
        let initialIncomeData = student.financialInfo?.incomeSources?.map(src => ({
            source: src.sourceName,
            amount1: src.amounts[0] || 0,
            amount2: src.amounts[1] || 0,
            amount3: src.amounts[2] || 0,
            tax: "Nil",
            status: "Tax Cleared"
        })) || [];

        if (initialIncomeData.length === 0) {
            initialIncomeData = [
                { source: "Agriculture Products (Maize & Mustard)", amount1: 958000, amount2: 973000, amount3: 995500, tax: "Nil", status: "Tax Cleared" },
                { source: "Animal Husbandry (Goat & Buffalo)", amount1: 675000, amount2: 712500, amount3: 857000, tax: "Nil", status: "Tax Cleared" },
                { source: "Vegetable Products (Potato & Cabbage)", amount1: 764600, amount2: 845500, amount3: 947000, tax: "Nil", status: "Tax Cleared" }
            ];
        }

        setFormData(prev => ({
            ...prev,
            parentName: `Mr. ${student.familyInfo.fatherName}`,
            relation: 'father', 
            studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
            addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
            incomeData: initialIncomeData
        }));
    }
  }, [student]);

  useEffect(() => {
    const sum1 = formData.incomeData.reduce((acc, row) => acc + Number(row.amount1 || 0), 0);
    const sum2 = formData.incomeData.reduce((acc, row) => acc + Number(row.amount2 || 0), 0);
    const sum3 = formData.incomeData.reduce((acc, row) => acc + Number(row.amount3 || 0), 0);

    setTotals({
        totalNPR: [sum1, sum2, sum3]
    });
  }, [formData.incomeData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIncomeChange = (index, field, value) => {
    const updated = [...formData.incomeData];
    updated[index][field] = value;
    setFormData({ ...formData, incomeData: updated });
  };

  const generateWordDoc = () => {
    const tableRows = formData.incomeData.map((row, index) => `
        <tr>
            <td style="padding: 3pt; border: 1pt solid black; text-align: center;">${index + 1}</td>
            <td style="padding: 3pt; border: 1pt solid black;">${row.source}</td>
            <td style="padding: 3pt; border: 1pt solid black; text-align: right;">${formatCurrency(row.amount1)}</td>
            <td style="padding: 3pt; border: 1pt solid black; text-align: right;">${formatCurrency(row.amount2)}</td>
            <td style="padding: 3pt; border: 1pt solid black; text-align: right;">${formatCurrency(row.amount3)}</td>
        </tr>
    `).join('');

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Tax Clearance Verification</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; margin: 0; } 
          
          /* SPACERS */
          .header-space { height: 140pt; } 
          .footer-space { height: 40pt; }
          
          /* TEXT */
          p { margin-bottom: 10pt; line-height: 1.4; text-align: justify; }
          
          /* HEADER META */
          .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 15pt; font-weight: bold; font-size: 11pt; }
          .meta-left { text-align: left; vertical-align: top; }
          .meta-right { text-align: right; vertical-align: bottom; }
          
          /* TITLES */
          .doc-title { text-align: center; font-size: 16pt; font-weight: bold; text-decoration: underline; text-transform: capitalize; margin-top: 10pt; }
          .doc-subtitle { text-align: center; font-size: 14pt; font-weight: bold; text-decoration: underline; margin-top: 8pt; margin-bottom: 25pt; }

          /* MAIN DATA TABLE */
          .data-table { width: 100%; border-collapse: collapse; margin-top: 5pt; margin-bottom: 15pt; font-size: 10pt; }
          .data-table th, .data-table td { border: 1pt solid black; padding: 3pt; vertical-align: middle; }
          .data-table th { text-align: center; font-weight: bold; background-color: #ffffff; }
          
          /* SIGNATURE */
          .signature-table { width: 100%; margin-top: 50pt; border: none; }
          .sig-td-left { width: 60%; }
          .sig-td-right { width: 40%; text-align: left; vertical-align: bottom; }
          .signatory-name { font-weight: bold; font-size: 12pt; margin: 0; padding-bottom: 4pt; }
          .signatory-title { font-size: 12pt; margin: 0; }
        </style>
      </head>
      <body>
        <div class="header-space"></div>

        <table class="meta-table">
          <tr>
            <td class="meta-left">Ref. No.: ${formData.refNo}<br>Dis. No.: ${formData.disNo}</td>
            <td class="meta-right">Date: ${formData.date}</td>
          </tr>
        </table>

        <div class="doc-title">Tax Clearance Verification Certificate</div>
        <div class="doc-subtitle">To Whom It May Concern</div>

        <p>
          This is to certify that <strong>${formData.parentName}</strong> father of 
          <strong>${formData.studentName}</strong> the permanent resident of 
          <strong>${formData.addressLine}</strong> has been regularly paying all the government taxes up to fiscal year ${formData.fiscalYears[2]} as per government rules and regulation. 
          The tax status is given below:
        </p>
        
        <div style="text-align: center; font-weight: bold; margin-bottom: 5pt; text-decoration: underline; font-size: 11pt;">Annual Income Per Mentioned Fiscal Year In NPR</div>

        <table class="data-table">
            <thead>
                <tr>
                    <th rowspan="2" style="width: 40px;">S.N.</th>
                    <th rowspan="2">Income Headings</th>
                    <th>${formData.fiscalYears[0]}</th>
                    <th>${formData.fiscalYears[1]}</th>
                    <th>${formData.fiscalYears[2]}</th>
                </tr>
                 <!-- Empty row to fix word rendering issue sometimes -->
                 <tr style="height: 0px;"></tr>
            </thead>
            <tbody>
                ${tableRows}
                <tr style="font-weight: bold;">
                    <td colspan="2" style="text-align: right; padding-right: 5pt;">Total Amount (NPR)</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalNPR[0])}</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalNPR[1])}</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalNPR[2])}</td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: right; padding-right: 5pt; font-weight: bold;">Tax Amount</td>
                    <td style="text-align: right;">Nil</td>
                    <td style="text-align: right;">Nil</td>
                    <td style="text-align: right;">Nil</td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: right; padding-right: 5pt; font-weight: bold;">Income after Tax</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalNPR[0])}</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalNPR[1])}</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalNPR[2])}</td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: right; padding-right: 5pt; font-weight: bold;">Status</td>
                    <td style="text-align: right;">Tax Cleared</td>
                    <td style="text-align: right;">Tax Cleared</td>
                    <td style="text-align: right;">Tax Cleared</td>
                </tr>
            </tbody>
        </table>

        <p style="font-size: 11pt;">
            Note: We also state that Government Tax is exemptions for agriculture income according to the Income Tax
            Act 2058 B.S. (2002 A.D.), Chapter 4 (11) (1). (Source: www.lawcommission.gov.np, www.ird.gov.np).
            Therefore, no tax has been issued for their agriculture income.
        </p>

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
    link.download = `Tax_Clearance_${formData.studentName.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[95vh]">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-green-600" size={20}/> Tax Clearance Generator
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex-1 space-y-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Verification Details</h4>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider">Income & Tax Status</h4>
                    </div>
                    <div className="space-y-3">
                        {formData.incomeData.map((row, idx) => (
                            <div key={idx} className="bg-white p-3 rounded border border-gray-200 shadow-sm">
                                <div className="mb-2 font-bold text-sm">{row.source}</div>
                                <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                                    <div>Y1: {formatCurrency(row.amount1)}</div>
                                    <div>Y2: {formatCurrency(row.amount2)}</div>
                                    <div>Y3: {formatCurrency(row.amount3)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Parent Name</label>
                        <input name="parentName" value={formData.parentName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
                        <input name="addressLine" value={formData.addressLine} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
                    </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Signatory</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-xs font-semibold text-gray-600 mb-1">Name</label><input name="signatoryName" value={formData.signatoryName} onChange={handleChange} className="w-full border rounded p-2 text-sm font-bold" /></div>
                        <div><label className="block text-xs font-semibold text-gray-600 mb-1">Designation</label><input name="signatoryDesignation" value={formData.signatoryDesignation} onChange={handleChange} className="w-full border rounded p-2 text-sm" /></div>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg p-6 flex justify-center overflow-auto h-[700px]">
                <div className="bg-white shadow-sm p-8 w-full max-w-[210mm] text-[10px] font-serif leading-relaxed text-justify relative min-h-[297mm]">
                    <div className="flex justify-between font-bold mb-4">
                        <div><p>Ref: {formData.refNo}</p><p>Dis: {formData.disNo}</p></div>
                        <p>Date: {formData.date}</p>
                    </div>
                    <div className="text-center font-bold underline mb-4">
                        <p className="text-sm capitalize">Tax Clearance Verification Certificate</p>
                        <p className="mt-2">To Whom It May Concern</p>
                    </div>
                    <p>This is to certify that <strong>{formData.parentName}</strong> father of <strong>{formData.studentName}</strong> the permanent resident of <strong>{formData.addressLine}</strong> has been regularly paying all the government taxes...</p>
                    <table className="w-full border-collapse border border-black mb-4 text-right text-[9px]">
                        <thead>
                            <tr className="bg-gray-100 text-center">
                                <th className="border border-black p-1 w-8">S.N.</th>
                                <th className="border border-black p-1 text-left">Income Headings</th>
                                <th className="border border-black p-1">{formData.fiscalYears[0]}</th>
                                <th className="border border-black p-1">{formData.fiscalYears[1]}</th>
                                <th className="border border-black p-1">{formData.fiscalYears[2]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.incomeData.map((row, idx) => (
                                <tr key={idx}><td className="border border-black p-1 text-center">{idx + 1}</td><td className="border border-black p-1 text-left">{row.source}</td><td className="border border-black p-1">{formatCurrency(row.amount1)}</td><td className="border border-black p-1">{formatCurrency(row.amount2)}</td><td className="border border-black p-1">{formatCurrency(row.amount3)}</td></tr>
                            ))}
                            <tr className="font-bold bg-gray-50"><td colSpan="2" className="border border-black p-1 text-right">Total (NPR)</td><td className="border border-black p-1">{formatCurrency(totals.totalNPR[0])}</td><td className="border border-black p-1">{formatCurrency(totals.totalNPR[1])}</td><td className="border border-black p-1">{formatCurrency(totals.totalNPR[2])}</td></tr>
                            <tr><td colSpan="2" className="border border-black p-1 text-right font-bold">Tax Amount</td><td className="border border-black p-1">Nil</td><td className="border border-black p-1">Nil</td><td className="border border-black p-1">Nil</td></tr>
                            <tr><td colSpan="2" className="border border-black p-1 text-right font-bold">Status</td><td className="border border-black p-1">Tax Cleared</td><td className="border border-black p-1">Tax Cleared</td><td className="border border-black p-1">Tax Cleared</td></tr>
                        </tbody>
                    </table>
                    <p className="mt-2">Note: Government Tax is exemptions for agriculture income...</p>
                    <div className="mt-12 flex justify-end"><div className="text-left w-40"><div className="h-10"></div><p className="font-bold text-xs">{formData.signatoryName}</p><p className="text-xs">{formData.signatoryDesignation}</p></div></div>
                </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition">Cancel</button>
          <button onClick={generateWordDoc} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95 transition"><Download size={16} /> Download .DOC Word File</button>
        </div>
      </div>
    </div>
  );
}