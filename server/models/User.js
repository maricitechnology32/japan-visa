// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');

// // const userSchema = new mongoose.Schema({
// //     name: {
// //         type: String,
// //         required: [true, 'Please add a name']
// //     },
// //     email: {
// //         type: String,
// //         required: [true, 'Please add an email'],
// //         unique: true,
// //         match: [
// //             /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
// //             'Please add a valid email'
// //         ]
// //     },
// //     password: {
// //         type: String,
// //         required: [true, 'Please add a password'],
// //         minlength: 6,
// //         select: false // Don't return password by default in queries
// //     },
// //     role: {
// //         type: String,
// //         enum: ['super_admin', 'consultancy_admin', 'student'],
// //         default: 'student'
// //     },
// //     // Link to the Consultancy (Required for Admin and Student, Null for Super Admin)
// //     consultancyId: {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: 'Consultancy'
// //     },
// //     // If user is a student, link to their Profile data
// //     studentProfileId: {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: 'Student'
// //     },
// //     resetPasswordToken: String,
// //     resetPasswordExpire: Date,
// //     createdAt: {
// //         type: Date,
// //         default: Date.now
// //     }
// // });

// // // Encrypt password using bcrypt
// // userSchema.pre('save', async function(next) {
// //     if (!this.isModified('password')) {
// //         next();
// //     }
// //     const salt = await bcrypt.genSalt(10);
// //     this.password = await bcrypt.hash(this.password, salt);
// // });

// // // Match user entered password to hashed password in database
// // userSchema.methods.matchPassword = async function(enteredPassword) {
// //     return await bcrypt.compare(enteredPassword, this.password);
// // };

// // module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Please add a name']
//     },
//     email: {
//         type: String,
//         required: [true, 'Please add an email'],
//         unique: true,
//         match: [
//             /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//             'Please add a valid email'
//         ]
//     },
//     password: {
//         type: String,
//         required: [true, 'Please add a password'],
//         minlength: 6,
//         select: false 
//     },
//     role: {
//         type: String,
//         enum: ['super_admin', 'consultancy_admin', 'student'],
//         default: 'student'
//     },
//     consultancyId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Consultancy'
//     },
//     studentProfileId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Student'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // FIXED: Using modern async syntax (no 'next' parameter needed)
// userSchema.pre('save', async function() {
//     // Only run this function if password was actually modified
//     if (!this.isModified('password')) {
//         return;
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false 
    },
    role: {
        type: String,
        enum: ['super_admin', 'consultancy_admin', 'consultancy_staff', 'student','counselor'], // Added 'consultancy_staff'
        default: 'student'
    },
    // NEW: Specific role for staff members
    subRole: {
        type: String,
        enum: ['receptionist', 'document_officer', 'manager',,'counselor', null],
        default: null
    },
    consultancyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultancy'
    },
    studentProfileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);