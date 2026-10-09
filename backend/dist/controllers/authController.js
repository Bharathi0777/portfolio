"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_js_1 = require("../models/Admin.js");
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required.' });
            return;
        }
        const admin = await Admin_js_1.Admin.findOne({ email: email.toLowerCase().trim() });
        if (!admin) {
            res.status(401).json({ success: false, message: 'Invalid credentials.' });
            return;
        }
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid credentials.' });
            return;
        }
        const secret = process.env.JWT_SECRET || 'super_secret_portfolio_jwt_key_2026_change_in_production';
        const token = jsonwebtoken_1.default.sign({ id: admin._id, email: admin.email, username: admin.username }, secret, { expiresIn: '7d' });
        res.json({
            success: true,
            message: 'Logged in successfully.',
            token,
            user: {
                id: admin._id,
                email: admin.email,
                username: admin.username,
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error during login.' });
    }
};
exports.loginAdmin = loginAdmin;
const getMe = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Unauthorized.' });
            return;
        }
        const admin = await Admin_js_1.Admin.findById(req.user.id).select('-passwordHash');
        if (!admin) {
            res.status(404).json({ success: false, message: 'Admin account not found.' });
            return;
        }
        res.json({
            success: true,
            user: admin,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error verifying session.' });
    }
};
exports.getMe = getMe;
