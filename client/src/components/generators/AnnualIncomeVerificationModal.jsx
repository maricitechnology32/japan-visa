import { DollarSign, Download, FileText, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AnnualIncomeVerificationModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  // Helper: Format Number to Currency (e.g. 1,00,000.00)
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num || 0);
  };

  // 1. Initial State
  const [formData, setFormData] = useState({
    refNo: '2082/083',
    disNo: '402',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    
    parentName: `Mr. ${student.familyInfo.fatherName || 'Parent Name'}`,
    relation: 'father', 
    studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
    addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
    
    // Financial Data
    exchangeRate: student.financialInfo.exchangeRate || 142.36,
    fiscalYears: ["2022/2023 A.D.", "2023/2024 A.D.", "2024/2025 A.D."],
    
    // Income Sources (Dynamic Rows)
    incomeData: [],

    // Signatory
    signatoryName: 'Lob Bahadur Shahi',
    signatoryDesignation: 'Ward Chairperson'
  });

  // Calculated Totals State
  const [totals, setTotals] = useState({
    totalNPR: [0, 0, 0],
    totalUSD: [0, 0, 0]
  });

  // Reset/Auto-fill
  useEffect(() => {
    if(student) {
        // Transform database structure to UI structure
        let initialIncomeData = student.financialInfo?.incomeSources?.map(src => ({
            source: src.sourceName,
            amount1: src.amounts[0] || 0,
            amount2: src.amounts[1] || 0,
            amount3: src.amounts[2] || 0
        })) || [];

        if (initialIncomeData.length === 0) {
            initialIncomeData = [
                { source: "Agriculture Products (Maize & Mustard)", amount1: 958000, amount2: 973000, amount3: 995500 },
                { source: "Animal Husbandry (Goat & Buffalo)", amount1: 675000, amount2: 712500, amount3: 857000 },
                { source: "Vegetable Products (Potato & Cabbage)", amount1: 764600, amount2: 845500, amount3: 947000 }
            ];
        }

        setFormData(prev => ({
            ...prev,
            parentName: `Mr. ${student.familyInfo.fatherName}`,
            relation: 'father', 
            studentName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
            addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
            incomeData: initialIncomeData,
            exchangeRate: student.financialInfo.exchangeRate || 142.36
        }));
    }
  }, [student]);

  // Auto-Calculate Totals whenever incomeData or exchangeRate changes
  useEffect(() => {
    const sum1 = formData.incomeData.reduce((acc, row) => acc + Number(row.amount1 || 0), 0);
    const sum2 = formData.incomeData.reduce((acc, row) => acc + Number(row.amount2 || 0), 0);
    const sum3 = formData.incomeData.reduce((acc, row) => acc + Number(row.amount3 || 0), 0);

    const rate = Number(formData.exchangeRate) || 1;

    setTotals({
        totalNPR: [sum1, sum2, sum3],
        totalUSD: [sum1 / rate, sum2 / rate, sum3 / rate]
    });
  }, [formData.incomeData, formData.exchangeRate]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Dynamic Table Handlers ---
  const handleIncomeChange = (index, field, value) => {
    const updated = [...formData.incomeData];
    updated[index][field] = value;
    setFormData({ ...formData, incomeData: updated });
  };

  const addIncomeRow = () => {
    setFormData({
        ...formData,
        incomeData: [...formData.incomeData, { source: "", amount1: 0, amount2: 0, amount3: 0 }]
    });
  };

  const removeIncomeRow = (index) => {
    const updated = formData.incomeData.filter((_, i) => i !== index);
    setFormData({ ...formData, incomeData: updated });
  };

  // 2. Word Document Generator Logic
  const generateWordDoc = () => {
    // Generate Rows HTML
    const tableRows = formData.incomeData.map((row, index) => `
        <tr>
            <td style="padding: 4pt; border: 1pt solid black; text-align: center;">${index + 1}</td>
            <td style="padding: 4pt; border: 1pt solid black;">${row.source}</td>
            <td style="padding: 4pt; border: 1pt solid black; text-align: right;">${formatCurrency(row.amount1)}</td>
            <td style="padding: 4pt; border: 1pt solid black; text-align: right;">${formatCurrency(row.amount2)}</td>
            <td style="padding: 4pt; border: 1pt solid black; text-align: right;">${formatCurrency(row.amount3)}</td>
        </tr>
    `).join('');

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Annual Income Verification</title>
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
          .doc-subtitle { text-align: center; font-size: 14pt; font-weight: bold; text-decoration: underline; margin-top: 10pt; margin-bottom: 20pt; }

          /* DATA TABLE */
          .data-table { width: 100%; border-collapse: collapse; margin-top: 10pt; margin-bottom: 10pt; font-size: 11pt; }
          .data-table th, .data-table td { border: 1pt solid black; padding: 4pt; }
          .data-table th { text-align: center; font-weight: bold; background-color: #ffffff; vertical-align: middle; }
          
          /* SIGNATURE BLOCK (Right Aligned, No Dash) */
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

        <div class="doc-title">Annual Income Verification Certificate</div>
        <div class="doc-subtitle">To Whom It May Concern</div>

        <p>
          This is to certify that <strong>${formData.parentName}</strong> father of 
          <strong>${formData.studentName}</strong> the permanent resident of 
          <strong>${formData.addressLine}</strong> has submitted an application to this office for the verification of an annual income. 
          Annual income is calculated of last 3 years from fiscal year are mentioned below:
        </p>

        <div style="text-align: center; font-weight: bold; margin-bottom: 5pt;">Annual Income Per Mentioned Fiscal Year In NPR</div>

        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 40px;">S.N.</th>
                    <th>Income Headings</th>
                    <th>${formData.fiscalYears[0]}</th>
                    <th>${formData.fiscalYears[1]}</th>
                    <th>${formData.fiscalYears[2]}</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
                <!-- TOTAL ROWS -->
                <tr style="font-weight: bold;">
                    <td colspan="2" style="text-align: right; padding-right: 10pt;">Total Amount (NPR)</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalNPR[0])}</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalNPR[1])}</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalNPR[2])}</td>
                </tr>
                <tr style="font-weight: bold;">
                    <td colspan="2" style="text-align: right; padding-right: 10pt;">Total Amount (US$)</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalUSD[0])}</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalUSD[1])}</td>
                    <td style="text-align: right;">${formatCurrency(totals.totalUSD[2])}</td>
                </tr>
            </tbody>
        </table>

        <p>
            For Information: 1 US $ = ${formData.exchangeRate} NPR (Source: Nepal Rastra Bank for ${formData.date}).
        </p>
        <p style="font-size: 10pt; text-align: justify;">
            Note: The annual incomes have been calculated and verified according to the Nepalese fiscal year and
            Income Tax Act 2058 B.S. (2002 A.D.) rules. The Nepalese fiscal year starts from the 1st day of Shrawan
            (Roughly falls in Mid-July) and ends on the final day of Ashadh of the following year (Roughly falls in
            Mid-July of the following year). The details about the fiscal year period are mentioned below:
        </p>
        <ol style="font-size: 10pt; margin-top: -5pt;">
            <li>Fiscal Year ${formData.fiscalYears[0]} (For the period of 17th July, 2022 A.D. to 16th July, 2023 A.D.).</li>
            <li>Fiscal Year ${formData.fiscalYears[1]} (For the period of 17th July, 2023 A.D. to 15th July, 2024 A.D.).</li>
            <li>Fiscal Year ${formData.fiscalYears[2]} (For the period of 16th July, 2024 A.D. to 16th July, 2025 A.D.).</li>
        </ol>

        <!-- SIGNATURE BLOCK -->
        <table class="signature-table">
            <tr>
                <td class="sig-td-left"></td>
                <td class="sig-td-right">
                    <!-- Space for physical signature -->
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
    link.download = `Annual_Income_${formData.studentName.replace(/\s+/g, '_')}.doc`;
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
            <FileText className="text-green-600" size={20}/> Annual Income Generator
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto">
          
          <div className="flex flex-col xl:flex-row gap-8">
            
            {/* LEFT: EDITABLE FIELDS */}
            <div className="flex-1 space-y-6">
                
                {/* Financial Settings */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex justify-between items-center">
                    <div>
                        <label className="block text-xs font-bold text-green-800 uppercase">Exchange Rate (1 USD)</label>
                        <div className="flex items-center gap-2 mt-1">
                            <DollarSign size={16} className="text-green-600"/>
                            <input type="number" name="exchangeRate" value={formData.exchangeRate} onChange={handleChange} className="border p-1 w-24 rounded text-sm font-bold" />
                            <span className="text-sm text-green-800">NPR</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-green-600">Auto-Calculated Total (Year 3)</div>
                        <div className="text-xl font-bold text-green-800">USD {formatCurrency(totals.totalUSD[2])}</div>
                    </div>
                </div>

                {/* Fiscal Years Config */}
                <div className="grid grid-cols-3 gap-2">
                    {formData.fiscalYears.map((year, idx) => (
                        <div key={idx}>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase">Fiscal Year {idx+1}</label>
                            <input 
                                value={year} 
                                onChange={(e) => {
                                    const newYears = [...formData.fiscalYears];
                                    newYears[idx] = e.target.value;
                                    setFormData({...formData, fiscalYears: newYears});
                                }}
                                className="w-full border p-1.5 rounded text-xs"
                            />
                        </div>
                    ))}
                </div>

                {/* Dynamic Income Table */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Income Sources</h4>
                        <button onClick={addIncomeRow} className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-50 flex items-center gap-1">
                            <Plus size={12}/> Add Source
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {formData.incomeData.map((row, idx) => (
                            <div key={idx} className="bg-white p-3 rounded border border-gray-200 shadow-sm relative">
                                <div className="mb-2 pr-8">
                                    <input 
                                        placeholder="Income Source Name" 
                                        value={row.source} 
                                        onChange={(e) => handleIncomeChange(idx, 'source', e.target.value)}
                                        className="w-full border-b border-gray-300 p-1 text-sm font-semibold focus:outline-none focus:border-green-500"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <input type="number" placeholder="Year 1 Amount" value={row.amount1} onChange={(e) => handleIncomeChange(idx, 'amount1', e.target.value)} className="border p-1.5 rounded text-xs text-right" />
                                    <input type="number" placeholder="Year 2 Amount" value={row.amount2} onChange={(e) => handleIncomeChange(idx, 'amount2', e.target.value)} className="border p-1.5 rounded text-xs text-right" />
                                    <input type="number" placeholder="Year 3 Amount" value={row.amount3} onChange={(e) => handleIncomeChange(idx, 'amount3', e.target.value)} className="border p-1.5 rounded text-xs text-right" />
                                </div>
                                <button onClick={() => removeIncomeRow(idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Basic Details */}
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

                {/* Signatory */}
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
            <div className="flex-1 bg-gray-100 rounded-lg p-6 flex justify-center overflow-auto h-[700px]">
                <div className="bg-white shadow-sm p-8 w-full max-w-[210mm] text-[10px] font-serif leading-relaxed text-justify relative min-h-[297mm]">
                    
                    {/* Header Mockup */}
                    <div className="flex justify-between font-bold mb-4">
                        <div><p>Ref: {formData.refNo}</p><p>Dis: {formData.disNo}</p></div>
                        <p>Date: {formData.date}</p>
                    </div>

                    <div className="text-center font-bold underline mb-4">
                        <p className="text-sm capitalize">Annual Income Verification Certificate</p>
                        <p className="mt-2">To Whom It May Concern</p>
                    </div>

                    <p>
                        This is to certify that <strong>{formData.parentName}</strong> father of 
                        <strong> {formData.studentName}</strong> the permanent resident of 
                        <strong> {formData.addressLine}</strong> has submitted an application to this office for the verification of an annual income.
                        Annual income is calculated of last 3 years from fiscal year are mentioned below:
                    </p>

                    <div className="text-center font-bold my-2 underline">Annual Income Per Mentioned Fiscal Year In NPR</div>

                    {/* TABLE PREVIEW */}
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
                                <tr key={idx}>
                                    <td className="border border-black p-1 text-center">{idx + 1}</td>
                                    <td className="border border-black p-1 text-left">{row.source}</td>
                                    <td className="border border-black p-1">{formatCurrency(row.amount1)}</td>
                                    <td className="border border-black p-1">{formatCurrency(row.amount2)}</td>
                                    <td className="border border-black p-1">{formatCurrency(row.amount3)}</td>
                                </tr>
                            ))}
                            {/* TOTALS */}
                            <tr className="font-bold bg-gray-50">
                                <td colSpan="2" className="border border-black p-1 text-right">Total Amount (NPR)</td>
                                <td className="border border-black p-1">{formatCurrency(totals.totalNPR[0])}</td>
                                <td className="border border-black p-1">{formatCurrency(totals.totalNPR[1])}</td>
                                <td className="border border-black p-1">{formatCurrency(totals.totalNPR[2])}</td>
                            </tr>
                            <tr className="font-bold bg-green-50">
                                <td colSpan="2" className="border border-black p-1 text-right">Total Amount (US$)</td>
                                <td className="border border-black p-1">{formatCurrency(totals.totalUSD[0])}</td>
                                <td className="border border-black p-1">{formatCurrency(totals.totalUSD[1])}</td>
                                <td className="border border-black p-1">{formatCurrency(totals.totalUSD[2])}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="mt-2">
                        For Information: 1 US $ = {formData.exchangeRate} NPR (Source: Nepal Rastra Bank for {formData.date}).
                    </p>
                    <p>
                        Note: The annual incomes have been calculated and verified according to the Nepalese fiscal year and Income Tax Act 2058 B.S. (2002 A.D.) rules.
                    </p>

                    {/* SIGNATURE */}
                    <div className="mt-4 flex justify-end">
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