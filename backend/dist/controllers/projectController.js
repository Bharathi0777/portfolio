"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const Project_js_1 = require("../models/Project.js");
const getProjects = async (_req, res) => {
    try {
        const projects = await Project_js_1.Project.find().sort({ order: 1, createdAt: -1 });
        res.json({
            success: true,
            data: projects,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch projects.' });
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    try {
        const project = await Project_js_1.Project.findById(req.params.id);
        if (!project) {
            res.status(404).json({ success: false, message: 'Project not found.' });
            return;
        }
        res.json({ success: true, data: project });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch project.' });
    }
};
exports.getProjectById = getProjectById;
const createProject = async (req, res) => {
    try {
        const { title, tagline, description, technologies, category, githubUrl, liveUrl, imageUrl, featured, highlights, order } = req.body;
        if (!title || !description || !technologies || !githubUrl) {
            res.status(400).json({
                success: false,
                message: 'Title, description, technologies array, and GitHub URL are required.',
            });
            return;
        }
        const newProject = await Project_js_1.Project.create({
            title,
            tagline: tagline || '',
            description,
            technologies: Array.isArray(technologies) ? technologies : [technologies],
            category: category || 'Full Stack',
            githubUrl,
            liveUrl: liveUrl || '',
            imageUrl: imageUrl || '',
            featured: featured !== undefined ? featured : false,
            highlights: Array.isArray(highlights) ? highlights : [],
            order: order !== undefined ? Number(order) : 0,
        });
        res.status(201).json({
            success: true,
            message: 'Project created successfully.',
            data: newProject,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create project.', error });
    }
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project_js_1.Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedProject) {
            res.status(404).json({ success: false, message: 'Project not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Project updated successfully.',
            data: updatedProject,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update project.', error });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project_js_1.Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            res.status(404).json({ success: false, message: 'Project not found.' });
            return;
        }
        res.json({
            success: true,
            message: 'Project deleted successfully.',
            data: deletedProject,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete project.' });
    }
};
exports.deleteProject = deleteProject;
