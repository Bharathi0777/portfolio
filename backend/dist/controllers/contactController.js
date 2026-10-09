"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactMessage = exports.markMessageRead = exports.getContactMessages = exports.submitContact = void 0;
const ContactMessage_js_1 = require("../models/ContactMessage.js");
const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            res.status(400).json({ success: false, message: 'All fields (name, email, subject, message) are required.' });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
            return;
        }
        const clientIp = req.ip || req.socket.remoteAddress || '';
        const newContactMessage = await ContactMessage_js_1.ContactMessage.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim(),
            ipAddress: clientIp,
            isRead: false,
        });
        res.status(201).json({
            success: true,
            message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.',
            data: newContactMessage,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }
};
exports.submitContact = submitContact;
const getContactMessages = async (_req, res) => {
    try {
        const messages = await ContactMessage_js_1.ContactMessage.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: messages,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve messages.' });
    }
};
exports.getContactMessages = getContactMessages;
const markMessageRead = async (req, res) => {
    try {
        const updated = await ContactMessage_js_1.ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        if (!updated) {
            res.status(404).json({ success: false, message: 'Message not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Message marked as read.',
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update message.' });
    }
};
exports.markMessageRead = markMessageRead;
const deleteContactMessage = async (req, res) => {
    try {
        const deleted = await ContactMessage_js_1.ContactMessage.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Message not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Message deleted successfully.',
            data: deleted,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete message.' });
    }
};
exports.deleteContactMessage = deleteContactMessage;
