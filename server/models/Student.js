 

// // const mongoose = require('mongoose');

// // const studentSchema = new mongoose.Schema({
// //     // Link to the User Login
// //     user: {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: 'User',
// //         required: true
// //     },
// //     // Link to the Consultancy managing this student
// //     consultancy: {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: 'Consultancy',
// //         required: true
// //     },
    
// //     // --- 1. PERSONAL DETAILS ---
// //     personalInfo: {
// //         title: { type: String, enum: ['Mr.', 'Ms.', 'Mrs.'], default: 'Mr.' },
// //         firstName: { type: String, required: true },
// //         lastName: { type: String, required: true },
// //         gender: { type: String, enum: ['Male', 'Female', 'Other'] },
// //         dobAD: { type: Date }, 
// //         dobBS: { type: String }, 
// //         email: String,
// //         phone: String,
// //         photoUrl: String, // Profile Picture
        
// //         // Citizenship Fields
// //         citizenshipNo: String,
// //         citizenshipDistrict: String,
// //         citizenshipDate: String,

// //         // Passport Fields
// //         passportNo: String,
// //         passportExpiry: Date,
// //         passportIssuePlace: String
// //     },

// //     // --- 2. ADDRESS ---
// //     address: {
// //         municipality: String,
// //         wardNo: String,
// //         tole: String, 
// //         district: String,
// //         province: String,
// //         country: { type: String, default: 'Nepal' }
// //     },

// //     // --- 3. FAMILY ---
// //     familyInfo: {
// //         fatherName: String,
// //         motherName: String,
// //         grandfatherName: String,
// //         spouseName: String,
        
// //         // Dynamic list of other relatives
// //         relatives: [{
// //             name: String,
// //             relation: String, 
// //             photoUrl: String 
// //         }]
// //     },

// //     // --- 4. ACADEMICS ---
// //     academics: [{
// //         level: String, // e.g. SLC, +2, Bachelor
// //         institution: String,
// //         passedYear: String,
// //         grade: String
// //     }],

// //     // --- 5. FINANCIAL ---
// //     financialInfo: {
// //         incomeSources: [{
// //             sourceName: String,
// //             amounts: [Number] 
// //         }],
// //         fiscalYears: [String],
// //         exchangeRate: { type: Number, default: 134.00 },
// //         sponsor: String // Added for Inquiry Form
// //     },

// //     // --- 6. VISA DETAILS (For Inquiry Form) ---
// //     visaDetails: {
// //         japaneseLanguage: {
// //             status: { type: String, enum: ['None', 'Studying', 'Passed'], default: 'None' },
// //             level: String,
// //             testName: String
// //         },
// //         education: {
// //             lastDegree: String,
// //             passedYear: String,
// //             percentage: String
// //         },
// //         intake: String
// //     },

// //     // --- 7. DOCUMENTS ---
// //     documents: {
// //         citizenshipFront: String,
// //         citizenshipBack: String,
// //         passportBio: String,
// //         slcMarksheet: String,
// //         slcCharacter: String,
// //         plus2Transcript: String,
// //         other: [{ title: String, url: String }]
// //     },

// //     // --- SYSTEM STATUS ---
// //     profileStatus: {
// //         type: String,
// //         // FIX: Added 'lead' to the allowed values
// //         enum: ['lead', 'draft', 'submitted', 'verified', 'rejected'],
// //         default: 'draft'
// //     },
// //     createdAt: {
// //         type: Date,
// //         default: Date.now
// //     }
// // });

// // module.exports = mongoose.model('Student', studentSchema);


// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//     // Link to the User Login
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     // Link to the Consultancy managing this student
//     consultancy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Consultancy',
//         required: true
//     },
    
//     // --- 1. PERSONAL DETAILS ---
//     personalInfo: {
//         title: { type: String, enum: ['Mr.', 'Ms.', 'Mrs.'], default: 'Mr.' },
//         firstName: { type: String, required: true },
//         lastName: { type: String, required: true },
//         gender: { type: String, enum: ['Male', 'Female', 'Other'] },
//         dobAD: { type: Date }, 
//         dobBS: { type: String }, 
//         email: String,
//         phone: String,
//         photoUrl: String, // Profile Picture
        
//         // Citizenship Fields
//         citizenshipNo: String,
//         citizenshipDistrict: String,
//         citizenshipDate: String,

//         // Passport Fields
//         passportNo: String,
//         passportExpiry: Date,
//         passportIssuePlace: String
//     },

//     // --- 2. ADDRESS ---
//     address: {
//         municipality: String,
//         wardNo: String,
//         tole: String, 
//         district: String,
//         province: String,
//         country: { type: String, default: 'Nepal' }
//     },

//     // --- 3. FAMILY ---
//     familyInfo: {
//         fatherName: String,
//         motherName: String,
//         grandfatherName: String,
//         spouseName: String,
        
//         // Dynamic list of other relatives
//         relatives: [{
//             name: String,
//             relation: String, 
//             photoUrl: String 
//         }]
//     },

//     // --- 4. ACADEMICS ---
//     academics: [{
//         level: String, // e.g. SLC, +2, Bachelor
//         institution: String,
//         passedYear: String,
//         grade: String
//     }],

//     // --- 5. FINANCIAL ---
//     financialInfo: {
//         incomeSources: [{
//             sourceName: String,
//             amounts: [Number] 
//         }],
//         fiscalYears: [String],
//         exchangeRate: { type: Number, default: 134.00 },
//         sponsor: String // Added for Inquiry Form
//     },

//     // --- 6. VISA DETAILS (For Inquiry Form) ---
//     visaDetails: {
//         japaneseLanguage: {
//             status: { type: String, enum: ['None', 'Studying', 'Passed'], default: 'None' },
//             level: String,
//             testName: String
//         },
//         education: {
//             lastDegree: String,
//             passedYear: String,
//             percentage: String
//         },
//         intake: String
//     },

//     // --- 7. DOCUMENTS ---
//     documents: {
//         citizenshipFront: String,
//         citizenshipBack: String,
//         passportBio: String,
//         slcMarksheet: String,
//         slcCharacter: String,
//         plus2Transcript: String,
//         other: [{ title: String, url: String }]
//     },

//     // --- 8. UNIVERSITY APPLICATIONS (NEW) ---
//     applications: [{
//         universityId: { 
//             type: mongoose.Schema.Types.ObjectId, 
//             ref: 'University' 
//         },
//         universityName: String, // Cache name to avoid population overhead in lists
//         course: String, // e.g. "Japanese Language Course"
//         intake: String, // e.g. "April 2025"
//         status: { 
//             type: String, 
//             enum: [
//                 'Shortlisted', 
//                 'Applied', 
//                 'Interview Passed', 
//                 'Offer Letter', 
//                 'COE Pending', 
//                 'COE Received', 
//                 'Visa Granted', 
//                 'Rejected'
//             ],
//             default: 'Shortlisted'
//         },
//         notes: String,
//         applicationDate: { 
//             type: Date, 
//             default: Date.now 
//         }
//     }],

//     // --- SYSTEM STATUS ---
//     profileStatus: {
//         type: String,
//         // FIX: Added 'lead' to the allowed values
//         enum: ['lead', 'draft', 'submitted', 'verified', 'rejected'],
//         default: 'draft'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // ... (Keep all your existing fields: user, consultancy, personalInfo, address, etc.) ...
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    consultancy: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultancy', required: true },
    
    personalInfo: {
        title: { type: String, enum: ['Mr.', 'Ms.', 'Mrs.'], default: 'Mr.' },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'] },
        dobAD: { type: Date }, 
        dobBS: { type: String }, 
        email: String,
        phone: String,
        photoUrl: String,
        citizenshipNo: String, citizenshipDistrict: String, citizenshipDate: String,
        passportNo: String, passportExpiry: Date, passportIssuePlace: String
    },
    // ... (Keep address, familyInfo, academics, financialInfo, visaDetails, documents) ...
    address: { /*...*/ },
    familyInfo: { /*...*/ },
    academics: [/*...*/],
    financialInfo: { /*...*/ },
    visaDetails: { /*...*/ },
    documents: { /*...*/ },

    // --- NEW: UNIVERSITY APPLICATIONS ---
    applications: [{
        universityId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'University' 
        },
        universityName: String, // Cache name for easier display
        course: String, // e.g. "Japanese Language Course"
        intake: String, // e.g. "April 2025"
        status: { 
            type: String, 
            enum: [
                'Shortlisted', // Initial recommendation
                'Applied', 
                'Interview Passed', 
                'Offer Letter', 
                'COE Pending', 
                'COE Received', 
                'Visa Granted', 
                'Rejected'
            ],
            default: 'Shortlisted'
        },
        notes: String,
        applicationDate: { 
            type: Date, 
            default: Date.now 
        }
    }],

    // --- SYSTEM STATUS ---
    profileStatus: {
        type: String,
        enum: ['lead', 'draft', 'submitted', 'verified', 'rejected'],
        default: 'draft'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);