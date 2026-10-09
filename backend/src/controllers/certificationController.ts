import { Request, Response } from 'express';
import { Certification } from '../models/Certification.js';

export const getCertifications = async (_req: Request, res: Response): Promise<void> => {
  try {
    const certs = await Certification.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      data: certs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch certifications.' });
  }
};

export const getCertificationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) {
      res.status(404).json({ success: false, message: 'Certification not found.' });
      return;
    }
    res.json({ success: true, data: cert });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch certification.' });
  }
};

export const createCertification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, issuer, issueDate, credentialId, credentialUrl, badgeImageUrl, skillsCovered, featured, order } = req.body;
    if (!title || !issuer || !issueDate) {
      res.status(400).json({ success: false, message: 'Title, issuer, and issueDate are required.' });
      return;
    }

    const newCert = await Certification.create({
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
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create certification.', error });
  }
};

export const updateCertification = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCert = await Certification.findByIdAndUpdate(req.params.id, req.body, {
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
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update certification.', error });
  }
};

export const deleteCertification = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCert = await Certification.findByIdAndDelete(req.params.id);
    if (!deletedCert) {
      res.status(404).json({ success: false, message: 'Certification not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Certification deleted successfully.',
      data: deletedCert,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete certification.' });
  }
};
