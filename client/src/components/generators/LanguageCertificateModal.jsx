// import { BookOpen, Calculator, Download, LayoutTemplate, X } from 'lucide-react';
// import { useEffect, useState } from 'react';

// export default function LanguageCertificateModal({ isOpen, onClose, student }) {
//   if (!isOpen || !student) return null;

//   // --- 1. INITIAL STATE ---
//   const [formData, setFormData] = useState({
//     // Header (Dynamic)
//     companyName: 'UMI Abroad Study Pvt. Ltd.',
//     companyAddress: 'Bagbazar-28, Kathmandu, Nepal',
//     companyPhone: 'Phone No.: 01-5925263, 9851117263',
//     companyEmail: 'umiabroadstudy@gmail.com',
//     companyWeb: 'www.umiabroadstudy.com',

//     // Meta
//     refNo: '106/2025',
//     issueDate: new Date().toISOString().split('T')[0],
    
//     // Student Info
//     studentName: '',
//     sex: 'Male',
//     dob: '',
//     nationality: 'NEPAL',

//     // Course Info (Defaults or from DB)
//     courseName: '初級日本語 (Elementary Japanese)',
//     textbook: 'みんなの日本語 I/II (Minna no Nihongo)',
//     startDate: '2025-04-20',
//     endDate: '2026-02-16',
    
//     // Attendance Logic
//     totalDays: 256,
//     attendedDays: 234,
//     hoursPerDay: 2, 
//     remarks: '日曜日から金曜日 (Sun-Fri)\n(am7:00 から am9:00)',
    
//     // Scores (Max 100 each)
//     vocabScore: 84,    // 文字・語彙
//     listeningScore: 90, // 聴解
//     readingScore: 89,   // 読解・文法
//     conversationScore: 91, // 会話
    
//     // Signatories
//     teacherName: 'Karuna Panthee',
//     principalName: 'Sudan Pandey'
//   });

//   const [includeHeader, setIncludeHeader] = useState(true);

//   // Derived State
//   const [stats, setStats] = useState({
//     totalHours: 0,
//     attendedHours: 0,
//     attendanceRate: 0,
//     totalScore: 0,
//     totalMax: 400
//   });

//   // --- 2. POPULATE DATA ---
//   useEffect(() => {
//     if(student) {
//         const certData = student.visaDetails?.japaneseLanguage?.certificateDetails || {};
        
//         setFormData(prev => ({
//             ...prev,
//             studentName: (student.personalInfo.firstName + ' ' + student.personalInfo.lastName).toUpperCase(),
//             sex: student.personalInfo.gender === 'Female' ? '女' : '男',
//             dob: student.personalInfo.dobAD ? new Date(student.personalInfo.dobAD).toISOString().split('T')[0] : '',
            
//             // Prefer saved data, fallback to defaults
//             courseName: certData.courseName || prev.courseName,
//             textbook: certData.textbook || prev.textbook,
//             startDate: certData.startDate ? new Date(certData.startDate).toISOString().split('T')[0] : prev.startDate,
//             endDate: certData.endDate ? new Date(certData.endDate).toISOString().split('T')[0] : prev.endDate,
            
//             vocabScore: certData.scores?.vocab || prev.vocabScore,
//             listeningScore: certData.scores?.listening || prev.listeningScore,
//             readingScore: certData.scores?.reading || prev.readingScore,
//             conversationScore: certData.scores?.conversation || prev.conversationScore
//         }));
//     }
//   }, [student]);

//   // --- 3. AUTO-CALCULATE ---
//   useEffect(() => {
//     const totH = formData.totalDays * formData.hoursPerDay;
//     const attH = formData.attendedDays * formData.hoursPerDay;
//     const rate = formData.totalDays > 0 ? ((formData.attendedDays / formData.totalDays) * 100).toFixed(2) : 0;
//     const totalS = Number(formData.vocabScore) + Number(formData.listeningScore) + Number(formData.readingScore) + Number(formData.conversationScore);

//     setStats({
//         totalHours: totH,
//         attendedHours: attH,
//         attendanceRate: rate,
//         totalScore: totalS,
//         totalMax: 400
//     });
//   }, [formData.totalDays, formData.attendedDays, formData.hoursPerDay, formData.vocabScore, formData.listeningScore, formData.readingScore, formData.conversationScore]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // --- 4. WORD DOC GENERATOR ---
//   const generateWordDoc = () => {
//     const content = `
//       <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
//       <head>
//         <meta charset="utf-8">
//         <title>Language Certificate</title>
//         <style>
//           @page { size: A4; margin: 0.5in 0.6in; }
//           body { font-family: 'MS Mincho', 'Times New Roman', serif; font-size: 10.5pt; line-height: 1.3; }
          
//           /* HEADER */
//           .header-box { text-align: center; color: #4F81BD; margin-bottom: 15pt; }
//           .company-name { font-size: 24pt; font-weight: bold; margin: 0; }
//           .company-details { font-size: 10pt; margin: 2pt 0; }
          
//           /* TITLES */
//           .cert-title { text-align: center; font-size: 18pt; font-weight: bold; text-decoration: underline; margin: 20pt 0; letter-spacing: 2px; }

//           /* TABLES */
//           table { width: 100%; border-collapse: collapse; margin-bottom: 0; }
//           td, th { border: 1pt solid black; padding: 5pt; vertical-align: middle; }
          
//           .label-col { background-color: #f2f2f2; font-weight: bold; text-align: center; width: 18%; }
//           .val-col { text-align: center; width: 32%; }
//           .wide-val { text-align: center; }

//           .score-header { background-color: #f2f2f2; font-weight: bold; text-align: center; }
          
//           /* FOOTER NOTES */
//           .notes { font-size: 9pt; margin-top: 10pt; line-height: 1.4; }
          
//           /* SIGNATURES */
//           .sig-table { width: 100%; margin-top: 50pt; border: none; }
//           .sig-td { border: none; text-align: center; vertical-align: top; width: 33%; }
//           .sig-line { border-top: 1pt solid black; width: 80%; margin: 0 auto 5pt auto; }
          
//           .footer-bar { margin-top: 40pt; border-top: 2pt solid #4F81BD; padding-top: 5pt; text-align: center; font-size: 9pt; color: #eab308; font-weight: bold; }
//         </style>
//       </head>
//       <body>
        
//         ${includeHeader ? `
//         <div class="header-box">
//             <div class="company-name">${formData.companyName}</div>
//             <div class="company-details">${formData.companyAddress}</div>
//             <div class="company-details">${formData.companyPhone}</div>
//         </div>
//         ` : `<div style="height: 100pt;"></div>`}

//         <table style="border: none; margin-bottom: 10pt;">
//             <tr>
//                 <td style="border: none; text-align: left; font-weight: bold;">証明書番号: ${formData.refNo}</td>
//                 <td style="border: none; text-align: right; font-weight: bold;">発行日 : ${formData.issueDate}</td>
//             </tr>
//         </table>

//         <div class="cert-title">日本語学習証明書</div>

//         <table style="margin-bottom: 20pt;">
//             <tr>
//                 <td class="label-col" style="text-align: left; padding-left: 10pt;">学生氏名 : <br>Name</td>
//                 <td class="wide-val" style="text-align: left; padding-left: 10pt; font-weight: bold;">${formData.studentName}</td>
//                 <td class="label-col">性別 <br>Sex</td>
//                 <td class="val-col">${formData.sex}</td>
//             </tr>
//             <tr>
//                 <td class="label-col" style="text-align: left; padding-left: 10pt;">生年月日 : <br>DOB</td>
//                 <td class="wide-val" style="text-align: left; padding-left: 10pt;">${formData.dob}</td>
//                 <td class="label-col">国籍 <br>Nationality</td>
//                 <td class="val-col">${formData.nationality}</td>
//             </tr>
//         </table>

//         <table>
//             <tr>
//                 <td class="label-col">課程<br>Course</td>
//                 <td class="val-col">${formData.courseName}</td>
//                 <td class="label-col">教材<br>Textbook</td>
//                 <td class="val-col">${formData.textbook}</td>
//             </tr>
//             <tr>
//                 <td class="label-col">日本語学習期間<br>Duration</td>
//                 <td class="val-col">${formData.startDate} ～ ${formData.endDate} (終了予定)</td>
//                 <td class="label-col">合計学習時間<br>Total Hours</td>
//                 <td class="val-col">${stats.totalHours} 時間</td>
//             </tr>
//             <tr>
//                 <td class="label-col">学習期間<br>Attended Days</td>
//                 <td class="val-col">${formData.attendedDays} 日 / ${formData.totalDays} 日間</td>
//                 <td class="label-col">現在までの<br>総学習時間<br>Attended Hours</td>
//                 <td class="val-col">${stats.attendedHours} / ${stats.totalHours} 時間</td>
//             </tr>
//             <tr>
//                 <td class="label-col">備考<br>Remarks</td>
//                 <td class="val-col" style="white-space: pre-wrap;">${formData.remarks}</td>
//                 <td class="label-col">出席率<br>Attendance</td>
//                 <td class="val-col" style="font-weight: bold;">${stats.attendanceRate}%</td>
//             </tr>
//         </table>

//         <div class="notes">
//             <p>日本語学習状況が下記の通りであることをここに証明致します。</p>
//             <p>※ 休日・祝祭日はネパールカレンダー、当校規定に基づきます。</p>
//             <p>※ 欠席に関しましては原則振替授業を義務づけています。</p>
//         </div>

//         <table style="margin-top: 15pt;">
//             <tr>
//                 <td class="score-header">文字・語彙<br>Vocab</td>
//                 <td class="score-header">聴解<br>Listening</td>
//                 <td class="score-header">読解・文法<br>Reading/Grammar</td>
//                 <td class="score-header">会話<br>Conversation</td>
//                 <td class="score-header">総合点<br>Total</td>
//             </tr>
//             <tr>
//                 <td>${formData.vocabScore} / 100</td>
//                 <td>${formData.listeningScore} / 100</td>
//                 <td>${formData.readingScore} / 100</td>
//                 <td>${formData.conversationScore} / 100</td>
//                 <td style="font-weight: bold;">${stats.totalScore} / ${stats.totalMax}</td>
//             </tr>
//         </table>

//         <table class="sig-table">
//             <tr>
//                 <td class="sig-td">
//                     <div class="sig-line"></div>
//                     <div>日本語教師</div>
//                     <strong>${formData.teacherName}</strong>
//                 </td>
//                 <td class="sig-td">
//                     <div class="sig-line" style="border:none;"></div>
//                     <div style="margin-top:10px;">学校印</div>
//                 </td>
//                 <td class="sig-td">
//                     <div class="sig-line"></div>
//                     <div>校長</div>
//                     <strong>${formData.principalName}</strong>
//                 </td>
//             </tr>
//         </table>

//         ${includeHeader ? `
//         <div class="footer-bar">
//             Web: ${formData.companyWeb} &nbsp;&nbsp;&nbsp; Email: ${formData.companyEmail}
//         </div>
//         ` : ''}

//       </body>
//       </html>
//     `;

//     const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Language_Certificate_${formData.studentName.replace(/\s+/g, '_')}.doc`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[95vh]">
        
//         {/* Header */}
//         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
//           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//             <BookOpen className="text-blue-600" size={20}/> Language Certificate Generator
//           </h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
//         </div>

//         <div className="p-6 overflow-y-auto">
//           <div className="flex flex-col xl:flex-row gap-8">
            
//             {/* LEFT: EDITABLE FIELDS */}
//             <div className="flex-1 space-y-6">
                
//                 {/* Header Toggle */}
//                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex justify-between items-center">
//                     <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase">
//                         <LayoutTemplate size={14}/> Header Settings
//                     </div>
//                     <label className="flex items-center gap-2 text-xs font-bold text-blue-800 cursor-pointer">
//                         <input type="checkbox" checked={includeHeader} onChange={e => setIncludeHeader(e.target.checked)} className="rounded text-blue-600"/>
//                         Print Letterhead
//                     </label>
//                 </div>

//                 {/* Course Details */}
//                 <div className="bg-white p-4 rounded-lg border border-gray-200">
//                     <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Course Info</h4>
//                     <div className="grid grid-cols-2 gap-3">
//                         <div className="col-span-2"><label className="label">Course Name</label><input name="courseName" value={formData.courseName} onChange={handleChange} className="input-field" /></div>
//                         <div className="col-span-2"><label className="label">Textbook</label><input name="textbook" value={formData.textbook} onChange={handleChange} className="input-field" /></div>
//                         <div><label className="label">Start Date</label><input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input-field" /></div>
//                         <div><label className="label">End Date</label><input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="input-field" /></div>
//                     </div>
//                 </div>

//                 {/* Attendance */}
//                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                     <div className="flex justify-between items-center mb-3">
//                         <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"><Calculator size={14}/> Attendance</h4>
//                         <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">{stats.attendanceRate}%</span>
//                     </div>
//                     <div className="grid grid-cols-3 gap-3">
//                         <div><label className="label">Total Days</label><input type="number" name="totalDays" value={formData.totalDays} onChange={handleChange} className="input-field" /></div>
//                         <div><label className="label">Attended Days</label><input type="number" name="attendedDays" value={formData.attendedDays} onChange={handleChange} className="input-field" /></div>
//                         <div><label className="label">Hours/Day</label><input type="number" name="hoursPerDay" value={formData.hoursPerDay} onChange={handleChange} className="input-field" /></div>
//                     </div>
//                     <div className="mt-3"><label className="label">Remarks</label><textarea name="remarks" value={formData.remarks} onChange={handleChange} className="input-field h-16" /></div>
//                 </div>

//                 {/* Scores */}
//                 <div className="grid grid-cols-4 gap-2">
//                     <div><label className="label text-[10px] text-center">Vocab</label><input type="number" name="vocabScore" value={formData.vocabScore} onChange={handleChange} className="input-field text-center font-bold" /></div>
//                     <div><label className="label text-[10px] text-center">Listening</label><input type="number" name="listeningScore" value={formData.listeningScore} onChange={handleChange} className="input-field text-center font-bold" /></div>
//                     <div><label className="label text-[10px] text-center">Reading</label><input type="number" name="readingScore" value={formData.readingScore} onChange={handleChange} className="input-field text-center font-bold" /></div>
//                     <div><label className="label text-[10px] text-center">Conv.</label><input type="number" name="conversationScore" value={formData.conversationScore} onChange={handleChange} className="input-field text-center font-bold" /></div>
//                 </div>
//             </div>

//             {/* RIGHT: PREVIEW */}
//             <div className="flex-1 bg-gray-100 rounded-lg p-6 flex justify-center overflow-auto h-[650px]">
//                 <div className="bg-white shadow-sm p-8 w-full max-w-[210mm] text-[10px] font-serif leading-relaxed text-justify relative min-h-[297mm] flex flex-col">
                    
//                     {includeHeader ? (
//                         <div className="text-center text-blue-800 mb-6 border-b-2 border-blue-800 pb-2">
//                             <h1 className="text-2xl font-bold uppercase">{formData.companyName}</h1>
//                             <p className="text-xs">{formData.companyAddress}</p>
//                             <p className="text-xs">{formData.companyPhone}</p>
//                         </div>
//                     ) : (
//                          <div className="h-24 bg-gray-50 border border-dashed border-gray-300 mb-4 flex items-center justify-center text-gray-400 text-xs">
//                             (Letterhead Space)
//                         </div>
//                     )}

//                     <div className="flex justify-between font-bold mb-6 text-xs">
//                         <span>証明書番号: {formData.refNo}</span>
//                         <span>発行日 : {formData.issueDate}</span>
//                     </div>

//                     <h2 className="text-xl font-bold underline mb-6 text-center tracking-widest">日本語学習証明書</h2>

//                     {/* Student Info */}
//                     <table className="w-full border-collapse border border-black mb-0 text-xs">
//                         <tbody>
//                             <tr>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold w-1/5">学生氏名</td>
//                                 <td className="border border-black p-2 font-bold w-2/5">{formData.studentName}</td>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold w-1/5 text-center">性別</td>
//                                 <td className="border border-black p-2 w-1/5 text-center">{formData.sex}</td>
//                             </tr>
//                             <tr>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold">生年月日</td>
//                                 <td className="border border-black p-2">{formData.dob}</td>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold text-center">国籍</td>
//                                 <td className="border border-black p-2 text-center">{formData.nationality}</td>
//                             </tr>
//                         </tbody>
//                     </table>

//                     {/* Course Info */}
//                     <table className="w-full border-collapse border border-black mb-4 text-xs mt-[-1px]">
//                         <tbody>
//                             <tr>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold w-1/5">課程</td>
//                                 <td className="border border-black p-2 w-2/5">{formData.courseName}</td>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold w-1/5 text-center">教材</td>
//                                 <td className="border border-black p-2 w-1/5 text-center">{formData.textbook}</td>
//                             </tr>
//                             <tr>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold">日本語学習期間</td>
//                                 <td className="border border-black p-2">{formData.startDate} ～ {formData.endDate} (終了予定)</td>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold text-center">合計学習時間</td>
//                                 <td className="border border-black p-2 text-center">{stats.totalHours} 時間</td>
//                             </tr>
//                             <tr>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold">学習期間</td>
//                                 <td className="border border-black p-2">{formData.attendedDays} 日 / {formData.totalDays} 日間</td>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold text-center">現在までの<br/>総学習時間</td>
//                                 <td className="border border-black p-2 text-center">{stats.attendedHours} / {stats.totalHours} 時間</td>
//                             </tr>
//                             <tr>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold">備考</td>
//                                 <td className="border border-black p-2" style={{whiteSpace: 'pre-wrap'}}>{formData.remarks}</td>
//                                 <td className="border border-black p-2 bg-gray-50 font-bold text-center">出席率</td>
//                                 <td className="border border-black p-2 font-bold text-center">{stats.attendanceRate}%</td>
//                             </tr>
//                         </tbody>
//                     </table>

//                     <div className="w-full text-left text-[9px] mb-4 pl-1">
//                         <p>日本語学習状況が下記の通りであることをここに証明致します。</p>
//                         <p className="text-gray-500 mt-1">※ 休日・祝祭日はネパールカレンダー、当校規定に基づきます。</p>
//                         <p className="text-gray-500">※ 欠席に関しましては原則振替授業を義務づけています。</p>
//                     </div>

//                     {/* Scores */}
//                     <table className="w-full border-collapse border border-black mb-12 text-center text-xs">
//                         <thead>
//                             <tr className="bg-gray-50 font-bold">
//                                 <td className="border border-black p-2">文字・語彙</td>
//                                 <td className="border border-black p-2">聴解</td>
//                                 <td className="border border-black p-2">読解・文法</td>
//                                 <td className="border border-black p-2">会話</td>
//                                 <td className="border border-black p-2">総合点</td>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td className="border border-black p-2">{formData.vocabScore} / 100</td>
//                                 <td className="border border-black p-2">{formData.listeningScore} / 100</td>
//                                 <td className="border border-black p-2">{formData.readingScore} / 100</td>
//                                 <td className="border border-black p-2">{formData.conversationScore} / 100</td>
//                                 <td className="border border-black p-2 font-bold">{stats.totalScore} / 400</td>
//                             </tr>
//                         </tbody>
//                     </table>

//                     {/* Signatures */}
//                     <div className="w-full grid grid-cols-3 gap-4 mt-auto mb-8 text-center text-xs">
//                         <div>
//                             <div className="border-t border-black mb-1 w-3/4 mx-auto"></div>
//                             <p className="font-bold">日本語教師</p>
//                             <p>{formData.teacherName}</p>
//                         </div>
//                         <div>
//                             <div className="border-t border-black mb-1 w-3/4 mx-auto"></div>
//                             <p className="font-bold">学校印</p>
//                         </div>
//                         <div>
//                             <div className="border-t border-black mb-1 w-3/4 mx-auto"></div>
//                             <p className="font-bold">校長</p>
//                             <p>{formData.principalName}</p>
//                         </div>
//                     </div>

//                     {includeHeader && (
//                         <div className="border-t-2 border-blue-800 pt-2 text-center text-yellow-600 font-bold text-[9px] w-full mt-4">
//                             Web: {formData.companyWeb} &nbsp;&nbsp;&nbsp; Email: {formData.companyEmail}
//                         </div>
//                     )}

//                 </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
//           <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition">Cancel</button>
//           <button onClick={generateWordDoc} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95 transition">
//             <Download size={16} /> Download .DOC Word File
//           </button>
//         </div>

//         <style jsx>{`
//             .label { display: block; font-size: 10px; font-weight: bold; color: #6b7280; text-transform: uppercase; margin-bottom: 4px; }
//             .input-field { width: 100%; border: 1px solid #d1d5db; padding: 6px; border-radius: 6px; font-size: 12px; }
//         `}</style>

//       </div>
//     </div>
//   );
// }

import { BookOpen, Calculator, Download, LayoutTemplate, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LanguageCertificateModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  // --- 1. INITIAL STATE ---
  const [formData, setFormData] = useState({
    // Header (Dynamic)
    companyName: 'UMI Abroad Study Pvt. Ltd.',
    companyAddress: 'Bagbazar-28, Kathmandu, Nepal',
    companyPhone: 'Phone No.: 01-5925263, 9851117263',
    companyEmail: 'umiabroadstudy@gmail.com',
    companyWeb: 'www.umiabroadstudy.com',

    // Meta
    certNo: '106/2025',
    refNo: '2081/082/ 431',
    issueDate: '2025年 09月 21日',
    
    // Student Info
    studentName: '',
    sex: 'Male',
    dob: '',
    nationality: 'ネパール',

    // Course Info
    courseName: '初級日本語',
    textbook: 'みんなの日本語I/II',
    
    startDate: '2025/04/20',
    endDate: '2026/02/16',
    
    // Attendance Logic
    totalHours: 512,
    totalDays: 256,
    attendedDays: 117,
    attendedHours: 234, 
    
    remarks: '日曜日から金曜日\n（am7:00からam9:00）',
    attendanceRate: '100.00%',
    
    // Scores
    vocabScore: 84,    
    listeningScore: 90, 
    readingScore: 89,   
    conversationScore: 91,
    totalScore: 354,
    totalMax: 400,
    
    // Signatories
    teacherName: 'Karuna Panthee',
    principalName: 'Sudan Pandey'
  });

  const [includeHeader, setIncludeHeader] = useState(true);

  // --- 2. POPULATE DATA ---
  useEffect(() => {
    if(student) {
        const certData = student.visaDetails?.japaneseLanguage?.certificateDetails || {};
        
        const formatDateJP = (dateStr) => {
            if(!dateStr) return '';
            const d = new Date(dateStr);
            return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`;
        };

        const formatDateSlash = (dateStr) => {
             if(!dateStr) return '';
             const d = new Date(dateStr);
             return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
        };
        
        setFormData(prev => ({
            ...prev,
            studentName: (student.personalInfo.firstName + ' ' + student.personalInfo.lastName).toUpperCase(),
            sex: student.personalInfo.gender,
            dob: formatDateJP(student.personalInfo.dobAD),
            
            courseName: certData.courseName || prev.courseName,
            textbook: certData.textbook || prev.textbook,
            startDate: certData.startDate ? formatDateSlash(certData.startDate) : prev.startDate,
            endDate: certData.endDate ? formatDateSlash(certData.endDate) : prev.endDate,
            
            vocabScore: certData.scores?.vocab || prev.vocabScore,
            listeningScore: certData.scores?.listening || prev.listeningScore,
            readingScore: certData.scores?.reading || prev.readingScore,
            conversationScore: certData.scores?.conversation || prev.conversationScore,
            
            totalHours: certData.totalHours || prev.totalHours,
            attendedHours: certData.attendedHours || prev.attendedHours,
            attendanceRate: certData.attendanceRate ? certData.attendanceRate + '%' : prev.attendanceRate,
        }));
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- 3. WORD DOC GENERATOR ---
  const generateWordDoc = () => {
    const isMale = formData.sex === 'Male';
    // Visual circle for gender selection
    const sexDisplay = isMale 
        ? '<span style="border: 1px solid black; border-radius: 50%; padding: 0 4px;">男</span> &nbsp; 女' 
        : '男 &nbsp; <span style="border: 1px solid black; border-radius: 50%; padding: 0 4px;">女</span>';

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Language Certificate</title>
        <style>
          @page { size: A4; margin: 0.5in 0.6in; }
          body { font-family: 'MS Mincho', 'Times New Roman', serif; font-size: 11pt; line-height: 1.3; }
          
          /* HEADER (Blue & Logo-like) */
          .header-table { width: 100%; border-bottom: 2pt solid #8080ff; margin-bottom: 5pt; }
          .header-title { font-size: 24pt; font-weight: bold; color: #6a6aff; text-align: center; }
          .header-sub { font-size: 10pt; color: #6a6aff; text-align: center; }
          
          /* CERT TITLE */
          .cert-title { text-align: center; font-size: 20pt; font-weight: bold; text-decoration: underline; margin: 15pt 0; letter-spacing: 2px; }

          /* REF SECTION */
          .ref-table { width: 100%; border: none; margin-bottom: 5pt; font-size: 10pt; font-weight: bold; }
          .ref-table td { border: none; vertical-align: bottom; }

          /* MAIN TABLES */
          table { width: 100%; border-collapse: collapse; margin-bottom: 0; }
          td, th { border: 1pt solid black; padding: 4pt; vertical-align: middle; text-align: center; }
          
          /* SPECIFIC STYLES FOR LANGUAGE CERT */
          .label-col { font-weight: bold; text-align: center; width: 15%; }
          .val-col { text-align: center; }
          
          .bold-text { font-weight: bold; }
          .align-left { text-align: left !important; padding-left: 10pt !important; }
          
          /* NOTES & FOOTER */
          .notes { font-size: 9pt; margin-top: 5pt; line-height: 1.4; margin-bottom: 15pt; }
          
          .score-header { font-weight: bold; }
          
          /* SIGNATURES */
          .sig-table { width: 100%; margin-top: 40pt; border: none; }
          .sig-td { border: none; text-align: center; vertical-align: top; width: 33%; }
          .sig-line { border-top: 1pt solid black; width: 60%; margin: 0 auto; }
          .sig-label { font-size: 10pt; }
          
          .footer-links { margin-top: 30pt; text-align: center; font-size: 9pt; color: #eab308; font-weight: bold; }
        </style>
      </head>
      <body>
        
        ${includeHeader ? `
        <div style="text-align:center; margin-bottom:10px;">
           <h1 class="header-title" style="margin:0;">UMI Abroad Study Pvt. Ltd.</h1>
           <p class="header-sub" style="margin:0;">${formData.companyAddress}</p>
           <p class="header-sub" style="margin:0;">${formData.companyPhone}</p>
           <div style="border-bottom: 1pt solid #8080ff; margin-top:5px;"></div>
        </div>
        ` : `<div style="height: 80pt;"></div>`}

        <table class="ref-table">
            <tr>
                <td style="text-align: left;">証明書番号: ${formData.certNo}</td>
                <td style="text-align: right;">発行日：${formData.issueDate}</td>
            </tr>
            <tr>
                <td style="text-align: left;">.: ${formData.refNo}</td>
                <td></td>
            </tr>
        </table>

        <div class="cert-title">日本語学習証明書</div>

        <table style="margin-bottom: 15pt;">
            <tr>
                <td class="label-col align-left">学生氏名：</td>
                <td class="val-col align-left bold-text" colspan="2">${formData.studentName}</td>
                <td class="label-col">性別</td>
                <td class="val-col">${sexDisplay}</td>
            </tr>
            <tr>
                <td class="label-col align-left">生年月日：</td>
                <td class="val-col align-left" colspan="2">${formData.dob}</td>
                <td class="label-col">国籍</td>
                <td class="val-col">${formData.nationality}</td>
            </tr>
        </table>

        <table>
            <tr>
                <td class="label-col">課程</td>
                <td class="val-col">${formData.courseName}</td>
                <td class="label-col">教材</td>
                <td class="val-col">${formData.textbook}</td>
            </tr>
            
            <tr>
                <td class="label-col">日本語学習期間</td>
                <td class="val-col">
                    ${formData.startDate} ～ ${formData.endDate} (修了予定)
                </td>
                <td class="label-col">合計学習時間</td>
                <td class="val-col">${formData.totalHours} 時間</td>
            </tr>

            <tr>
                <td class="label-col">学習期間</td>
                <td class="val-col">
                     ${formData.attendedDays} 日/${formData.totalDays} 日間
                </td>
                <td class="label-col">現在までの<br>総学習時間</td>
                <td class="val-col">${formData.attendedHours}/${formData.totalHours} 時間</td>
            </tr>

            <tr>
                <td class="label-col">備考</td>
                <td class="val-col" style="white-space: pre-line;">${formData.remarks}</td>
                <td class="label-col">出席率</td>
                <td class="val-col bold-text">${formData.attendanceRate}</td>
            </tr>
        </table>

        <div class="notes" style="margin-top: 10pt;">
            <p>日本語学習状況が下記の通りであることをここに証明致します。</p>
            <br/>
            <p style="font-size: 8pt;">※休日・祝祭日はネパールカレンダー、当校規定に基づきます。</p>
            <p style="font-size: 8pt;">※欠席に関しましては原則振替授業を義務づけています。</p>
        </div>

        <table style="width: 80%; margin: 0 auto;">
            <tr>
                <td class="score-header">文字・語彙</td>
                <td class="score-header">聴解</td>
                <td class="score-header">読解・文法</td>
                <td class="score-header">会話</td>
                <td class="score-header">総合点</td>
            </tr>
            <tr>
                <td>${formData.vocabScore}/100</td>
                <td>${formData.listeningScore}/100</td>
                <td>${formData.readingScore}/100</td>
                <td>${formData.conversationScore}/100</td>
                <td class="bold-text">${formData.totalScore}/${formData.totalMax}</td>
            </tr>
        </table>

        <table class="sig-table">
            <tr>
                <td class="sig-td">
                    <div class="sig-line"></div>
                    <div class="sig-label">日本語教師</div>
                    <div class="bold-text">${formData.teacherName}</div>
                </td>
                <td class="sig-td">
                    <div class="sig-line" style="border:none;"></div>
                    <div class="sig-label" style="margin-top: 5pt;">学校印</div>
                </td>
                <td class="sig-td">
                    <div class="sig-line"></div>
                    <div class="sig-label">校長</div>
                    <div class="bold-text">${formData.principalName}</div>
                </td>
            </tr>
        </table>

        ${includeHeader ? `
        <div class="footer-links">
            Web: ${formData.companyWeb} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: ${formData.companyEmail}
        </div>
        ` : ''}

      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Language_Certificate_${formData.studentName.replace(/\s+/g, '_')}.doc`;
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
            <BookOpen className="text-blue-600" size={20}/> Language Certificate Generator
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col xl:flex-row gap-8">
            
            {/* LEFT: EDITABLE FIELDS */}
            <div className="flex-1 space-y-6">
                
                {/* Header Toggle */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase">
                        <LayoutTemplate size={14}/> Header Settings
                    </div>
                    <label className="flex items-center gap-2 text-xs font-bold text-blue-800 cursor-pointer">
                        <input type="checkbox" checked={includeHeader} onChange={e => setIncludeHeader(e.target.checked)} className="rounded text-blue-600"/>
                        Print Letterhead
                    </label>
                </div>
                
                {/* Meta Inputs */}
                 <div className="grid grid-cols-2 gap-4">
                    <div><label className="label">Cert No.</label><input name="certNo" value={formData.certNo} onChange={handleChange} className="input-field" /></div>
                    <div><label className="label">Ref No.</label><input name="refNo" value={formData.refNo} onChange={handleChange} className="input-field" /></div>
                </div>

                {/* Course Details */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Course Info</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2"><label className="label">Course Name</label><input name="courseName" value={formData.courseName} onChange={handleChange} className="input-field" /></div>
                        <div className="col-span-2"><label className="label">Textbook</label><input name="textbook" value={formData.textbook} onChange={handleChange} className="input-field" /></div>
                        <div><label className="label">Start Date</label><input name="startDate" value={formData.startDate} onChange={handleChange} className="input-field" placeholder="YYYY/MM/DD" /></div>
                        <div><label className="label">End Date</label><input name="endDate" value={formData.endDate} onChange={handleChange} className="input-field" placeholder="YYYY/MM/DD" /></div>
                    </div>
                </div>

                {/* Attendance */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"><Calculator size={14}/> Attendance Stats</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div><label className="label">Total Days</label><input type="number" name="totalDays" value={formData.totalDays} onChange={handleChange} className="input-field" /></div>
                        <div><label className="label">Attended Days</label><input type="number" name="attendedDays" value={formData.attendedDays} onChange={handleChange} className="input-field" /></div>
                        <div><label className="label">Total Hours</label><input type="number" name="totalHours" value={formData.totalHours} onChange={handleChange} className="input-field" /></div>
                        <div><label className="label">Attended Hours</label><input type="number" name="attendedHours" value={formData.attendedHours} onChange={handleChange} className="input-field" /></div>
                        <div><label className="label">Attendance Rate</label><input name="attendanceRate" value={formData.attendanceRate} onChange={handleChange} className="input-field" /></div>
                    </div>
                    <div className="mt-3"><label className="label">Remarks</label><textarea name="remarks" value={formData.remarks} onChange={handleChange} className="input-field h-16" /></div>
                </div>

                {/* Scores */}
                <div className="grid grid-cols-5 gap-2">
                    <div><label className="label text-[9px] text-center">Vocab</label><input type="number" name="vocabScore" value={formData.vocabScore} onChange={handleChange} className="input-field text-center font-bold" /></div>
                    <div><label className="label text-[9px] text-center">Listening</label><input type="number" name="listeningScore" value={formData.listeningScore} onChange={handleChange} className="input-field text-center font-bold" /></div>
                    <div><label className="label text-[9px] text-center">Reading</label><input type="number" name="readingScore" value={formData.readingScore} onChange={handleChange} className="input-field text-center font-bold" /></div>
                    <div><label className="label text-[9px] text-center">Conv.</label><input type="number" name="conversationScore" value={formData.conversationScore} onChange={handleChange} className="input-field text-center font-bold" /></div>
                     <div><label className="label text-[9px] text-center">Total</label><input type="number" name="totalScore" value={formData.totalScore} onChange={handleChange} className="input-field text-center font-bold text-blue-600" /></div>
                </div>
            </div>

            {/* RIGHT: PREVIEW (Visual approximation) */}
           <div className="flex-1 bg-gray-100 rounded-lg p-6 flex justify-center overflow-auto h-[650px]">
    <div className="bg-white shadow-sm p-8 w-full max-w-[210mm] text-[10px] leading-relaxed relative min-h-[297mm] flex flex-col" style={{fontFamily: '"MS Mincho", serif'}}>
        
        {includeHeader ? (
            <div className="text-center text-blue-800 mb-4 border-b-2 border-blue-800 pb-2">
                <h1 className="text-2xl font-bold uppercase">UNI Abroad Study Pvt. Ltd.</h1>
                <p className="text-xs">Bagbazar-28, Kathmandu, Nepal</p>
                <p className="text-xs">Phone No.: 01-5925263, 9851117263</p>
            </div>
        ) : (
            <div className="h-20 bg-gray-50 border border-dashed border-gray-300 mb-4 flex items-center justify-center text-gray-400 text-xs">
                (Header Space)
            </div>
        )}

        {/* Certificate Number and Date */}
        <div className="flex justify-between font-bold mb-2 text-xs">
            <span>証明書番号：{formData.certNo}</span>
            <span>発行日：{formData.issueDate}</span>
        </div>

        {/* Main Title */}
        <div className="text-xl font-bold underline mb-6 text-center tracking-widest mt-2">日本語学習証明書</div>

        {/* Student Info Table - Exact match with image */}
        <table className="w-full border-collapse border border-black mb-6 text-xs">
            <tbody>
                <tr>
                    <td className="border border-black p-2 bg-gray-50 font-bold w-1/6 text-left pl-3">学生氏名：</td>
                    <td className="border border-black p-2 w-2/6 font-bold pl-3">{formData.studentName}</td>
                    <td className="border border-black p-2 bg-gray-50 font-bold w-1/6 text-center">性別</td>
                    <td className="border border-black p-2 w-1/6 text-center">
                        <span className={`inline-block w-5 h-5 rounded-full border border-black ${formData.sex === 'Male' ? 'bg-blue-100' : ''} flex items-center justify-center mx-auto`}>
                            {formData.sex === 'Male' ? '男' : '女'}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td className="border border-black p-2 bg-gray-50 font-bold text-left pl-3">生年月日：</td>
                    <td className="border border-black p-2 pl-3">{formData.dob}</td>
                    <td className="border border-black p-2 bg-gray-50 font-bold text-center">国籍</td>
                    <td className="border border-black p-2 text-center">{formData.nationality}</td>
                </tr>
            </tbody>
        </table>

        {/* Course Info Table - Exact match with image */}
        <table className="w-full border-collapse border border-black mb-6 text-xs">
            <tbody>
                <tr>
                    <td className="border border-black p-2 bg-gray-50 font-bold w-1/6 text-center">課程</td>
                    <td className="border border-black p-2 w-1/4 text-center">{formData.courseName}</td>
                    <td className="border border-black p-2 bg-gray-50 font-bold w-1/6 text-center">教材</td>
                    <td className="border border-black p-2 w-1/4 text-center">{formData.textbook}</td>
                </tr>
                <tr>
                    <td className="border border-black p-2 bg-gray-50 font-bold text-center align-middle" rowSpan={2}>日本語学習期間</td>
                    <td className="border border-black p-2 text-center align-middle" rowSpan={2}>
                        {formData.startDate} ～ {formData.endDate}<br/>(修了予定)
                    </td>
                    <td className="border border-black p-2 bg-gray-50 font-bold text-center align-middle" rowSpan={2}>{formData.accountingDetails}</td>
                    <td className="border border-black p-2 text-center align-middle" rowSpan={2}>{formData.totalHours} 時間</td>
                </tr>
                <tr></tr>
                <tr>
                    <td className="border border-black p-2 bg-gray-50 font-bold text-center">学習期間</td>
                    <td className="border border-black p-2 text-center">{formData.attendedDays} 日間</td>
                    <td className="border border-black p-2 bg-gray-50 font-bold text-center">現在までの<br/>総学習時間</td>
                    <td className="border border-black p-2 text-center">{formData.attendedHours} / {formData.totalHours} 時間</td>
                </tr>
                <tr>
                    <td className="border border-black p-2 bg-gray-50 font-bold text-center">備考</td>
                    <td className="border border-black p-2 text-left pl-3" style={{whiteSpace: 'pre-wrap'}}>{formData.remarks}</td>
                    <td className="border border-black p-2 bg-gray-50 font-bold text-center">出席率</td>
                    <td className="border border-black p-2 text-center font-bold">{formData.attendanceRate}</td>
                </tr>
            </tbody>
        </table>

        {/* Notes Section */}
        <div className="w-full text-left text-[9px] mb-6 pl-1 leading-snug">
            <p>日本語学習状況が下記の通りであることをここに証明致します。</p>
            <p className="text-gray-600 mt-1">※ 休日・祝祭日はオバールカレンダー、当校規定に基づきます。</p>
            <p className="text-gray-600">※ 欠席に関しましては原則無料授業を義務づけています。</p>
        </div>

        {/* Scores Table */}
        <table className="w-full border-collapse border border-black mb-6 text-center text-xs">
            <thead>
                <tr className="bg-gray-50 font-bold">
                    <td className="border border-black p-2">文字・語彙</td>
                    <td className="border border-black p-2">聴解</td>
                    <td className="border border-black p-2">読解・文法</td>
                    <td className="border border-black p-2">会話</td>
                    <td className="border border-black p-2">総合点</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-black p-2">{formData.vocabScore} / 100</td>
                    <td className="border border-black p-2">{formData.listeningScore} / 100</td>
                    <td className="border border-black p-2">{formData.readingScore} / 100</td>
                    <td className="border border-black p-2">{formData.conversationScore} / 100</td>
                    <td className="border border-black p-2 font-bold">{formData.totalScore} / {formData.totalMax}</td>
                </tr>
            </tbody>
        </table>

        {/* Bottom Reference Numbers */}
        <div className="text-center text-[9px] mb-6">
            <div>Page No.: 621215313</div>
            <div>Reqd. No.: 352259(08) 1022</div>
        </div>

        {/* Second Header */}
        <div className="text-center text-blue-800 mb-6 border-t-2 border-blue-800 pt-2">
            <h1 className="text-lg font-bold uppercase">UNI Abroad Study Pvt. Ltd.</h1>
            <p className="text-xs">Bagbazar-28, Kathmandu, Nepal</p>
            <p className="text-xs">Phone No.: 01-5925263, 9851117263</p>
        </div>

        {/* Signatures */}
        <div className="w-full grid grid-cols-3 gap-4 mt-auto mb-4 text-center text-xs">
            <div>
                <div className="border-t border-black mb-1 w-3/4 mx-auto"></div>
                <p className="font-bold">日本語教師</p>
                <p className="text-[9px]">守良印 松長</p>
                <p>Karuna Panthee</p>
            </div>
            <div>
                <div className="h-6"></div>
                <p className="font-bold">学校印</p>
            </div>
            <div>
                <div className="border-t border-black mb-1 w-3/4 mx-auto"></div>
                <p className="font-bold">校長</p>
                <p>Sudan Pandey</p>
            </div>
        </div>

        {includeHeader && (
            <div className="border-t-2 border-yellow-600 pt-2 text-center text-yellow-600 font-bold text-[9px] w-full mt-4">
                Web: www.umabroadstudy.com &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: umabroadstudy@gmail.com
            </div>
        )}

    </div>
</div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition">Cancel</button>
          <button onClick={generateWordDoc} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95 transition">
            <Download size={16} /> Download .DOC Word File
          </button>
        </div>

        <style jsx>{`
            .label { display: block; font-size: 10px; font-weight: bold; color: #6b7280; text-transform: uppercase; margin-bottom: 4px; }
            .input-field { width: 100%; border: 1px solid #d1d5db; padding: 6px; border-radius: 6px; font-size: 12px; }
        `}</style>

      </div>
    </div>
  );
}