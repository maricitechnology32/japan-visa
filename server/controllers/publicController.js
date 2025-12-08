const Student = require('../models/Student');
const Consultancy = require('../models/Consultancy');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');
const crypto = require('crypto');

// @desc    Get Consultancy Name/Logo for the Public Form
// @route   GET /api/public/consultancy/:id
exports.getPublicConsultancyInfo = async (req, res) => {
    try {
        const consultancy = await Consultancy.findById(req.params.id).select('name address phone');
        if (!consultancy) return res.status(404).json({ success: false, message: 'Consultancy not found' });
        res.status(200).json({ success: true, data: consultancy });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Submit Inquiry Form (Creates a 'Lead' student and User)
// @route   POST /api/public/inquiry
exports.submitInquiry = async (req, res) => {
    try {
        const { consultancyId, personalInfo, visaDetails } = req.body;

        // 1. Check if email exists
        const userExists = await User.findOne({ email: personalInfo.email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'You are already registered. Please login.' });
        }

        // 2. Create User (Student)
        // We generate a random password and email it to them immediately
        const tempPassword = crypto.randomBytes(4).toString('hex');
        
        const user = await User.create({
            name: `${personalInfo.firstName} ${personalInfo.lastName}`,
            email: personalInfo.email,
            password: tempPassword,
            role: 'student',
            consultancyId
        });

        // 3. Create Student Profile (Status: Lead)
        const student = await Student.create({
            user: user._id,
            consultancy: consultancyId,
            personalInfo,
            visaDetails, // Save the Japan specific data
            profileStatus: 'lead' // Mark as a Lead
        });

        user.studentProfileId = student._id;
        await user.save();

        // 4. Send Credentials Email
        const message = `
            Thank you for your inquiry!
            We have created an account for you to track your visa process.
            
            Login URL: ${process.env.CLIENT_URL}/login
            Email: ${personalInfo.email}
            Password: ${tempPassword}
        `;

        try {
            await sendEmail({
                email: personalInfo.email,
                subject: 'Japan Visa Application - Account Created',
                message
            });
        } catch (e) {
            console.error(e);
        }

        res.status(201).json({ success: true, message: 'Inquiry submitted successfully!' });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};