

// // import { Calculator, Download, FileText, RefreshCw, X } from 'lucide-react';
// // import { useState } from 'react';

// // export default function BankStatementGeneratorModal({ isOpen, onClose, student }) {
// //   if (!isOpen || !student) return null;

// //   // --- CONSTANTS ---
// //   // Nepali Holidays (Example list - in production this should be comprehensive)
// //   const PUBLIC_HOLIDAYS = [
// //     "2024-01-15", "2024-01-30", // Maghe Sankranti, Martyrs
// //     "2024-03-08", // Shivaratri
// //     "2024-04-13", // New Year
// //     "2024-10-03", "2024-10-04", "2024-10-05", // Dashain (Main days)
// //     "2024-11-01", "2024-11-02", // Tihar
// //   ];

// //   // Helper: Date Formatter (DD-MMM-YYYY)
// //   const formatDate = (dateStr) => {
// //     const d = new Date(dateStr);
// //     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// //     return `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;
// //   };

// //   // Helper: Currency Formatter
// //   const formatMoney = (amount) => {
// //     return new Intl.NumberFormat('en-NP', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
// //   };

// //   // --- STATE ---
// //   const [config, setConfig] = useState({
// //     bankName: "Nabil Bank Ltd.",
// //     branch: "Pokhara Branch",
// //     accountName: `Mr. ${student.familyInfo.fatherName}`,
// //     accountNo: "0210017502882",
// //     currency: "NPR",
// //     startDate: "2024-08-01",
// //     endDate: new Date().toISOString().split('T')[0], // Today
// //     openingBalance: 150000.00,
// //     targetBalance: 3000000.00, // 30 Lakhs
// //     minTxn: 5000,
// //     maxTxn: 50000
// //   });

// //   const [transactions, setTransactions] = useState([]);

// //   // --- CORE LOGIC: GENERATOR ---
// //   const generateStatement = () => {
// //     let currentBal = parseFloat(config.openingBalance);
// //     let currentDate = new Date(config.startDate);
// //     const endDate = new Date(config.endDate);
// //     const target = parseFloat(config.targetBalance);
    
// //     const rows = [];

// //     // 1. Initial Balance
// //     rows.push({
// //       date: formatDate(currentDate),
// //       desc: "OPENING BALANCE",
// //       ref: "TRANSFER",
// //       debit: "",
// //       credit: "",
// //       balance: currentBal
// //     });

// //     // 2. Simulation Loop
// //     // We need to bridge the gap between Opening and Target
// //     // Total Growth Needed = Target - Opening
// //     const growthNeeded = target - currentBal;
    
// //     // We'll distribute this growth over the period, plus random noise
// //     while (currentDate < endDate) {
// //       // Advance 2-5 days
// //       currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 4) + 2);
      
// //       if (currentDate > endDate) break;

// //       // SKIP SATURDAYS & HOLIDAYS
// //       const dayOfWeek = currentDate.getDay();
// //       const dateString = currentDate.toISOString().split('T')[0];
      
// //       if (dayOfWeek === 6) continue; // Saturday
// //       if (PUBLIC_HOLIDAYS.includes(dateString)) continue; // Public Holiday

// //       // Determine Transaction Type
// //       // We bias towards deposits if we are below target trend
// //       const progress = (currentDate - new Date(config.startDate)) / (endDate - new Date(config.startDate));
// //       const expectedBal = parseFloat(config.openingBalance) + (growthNeeded * progress);
      
// //       let isDeposit = currentBal < expectedBal; 
      
// //       // Add randomness (sometimes withdraw even if we need to grow)
// //       if (Math.random() > 0.7) isDeposit = !isDeposit;

// //       let amount = Math.floor(Math.random() * (config.maxTxn - config.minTxn) + config.minTxn);
      
// //       // Special case: Big deposit occasionally
// //       if (isDeposit && Math.random() > 0.9) amount *= 5; 

// //       let desc = isDeposit ? "CASH DEPOSIT" : "ATM WITHDRAWAL";
// //       let debit = "";
// //       let credit = "";

// //       if (isDeposit) {
// //           currentBal += amount;
// //           credit = amount;
// //       } else {
// //           // Don't overdraw
// //           if (currentBal - amount < 10000) continue; 
// //           currentBal -= amount;
// //           debit = amount;
// //       }

// //       rows.push({
// //         date: formatDate(currentDate),
// //         desc: desc,
// //         ref: Math.floor(Math.random() * 90000000) + 10000000,
// //         debit: debit,
// //         credit: credit,
// //         balance: currentBal
// //       });
// //     }

// //     // 3. Final Adjustment (Force hit the target on the last day)
// //     const finalDiff = target - currentBal;
// //     if (finalDiff !== 0) {
// //        rows.push({
// //         date: formatDate(endDate),
// //         desc: finalDiff > 0 ? "FINAL DEPOSIT" : "CLOSING WITHDRAWAL",
// //         ref: "ADJUST",
// //         debit: finalDiff < 0 ? Math.abs(finalDiff) : "",
// //         credit: finalDiff > 0 ? finalDiff : "",
// //         balance: target
// //       });
// //     }

// //     setTransactions(rows);
// //   };

// //   // Generate Word Doc
// //   const generateWordDoc = () => {
// //     const tableRows = transactions.map(t => `
// //       <tr>
// //         <td style="padding:3pt; border:1pt solid #ccc; font-size:9pt;">${t.date}</td>
// //         <td style="padding:3pt; border:1pt solid #ccc; font-size:9pt;">${t.desc}</td>
// //         <td style="padding:3pt; border:1pt solid #ccc; font-size:9pt;">${t.ref}</td>
// //         <td style="padding:3pt; border:1pt solid #ccc; font-size:9pt; text-align:right;">${t.debit ? formatMoney(t.debit) : ''}</td>
// //         <td style="padding:3pt; border:1pt solid #ccc; font-size:9pt; text-align:right;">${t.credit ? formatMoney(t.credit) : ''}</td>
// //         <td style="padding:3pt; border:1pt solid #ccc; font-size:9pt; text-align:right; font-weight:bold;">${formatMoney(t.balance)}</td>
// //       </tr>
// //     `).join('');

// //     const content = `
// //       <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
// //       <head><meta charset="utf-8"><title>Bank Statement</title>
// //       <style>
// //         body { font-family: 'Arial', sans-serif; font-size: 10pt; }
// //         .header { text-align:center; margin-bottom:20px; }
// //         .bank-name { font-size:16pt; font-weight:bold; color:#003366; }
// //         .meta-table { width:100%; margin-bottom:10px; border:none; }
// //         .txn-table { width:100%; border-collapse:collapse; margin-top:10px; }
// //         .txn-table th { background:#eee; padding:5pt; border:1pt solid #999; font-size:9pt; text-align:left; }
// //       </style>
// //       </head>
// //       <body>
// //         <div class="header">
// //           <div class="bank-name">${config.bankName}</div>
// //           <div>${config.branch}</div>
// //           <div style="margin-top:10px; font-weight:bold;">STATEMENT OF ACCOUNT</div>
// //         </div>
        
// //         <table class="meta-table">
// //           <tr><td><strong>Account Name:</strong> ${config.accountName}</td><td style="text-align:right;"><strong>Date:</strong> ${formatDate(new Date())}</td></tr>
// //           <tr><td><strong>Account No:</strong> ${config.accountNo}</td><td style="text-align:right;"><strong>Currency:</strong> ${config.currency}</td></tr>
// //         </table>

// //         <table class="txn-table">
// //           <thead>
// //             <tr>
// //               <th width="12%">Date</th>
// //               <th width="30%">Description</th>
// //               <th width="15%">Ref No</th>
// //               <th width="14%" style="text-align:right;">Debit</th>
// //               <th width="14%" style="text-align:right;">Credit</th>
// //               <th width="15%" style="text-align:right;">Balance</th>
// //             </tr>
// //           </thead>
// //           <tbody>${tableRows}</tbody>
// //         </table>
// //       </body></html>
// //     `;
    
// //     const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement('a');
// //     link.href = url;
// //     link.download = `Statement_${config.accountName.replace(/\s/g,'_')}.doc`;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
// //       <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl overflow-hidden flex flex-col max-h-[95vh]">
        
// //         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
// //           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
// //             <FileText className="text-green-600" size={20}/> Bank Statement Generator
// //           </h3>
// //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
// //         </div>

// //         <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            
// //             {/* LEFT: CONTROLS */}
// //             <div className="w-full lg:w-1/3 p-6 overflow-y-auto bg-gray-50 border-r">
// //                 <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Calculator size={16}/> Parameters</h4>
                
// //                 <div className="space-y-4">
// //                     <div className="grid grid-cols-2 gap-3">
// //                         <div><label className="text-xs font-bold">Bank Name</label><input value={config.bankName} onChange={(e)=>setConfig({...config, bankName: e.target.value})} className="w-full border p-2 rounded text-sm"/></div>
// //                         <div><label className="text-xs font-bold">Branch</label><input value={config.branch} onChange={(e)=>setConfig({...config, branch: e.target.value})} className="w-full border p-2 rounded text-sm"/></div>
// //                     </div>
// //                     <div><label className="text-xs font-bold">Account Name</label><input value={config.accountName} onChange={(e)=>setConfig({...config, accountName: e.target.value})} className="w-full border p-2 rounded text-sm"/></div>
                    
// //                     <div className="grid grid-cols-2 gap-3">
// //                         <div><label className="text-xs font-bold">Start Date</label><input type="date" value={config.startDate} onChange={(e)=>setConfig({...config, startDate: e.target.value})} className="w-full border p-2 rounded text-sm"/></div>
// //                         <div><label className="text-xs font-bold">End Date</label><input type="date" value={config.endDate} onChange={(e)=>setConfig({...config, endDate: e.target.value})} className="w-full border p-2 rounded text-sm"/></div>
// //                     </div>

// //                     <div className="grid grid-cols-2 gap-3">
// //                         <div><label className="text-xs font-bold">Opening Bal</label><input type="number" value={config.openingBalance} onChange={(e)=>setConfig({...config, openingBalance: e.target.value})} className="w-full border p-2 rounded text-sm"/></div>
// //                         <div><label className="text-xs font-bold text-green-600">Target Bal</label><input type="number" value={config.targetBalance} onChange={(e)=>setConfig({...config, targetBalance: e.target.value})} className="w-full border-2 border-green-100 p-2 rounded text-sm font-bold"/></div>
// //                     </div>

// //                     <button onClick={generateStatement} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95">
// //                         <RefreshCw size={18} /> Generate Transactions
// //                     </button>

// //                     <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded border border-yellow-100">
// //                         <strong>Note:</strong> Saturdays and public holidays are automatically skipped. Interest tax logic coming in v2.
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* RIGHT: PREVIEW */}
// //             <div className="flex-1 p-8 overflow-y-auto bg-gray-200 flex justify-center">
// //                 <div className="bg-white shadow-lg p-10 w-[210mm] min-h-[297mm] text-xs">
                    
// //                     {/* Bank Header */}
// //                     <div className="text-center mb-6">
// //                         <h1 className="text-2xl font-bold text-green-900 uppercase tracking-wide">{config.bankName}</h1>
// //                         <p className="text-gray-500">{config.branch}</p>
// //                         <div className="mt-4 border-b-2 border-black w-1/2 mx-auto"></div>
// //                         <h2 className="text-lg font-bold mt-2 underline">STATEMENT OF ACCOUNT</h2>
// //                     </div>

// //                     {/* Meta Info */}
// //                     <div className="flex justify-between mb-4">
// //                         <div className="space-y-1">
// //                             <p><strong>Account Name:</strong> {config.accountName}</p>
// //                             <p><strong>Account Number:</strong> {config.accountNo}</p>
// //                             <p><strong>Account Type:</strong> Savings</p>
// //                         </div>
// //                         <div className="space-y-1 text-right">
// //                             <p><strong>Currency:</strong> {config.currency}</p>
// //                             <p><strong>Date:</strong> {formatDate(new Date())}</p>
// //                             <p><strong>Page:</strong> 1 of 1</p>
// //                         </div>
// //                     </div>

// //                     {/* Table */}
// //                     <table className="w-full border-collapse border border-gray-300">
// //                         <thead className="bg-gray-100 text-gray-700">
// //                             <tr>
// //                                 <th className="border p-2 text-left">Date</th>
// //                                 <th className="border p-2 text-left">Description</th>
// //                                 <th className="border p-2 text-left">Ref No</th>
// //                                 <th className="border p-2 text-right">Debit</th>
// //                                 <th className="border p-2 text-right">Credit</th>
// //                                 <th className="border p-2 text-right">Balance</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {transactions.map((t, i) => (
// //                                 <tr key={i} className="hover:bg-gray-50">
// //                                     <td className="border p-2 whitespace-nowrap">{t.date}</td>
// //                                     <td className="border p-2">{t.desc}</td>
// //                                     <td className="border p-2">{t.ref}</td>
// //                                     <td className="border p-2 text-right">{t.debit ? formatMoney(t.debit) : ''}</td>
// //                                     <td className="border p-2 text-right">{t.credit ? formatMoney(t.credit) : ''}</td>
// //                                     <td className="border p-2 text-right font-bold">{formatMoney(t.balance)}</td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
                    
// //                     {transactions.length === 0 && (
// //                         <div className="text-center p-10 text-gray-400 italic">
// //                             Click "Generate" to create a statement.
// //                         </div>
// //                     )}

// //                 </div>
// //             </div>
// //         </div>

// //         <div className="p-4 border-t bg-white flex justify-end gap-3">
// //             <button onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Close</button>
// //             <button onClick={generateWordDoc} disabled={transactions.length === 0} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center gap-2 disabled:opacity-50">
// //                 <Download size={18}/> Download .DOC
// //             </button>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }


// import { Calculator, Download, FileText, Plus, RefreshCw, X } from 'lucide-react';
// import { useState } from 'react';
// import { toast } from 'react-toastify';

// export default function BankStatementGeneratorModal({ isOpen, onClose, student }) {
//   if (!isOpen || !student) return null;

//   // --- CONSTANTS ---
//   // Comprehensive list of Public Holidays (Example for 2024-2025 context)
//   // In a real app, this might come from a database or API.
//   const DEFAULT_HOLIDAYS = [
//     "2024-01-15", "2024-01-30", // Maghe Sankranti, Martyrs
//     "2024-02-19", // Democracy Day
//     "2024-03-08", // Shivaratri
//     "2024-03-24", // Holi
//     "2024-04-13", // New Year
//     "2024-05-01", // Majdoor Divas
//     "2024-05-23", // Buddha Jayanti
//     "2024-09-19", // Constitution Day
//     "2024-10-03", "2024-10-04", "2024-10-05", "2024-10-06", "2024-10-07", // Dashain
//     "2024-11-01", "2024-11-02", "2024-11-03", // Tihar
//     "2025-01-15", // Maghe Sankranti
//   ];

//   // Interest Payment Dates (Approximate Nepali Quarter Ends)
//   const INTEREST_DATES = ["10-16", "01-14", "04-14", "07-16"];  

//   // Helper: Format Date (dd-MMM-yyyy) for display
//   const formatDate = (dateObj) => {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     return `${dateObj.getDate().toString().padStart(2, '0')}-${months[dateObj.getMonth()]}-${dateObj.getFullYear()}`;
//   };

//   // Helper: Format Currency
//   const formatMoney = (amount) => {
//     return new Intl.NumberFormat('en-NP', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
//   };

//   // --- STATE ---
//   const [config, setConfig] = useState({
//     bankName: "Nabil Bank Ltd.",
//     branch: "Pokhara Branch",
//     accountName: `Mr. ${student.familyInfo.fatherName}`,
//     accountNo: "0210017502882",
//     currency: "NPR",
//     startDate: "2024-07-28", // Based on screenshot start
//     endDate: new Date().toISOString().split('T')[0],
//     openingBalance: 2319840.90, // Based on screenshot
//     targetBalance: 3600000.00,
//     minTxn: 5000,
//     maxTxn: 100000
//   });

//   const [holidays, setHolidays] = useState(DEFAULT_HOLIDAYS);
//   const [newHoliday, setNewHoliday] = useState('');
//   const [transactions, setTransactions] = useState([]);

//   // --- HANDLERS ---
//   const handleConfigChange = (e) => setConfig({...config, [e.target.name]: e.target.value});
  
//   const addHoliday = () => {
//     if (newHoliday && !holidays.includes(newHoliday)) {
//         setHolidays([...holidays, newHoliday].sort());
//         setNewHoliday('');
//         toast.success("Holiday added!");
//     }
//   };

//   const removeHoliday = (date) => {
//       setHolidays(holidays.filter(h => h !== date));
//   };

//   // --- CORE LOGIC: GENERATOR ---
//   const generateStatement = () => {
//     let currentBal = parseFloat(config.openingBalance);
//     let currentDate = new Date(config.startDate);
//     const endDate = new Date(config.endDate);
    
//     const newTransactions = [];

//     // 1. Opening Balance Row
//     newTransactions.push({
//         date: formatDate(currentDate),
//         description: "Balance B/F", // Balance Brought Forward
//         debit: "",
//         credit: "",
//         balance: currentBal
//     });

//     // 2. Loop Day by Day
//     while (currentDate <= endDate) {
//         // Create a date string for comparison (YYYY-MM-DD)
//         // Note: We use local time logic here carefully
//         const yyyy = currentDate.getFullYear();
//         const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
//         const dd = String(currentDate.getDate()).padStart(2, '0');
//         const dateString = `${yyyy}-${mm}-${dd}`;
//         const monthDay = `${mm}-${dd}`;

//         const dayOfWeek = currentDate.getDay(); // 0=Sun, 6=Sat

//         // --- SKIP LOGIC ---
//         // Saturday is holiday in Nepal
//         if (dayOfWeek === 6) {
//             currentDate.setDate(currentDate.getDate() + 1);
//             continue;
//         }
//         // Public Holiday Check
//         if (holidays.includes(dateString)) {
//             currentDate.setDate(currentDate.getDate() + 1);
//             continue;
//         }

//         // --- MANDATORY EVENTS (Interest/Tax) ---
//         if (INTEREST_DATES.includes(monthDay)) {
//             // Calculate Interest (Approx 4% - 7% annualized, simplified for a quarter)
//             // Logic: ~1.5% of current balance for the quarter
//             const interestAmt = Math.floor(currentBal * 0.015); 
//             const taxAmt = Math.floor(interestAmt * 0.05); // 5% Tax

//             // Add Interest
//             currentBal += interestAmt;
//             newTransactions.push({
//                 date: formatDate(new Date(currentDate)),
//                 description: "Interest Posted on A/C",
//                 debit: "",
//                 credit: interestAmt,
//                 balance: currentBal
//             });

//             // Deduct Tax
//             currentBal -= taxAmt;
//             newTransactions.push({
//                 date: formatDate(new Date(currentDate)),
//                 description: "Tax Deduction",
//                 debit: taxAmt,
//                 credit: "",
//                 balance: currentBal
//             });
            
//             // Move to next day after mandatory events to avoid clutter
//             currentDate.setDate(currentDate.getDate() + 1);
//             continue;
//         }

//         // --- RANDOM TRANSACTIONS ---
//         // We don't want a transaction EVERY day. Maybe 15-20% chance per day?
//         if (Math.random() < 0.15) {
//             const isDeposit = Math.random() > 0.45; // Slightly more withdrawals usually, but deposits are larger
            
//             let amount = Math.floor(Math.random() * (config.maxTxn - config.minTxn) + config.minTxn);
//             // Round to nearest 100
//             amount = Math.ceil(amount / 100) * 100;

//             let desc = "";
//             let debit = "";
//             let credit = "";

//             if (isDeposit) {
//                 // Occasional large deposit to boost balance
//                 if (Math.random() > 0.8) amount = amount * 4; 
                
//                 desc = Math.random() > 0.7 ? "Cash Deposit by Self" : `Cash Deposit by ${student.personalInfo.firstName}`;
//                 currentBal += amount;
//                 credit = amount;
//             } else {
//                 // Withdrawal
//                 if (currentBal < amount + 10000) {
//                     // Skip if low balance
//                 } else {
//                     desc = Math.random() > 0.5 ? "CHEQUE Withdrawal by Self" : "ATM Withdrawal";
//                     currentBal -= amount;
//                     debit = amount;
//                 }
//             }

//             if (debit || credit) {
//                 newTransactions.push({
//                     date: formatDate(new Date(currentDate)),
//                     description: desc,
//                     debit: debit,
//                     credit: credit,
//                     balance: currentBal
//                 });
//             }
//         }

//         // Next Day
//         currentDate.setDate(currentDate.getDate() + 1);
//     }

//     // 3. Final Adjustment (Force hit the target on the last day)
//     const target = parseFloat(config.targetBalance);
//     const finalDiff = target - currentBal;
    
//     // Only adjust if significant difference (> 1000)
//     if (Math.abs(finalDiff) > 1000) {
//        const finalDate = formatDate(new Date(config.endDate));
//        if (finalDiff > 0) {
//            newTransactions.push({
//                date: finalDate,
//                description: "Cash Deposit by Self (Final)",
//                debit: "",
//                credit: finalDiff,
//                balance: target
//            });
//        } else {
//            newTransactions.push({
//                date: finalDate,
//                description: "CHEQUE Withdrawal by Self (Closing)",
//                debit: Math.abs(finalDiff),
//                credit: "",
//                balance: target
//            });
//        }
//     }

//     setTransactions(newTransactions);
//     toast.success(`Generated ${newTransactions.length} transactions!`);
//   };

//   const generateWordDoc = () => {
//       const rowsHtml = transactions.map(t => `
//         <tr>
//             <td style="padding:4pt; border:1pt solid #ccc;">${t.date}</td>
//             <td style="padding:4pt; border:1pt solid #ccc;">${t.description}</td>
//             <td style="padding:4pt; border:1pt solid #ccc; text-align:right;">${t.debit ? formatMoney(t.debit) : ''}</td>
//             <td style="padding:4pt; border:1pt solid #ccc; text-align:right;">${t.credit ? formatMoney(t.credit) : ''}</td>
//             <td style="padding:4pt; border:1pt solid #ccc; text-align:right;">${formatMoney(t.balance)}</td>
//         </tr>
//       `).join('');

//       const content = `
//         <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
//         <head><meta charset="utf-8"><title>Bank Statement</title>
//         <style>
//             body { font-family: 'Arial', sans-serif; font-size: 10pt; }
//             .header { text-align: center; margin-bottom: 20px; }
//             .bank-title { font-size: 18pt; font-weight: bold; color: #004080; }
//             .meta-table { width: 100%; margin-bottom: 15px; font-size: 10pt; }
//             .txn-table { width: 100%; border-collapse: collapse; font-size: 9pt; }
//             .txn-table th { background-color: #f0f0f0; border: 1pt solid #999; padding: 5pt; text-align:left; }
//             .txn-table td { border: 1pt solid #ccc; padding: 4pt; }
//         </style>
//         </head>
//         <body>
//             <div class="header">
//                 <div class="bank-title">${config.bankName}</div>
//                 <div>${config.branch}</div>
//                 <div style="margin-top:10px; font-weight:bold; text-decoration:underline;">Statement of Account</div>
//             </div>

//             <table class="meta-table">
//                 <tr><td><strong>Account Name:</strong> ${config.accountName}</td><td style="text-align:right;"><strong>Currency:</strong> ${config.currency}</td></tr>
//                 <tr><td><strong>Account No:</strong> ${config.accountNo}</td><td style="text-align:right;"><strong>Date:</strong> ${formatDate(new Date())}</td></tr>
//             </table>

//             <table class="txn-table">
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Description</th>
//                         <th style="text-align:right;">Debit</th>
//                         <th style="text-align:right;">Credit</th>
//                         <th style="text-align:right;">Balance</th>
//                     </tr>
//                 </thead>
//                 <tbody>${rowsHtml}</tbody>
//             </table>
//         </body></html>
//       `;
      
//       const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `Statement_${config.accountName.replace(/\s/g,'_')}.doc`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl overflow-hidden flex flex-col max-h-[95vh]">
        
//         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
//           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//             <FileText className="text-green-600" size={20}/> Bank Statement Generator
//           </h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
//         </div>

//         <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            
//             {/* LEFT: CONTROLS */}
//             <div className="w-full lg:w-1/3 p-6 overflow-y-auto bg-gray-50 border-r">
//                 <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Calculator size={16}/> Parameters</h4>
                
//                 <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-3">
//                         <div><label className="text-xs font-bold">Bank Name</label><input name="bankName" value={config.bankName} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                         <div><label className="text-xs font-bold">Branch</label><input name="branch" value={config.branch} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                     </div>
//                     <div><label className="text-xs font-bold">Account Name</label><input name="accountName" value={config.accountName} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                     <div><label className="text-xs font-bold">Account No</label><input name="accountNumber" value={config.accountNumber} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
                    
//                     <div className="grid grid-cols-2 gap-3">
//                         <div><label className="text-xs font-bold">Start Date</label><input type="date" name="startDate" value={config.startDate} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                         <div><label className="text-xs font-bold">End Date</label><input type="date" name="endDate" value={config.endDate} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                         <div><label className="text-xs font-bold">Opening Bal</label><input type="number" name="openingBalance" value={config.openingBalance} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                         <div><label className="text-xs font-bold text-green-600">Target Bal</label><input type="number" name="targetBalance" value={config.targetBalance} onChange={handleConfigChange} className="w-full border-2 border-green-100 p-2 rounded text-sm font-bold"/></div>
//                     </div>

//                     <div className="col-span-2">
//                         <label className="text-xs font-bold mb-1 block">Public Holidays (YYYY-MM-DD)</label>
//                         <div className="flex gap-2 mb-2">
//                             <input type="date" value={newHoliday} onChange={(e)=>setNewHoliday(e.target.value)} className="border p-2 rounded text-sm flex-1" />
//                             <button onClick={addHoliday} className="bg-green-600 text-white px-3 rounded flex items-center"><Plus size={16}/></button>
//                         </div>
//                         <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border p-2 rounded bg-white">
//                             {holidays.map(h => (
//                                 <span key={h} className="text-xs bg-gray-100 border border-gray-300 px-2 py-1 rounded flex items-center gap-1">
//                                     {h} <button onClick={() => removeHoliday(h)} className="text-red-500 hover:text-red-700 ml-1"><X size={10}/></button>
//                                 </span>
//                             ))}
//                         </div>
//                         <p className="text-[10px] text-gray-500 mt-1">Note: Saturdays are automatically excluded.</p>
//                     </div>

//                     <button onClick={generateStatement} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95">
//                         <RefreshCw size={18} /> Generate Transactions
//                     </button>
//                 </div>
//             </div>

//             {/* RIGHT: PREVIEW */}
//             <div className="flex-1 p-8 overflow-y-auto bg-gray-200 flex justify-center">
//                 <div className="bg-white shadow-lg p-10 w-[210mm] min-h-[297mm] text-xs">
                    
//                     {/* Bank Header */}
//                     <div className="text-center mb-6">
//                         <h1 className="text-2xl font-bold text-green-900 uppercase tracking-wide">{config.bankName}</h1>
//                         <p className="text-gray-500">{config.branch}</p>
//                         <div className="mt-4 border-b-2 border-black w-1/2 mx-auto"></div>
//                         <h2 className="text-lg font-bold mt-2 underline">STATEMENT OF ACCOUNT</h2>
//                     </div>

//                     {/* Meta Info */}
//                     <div className="flex justify-between mb-4">
//                         <div className="space-y-1">
//                             <p><strong>Account Name:</strong> {config.accountName}</p>
//                             <p><strong>Account Number:</strong> {config.accountNo}</p>
//                             <p><strong>Account Type:</strong> Savings</p>
//                         </div>
//                         <div className="space-y-1 text-right">
//                             <p><strong>Currency:</strong> {config.currency}</p>
//                             <p><strong>Date:</strong> {formatDate(new Date())}</p>
//                             <p><strong>Page:</strong> 1 of 1</p>
//                         </div>
//                     </div>

//                     {/* Table */}
//                     <table className="w-full border-collapse border border-gray-300">
//                         <thead className="bg-gray-100 text-gray-700">
//                             <tr>
//                                 <th className="border p-2 text-left">Date</th>
//                                 <th className="border p-2 text-left">Description</th>
//                                 <th className="border p-2 text-right">Debit</th>
//                                 <th className="border p-2 text-right">Credit</th>
//                                 <th className="border p-2 text-right">Balance</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {transactions.length === 0 && (
//                                 <tr><td colSpan="5" className="text-center p-4 text-gray-400">No transactions generated yet.</td></tr>
//                             )}
//                             {transactions.map((t, idx) => (
//                                 <tr key={idx} className="hover:bg-gray-50">
//                                     <td className="border p-2 whitespace-nowrap">{t.date}</td>
//                                     <td className="border p-2">{t.description}</td>
//                                     <td className="border p-2 text-right">{t.debit ? formatMoney(t.debit) : ''}</td>
//                                     <td className="border p-2 text-right">{t.credit ? formatMoney(t.credit) : ''}</td>
//                                     <td className="border p-2 text-right font-bold">{formatMoney(t.balance)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                 </div>
//             </div>
//         </div>

//         <div className="p-4 border-t bg-white flex justify-end gap-3">
//             <button onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Close</button>
//             <button onClick={generateWordDoc} disabled={transactions.length === 0} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center gap-2 disabled:opacity-50">
//                 <Download size={18}/> Download .DOC
//             </button>
//         </div>

//       </div>
//     </div>
//   );
// }


// import { Calculator, Download, FileText, X } from 'lucide-react';
// import { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Import Calendar CSS
// import { toast } from 'react-toastify';

// export default function BankStatementGeneratorModal({ isOpen, onClose, student }) {
//   if (!isOpen || !student) return null;

//   // --- HELPERS ---
//   const formatDate = (dateObj) => {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     return `${dateObj.getDate().toString().padStart(2, '0')}-${months[dateObj.getMonth()]}-${dateObj.getFullYear()}`;
//   };

//   const formatMoney = (amount) => {
//     return new Intl.NumberFormat('en-NP', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
//   };

//   // Helper to get date string YYYY-MM-DD
//   const getDateStr = (date) => date.toISOString().split('T')[0];

//   // --- STATE ---
//   const [activeTab, setActiveTab] = useState('config'); // config, holidays, preview
  
//   const [config, setConfig] = useState({
//     bankName: "Nabil Bank Ltd.",
//     branch: "Pokhara Branch",
//     accountName: `Mr. ${student.familyInfo.fatherName}`,
//     accountNo: "0210017502882",
//     currency: "NPR",
//     startDate: "2024-08-01", 
//     endDate: new Date().toISOString().split('T')[0],
//     openingBalance: 150000.00,
//     targetBalance: 3000000.00,
//     minTxn: 5000,
//     maxTxn: 80000
//   });

//   // Holiday Management
//   // Pre-fill some common holidays for 2024/25 (Example list)
//   const [holidays, setHolidays] = useState([
//      "2024-10-03", "2024-10-04", "2024-10-05", "2024-10-06", "2024-10-07", // Dashain
//      "2024-11-01", "2024-11-02", "2024-11-03" // Tihar
//   ]);

//   // Interest Dates (Approx Nepali Quarter Ends: Mid-Oct, Mid-Jan, Mid-Apr, Mid-Jul)
//   const interestDates = ["10-16", "01-14", "04-14", "07-16"];

//   const [transactions, setTransactions] = useState([]);

//   // --- HANDLERS ---
//   const handleConfigChange = (e) => setConfig({...config, [e.target.name]: e.target.value});

//   // Calendar Tile Logic (To show holidays visually)
//   const tileClassName = ({ date, view }) => {
//     if (view === 'month') {
//         const dateStr = getDateStr(date);
//         if (date.getDay() === 6) return 'bg-gray-200 text-gray-400 cursor-not-allowed'; // Saturday
//         if (holidays.includes(dateStr)) return 'bg-red-100 text-red-600 font-bold'; // Holiday
//     }
//   };

//   // Toggle Holiday on Click
//   const handleDateClick = (date) => {
//       if (date.getDay() === 6) return; // Ignore Saturdays
//       const dateStr = getDateStr(date);
//       if (holidays.includes(dateStr)) {
//           setHolidays(holidays.filter(h => h !== dateStr));
//       } else {
//           setHolidays([...holidays, dateStr]);
//       }
//   };

//   // --- GENERATOR ALGORITHM ---
//   const generateStatement = () => {
//     let currentBal = parseFloat(config.openingBalance);
//     let currentDate = new Date(config.startDate);
//     const endDate = new Date(config.endDate);
//     const target = parseFloat(config.targetBalance);
    
//     const rows = [];

//     // 1. Opening
//     rows.push({
//         date: formatDate(currentDate),
//         desc: "Balance B/F",
//         ref: "TRANSFER",
//         debit: "",
//         credit: "",
//         balance: currentBal
//     });

//     // Calculate growth needed per day roughly
//     const totalDays = (endDate - currentDate) / (1000 * 60 * 60 * 24);
//     const growthNeeded = target - currentBal;

//     // Loop
//     while (currentDate < endDate) {
//         // Jump 1-4 days
//         const jump = Math.floor(Math.random() * 3) + 1;
//         currentDate.setDate(currentDate.getDate() + jump);
        
//         if (currentDate > endDate) break;

//         const dateStr = getDateStr(currentDate);
//         const monthDay = dateStr.substring(5); // MM-DD
//         const isSat = currentDate.getDay() === 6;

//         if (isSat || holidays.includes(dateStr)) continue; // Skip

//         // Interest Check
//         if (interestDates.includes(monthDay)) {
//             const interest = Math.floor(currentBal * 0.015); // 1.5% quarterly
//             const tax = Math.floor(interest * 0.05);
            
//             currentBal += interest;
//             rows.push({ date: formatDate(new Date(currentDate)), desc: "Interest Posted on A/C", ref: "INT", debit: "", credit: interest, balance: currentBal });
            
//             currentBal -= tax;
//             rows.push({ date: formatDate(new Date(currentDate)), desc: "Tax Deduction", ref: "TAX", debit: tax, credit: "", balance: currentBal });
//             continue;
//         }

//         // Random Transaction
//         // Bias towards deposit if we need to grow
//         const progress = (currentDate - new Date(config.startDate)) / (endDate - new Date(config.startDate));
//         const targetTrajectory = parseFloat(config.openingBalance) + (growthNeeded * progress);
        
//         let isDeposit = currentBal < targetTrajectory;
//         // Add noise
//         if (Math.random() > 0.7) isDeposit = !isDeposit;

//         let amount = Math.floor(Math.random() * (config.maxTxn - config.minTxn) + config.minTxn);
//         amount = Math.ceil(amount / 100) * 100; // Round to nearest 100

//         let desc = "";
//         let debit = "";
//         let credit = "";

//         if (isDeposit) {
//             if (Math.random() > 0.8) amount *= 3; // Occasional big deposit
//             desc = "Cash Deposit by Self";
//             currentBal += amount;
//             credit = amount;
//         } else {
//             if (currentBal - amount < 10000) continue; // Prevent low balance
//             desc = Math.random() > 0.5 ? "CHEQUE Withdrawal by Self" : "ATM Withdrawal";
//             currentBal -= amount;
//             debit = amount;
//         }

//         rows.push({
//             date: formatDate(new Date(currentDate)),
//             desc,
//             ref: Math.floor(Math.random() * 90000000) + 10000000,
//             debit: debit,
//             credit: credit,
//             balance: currentBal
//         });
//     }

//     // Final Adjust
//     const diff = target - currentBal;
//     if (Math.abs(diff) > 1) {
//         const finalDate = formatDate(endDate);
//         if (diff > 0) {
//             rows.push({ date: finalDate, desc: "Cash Deposit by Self", ref: "FINAL", debit: "", credit: diff.toFixed(2), balance: target });
//         } else {
//             rows.push({ date: finalDate, desc: "Cheque Withdrawal", ref: "FINAL", debit: Math.abs(diff).toFixed(2), credit: "", balance: target });
//         }
//     }

//     setTransactions(rows);
//     setActiveTab('preview');
//     toast.success("Statement Generated!");
//   };

//   // --- DOC DOWNLOAD ---
//   const generateWordDoc = () => {
//       const rowsHtml = transactions.map(t => `
//         <tr>
//             <td style="padding:3pt; border:1pt solid #ccc;">${t.date}</td>
//             <td style="padding:3pt; border:1pt solid #ccc;">${t.desc}</td>
//             <td style="padding:3pt; border:1pt solid #ccc;">${t.ref}</td>
//             <td style="padding:3pt; border:1pt solid #ccc; text-align:right;">${t.debit ? formatMoney(t.debit) : ''}</td>
//             <td style="padding:3pt; border:1pt solid #ccc; text-align:right;">${t.credit ? formatMoney(t.credit) : ''}</td>
//             <td style="padding:3pt; border:1pt solid #ccc; text-align:right; font-weight:bold;">${formatMoney(t.balance)}</td>
//         </tr>
//       `).join('');

//       const content = `
//         <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
//         <head><meta charset="utf-8"><title>Bank Statement</title>
//         <style>
//             body { font-family: 'Arial', sans-serif; font-size: 9pt; }
//             .header { text-align: center; margin-bottom: 15px; }
//             .bank-name { font-size: 16pt; font-weight: bold; color: #003366; }
//             .meta-table { width: 100%; margin-bottom: 10px; font-size: 9pt; }
//             .txn-table { width: 100%; border-collapse: collapse; font-size: 8pt; }
//             .txn-table th { background-color: #f0f0f0; border: 1pt solid #999; padding: 4pt; text-align:left; }
//             .txn-table td { border: 1pt solid #ccc; padding: 3pt; }
//         </style>
//         </head>
//         <body>
//             <div class="header">
//                 <div class="bank-name">${config.bankName}</div>
//                 <div>${config.branch}</div>
//                 <div style="margin-top:5px; font-weight:bold; text-decoration:underline;">STATEMENT OF ACCOUNT</div>
//             </div>
//             <table class="meta-table">
//                 <tr><td><strong>Account Name:</strong> ${config.accountName}</td><td style="text-align:right;"><strong>Currency:</strong> ${config.currency}</td></tr>
//                 <tr><td><strong>Account No:</strong> ${config.accountNo}</td><td style="text-align:right;"><strong>Date:</strong> ${formatDate(new Date())}</td></tr>
//             </table>
//             <table class="txn-table">
//                 <thead>
//                     <tr>
//                         <th width="12%">Date</th>
//                         <th width="35%">Description</th>
//                         <th width="13%">Ref No</th>
//                         <th width="13%" style="text-align:right;">Debit</th>
//                         <th width="13%" style="text-align:right;">Credit</th>
//                         <th width="14%" style="text-align:right;">Balance</th>
//                     </tr>
//                 </thead>
//                 <tbody>${rowsHtml}</tbody>
//             </table>
//         </body></html>
//       `;
      
//       const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `Statement_${config.accountName.replace(/\s/g,'_')}.doc`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl overflow-hidden flex flex-col max-h-[95vh]">
        
//         {/* Header */}
//         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
//           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//             <FileText className="text-green-600" size={20}/> Smart Bank Statement
//           </h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b bg-gray-50 px-6 pt-2 gap-4">
//             <button onClick={()=>setActiveTab('config')} className={`pb-2 text-sm font-medium ${activeTab==='config' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}>1. Configuration</button>
//             <button onClick={()=>setActiveTab('holidays')} className={`pb-2 text-sm font-medium ${activeTab==='holidays' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}>2. Manage Holidays</button>
//             <button onClick={()=>setActiveTab('preview')} className={`pb-2 text-sm font-medium ${activeTab==='preview' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}>3. Preview & Download</button>
//         </div>

//         <div className="p-6 overflow-y-auto flex-1 bg-white">
            
//             {/* TAB 1: CONFIG */}
//             {activeTab === 'config' && (
//                 <div className="max-w-3xl mx-auto space-y-6">
//                     <div className="grid grid-cols-2 gap-4">
//                         <div><label className="block text-xs font-bold text-gray-500 mb-1">Bank Name</label><input name="bankName" value={config.bankName} onChange={handleConfigChange} className="w-full border p-2 rounded" /></div>
//                         <div><label className="block text-xs font-bold text-gray-500 mb-1">Branch</label><input name="branch" value={config.branch} onChange={handleConfigChange} className="w-full border p-2 rounded" /></div>
//                         <div><label className="block text-xs font-bold text-gray-500 mb-1">Account Name</label><input name="accountName" value={config.accountName} onChange={handleConfigChange} className="w-full border p-2 rounded" /></div>
//                         <div><label className="block text-xs font-bold text-gray-500 mb-1">Account No</label><input name="accountNumber" value={config.accountNumber} onChange={handleConfigChange} className="w-full border p-2 rounded" /></div>
//                     </div>
//                     <hr/>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div><label className="block text-xs font-bold text-gray-500 mb-1">Start Date</label><input type="date" name="startDate" value={config.startDate} onChange={handleConfigChange} className="w-full border p-2 rounded" /></div>
//                         <div><label className="block text-xs font-bold text-gray-500 mb-1">End Date</label><input type="date" name="endDate" value={config.endDate} onChange={handleConfigChange} className="w-full border p-2 rounded" /></div>
//                         <div><label className="block text-xs font-bold text-gray-500 mb-1">Opening Balance</label><input type="number" name="openingBalance" value={config.openingBalance} onChange={handleConfigChange} className="w-full border p-2 rounded" /></div>
//                         <div><label className="block text-xs font-bold text-green-600 mb-1">Target Balance</label><input type="number" name="targetBalance" value={config.targetBalance} onChange={handleConfigChange} className="w-full border-2 border-green-100 p-2 rounded font-bold" /></div>
//                         <div><label className="block text-xs font-bold text-gray-500 mb-1">Min Txn Amount</label><input type="number" name="minTxn" value={config.minTxn} onChange={handleConfigChange} className="w-full border p-2 rounded" /></div>
//                         <div><label className="block text-xs font-bold text-gray-500 mb-1">Max Txn Amount</label><input type="number" name="maxTxn" value={config.maxTxn} onChange={handleConfigChange} className="w-full border p-2 rounded" /></div>
//                     </div>
//                     <div className="flex justify-end">
//                         <button onClick={()=>setActiveTab('holidays')} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Next: Check Holidays</button>
//                     </div>
//                 </div>
//             )}

//             {/* TAB 2: HOLIDAYS */}
//             {activeTab === 'holidays' && (
//                 <div className="flex flex-col md:flex-row gap-8 h-full">
//                     <div className="flex-1">
//                         <h4 className="font-bold text-gray-700 mb-2">Holiday Calendar</h4>
//                         <p className="text-xs text-gray-500 mb-4">Click on dates to mark/unmark them as holidays. Saturdays are automatically skipped.</p>
//                         <div className="border p-4 rounded-lg shadow-sm bg-white inline-block">
//                             <Calendar 
//                                 onClickDay={handleDateClick}
//                                 tileClassName={tileClassName}
//                                 minDate={new Date(config.startDate)}
//                                 maxDate={new Date(config.endDate)}
//                             />
//                         </div>
//                     </div>
//                     <div className="flex-1">
//                         <h4 className="font-bold text-gray-700 mb-2">Selected Holidays ({holidays.length})</h4>
//                         <div className="flex flex-wrap gap-2 mb-4">
//                             {holidays.sort().map(h => (
//                                 <span key={h} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded border border-red-100 flex items-center gap-1">
//                                     {h} <button onClick={() => handleDateClick(new Date(h))}><X size={10}/></button>
//                                 </span>
//                             ))}
//                         </div>
//                         <button onClick={generateStatement} className="w-full py-3 bg-green-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 shadow-md">
//                             <Calculator size={18}/> Generate Transactions
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* TAB 3: PREVIEW */}
//             {activeTab === 'preview' && (
//                 <div className="flex flex-col h-full">
//                     <div className="flex justify-between mb-4">
//                         <h4 className="font-bold text-gray-700">Statement Preview ({transactions.length} Rows)</h4>
//                         <button onClick={generateWordDoc} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 text-sm font-bold">
//                             <Download size={16}/> Download Word
//                         </button>
//                     </div>
                    
//                     <div className="flex-1 overflow-auto border rounded-lg shadow-inner">
//                         <table className="w-full text-sm text-left border-collapse">
//                             <thead className="bg-gray-100 sticky top-0">
//                                 <tr>
//                                     <th className="p-3 border-b">Date</th>
//                                     <th className="p-3 border-b">Description</th>
//                                     <th className="p-3 border-b text-right">Debit</th>
//                                     <th className="p-3 border-b text-right">Credit</th>
//                                     <th className="p-3 border-b text-right">Balance</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y">
//                                 {transactions.map((t, idx) => (
//                                     <tr key={idx} className="hover:bg-gray-50">
//                                         <td className="p-2 border-r text-xs text-gray-600">{t.date}</td>
//                                         <td className="p-2 border-r text-xs">{t.desc}</td>
//                                         <td className="p-2 border-r text-xs text-right text-red-600">{t.debit}</td>
//                                         <td className="p-2 border-r text-xs text-right text-green-600">{t.credit}</td>
//                                         <td className="p-2 text-xs text-right font-bold">{formatMoney(t.balance)}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import { Calculator, Download, FileText, Plus, X } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { getHolidays } from '../../features/holidays/holidaySlice';

// export default function BankStatementGeneratorModal({ isOpen, onClose, student }) {
//   if (!isOpen || !student) return null;

//   const dispatch = useDispatch();
  
//   // 1. Fetch Global Holidays from Redux
//   // We use optional chaining (?.) just in case the state isn't fully loaded yet to prevent crashes
//   const { holidays: globalHolidays } = useSelector((state) => state.holidays) || { holidays: [] };

//   // --- HELPERS ---
//   const formatDate = (dateObj) => {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     return `${dateObj.getDate().toString().padStart(2, '0')}-${months[dateObj.getMonth()]}-${dateObj.getFullYear()}`;
//   };

//   const formatMoney = (amount) => {
//     return new Intl.NumberFormat('en-NP', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
//   };

//   // Helper to get date string YYYY-MM-DD in local time
//   const getDateStr = (date) => {
//       const offset = date.getTimezoneOffset() * 60000;
//       const localDate = new Date(date.getTime() - offset);
//       return localDate.toISOString().split('T')[0];
//   };

//   // --- STATE ---
//   const [activeTab, setActiveTab] = useState('config'); // config, holidays, preview
  
//   const [config, setConfig] = useState({
//     bankName: "Nabil Bank Ltd.",
//     branch: "Pokhara Branch",
//     accountName: `Mr. ${student.familyInfo.fatherName}`,
//     accountNo: "0210017502882",
//     currency: "NPR",
//     startDate: "2024-08-01", 
//     endDate: new Date().toISOString().split('T')[0],
//     openingBalance: 150000.00,
//     targetBalance: 3000000.00,
//     minTxn: 5000,
//     maxTxn: 80000
//   });

//   // Local Holidays (User added for this specific statement)
//   const [localHolidays, setLocalHolidays] = useState([]); 
//   const [newHoliday, setNewHoliday] = useState('');
  
//   // Combined List (Global + Local) used for logic
//   const [allHolidays, setAllHolidays] = useState([]);

//   const interestDates = ["10-16", "01-14", "04-14", "07-16"];
//   const [transactions, setTransactions] = useState([]);

//   // --- EFFECTS ---

//   // 2. Load Global Holidays on Mount
//   useEffect(() => {
//       dispatch(getHolidays());
//   }, [dispatch]);

//   // 3. Sync Global + Local whenever they change
//   useEffect(() => {
//       const globalDates = globalHolidays?.map(h => h.date) || [];
//       // Combine and remove duplicates
//       const merged = Array.from(new Set([...globalDates, ...localHolidays]));
//       setAllHolidays(merged);
//   }, [globalHolidays, localHolidays]);


//   // --- HANDLERS ---
//   const handleConfigChange = (e) => setConfig({...config, [e.target.name]: e.target.value});

//   // Calendar Visuals
//   const tileClassName = ({ date, view }) => {
//     if (view === 'month') {
//         const dateStr = getDateStr(date);
//         if (date.getDay() === 6) return 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'; // Saturday
        
//         // Check if Global or Local
//         const isGlobal = globalHolidays?.some(h => h.date === dateStr);
//         if (isGlobal) return 'bg-purple-100 text-purple-700 font-bold'; // Global = Purple
        
//         if (localHolidays.includes(dateStr)) return 'bg-red-100 text-red-600 font-bold'; // Local = Red
//     }
//   };

//   // Toggle Holiday
//   const handleDateClick = (date) => {
//       if (date.getDay() === 6) return; 
//       const dateStr = getDateStr(date);
      
//       // If Global, warn user (read-only)
//       const isGlobal = globalHolidays?.some(h => h.date === dateStr);
//       if (isGlobal) {
//           toast.info("This is a Global Holiday managed by Admin.");
//           return;
//       }

//       // Toggle Local
//       if (localHolidays.includes(dateStr)) {
//           setLocalHolidays(localHolidays.filter(h => h !== dateStr));
//       } else {
//           setLocalHolidays([...localHolidays, dateStr]);
//       }
//   };
  
//   const addManualHoliday = () => {
//     if (newHoliday && !allHolidays.includes(newHoliday)) {
//         setLocalHolidays([...localHolidays, newHoliday].sort());
//         setNewHoliday('');
//         toast.success("Local holiday added!");
//     }
//   };

//   const removeLocalHoliday = (date) => {
//       setLocalHolidays(localHolidays.filter(h => h !== date));
//   };

//   // --- GENERATOR ALGORITHM ---
//   const generateStatement = () => {
//     let currentBal = parseFloat(config.openingBalance);
//     let currentDate = new Date(config.startDate);
//     const endDate = new Date(config.endDate);
//     const target = parseFloat(config.targetBalance);
    
//     const rows = [];

//     // 1. Opening Balance
//     rows.push({
//         date: formatDate(currentDate),
//         desc: "Balance B/F",
//         ref: "TRANSFER",
//         debit: "",
//         credit: "",
//         balance: currentBal
//     });

//     const totalTime = endDate.getTime() - currentDate.getTime();
//     const growthNeeded = target - currentBal;
//     let safetyCounter = 0;

//     while (currentDate < endDate && safetyCounter < 3000) {
//         safetyCounter++;
//         const jump = Math.floor(Math.random() * 3) + 1; 
//         currentDate.setDate(currentDate.getDate() + jump);
        
//         if (currentDate > endDate) break;

//         const dateStr = getDateStr(currentDate);
//         const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//         const day = String(currentDate.getDate()).padStart(2, '0');
//         const monthDay = `${month}-${day}`;
//         const isSat = currentDate.getDay() === 6;

//         // RULE: Skip Saturdays and ALL Holidays (Global + Local)
//         if (isSat || allHolidays.includes(dateStr)) continue; 

//         // RULE: Interest
//         if (interestDates.includes(monthDay)) {
//             const interest = Math.floor(currentBal * 0.0175);
//             const tax = Math.floor(interest * 0.05);
            
//             currentBal += interest;
//             rows.push({ date: formatDate(new Date(currentDate)), desc: "Interest Posted on A/C", ref: "INT", debit: "", credit: interest, balance: currentBal });
            
//             currentBal -= tax;
//             rows.push({ date: formatDate(new Date(currentDate)), desc: "Tax Deduction", ref: "TAX", debit: tax, credit: "", balance: currentBal });
//             continue;
//         }

//         // RULE: Random Transactions
//         if (Math.random() < 0.3) {
//             const timeElapsed = currentDate.getTime() - new Date(config.startDate).getTime();
//             const progress = timeElapsed / totalTime;
//             const idealBalance = parseFloat(config.openingBalance) + (growthNeeded * progress);
            
//             let isDeposit = currentBal < idealBalance;
//             if (Math.random() > 0.8) isDeposit = !isDeposit;

//             let amount = Math.floor(Math.random() * (config.maxTxn - config.minTxn) + config.minTxn);
//             amount = Math.ceil(amount / 100) * 100; 

//             let desc = ""; let debit = ""; let credit = ""; let ref = Math.floor(Math.random() * 900000) + 100000;

//             if (isDeposit) {
//                 if (Math.random() > 0.9) amount *= 4; 
//                 const depositors = ["Self", "Self", "Self", "Puja Thapa", "Muna Thapa", "Barsha Khadka"]; 
//                 const depositor = depositors[Math.floor(Math.random() * depositors.length)];
//                 desc = `Cash Deposit by ${depositor}`;
//                 currentBal += amount; credit = amount; ref = "";
//             } else {
//                 if (currentBal - amount < 10000) continue; 
//                 desc = "CHEQUE Withdrawal by Self";
//                 currentBal -= amount; debit = amount;
//             }

//             rows.push({ date: formatDate(new Date(currentDate)), desc, ref: ref || "", debit, credit, balance: currentBal });
//         }
//     }

//     // 3. Final Adjustment
//     const diff = target - currentBal;
//     if (Math.abs(diff) > 1) {
//         const finalDate = formatDate(endDate);
//         if (diff > 0) {
//              currentBal += diff;
//              rows.push({ date: finalDate, desc: "Cash Deposit by Self (Final)", ref: "", debit: "", credit: diff.toFixed(2), balance: target });
//         } else {
//              currentBal -= Math.abs(diff);
//              rows.push({ date: finalDate, desc: "Cheque Withdrawal (Final)", ref: "ADJUST", debit: Math.abs(diff).toFixed(2), credit: "", balance: target });
//         }
//     }

//     setTransactions(rows);
//     setActiveTab('preview');
//     toast.success("Statement Generated Successfully!");
//   };

//   // --- WORD EXPORT ---
//   const generateWordDoc = () => {
//       const rowsHtml = transactions.map(t => `
//         <tr>
//             <td style="padding:3pt; border:1pt solid #ccc;">${t.date}</td>
//             <td style="padding:3pt; border:1pt solid #ccc;">${t.desc}</td>
//             <td style="padding:3pt; border:1pt solid #ccc; text-align:center;">${t.ref}</td>
//             <td style="padding:3pt; border:1pt solid #ccc; text-align:right;">${t.debit ? formatMoney(t.debit) : ''}</td>
//             <td style="padding:3pt; border:1pt solid #ccc; text-align:right;">${t.credit ? formatMoney(t.credit) : ''}</td>
//             <td style="padding:3pt; border:1pt solid #ccc; text-align:right; font-weight:bold;">${formatMoney(t.balance)}</td>
//         </tr>
//       `).join('');

//       const content = `
//         <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
//         <head><meta charset="utf-8"><title>Bank Statement</title>
//         <style>
//             body { font-family: 'Arial', sans-serif; font-size: 9pt; }
//             .header { text-align: center; margin-bottom: 15px; }
//             .bank-title { font-size: 16pt; font-weight: bold; color: #003366; }
//             .meta-table { width: 100%; margin-bottom: 10px; font-size: 9pt; }
//             .txn-table { width: 100%; border-collapse: collapse; font-size: 8pt; }
//             .txn-table th { background-color: #f0f0f0; border: 1pt solid #999; padding: 4pt; text-align:left; }
//             .txn-table td { border: 1pt solid #ccc; padding: 3pt; }
//         </style>
//         </head>
//         <body>
//             <div class="header">
//                 <div class="bank-title">${config.bankName}</div>
//                 <div>${config.branch}</div>
//                 <div style="margin-top:5px; font-weight:bold; text-decoration:underline;">STATEMENT OF ACCOUNT</div>
//             </div>
//             <table class="meta-table">
//                 <tr><td><strong>Account Name:</strong> ${config.accountName}</td><td style="text-align:right;"><strong>Currency:</strong> ${config.currency}</td></tr>
//                 <tr><td><strong>Account No:</strong> ${config.accountNo}</td><td style="text-align:right;"><strong>Date:</strong> ${formatDate(new Date())}</td></tr>
//             </table>
//             <table class="txn-table">
//                 <thead>
//                     <tr>
//                         <th width="12%">Date</th>
//                         <th width="35%">Particulars</th>
//                         <th width="10%">Cheque No</th>
//                         <th width="14%" style="text-align:right;">Debit</th>
//                         <th width="14%" style="text-align:right;">Credit</th>
//                         <th width="15%" style="text-align:right;">Balance</th>
//                     </tr>
//                 </thead>
//                 <tbody>${rowsHtml}</tbody>
//             </table>
//         </body></html>
//       `;
      
//       const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `Statement_${config.accountName.replace(/\s/g,'_')}.doc`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl overflow-hidden flex flex-col max-h-[95vh]">
        
//         {/* Header */}
//         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
//           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//             <FileText className="text-green-600" size={20}/> Smart Bank Statement
//           </h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b bg-gray-50 px-6 pt-2 gap-4">
//             <button onClick={()=>setActiveTab('config')} className={`pb-2 text-sm font-medium ${activeTab==='config'?'border-b-2 border-green-600 text-green-600':'text-gray-500'}`}>1. Configuration</button>
//             <button onClick={()=>setActiveTab('holidays')} className={`pb-2 text-sm font-medium ${activeTab==='holidays'?'border-b-2 border-green-600 text-green-600':'text-gray-500'}`}>2. Manage Holidays</button>
//             <button onClick={()=>setActiveTab('preview')} className={`pb-2 text-sm font-medium ${activeTab==='preview'?'border-b-2 border-green-600 text-green-600':'text-gray-500'}`}>3. Preview & Download</button>
//         </div>

//         <div className="p-6 overflow-y-auto flex-1 bg-white">
            
//             {/* TAB 1: CONFIGURATION */}
//             {activeTab === 'config' && (
//                 <div className="max-w-3xl mx-auto space-y-6">
//                     <div className="grid grid-cols-2 gap-4">
//                         <div><label className="text-xs font-bold text-gray-500">Bank Name</label><input name="bankName" value={config.bankName} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                         <div><label className="text-xs font-bold text-gray-500">Branch</label><input name="branch" value={config.branch} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                     </div>
//                     <div><label className="text-xs font-bold text-gray-500">Account Name</label><input name="accountName" value={config.accountName} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                     <div><label className="text-xs font-bold text-gray-500">Account No</label><input name="accountNo" value={config.accountNo} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
                    
//                     <div className="grid grid-cols-2 gap-3">
//                         <div><label className="text-xs font-bold text-gray-500">Start Date</label><input type="date" name="startDate" value={config.startDate} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                         <div><label className="text-xs font-bold text-gray-500">End Date</label><input type="date" name="endDate" value={config.endDate} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                         <div><label className="text-xs font-bold text-gray-500">Opening Bal</label><input type="number" name="openingBalance" value={config.openingBalance} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
//                         <div><label className="text-xs font-bold text-green-600">Target Bal</label><input type="number" name="targetBalance" value={config.targetBalance} onChange={handleConfigChange} className="w-full border-2 border-green-100 p-2 rounded text-sm font-bold"/></div>
//                     </div>
                    
//                     <div><label className="text-xs font-bold text-gray-500">Min/Max Txn</label>
//                         <div className="flex gap-2">
//                             <input type="number" name="minTxn" value={config.minTxn} onChange={handleConfigChange} className="w-1/2 border p-2 rounded text-sm"/>
//                             <input type="number" name="maxTxn" value={config.maxTxn} onChange={handleConfigChange} className="w-1/2 border p-2 rounded text-sm"/>
//                         </div>
//                     </div>

//                     <div className="flex justify-end">
//                         <button onClick={()=>setActiveTab('holidays')} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Next: Check Holidays</button>
//                     </div>
//                 </div>
//             )}

//             {/* TAB 2: HOLIDAY CALENDAR */}
//             {activeTab === 'holidays' && (
//                 <div className="flex flex-col md:flex-row gap-8 h-full">
//                     <div className="flex-1">
//                         <h4 className="font-bold text-gray-700 mb-2">Holiday Calendar</h4>
//                         <p className="text-xs text-gray-500 mb-4">
//                             <span className="inline-block w-3 h-3 bg-purple-100 border border-purple-300 mr-1"></span>Global 
//                             <span className="inline-block w-3 h-3 bg-red-100 border border-red-300 ml-3 mr-1"></span>Local
//                         </p>
//                         <div className="border p-4 rounded-lg shadow-sm bg-white inline-block">
//                             <Calendar 
//                                 onClickDay={handleDateClick}
//                                 tileClassName={tileClassName}
//                                 value={new Date(config.startDate)} // Focus calendar on start date
//                             />
//                         </div>
//                     </div>
//                     <div className="flex-1">
//                         <h4 className="font-bold text-gray-700 mb-2">Skipped Dates ({allHolidays.length})</h4>
//                         <div className="col-span-2">
//                             <label className="text-xs font-bold mb-1 block">Manual Add (YYYY-MM-DD)</label>
//                             <div className="flex gap-2 mb-2">
//                                 <input type="date" value={newHoliday} onChange={(e)=>setNewHoliday(e.target.value)} className="border p-2 rounded text-sm flex-1" />
//                                 <button onClick={addManualHoliday} className="bg-green-600 text-white px-3 rounded flex items-center"><Plus size={16}/></button>
//                             </div>
//                         </div>
//                         <div className="flex flex-wrap gap-2 mb-6 max-h-60 overflow-y-auto border p-2 rounded bg-gray-50">
//                             {globalHolidays?.map(h => (
//                                 <span key={h._id} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200 flex items-center gap-1" title="Global Holiday">
//                                     {h.date}
//                                 </span>
//                             ))}
//                             {localHolidays.map(h => (
//                                 <span key={h} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded border border-red-100 flex items-center gap-1">
//                                     {h} <button onClick={() => removeLocalHoliday(h)}><X size={10}/></button>
//                                 </span>
//                             ))}
//                         </div>
//                         <button onClick={generateStatement} className="w-full py-3 bg-green-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 shadow-md">
//                             <Calculator size={18}/> Generate Transactions
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* TAB 3: PREVIEW */}
//             {activeTab === 'preview' && (
//                 <div className="flex flex-col h-full">
//                     <div className="flex justify-between mb-4">
//                         <h4 className="font-bold text-gray-700">Statement Preview ({transactions.length} Rows)</h4>
//                         <button onClick={generateWordDoc} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 text-sm font-bold">
//                             <Download size={16}/> Download Word
//                         </button>
//                     </div>
                    
//                     <div className="flex-1 overflow-auto border rounded-lg shadow-inner">
//                         <table className="w-full text-sm text-left border-collapse">
//                             <thead className="bg-gray-100 sticky top-0">
//                                 <tr>
//                                     <th className="p-3 border-b">Date</th>
//                                     <th className="p-3 border-b">Particulars</th>
//                                     <th className="p-3 border-b">Cheque No.</th>
//                                     <th className="p-3 border-b text-right">Debit</th>
//                                     <th className="p-3 border-b text-right">Credit</th>
//                                     <th className="p-3 border-b text-right">Balance</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y">
//                                 {transactions.map((t, idx) => (
//                                     <tr key={idx} className="hover:bg-gray-50">
//                                         <td className="p-2 border-r text-xs text-gray-600">{t.date}</td>
//                                         <td className="p-2 border-r text-xs">{t.desc}</td>
//                                         <td className="p-2 border-r text-xs">{t.ref}</td>
//                                         <td className="p-2 border-r text-xs text-right text-red-600">{t.debit ? formatMoney(t.debit) : ''}</td>
//                                         <td className="p-2 border-r text-xs text-right text-green-600">{t.credit ? formatMoney(t.credit) : ''}</td>
//                                         <td className="p-2 text-xs text-right font-bold">{formatMoney(t.balance)}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// }



import { Calculator, Download, FileText, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getHolidays } from '../../features/holidays/holidaySlice';

export default function BankStatementGeneratorModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  const dispatch = useDispatch();
  
  // 1. Fetch Global Holidays from Redux
  const { holidays: globalHolidays } = useSelector((state) => state.holidays) || { holidays: [] };

  // --- HELPERS ---
  const formatDisplayDate = (dateObj) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${dateObj.getDate().toString().padStart(2, '0')}-${months[dateObj.getMonth()]}-${dateObj.getFullYear()}`;
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-NP', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  };

  // ✅ FIXED: Robust Date String Generator (YYYY-MM-DD)
  // This ignores timezones and simply grabs the Year, Month, and Date from the object
  const toSimpleDateString = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  };

  // --- STATE ---
  const [activeTab, setActiveTab] = useState('config'); // config, holidays, preview
  
  const [config, setConfig] = useState({
    bankName: "Nabil Bank Ltd.",
    branch: "Pokhara Branch",
    accountName: `Mr. ${student.familyInfo.fatherName}`,
    accountNo: "0210017502882",
    currency: "NPR",
    startDate: "2024-08-01", 
    endDate: new Date().toISOString().split('T')[0],
    openingBalance: 150000.00,
    targetBalance: 3000000.00,
    minTxn: 5000,
    maxTxn: 80000
  });

  // Local Holidays (User added for this specific statement)
  const [localHolidays, setLocalHolidays] = useState([]); 
  const [newHoliday, setNewHoliday] = useState('');
  
  // Combined List (Global + Local) used for logic
  const [allHolidays, setAllHolidays] = useState([]);

  const interestDates = ["10-16", "01-14", "04-14", "07-16"];
  const [transactions, setTransactions] = useState([]);

  // --- EFFECTS ---

  // 2. Load Global Holidays on Mount
  useEffect(() => {
      dispatch(getHolidays());
  }, [dispatch]);

  // 3. Sync Global + Local whenever they change
  useEffect(() => {
      const globalDates = globalHolidays?.map(h => h.date) || [];
      // Combine and remove duplicates
      const merged = Array.from(new Set([...globalDates, ...localHolidays]));
      setAllHolidays(merged);
  }, [globalHolidays, localHolidays]);


  // --- HANDLERS ---
  const handleConfigChange = (e) => setConfig({...config, [e.target.name]: e.target.value});

  // Calendar Visuals
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
        const dateStr = toSimpleDateString(date);
        if (date.getDay() === 6) return 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'; // Saturday
        
        // Check if Global or Local
        const isGlobal = globalHolidays?.some(h => h.date === dateStr);
        if (isGlobal) return 'bg-purple-100 text-purple-700 font-bold'; // Global = Purple
        
        if (localHolidays.includes(dateStr)) return 'bg-red-100 text-red-600 font-bold'; // Local = Red
    }
  };

  // Toggle Holiday
  const handleDateClick = (date) => {
      if (date.getDay() === 6) return; 
      const dateStr = toSimpleDateString(date); // ✅ Use fixed helper
      
      // If Global, warn user (read-only)
      const isGlobal = globalHolidays?.some(h => h.date === dateStr);
      if (isGlobal) {
          toast.info("This is a Global Holiday managed by Admin.");
          return;
      }

      // Toggle Local
      if (localHolidays.includes(dateStr)) {
          setLocalHolidays(localHolidays.filter(h => h !== dateStr));
      } else {
          setLocalHolidays([...localHolidays, dateStr]);
      }
  };
  
  const addManualHoliday = () => {
    if (newHoliday && !allHolidays.includes(newHoliday)) {
        setLocalHolidays([...localHolidays, newHoliday].sort());
        setNewHoliday('');
        toast.success("Local holiday added!");
    }
  };

  const removeLocalHoliday = (date) => {
      setLocalHolidays(localHolidays.filter(h => h !== date));
  };

  // --- GENERATOR ALGORITHM ---
  const generateStatement = () => {
    let currentBal = parseFloat(config.openingBalance);
    
    // ✅ FIX: Explicitly parse Start Date parts to avoid UTC shifting
    const [startYear, startMonth, startDay] = config.startDate.split('-').map(Number);
    let currentDate = new Date(startYear, startMonth - 1, startDay); // Month is 0-indexed in JS Date

    const [endYear, endMonth, endDay] = config.endDate.split('-').map(Number);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    
    const target = parseFloat(config.targetBalance);
    
    const rows = [];

    // 1. Opening Balance
    rows.push({
        date: formatDisplayDate(currentDate),
        desc: "Balance B/F",
        ref: "TRANSFER",
        debit: "",
        credit: "",
        balance: currentBal
    });

    const totalTime = endDate.getTime() - currentDate.getTime();
    const growthNeeded = target - currentBal;
    let safetyCounter = 0;

    // We start loop from next day so we don't double count start date logic if modified
    while (currentDate < endDate && safetyCounter < 3000) {
        safetyCounter++;
        const jump = Math.floor(Math.random() * 3) + 1; 
        currentDate.setDate(currentDate.getDate() + jump);
        
        if (currentDate > endDate) break;

        // ✅ FIX: Use same string formatter as the calendar click
        const dateStr = toSimpleDateString(currentDate); 
        
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const monthDay = `${month}-${day}`;
        const isSat = currentDate.getDay() === 6;

        // RULE: Skip Saturdays and ALL Holidays (Global + Local)
        // ✅ Debug check: This logic now compares "2024-10-12" with "2024-10-12" exactly
        if (isSat || allHolidays.includes(dateStr)) {
            // console.log(`Skipping Holiday/Sat: ${dateStr}`); // Uncomment to debug
            continue; 
        }

        // RULE: Interest
        if (interestDates.includes(monthDay)) {
            const interest = Math.floor(currentBal * 0.0175);
            const tax = Math.floor(interest * 0.05);
            
            currentBal += interest;
            rows.push({ date: formatDisplayDate(new Date(currentDate)), desc: "Interest Posted on A/C", ref: "INT", debit: "", credit: interest, balance: currentBal });
            
            currentBal -= tax;
            rows.push({ date: formatDisplayDate(new Date(currentDate)), desc: "Tax Deduction", ref: "TAX", debit: tax, credit: "", balance: currentBal });
            continue;
        }

        // RULE: Random Transactions
        if (Math.random() < 0.3) {
            const timeElapsed = currentDate.getTime() - new Date(startYear, startMonth - 1, startDay).getTime();
            const progress = timeElapsed / totalTime;
            const idealBalance = parseFloat(config.openingBalance) + (growthNeeded * progress);
            
            let isDeposit = currentBal < idealBalance;
            if (Math.random() > 0.8) isDeposit = !isDeposit;

            let amount = Math.floor(Math.random() * (config.maxTxn - config.minTxn) + config.minTxn);
            amount = Math.ceil(amount / 100) * 100; 

            let desc = ""; let debit = ""; let credit = ""; let ref = Math.floor(Math.random() * 900000) + 100000;

            if (isDeposit) {
                if (Math.random() > 0.9) amount *= 4; 
                const depositors = ["Self", "Self", "Self", "Puja Thapa", "Elina Budhathoki", "Karan Bohara"]; 
                const depositor = depositors[Math.floor(Math.random() * depositors.length)];
                desc = `Cash Deposit by ${depositor}`;
                currentBal += amount; credit = amount; ref = "";
            } else {
                if (currentBal - amount < 10000) continue; 
                desc = "CHEQUE Withdrawal by Self";
                currentBal -= amount; debit = amount;
            }

            rows.push({ date: formatDisplayDate(new Date(currentDate)), desc, ref: ref || "", debit, credit, balance: currentBal });
        }
    }

    // 3. Final Adjustment
    const diff = target - currentBal;
    if (Math.abs(diff) > 1) {
        const finalDate = formatDisplayDate(endDate);
        if (diff > 0) {
             currentBal += diff;
             rows.push({ date: finalDate, desc: "Cash Deposit by Self ", ref: "", debit: "", credit: diff.toFixed(2), balance: target });
        } else {
             currentBal -= Math.abs(diff);
             rows.push({ date: finalDate, desc: "Cheque Withdrawal ", ref: "ADJUST", debit: Math.abs(diff).toFixed(2), credit: "", balance: target });
        }
    }

    setTransactions(rows);
    setActiveTab('preview');
    toast.success("Statement Generated Successfully!");
  };

  // --- WORD EXPORT ---
  const generateWordDoc = () => {
      const rowsHtml = transactions.map(t => `
        <tr>
            <td style="padding:3pt; border:1pt solid #ccc;">${t.date}</td>
            <td style="padding:3pt; border:1pt solid #ccc;">${t.desc}</td>
            <td style="padding:3pt; border:1pt solid #ccc; text-align:center;">${t.ref}</td>
            <td style="padding:3pt; border:1pt solid #ccc; text-align:right;">${t.debit ? formatMoney(t.debit) : ''}</td>
            <td style="padding:3pt; border:1pt solid #ccc; text-align:right;">${t.credit ? formatMoney(t.credit) : ''}</td>
            <td style="padding:3pt; border:1pt solid #ccc; text-align:right; font-weight:bold;">${formatMoney(t.balance)}</td>
        </tr>
      `).join('');

      const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset="utf-8"><title>Bank Statement</title>
        <style>
            body { font-family: 'Arial', sans-serif; font-size: 9pt; }
            .header { text-align: center; margin-bottom: 15px; }
            .bank-title { font-size: 16pt; font-weight: bold; color: #003366; }
            .meta-table { width: 100%; margin-bottom: 10px; font-size: 9pt; }
            .txn-table { width: 100%; border-collapse: collapse; font-size: 8pt; }
            .txn-table th { background-color: #f0f0f0; border: 1pt solid #999; padding: 4pt; text-align:left; }
            .txn-table td { border: 1pt solid #ccc; padding: 3pt; }
        </style>
        </head>
        <body>
            <div class="header">
                <div class="bank-title">${config.bankName}</div>
                <div>${config.branch}</div>
                <div style="margin-top:5px; font-weight:bold; text-decoration:underline;">STATEMENT OF ACCOUNT</div>
            </div>
            <table class="meta-table">
                <tr><td><strong>Account Name:</strong> ${config.accountName}</td><td style="text-align:right;"><strong>Currency:</strong> ${config.currency}</td></tr>
                <tr><td><strong>Account No:</strong> ${config.accountNo}</td><td style="text-align:right;"><strong>Date:</strong> ${formatDisplayDate(new Date())}</td></tr>
            </table>
            <table class="txn-table">
                <thead>
                    <tr>
                        <th width="12%">Date</th>
                        <th width="35%">Particulars</th>
                        <th width="10%">Cheque No</th>
                        <th width="14%" style="text-align:right;">Debit</th>
                        <th width="14%" style="text-align:right;">Credit</th>
                        <th width="15%" style="text-align:right;">Balance</th>
                    </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
            </table>
        </body></html>
      `;
      
      const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Statement_${config.accountName.replace(/\s/g,'_')}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-green-600" size={20}/> Smart Bank Statement
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50 px-6 pt-2 gap-4">
            <button onClick={()=>setActiveTab('config')} className={`pb-2 text-sm font-medium ${activeTab==='config'?'border-b-2 border-green-600 text-green-600':'text-gray-500'}`}>1. Configuration</button>
            <button onClick={()=>setActiveTab('holidays')} className={`pb-2 text-sm font-medium ${activeTab==='holidays'?'border-b-2 border-green-600 text-green-600':'text-gray-500'}`}>2. Manage Holidays</button>
            <button onClick={()=>setActiveTab('preview')} className={`pb-2 text-sm font-medium ${activeTab==='preview'?'border-b-2 border-green-600 text-green-600':'text-gray-500'}`}>3. Preview & Download</button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-white">
            
            {/* TAB 1: CONFIGURATION */}
            {activeTab === 'config' && (
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-xs font-bold text-gray-500">Bank Name</label><input name="bankName" value={config.bankName} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
                        <div><label className="text-xs font-bold text-gray-500">Branch</label><input name="branch" value={config.branch} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
                    </div>
                    <div><label className="text-xs font-bold text-gray-500">Account Name</label><input name="accountName" value={config.accountName} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
                    <div><label className="text-xs font-bold text-gray-500">Account No</label><input name="accountNo" value={config.accountNo} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs font-bold text-gray-500">Start Date</label><input type="date" name="startDate" value={config.startDate} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
                        <div><label className="text-xs font-bold text-gray-500">End Date</label><input type="date" name="endDate" value={config.endDate} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs font-bold text-gray-500">Opening Bal</label><input type="number" name="openingBalance" value={config.openingBalance} onChange={handleConfigChange} className="w-full border p-2 rounded text-sm"/></div>
                        <div><label className="text-xs font-bold text-green-600">Target Bal</label><input type="number" name="targetBalance" value={config.targetBalance} onChange={handleConfigChange} className="w-full border-2 border-green-100 p-2 rounded text-sm font-bold"/></div>
                    </div>
                    
                    <div><label className="text-xs font-bold text-gray-500">Min/Max Txn</label>
                        <div className="flex gap-2">
                            <input type="number" name="minTxn" value={config.minTxn} onChange={handleConfigChange} className="w-1/2 border p-2 rounded text-sm"/>
                            <input type="number" name="maxTxn" value={config.maxTxn} onChange={handleConfigChange} className="w-1/2 border p-2 rounded text-sm"/>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button onClick={()=>setActiveTab('holidays')} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Next: Check Holidays</button>
                    </div>
                </div>
            )}

            {/* TAB 2: HOLIDAY CALENDAR */}
            {activeTab === 'holidays' && (
                <div className="flex flex-col md:flex-row gap-8 h-full">
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-700 mb-2">Holiday Calendar</h4>
                        <p className="text-xs text-gray-500 mb-4">
                            <span className="inline-block w-3 h-3 bg-purple-100 border border-purple-300 mr-1"></span>Global 
                            <span className="inline-block w-3 h-3 bg-red-100 border border-red-300 ml-3 mr-1"></span>Local
                        </p>
                        <div className="border p-4 rounded-lg shadow-sm bg-white inline-block">
                            <Calendar 
                                onClickDay={handleDateClick}
                                tileClassName={tileClassName}
                                value={new Date(config.startDate)} 
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-700 mb-2">Skipped Dates ({allHolidays.length})</h4>
                        <div className="col-span-2">
                            <label className="text-xs font-bold mb-1 block">Manual Add (YYYY-MM-DD)</label>
                            <div className="flex gap-2 mb-2">
                                <input type="date" value={newHoliday} onChange={(e)=>setNewHoliday(e.target.value)} className="border p-2 rounded text-sm flex-1" />
                                <button onClick={addManualHoliday} className="bg-green-600 text-white px-3 rounded flex items-center"><Plus size={16}/></button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6 max-h-60 overflow-y-auto border p-2 rounded bg-gray-50">
                            {globalHolidays?.map(h => (
                                <span key={h._id} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200 flex items-center gap-1" title="Global Holiday">
                                    {h.date}
                                </span>
                            ))}
                            {localHolidays.map(h => (
                                <span key={h} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded border border-red-100 flex items-center gap-1">
                                    {h} <button onClick={() => removeLocalHoliday(h)}><X size={10}/></button>
                                </span>
                            ))}
                        </div>
                        <button onClick={generateStatement} className="w-full py-3 bg-green-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 shadow-md">
                            <Calculator size={18}/> Generate Transactions
                        </button>
                    </div>
                </div>
            )}

            {/* TAB 3: PREVIEW */}
            {activeTab === 'preview' && (
                <div className="flex flex-col h-full">
                    <div className="flex justify-between mb-4">
                        <h4 className="font-bold text-gray-700">Statement Preview ({transactions.length} Rows)</h4>
                        <button onClick={generateWordDoc} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 text-sm font-bold">
                            <Download size={16}/> Download Word
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-auto border rounded-lg shadow-inner">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="p-3 border-b">Date</th>
                                    <th className="p-3 border-b">Particulars</th>
                                    <th className="p-3 border-b">Cheque No.</th>
                                    <th className="p-3 border-b text-right">Debit</th>
                                    <th className="p-3 border-b text-right">Credit</th>
                                    <th className="p-3 border-b text-right">Balance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {transactions.map((t, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="p-2 border-r text-xs text-gray-600">{t.date}</td>
                                        <td className="p-2 border-r text-xs">{t.desc}</td>
                                        <td className="p-2 border-r text-xs">{t.ref}</td>
                                        <td className="p-2 border-r text-xs text-right text-red-600">{t.debit ? formatMoney(t.debit) : ''}</td>
                                        <td className="p-2 border-r text-xs text-right text-green-600">{t.credit ? formatMoney(t.credit) : ''}</td>
                                        <td className="p-2 text-xs text-right font-bold">{formatMoney(t.balance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}