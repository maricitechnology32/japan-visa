 

// import { Download, FileText, UserPen, X } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function DateOfBirthVerificationModal({
//   isOpen,
//   onClose,
//   student,
// }) {
//   if (!isOpen || !student) return null;

//   const getRelation = (s) => {
//     const gender = s?.personalInfo?.gender;
//     const title = s?.personalInfo?.title;
//     if (gender === "Male" || title === "Mr.") return "son of";
//     if (gender === "Female" || title === "Ms." || title === "Mrs.")
//       return "daughter of";
//     return "son/daughter of";
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const [formData, setFormData] = useState({
//     applicantName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
//     relation: getRelation(student),
//     fatherName: student.familyInfo.fatherName,
//     motherName: student.familyInfo.motherName,

//     addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,

//     dobBS: student.personalInfo.dobBS || "",
//     dobAD: formatDate(student.personalInfo.dobAD),

//     // Signature fields
//     signatoryName: "Lob Bahadur Shahi",
//     signatoryDesignation: "Ward Chairperson",
//   });

//   useEffect(() => {
//     if (student) {
//       setFormData((prev) => ({
//         ...prev,
//         applicantName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
//         relation: getRelation(student),
//         fatherName: student.familyInfo.fatherName,
//         motherName: student.familyInfo.motherName,
//         addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
//         dobBS: student.personalInfo.dobBS || "",
//         dobAD: formatDate(student.personalInfo.dobAD),
//       }));
//     }
//   }, [student]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // WORD DOC GENERATOR — UPDATED TO MATCH YOUR REQUIREMENTS
//   const generateWordDoc = () => {
//     const content = `
//       <html xmlns:o='urn:schemas-microsoft-com:office:office'
//             xmlns:w='urn:schemas-microsoft-com:office:word'
//             xmlns='http://www.w3.org/TR/REC-html40'>
//       <head>
//         <meta charset="utf-8">
//         <style>
//           body {
//             font-family: 'Times New Roman', serif;
//             font-size: 12pt;
//             line-height: 1.8;
//             margin: 30pt 40pt;
//           }

//           /* EMPTY HEADER SPACE */
//           .header-space { height: 160pt; }

//           /* TITLE STYLES */
//           .title {
//             text-align: center;
//             font-size: 16pt;
//             font-weight: bold;
//             text-decoration: underline;
//             margin-top: 5pt;
//           }

//           .subtitle {
//             text-align: center;
//             font-size: 14pt;
//             font-weight: bold;
//             text-decoration: underline;
//             margin-top: 10pt;
//             margin-bottom: 25pt;
//           }

//           p {
//             text-align: justify;
//             margin-bottom: 14pt;
//           }

//           /* SIGNATURE AREA */
//           .signature-block {
//             margin-top: 90pt;
//             text-align: right;
//             font-size: 12pt;
//           }

//           .sig-line {
//             margin-bottom: 5pt;
//           }
//         </style>
//       </head>
//       <body>

//         <!-- EMPTY HEADER AREA (no Ref/Dis/Date but space kept) -->
//         <div class="header-space"></div>

//         <!-- TITLES -->
//         <div class="title">Date of Birth Verification Certificate</div>
//         <div class="subtitle">To Whom It May Concern</div>

//         <!-- BODY -->
//         <p>
//           This is to certify that <strong>${formData.applicantName}</strong> ${
//       formData.relation
//     }
//           <strong>Mr. ${formData.fatherName}</strong> and 
//           <strong>Mrs. ${formData.motherName}</strong>, the permanent resident of 
//           <strong>${formData.addressLine}</strong>, was born on 
//           <strong>B.S. ${formData.dobBS} (${formData.dobAD} A.D.)</strong>.
//         </p>

//         <p>
//           This birth verification certificate is issued in accordance with the Local Government Operation Act
//           B.S. 2074 (2017 A.D.) Chapter 3, Section 12, Sub-section 2, Clause E (7).
//         </p>

//         <!-- SIGNATURE BLOCK -->
//         <div class="signature-block">
//           <div class="sig-line">......................................</div>
//           <strong>${formData.signatoryName}</strong><br>
//           ${formData.signatoryDesignation}
//         </div>

//       </body>
//       </html>
//     `;

//     const blob = new Blob(["\ufeff", content], {
//       type: "application/msword",
//     });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `DOB_Verification_${
//       formData.applicantName
//     }.doc`.replace(/\s+/g, "_");
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
//         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
//           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//             <FileText className="text-green-600" size={20} /> DOB Verification
//             Generator
//           </h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto">
//           <div className="mb-6">
//             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
//               Verification Details
//             </h4>

//             <div className="mb-3">
//               <label className="block text-xs font-semibold text-gray-600 mb-1">
//                 Permanent Address
//               </label>
//               <input
//                 name="addressLine"
//                 value={formData.addressLine}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2 text-sm"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-600 mb-1">
//                   Date of Birth (B.S.)
//                 </label>
//                 <input
//                   name="dobBS"
//                   value={formData.dobBS}
//                   onChange={handleChange}
//                   className="w-full border-2 border-green-50 bg-green-50 rounded p-2 text-sm font-medium"
//                   placeholder="2056/10/03"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-gray-600 mb-1">
//                   Date of Birth (A.D.)
//                 </label>
//                 <input
//                   name="dobAD"
//                   value={formData.dobAD}
//                   onChange={handleChange}
//                   className="w-full border-2 border-green-50 bg-green-50 rounded p-2 text-sm font-medium"
//                   placeholder="17 January 2000"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* SIGNATORY */}
//           <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
//               <UserPen size={14} /> Signatory Details
//             </h4>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-600 mb-1">
//                   Chairperson Name
//                 </label>
//                 <input
//                   name="signatoryName"
//                   value={formData.signatoryName}
//                   onChange={handleChange}
//                   className="w-full border rounded p-2 text-sm font-bold text-gray-700"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-gray-600 mb-1">
//                   Designation
//                 </label>
//                 <input
//                   name="signatoryDesignation"
//                   value={formData.signatoryDesignation}
//                   onChange={handleChange}
//                   className="w-full border rounded p-2 text-sm text-gray-700"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* PREVIEW */}
//           <div className="border rounded-lg p-8 bg-gray-100 flex justify-center">
//             <div className="bg-white shadow-sm p-8 w-full text-[10px] font-serif leading-relaxed text-justify relative">
//               <div className="h-40"></div>

//               <div className="text-center font-bold underline mb-4">
//                 <p className="text-sm capitalize">
//                   Date of Birth Verification Certificate
//                 </p>
//                 <p className="mt-2">To Whom It May Concern</p>
//               </div>

//               <p>
//                 This is to certify that <strong>{formData.applicantName}</strong>{" "}
//                 {formData.relation}
//                 <strong>Mr. {formData.fatherName}</strong> and{" "}
//                 <strong>Mrs. {formData.motherName}</strong>, permanent resident
//                 of <strong>{formData.addressLine}</strong>, was born on{" "}
//                 <strong>
//                   B.S. {formData.dobBS} ({formData.dobAD} A.D.)
//                 </strong>
//                 .
//               </p>

//               <p className="mt-0">
//                 This birth verification certificate is issued as per Local
//                 Government Operation Act...
//               </p>

//               <div className="mt-12 text-right">
//                 <div>......................................</div>
//                 <p className="font-bold text-xs">{formData.signatoryName}</p>
//                 <p className="text-xs">{formData.signatoryDesignation}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={generateWordDoc}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95 transition"
//           >
//             <Download size={16} /> Download .DOC Word File
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Download, FileText, UserPen, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function DateOfBirthVerificationModal({
  isOpen,
  onClose,
  student,
}) {
  if (!isOpen || !student) return null;

  const getRelation = (s) => {
    const gender = s?.personalInfo?.gender;
    const title = s?.personalInfo?.title;
    if (gender === "Male" || title === "Mr.") return "son of";
    if (gender === "Female" || title === "Ms." || title === "Mrs.")
      return "daughter of";
    return "son/daughter of";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const [formData, setFormData] = useState({
    applicantName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
    relation: getRelation(student),
    fatherName: student.familyInfo.fatherName,
    motherName: student.familyInfo.motherName,

    addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,

    dobBS: student.personalInfo.dobBS || "",
    dobAD: formatDate(student.personalInfo.dobAD),

    signatoryName: "Lob Bahadur Shahi",
    signatoryDesignation: "Ward Chairperson",
  });

  useEffect(() => {
    if (student) {
      setFormData((prev) => ({
        ...prev,
        applicantName: `${student.personalInfo.title} ${student.personalInfo.firstName} ${student.personalInfo.lastName}`,
        relation: getRelation(student),
        fatherName: student.familyInfo.fatherName,
        motherName: student.familyInfo.motherName,
        addressLine: `${student.address.municipality} Ward No. ${student.address.wardNo}, ${student.address.district}, ${student.address.province}, Nepal`,
        dobBS: student.personalInfo.dobBS || "",
        dobAD: formatDate(student.personalInfo.dobAD),
      }));
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // FINAL UPDATED GENERATOR WITH PERFECT FONT + SPACING
  const generateWordDoc = () => {
    const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <style>
        @page {
          margin: 1in;
        }

        body {
          font-family: 'Times New Roman', serif;
          font-size: 12pt;
          line-height: 1.8;
          text-align: justify;
        }

        .title {
          text-align: center;
          font-size: 16pt;
          font-weight: bold;
          text-decoration: underline;
          margin-top: 0;
          margin-bottom: 6pt;
        }

        .subtitle {
          text-align: center;
          font-size: 14pt;
          font-weight: bold;
          text-decoration: underline;
          margin-top: 4pt;
          margin-bottom: 20pt;
        }

        p {
          margin-top: 2;
          margin-bottom: 14pt;
        }

        .signature-block {
          text-align: right;
          margin-top: 60pt;
          font-size: 12pt;
        }
          p {
  text-align: justify;
  margin: 0;       /* Removes top & bottom gap */
  padding: 0;
}

p + p {
  margin-top: 4pt; /* Optional tiny spacing (remove if not needed) */
}

      </style>
    </head>

    <body>

      <div class="title">DATE OF BIRTH VERIFICATION CERTIFICATE</div>
      <div class="subtitle">To Whom It May Concern</div>

      <p>
        This is to certify that <strong>${formData.applicantName}</strong>
        ${formData.relation}
        <strong>Mr. ${formData.fatherName}</strong> and
        <strong>Mrs. ${formData.motherName}</strong>, the permanent resident of
        <strong>${formData.addressLine}</strong>, was born on
        <strong>B.S. ${formData.dobBS} (${formData.dobAD} A.D.)</strong>.
      </p>

      <p>
        This birth verification certificate is issued in accordance with the
        <strong>Local Government Operation Act B.S. 2074 (2017 A.D.)</strong>,
        Chapter 3, Section 12, Sub-section 2, Clause E (7).
      </p>

      <div class="signature-block">
        <div>......................................</div>
        <strong>${formData.signatoryName}</strong><br>
        ${formData.signatoryDesignation}
      </div>

    </body>
    </html>
    `;

    const blob = new Blob(["\ufeff", content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `DOB_Verification_${formData.applicantName}.doc`.replace(
      /\s+/g,
      "_"
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-green-600" size={20} /> DOB Verification Generator
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">

          {/* FORM FIELDS */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Verification Details
            </h4>

            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Permanent Address
              </label>
              <input
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Date of Birth (B.S.)
                </label>
                <input
                  name="dobBS"
                  value={formData.dobBS}
                  onChange={handleChange}
                  className="w-full border-2 border-green-50 bg-green-50 rounded p-2 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Date of Birth (A.D.)
                </label>
                <input
                  name="dobAD"
                  value={formData.dobAD}
                  onChange={handleChange}
                  className="w-full border-2 border-green-50 bg-green-50 rounded p-2 text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* SIGNATORY */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <UserPen size={14} /> Signatory Details
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Name
                </label>
                <input
                  name="signatoryName"
                  value={formData.signatoryName}
                  onChange={handleChange}
                  className="w-full border rounded p-2 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Designation
                </label>
                <input
                  name="signatoryDesignation"
                  value={formData.signatoryDesignation}
                  onChange={handleChange}
                  className="w-full border rounded p-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="border rounded-lg p-8 bg-gray-100 flex justify-center">
            <div
              className="bg-white shadow-sm p-8 w-full font-serif text-[12px] leading-[1.8] text-justify"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              <div className="text-center font-bold underline text-[16px]">
                DATE OF BIRTH VERIFICATION CERTIFICATE
              </div>

              <div className="text-center font-bold underline text-[14px] mt-1 mb-6">
                To Whom It May Concern
              </div>

              <p className="mb-4">
                This is to certify that <strong>{formData.applicantName}</strong>{" "}
                {formData.relation} <strong>Mr. {formData.fatherName}</strong>{" "}
                and <strong>Mrs. {formData.motherName}</strong>, permanent resident of{" "}
                <strong>{formData.addressLine}</strong>, was born on{" "}
                <strong>
                  B.S. {formData.dobBS} ({formData.dobAD} A.D.)
                </strong>
                .
              </p>

              <p>
                This birth verification certificate is issued in accordance with the
                Local Government Operation Act B.S. 2074 (2017 A.D.) Chapter 3,
                Section 12, Sub-section 2, Clause E (7).
              </p>

              <div className="mt-16 text-right">
                <div>......................................</div>
                <div className="font-bold">{formData.signatoryName}</div>
                <div>{formData.signatoryDesignation}</div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm"
          >
            Cancel
          </button>

          <button
            onClick={generateWordDoc}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-bold shadow-md active:scale-95"
          >
            <Download size={16} /> Download .DOC Word File
          </button>
        </div>
      </div>
    </div>
  );
}
