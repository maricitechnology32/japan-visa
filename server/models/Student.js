


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
        
//         // NEW FIELDS FOR MARRIED APPLICANTS
//         fatherInLawName: String,
//         motherInLawName: String,
        
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

//     // --- 8. UNIVERSITY APPLICATIONS ---
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
//         // 'lead' is allowed for inquiry submissions
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
    // Link to the User Login
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Link to the Consultancy managing this student
    consultancy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultancy',
        required: true
    },
    
    // --- 1. PERSONAL DETAILS ---
    personalInfo: {
        title: { type: String, enum: ['Mr.', 'Ms.', 'Mrs.'], default: 'Mr.' },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'] },
        dobAD: { type: Date }, 
        dobBS: { type: String }, 
        email: String,
        phone: String,
        photoUrl: String, // Profile Picture
        
        // Citizenship Fields
        citizenshipNo: String,
        citizenshipDistrict: String,
        citizenshipDate: String,

        // Passport Fields
        passportNo: String,
        passportExpiry: Date,
        passportIssuePlace: String
    },

    // --- 2. ADDRESS ---
    address: {
        municipality: String,
        wardNo: String,
        tole: String, 
        district: String,
        province: String,
        country: { type: String, default: 'Nepal' }
    },

    // --- 3. FAMILY ---
    familyInfo: {
        fatherName: String,
        motherName: String,
        grandfatherName: String,
        spouseName: String,
        
        // Fields for Married Applicants
        fatherInLawName: String,
        motherInLawName: String,
        
        // Dynamic list of other relatives
        relatives: [{
            name: String,
            relation: String, 
            photoUrl: String 
        }]
    },

    // --- 4. ACADEMICS ---
    academics: [{
        level: String, // e.g. SLC, +2, Bachelor
        institution: String,
        passedYear: String,
        grade: String
    }],

    // --- 5. FINANCIAL ---
    financialInfo: {
        incomeSources: [{
            sourceName: String,
            amounts: [Number] 
        }],
        fiscalYears: [String],
        exchangeRate: { type: Number, default: 134.00 },
        sponsor: String // Added for Inquiry Form
    },

    // --- 6. VISA DETAILS (For Inquiry Form & Language Certificate) ---
    visaDetails: {
        japaneseLanguage: {
            status: { type: String, enum: ['None', 'Studying', 'Passed'], default: 'None' },
            level: String,
            testName: String,

            // NEW: Fields specific to the Language Certificate Generator
            certificateDetails: {
                courseName: { type: String, default: 'Japanese Language Course' },
                textbook: { type: String, default: 'Minna no Nihongo I/II' },
                startDate: Date,
                endDate: Date,
                totalHours: { type: Number, default: 0 }, // e.g. 512
                attendedHours: { type: Number, default: 0 }, // e.g. 234
                attendanceRate: { type: Number, default: 0 }, // e.g. 100
                
                // Detailed Scores
                scores: {
                    vocab: { type: Number, default: 0 },    // 文字・語彙
                    listening: { type: Number, default: 0 }, // 聴解
                    reading: { type: Number, default: 0 },   // 読解・文法
                    conversation: { type: Number, default: 0 }, // 会話
                    total: { type: Number, default: 0 }      // 総合点
                }
            }
        },
        education: {
            lastDegree: String,
            passedYear: String,
            percentage: String
        },
        intake: String
    },

    // --- 7. DOCUMENTS ---
    documents: {
        citizenshipFront: String,
        citizenshipBack: String,
        passportBio: String,
        slcMarksheet: String,
        slcCharacter: String,
        plus2Transcript: String,
        other: [{ title: String, url: String }]
    },

    // --- 8. UNIVERSITY APPLICATIONS ---
    applications: [{
        universityId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'University' 
        },
        universityName: String, // Cache name to avoid population overhead in lists
        course: String, // e.g. "Japanese Language Course"
        intake: String, // e.g. "April 2025"
        status: { 
            type: String, 
            enum: [
                'Shortlisted', 
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