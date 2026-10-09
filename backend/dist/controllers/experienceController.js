"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperienceById = exports.getExperiences = void 0;
const Experience_js_1 = require("../models/Experience.js");
const getExperiences = async (_req, res) => {
    try {
        const experiences = await Experience_js_1.Experience.find().sort({ order: 1, createdAt: -1 });
        res.json({
            success: true,
            data: experiences,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch experience records.' });
    }
};
exports.getExperiences = getExperiences;
const getExperienceById = async (req, res) => {
    try {
        const record = await Experience_js_1.Experience.findById(req.params.id);
        if (!record) {
            res.status(404).json({ success: false, message: 'Experience record not found.' });
            return;
        }
        res.json({ success: true, data: record });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch experience record.' });
    }
};
exports.getExperienceById = getExperienceById;
const createExperience = async (req, res) => {
    try {
        const { company, position, startDate, endDate, isCurrent, description, technologies, location, order } = req.body;
        if (!company || !position || !startDate || !description) {
            res.status(400).json({
                success: false,
                message: 'Company, position, startDate, and description are required.',
            });
            return;
        }
        const techArray = Array.isArray(technologies)
            ? technologies
            : typeof technologies === 'string'
                ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
                : [];
        const newRecord = await Experience_js_1.Experience.create({
            company,
            position,
            startDate,
            endDate: endDate || 'Present',
            isCurrent: !!isCurrent,
            description,
            technologies: techArray,
            location: location || '',
            order: order !== undefined ? Number(order) : 0,
        });
        res.status(201).json({
            success: true,
            message: 'Experience record created successfully.',
            data: newRecord,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create experience record.', error });
    }
};
exports.createExperience = createExperience;
const updateExperience = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (typeof updateData.technologies === 'string') {
            updateData.technologies = updateData.technologies.split(',').map((t) => t.trim()).filter(Boolean);
        }
        const updated = await Experience_js_1.Experience.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            res.status(404).json({ success: false, message: 'Experience record not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Experience record updated successfully.',
            data: updated,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update experience record.', error });
    }
};
exports.updateExperience = updateExperience;
const deleteExperience = async (req, res) => {
    try {
        const deleted = await Experience_js_1.Experience.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Experience record not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Experience record deleted successfully.',
            data: deleted,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete experience record.' });
    }
};
exports.deleteExperience = deleteExperience;
