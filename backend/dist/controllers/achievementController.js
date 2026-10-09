"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAchievement = exports.updateAchievement = exports.createAchievement = exports.getAchievementById = exports.getAchievements = void 0;
const Achievement_js_1 = require("../models/Achievement.js");
const getAchievements = async (_req, res) => {
    try {
        const achievements = await Achievement_js_1.Achievement.find().sort({ order: 1, createdAt: -1 });
        res.json({
            success: true,
            data: achievements,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch achievements.' });
    }
};
exports.getAchievements = getAchievements;
const getAchievementById = async (req, res) => {
    try {
        const record = await Achievement_js_1.Achievement.findById(req.params.id);
        if (!record) {
            res.status(404).json({ success: false, message: 'Achievement not found.' });
            return;
        }
        res.json({ success: true, data: record });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch achievement.' });
    }
};
exports.getAchievementById = getAchievementById;
const createAchievement = async (req, res) => {
    try {
        const { title, description, date, category, awarder, proofUrl, order } = req.body;
        if (!title || !description || !date) {
            res.status(400).json({
                success: false,
                message: 'Title, description, and date are required.',
            });
            return;
        }
        const newRecord = await Achievement_js_1.Achievement.create({
            title,
            description,
            date,
            category: category || 'Award / Recognition',
            awarder: awarder || '',
            proofUrl: proofUrl || '',
            order: order !== undefined ? Number(order) : 0,
        });
        res.status(201).json({
            success: true,
            message: 'Achievement created successfully.',
            data: newRecord,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create achievement.', error });
    }
};
exports.createAchievement = createAchievement;
const updateAchievement = async (req, res) => {
    try {
        const updated = await Achievement_js_1.Achievement.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            res.status(404).json({ success: false, message: 'Achievement not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Achievement updated successfully.',
            data: updated,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update achievement.', error });
    }
};
exports.updateAchievement = updateAchievement;
const deleteAchievement = async (req, res) => {
    try {
        const deleted = await Achievement_js_1.Achievement.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Achievement not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Achievement deleted successfully.',
            data: deleted,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete achievement.' });
    }
};
exports.deleteAchievement = deleteAchievement;
