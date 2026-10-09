"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkillById = exports.getSkills = void 0;
const Skill_js_1 = require("../models/Skill.js");
const getSkills = async (_req, res) => {
    try {
        const skills = await Skill_js_1.Skill.find().sort({ order: 1, createdAt: 1 });
        res.json({
            success: true,
            data: skills,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch skills.' });
    }
};
exports.getSkills = getSkills;
const getSkillById = async (req, res) => {
    try {
        const skill = await Skill_js_1.Skill.findById(req.params.id);
        if (!skill) {
            res.status(404).json({ success: false, message: 'Skill not found.' });
            return;
        }
        res.json({ success: true, data: skill });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving skill.' });
    }
};
exports.getSkillById = getSkillById;
const createSkill = async (req, res) => {
    try {
        const { name, category, proficiency, iconName, featured, order } = req.body;
        if (!name || !category || proficiency === undefined) {
            res.status(400).json({ success: false, message: 'Name, category, and proficiency are required.' });
            return;
        }
        const newSkill = await Skill_js_1.Skill.create({
            name,
            category,
            proficiency: Number(proficiency),
            iconName: iconName || 'Code',
            featured: featured !== undefined ? featured : true,
            order: order !== undefined ? Number(order) : 0,
        });
        res.status(201).json({
            success: true,
            message: 'Skill created successfully.',
            data: newSkill,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create skill.', error });
    }
};
exports.createSkill = createSkill;
const updateSkill = async (req, res) => {
    try {
        const updatedSkill = await Skill_js_1.Skill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedSkill) {
            res.status(404).json({ success: false, message: 'Skill not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Skill updated successfully.',
            data: updatedSkill,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update skill.', error });
    }
};
exports.updateSkill = updateSkill;
const deleteSkill = async (req, res) => {
    try {
        const deletedSkill = await Skill_js_1.Skill.findByIdAndDelete(req.params.id);
        if (!deletedSkill) {
            res.status(404).json({ success: false, message: 'Skill not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Skill deleted successfully.',
            data: deletedSkill,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete skill.' });
    }
};
exports.deleteSkill = deleteSkill;
