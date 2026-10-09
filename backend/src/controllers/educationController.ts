import { Request, Response } from 'express';
import { Education } from '../models/Education.js';

export const getEducation = async (_req: Request, res: Response): Promise<void> => {
  try {
    const education = await Education.find().sort({ order: 1, startYear: -1 });
    res.json({
      success: true,
      data: education,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch education records.' });
  }
};

export const getEducationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const record = await Education.findById(req.params.id);
    if (!record) {
      res.status(404).json({ success: false, message: 'Education record not found.' });
      return;
    }
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching education record.' });
  }
};

export const createEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      degree,
      college,
      university,
      department,
      location,
      startYear,
      endYear,
      score,
      relevantCoursework,
      description,
      current,
      order,
    } = req.body;

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
      ? relevantCoursework.split(',').map((c: string) => c.trim()).filter(Boolean)
      : [];

    const parsedStartYear = Number(startYear);
    const parsedEndYear = endYear !== undefined && endYear !== '' && !isNaN(Number(endYear))
      ? Number(endYear)
      : parsedStartYear + 4;

    const newRecord = await Education.create({
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
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create education record.', error });
  }
};

export const updateEducation = async (req: Request, res: Response): Promise<void> => {
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
    } else if (updateData.current && updateData.startYear) {
      updateData.endYear = Number(updateData.startYear) + 4;
    } else {
      delete updateData.endYear;
    }
    if (typeof updateData.relevantCoursework === 'string') {
      updateData.relevantCoursework = updateData.relevantCoursework
        .split(',')
        .map((c: string) => c.trim())
        .filter(Boolean);
    }

    const updatedRecord = await Education.findByIdAndUpdate(req.params.id, updateData, {
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
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update education record.', error });
  }
};

export const deleteEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRecord = await Education.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      res.status(404).json({ success: false, message: 'Education record not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Education record deleted successfully.',
      data: deletedRecord,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete education record.' });
  }
};
