import { Request, Response } from 'express';
import { Skill } from '../models/Skill.js';

export const getSkills = async (_req: Request, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch skills.' });
  }
};

export const getSkillById = async (req: Request, res: Response): Promise<void> => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      res.status(404).json({ success: false, message: 'Skill not found.' });
      return;
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving skill.' });
  }
};

export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, proficiency, iconName, featured, order } = req.body;
    if (!name || !category || proficiency === undefined) {
      res.status(400).json({ success: false, message: 'Name, category, and proficiency are required.' });
      return;
    }

    const newSkill = await Skill.create({
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
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create skill.', error });
  }
};

export const updateSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
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
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update skill.', error });
  }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      res.status(404).json({ success: false, message: 'Skill not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully.',
      data: deletedSkill,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete skill.' });
  }
};
