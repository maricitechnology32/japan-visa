const Consultancy = require('../models/Consultancy');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');
const crypto = require('crypto'); // Built-in Node module

// @desc    Register a new Consultancy (Super Admin only)
// @route   POST /api/consultancies
// @access  Private (Super Admin)
exports.createConsultancy = async (req, res) => {
    try {
        const { name, email, address, phone, website } = req.body;

        // 1. Check if consultancy email already exists as a user
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // 2. Create Consultancy Record
        const consultancy = await Consultancy.create({
            name,
            email,
            address,
            phone,
            website
        });

        // 3. Generate a random password
        const tempPassword = crypto.randomBytes(4).toString('hex'); // 8 char password

        // 4. Create the Admin User for this Consultancy
        const user = await User.create({
            name: `${name} Admin`,
            email,
            password: tempPassword,
            role: 'consultancy_admin',
            consultancyId: consultancy._id
        });

        // 5. Send Email with Credentials
        const message = `
            Welcome to Japan Visa SaaS!
            You have been registered as a Consultancy Admin.
            
            Login URL: ${process.env.CLIENT_URL}/login
            Email: ${email}
            Temporary Password: ${tempPassword}
            
            Please change your password after logging in.
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Japan Visa SaaS - Account Created',
                message
            });
        } catch (error) {
            console.error(error);
            // We don't stop the process, but we log the error
        }

        res.status(201).json({
            success: true,
            data: consultancy,
            message: 'Consultancy created and invite email sent.'
        });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all consultancies
// @route   GET /api/consultancies
// @access  Private (Super Admin)
exports.getConsultancies = async (req, res) => {
    try {
        const consultancies = await Consultancy.find().sort('-createdAt');
        res.status(200).json({ success: true, count: consultancies.length, data: consultancies });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};