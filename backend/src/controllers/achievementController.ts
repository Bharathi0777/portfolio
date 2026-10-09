import { Request, Response } from 'express';
import { Achievement } from '../models/Achievement.js';

export const getAchievements = async (_req: Request, res: Response): Promise<void> => {
  try {
    const achievements = await Achievement.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      data: achievements,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch achievements.' });
  }
};

export const getAchievementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const record = await Achievement.findById(req.params.id);
    if (!record) {
      res.status(404).json({ success: false, message: 'Achievement not found.' });
      return;
    }
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch achievement.' });
  }
};

export const createAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, date, category, awarder, proofUrl, order } = req.body;
    if (!title || !description || !date) {
      res.status(400).json({
        success: false,
        message: 'Title, description, and date are required.',
      });
      return;
    }

    const newRecord = await Achievement.create({
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
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create achievement.', error });
  }
};

export const updateAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
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
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update achievement.', error });
  }
};

export const deleteAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Achievement.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Achievement not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Achievement deleted successfully.',
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete achievement.' });
  }
};
