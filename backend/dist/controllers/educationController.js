"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.getEducationById = exports.getEducation = void 0;
const Education_js_1 = require("../models/Education.js");
const getEducation = async (_req, res) => {
    try {
        const education = await Education_js_1.Education.find().sort({ order: 1, startYear: -1 });
        res.json({
            success: true,
            data: education,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch education records.' });
    }
};
exports.getEducation = getEducation;
const getEducationById = async (req, res) => {
    try {
        const record = await Education_js_1.Education.findById(req.params.id);
        if (!record) {
            res.status(404).json({ success: false, message: 'Education record not found.' });
            return;
        }
        res.json({ success: true, data: record });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching education record.' });
    }
};
exports.getEducationById = getEducationById;
const createEducation = async (req, res) => {
    try {
        const { degree, college, university, department, location, startYear, endYear, score, relevantCoursework, description, current, order, } = req.body;
        const collegeName = college || req.body.institution || '';
        if (!degree || !collegeName || !startYear || !score) {
            res.status(400).json({
                success: false,
                message: 'Degree, college/institution, startYear, and score are required.',
            });
            return;
        }
        const courseworkArray = Array.isArray(relevantCoursework)
            ? relevantCoursework
            : typeof relevantCoursework === 'string'
                ? relevantCoursework.split(',').map((c) => c.trim()).filter(Boolean)
                : [];
        const parsedStartYear = Number(startYear);
        const parsedEndYear = endYear !== undefined && endYear !== '' && !isNaN(Number(endYear))
            ? Number(endYear)
            : parsedStartYear + 4;
        const newRecord = await Education_js_1.Education.create({
            degree,
            college: collegeName,
            institution: collegeName,
            university: university || '',
            department: department || 'Information Technology',
            location: location || '',
            startYear: parsedStartYear,
            endYear: parsedEndYear,
            score,
            relevantCoursework: courseworkArray,
            description: description || '',
            current: !!current,
            order: order !== undefined ? Number(order) : 0,
        });
        res.status(201).json({
            success: true,
            message: 'Education record created successfully.',
            data: newRecord,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create education record.', error });
    }
};
exports.createEducation = createEducation;
const updateEducation = async (req, res) => {
    try {
        const updateData = { ...req.body };
        const collegeName = updateData.college || updateData.institution;
        if (collegeName) {
            updateData.college = collegeName;
            updateData.institution = collegeName;
        }
        if (updateData.startYear) {
            updateData.startYear = Number(updateData.startYear);
        }
        if (updateData.endYear !== undefined && updateData.endYear !== '' && !isNaN(Number(updateData.endYear))) {
            updateData.endYear = Number(updateData.endYear);
        }
        else if (updateData.current && updateData.startYear) {
            updateData.endYear = Number(updateData.startYear) + 4;
        }
        else {
            delete updateData.endYear;
        }
        if (typeof updateData.relevantCoursework === 'string') {
            updateData.relevantCoursework = updateData.relevantCoursework
                .split(',')
                .map((c) => c.trim())
                .filter(Boolean);
        }
        const updatedRecord = await Education_js_1.Education.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedRecord) {
            res.status(404).json({ success: false, message: 'Education record not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Education record updated successfully.',
            data: updatedRecord,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update education record.', error });
    }
};
exports.updateEducation = updateEducation;
const deleteEducation = async (req, res) => {
    try {
        const deletedRecord = await Education_js_1.Education.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            res.status(404).json({ success: false, message: 'Education record not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Education record deleted successfully.',
            data: deletedRecord,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete education record.' });
    }
};
exports.deleteEducation = deleteEducation;
