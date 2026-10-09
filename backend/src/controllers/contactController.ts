import { Request, Response } from 'express';
import { ContactMessage } from '../models/ContactMessage.js';

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({ success: false, message: 'All fields (name, email, subject, message) are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
      return;
    }

    const clientIp = req.ip || req.socket.remoteAddress || '';

    const newContactMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      ipAddress: clientIp,
      isRead: false,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.',
      data: newContactMessage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
};

export const getContactMessages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve messages.' });
  }
};

export const markMessageRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: 'Message not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Message marked as read.',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update message.' });
  }
};

export const deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Message not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Message deleted successfully.',
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message.' });
  }
};
