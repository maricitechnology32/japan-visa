 

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
// const sendTokenResponse = (user, statusCode, res) => {
//     // Create token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: '30d'
//     });

//     // Options for cookie
//     const options = {
//         expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
//         httpOnly: true // Cookie cannot be accessed by client side scripts
//     };

//     if (process.env.NODE_ENV === 'production') {
//         options.secure = true;
//     }

//     res
//         .status(statusCode)
//         .cookie('token', token, options)
//         .json({
//             success: true,
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 subRole: user.subRole, // <--- FIXED: Added this line
//                 consultancyId: user.consultancyId
//             }
//         });
// };
const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true,
        // FORCE false for development (localhost), true ONLY if on HTTPS
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax', // Essential for localhost login
        path: '/'
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token, // Sending token here allows frontend to save it to LocalStorage
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                subRole: user.subRole,
                consultancyId: user.consultancyId
            }
        });
};
// @desc    Register user (For initial setup / testing)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'Please provide an email and password' });

        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ success: true, data: {} });
};