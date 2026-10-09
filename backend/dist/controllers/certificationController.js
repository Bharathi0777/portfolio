"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCertification = exports.updateCertification = exports.createCertification = exports.getCertificationById = exports.getCertifications = void 0;
const Certification_js_1 = require("../models/Certification.js");
const getCertifications = async (_req, res) => {
    try {
        const certs = await Certification_js_1.Certification.find().sort({ order: 1, createdAt: -1 });
        res.json({
            success: true,
            data: certs,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch certifications.' });
    }
};
exports.getCertifications = getCertifications;
const getCertificationById = async (req, res) => {
    try {
        const cert = await Certification_js_1.Certification.findById(req.params.id);
        if (!cert) {
            res.status(404).json({ success: false, message: 'Certification not found.' });
            return;
        }
        res.json({ success: true, data: cert });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch certification.' });
    }
};
exports.getCertificationById = getCertificationById;
const createCertification = async (req, res) => {
    try {
        const { title, issuer, issueDate, credentialId, credentialUrl, badgeImageUrl, skillsCovered, featured, order } = req.body;
        if (!title || !issuer || !issueDate) {
            res.status(400).json({ success: false, message: 'Title, issuer, and issueDate are required.' });
            return;
        }
        const newCert = await Certification_js_1.Certification.create({
            title,
            issuer,
            issueDate,
            credentialId: credentialId || '',
            credentialUrl: credentialUrl || '',
            badgeImageUrl: badgeImageUrl || '',
            skillsCovered: Array.isArray(skillsCovered) ? skillsCovered : [],
            featured: featured !== undefined ? featured : true,
            order: order !== undefined ? Number(order) : 0,
        });
        res.status(201).json({
            success: true,
            message: 'Certification created successfully.',
            data: newCert,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create certification.', error });
    }
};
exports.createCertification = createCertification;
const updateCertification = async (req, res) => {
    try {
        const updatedCert = await Certification_js_1.Certification.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedCert) {
            res.status(404).json({ success: false, message: 'Certification not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Certification updated successfully.',
            data: updatedCert,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update certification.', error });
    }
};
exports.updateCertification = updateCertification;
const deleteCertification = async (req, res) => {
    try {
        const deletedCert = await Certification_js_1.Certification.findByIdAndDelete(req.params.id);
        if (!deletedCert) {
            res.status(404).json({ success: false, message: 'Certification not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Certification deleted successfully.',
            data: deletedCert,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete certification.' });
    }
};
exports.deleteCertification = deleteCertification;
