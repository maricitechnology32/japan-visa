// const Student = require('../models/Student');
// const Consultancy = require('../models/Consultancy');
// const User = require('../models/User');
// const sendEmail = require('../utils/emailService');
// const crypto = require('crypto');

// // @desc    Get Consultancy Name/Logo for the Public Form
// // @route   GET /api/public/consultancy/:id
// exports.getPublicConsultancyInfo = async (req, res) => {
//     try {
//         const consultancy = await Consultancy.findById(req.params.id).select('name address phone');
//         if (!consultancy) return res.status(404).json({ success: false, message: 'Consultancy not found' });
//         res.status(200).json({ success: true, data: consultancy });
//     } catch (err) {
//         res.status(400).json({ success: false, message: err.message });
//     }
// };

// // @desc    Submit Inquiry Form (Creates a 'Lead' student and User)
// // @route   POST /api/public/inquiry
// exports.submitInquiry = async (req, res) => {
//     try {
//         const { consultancyId, personalInfo, visaDetails } = req.body;

//         // 1. Check if email exists
//         const userExists = await User.findOne({ email: personalInfo.email });
//         if (userExists) {
//             return res.status(400).json({ success: false, message: 'You are already registered. Please login.' });
//         }

//         // 2. Create User (Student)
//         // We generate a random password and email it to them immediately
//         const tempPassword = crypto.randomBytes(4).toString('hex');
        
//         const user = await User.create({
//             name: `${personalInfo.firstName} ${personalInfo.lastName}`,
//             email: personalInfo.email,
//             password: tempPassword,
//             role: 'student',
//             consultancyId
//         });

//         // 3. Create Student Profile (Status: Lead)
//         const student = await Student.create({
//             user: user._id,
//             consultancy: consultancyId,
//             personalInfo,
//             visaDetails, // Save the Japan specific data
//             profileStatus: 'lead' // Mark as a Lead
//         });

//         user.studentProfileId = student._id;
//         await user.save();

//         // 4. Send Credentials Email
//         const message = `
//             Thank you for your inquiry!
//             We have created an account for you to track your visa process.
            
//             Login URL: ${process.env.CLIENT_URL}/login
//             Email: ${personalInfo.email}
//             Password: ${tempPassword}
//         `;

//         try {
//             await sendEmail({
//                 email: personalInfo.email,
//                 subject: 'Japan Visa Application - Account Created',
//                 message
//             });
//         } catch (e) {
//             console.error(e);
//         }

//         res.status(201).json({ success: true, message: 'Inquiry submitted successfully!' });

//     } catch (err) {
//         res.status(400).json({ success: false, message: err.message });
//     }
// };

const Student = require('../models/Student');
const Consultancy = require('../models/Consultancy');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');
const crypto = require('crypto');
const axios = require('axios'); // Ensure axios is installed: npm install axios

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

// @desc    Get Latest Forex Rate from Nepal Rastra Bank
// @route   GET /api/public/forex
exports.getForexRate = async (req, res) => {
    try {
        // 1. Get Today's Date in YYYY-MM-DD format (Nepal Time)
        // We use a simplified approach; for production, consider a timezone library
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        // 2. Call NRB API
        // We request a range of the last 7 days to ensure we get a rate even on holidays/weekends
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 7);
        const fromYear = fromDate.getFullYear();
        const fromMonth = String(fromDate.getMonth() + 1).padStart(2, '0');
        const fromDay = String(fromDate.getDate()).padStart(2, '0');
        const fromDateString = `${fromYear}-${fromMonth}-${fromDay}`;

        const nrbUrl = `https://www.nrb.org.np/api/forex/v1/rates?per_page=10&page=1&from=${fromDateString}&to=${dateString}`;
        
        const response = await axios.get(nrbUrl);
        
        if (!response.data || !response.data.data || !response.data.data.payload) {
            throw new Error('Invalid response from NRB API');
        }

        // 3. Find the latest USD rate
        // The payload is an array of dates. We want the latest one (usually the first or last depending on sort).
        // NRB API usually returns sorted by date desc or we find the latest.
        const payloads = response.data.data.payload;
        if (payloads.length === 0) throw new Error('No rates found');

        // Sort by date descending to get the absolute latest
        payloads.sort((a, b) => new Date(b.date) - new Date(a.date));
        const latestEntry = payloads[0];
        
        // Find USD in the rates list
        const usdRate = latestEntry.rates.find(r => r.currency.iso3 === 'USD');

        if (!usdRate) {
            return res.status(404).json({ success: false, message: 'USD rate not found' });
        }

        // Return the "Sell" rate as it's typically the reference for students paying fees
        // Or "Buy" rate depending on your business logic. Usually, "Sell" is higher.
        // Let's return the "Buy" rate as a standard reference or average.
        // For visa docs, usually, the Buying Rate is used for income calculation.
        const rate = parseFloat(usdRate.buy);

        res.status(200).json({ 
            success: true, 
            data: {
                rate: rate,
                date: latestEntry.date,
                source: 'Nepal Rastra Bank'
            } 
        });

    } catch (err) {
        console.error("NRB API Error:", err.message);
        // Fallback or error
        res.status(503).json({ success: false, message: 'Failed to fetch NRB rates' });
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
            visaDetails, 
            profileStatus: 'lead'
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