import { Request, Response } from 'express';
import { Project } from '../models/Project.js';

export const getProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch projects.' });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found.' });
      return;
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch project.' });
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, tagline, description, technologies, category, githubUrl, liveUrl, imageUrl, featured, highlights, order } = req.body;
    if (!title || !description || !technologies || !githubUrl) {
      res.status(400).json({
        success: false,
        message: 'Title, description, technologies array, and GitHub URL are required.',
      });
      return;
    }

    const newProject = await Project.create({
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
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create project.', error });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
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
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update project.', error });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      res.status(404).json({ success: false, message: 'Project not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Project deleted successfully.',
      data: deletedProject,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
};
