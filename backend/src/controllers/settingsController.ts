import { Request, Response } from 'express';
import { SiteSettings } from '../models/SiteSettings.js';
import { Profile } from '../models/Profile.js';

export const getSiteSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve site settings.' });
  }
};

export const updateSiteSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      // Deep merge the sections provided
      if (req.body.navbar) settings.navbar = { ...settings.navbar, ...req.body.navbar };
      if (req.body.home) settings.home = { ...settings.home, ...req.body.home };
      if (req.body.about) settings.about = { ...settings.about, ...req.body.about };
      if (req.body.resume) settings.resume = { ...settings.resume, ...req.body.resume };
      if (req.body.contact) settings.contact = { ...settings.contact, ...req.body.contact };
      if (req.body.footer) settings.footer = { ...settings.footer, ...req.body.footer };
    }

    const saved = await settings.save();

    // Automatically sync relevant home fields to the Profile model
    if (req.body.home) {
      const profileUpdates: Record<string, any> = {};
      if (req.body.home.name) profileUpdates.fullName = req.body.home.name;
      if (req.body.home.profilePhotoUrl) profileUpdates.avatarUrl = req.body.home.profilePhotoUrl;
      if (req.body.home.title) profileUpdates.headline = req.body.home.title;
      if (req.body.home.description) profileUpdates.bio = req.body.home.description;
      if (req.body.home.resumeUrl) profileUpdates.resumeUrl = req.body.home.resumeUrl;
      if (req.body.home.githubUrl || req.body.home.linkedinUrl) {
        profileUpdates.socialLinks = {
          github: req.body.home.githubUrl,
          linkedin: req.body.home.linkedinUrl,
          twitter: req.body.home.otherSocials?.twitter,
          instagram: req.body.home.otherSocials?.instagram,
          leetcode: req.body.home.otherSocials?.leetcode,
          website: req.body.home.otherSocials?.website,
        };
      }
      if (Object.keys(profileUpdates).length > 0) {
        await Profile.findOneAndUpdate({}, { $set: profileUpdates });
      }
    }

    // Automatically sync relevant about fields to the Profile model
    if (req.body.about) {
      const profileUpdates: Record<string, any> = {};
      if (req.body.about.description) {
        profileUpdates.aboutStory = req.body.about.description;
      }
      if (Array.isArray(req.body.about.personalInfo)) {
        for (const item of req.body.about.personalInfo) {
          const lbl = (item.label || '').toLowerCase();
          const val = item.value || '';
          if (lbl.includes('college') || lbl.includes('institution') || lbl.includes('university')) {
            profileUpdates.collegeName = val;
          } else if (lbl.includes('cgpa') || lbl.includes('gpa')) {
            profileUpdates['stats.gpa'] = val.split('/')[0].trim();
          } else if (lbl.includes('location')) {
            profileUpdates.location = val;
          } else if (lbl.includes('email')) {
            profileUpdates.email = val;
          } else if (lbl.includes('department') || lbl.includes('dept')) {
            profileUpdates.department = val;
          } else if (lbl.includes('year')) {
            profileUpdates.currentYear = val;
          }
        }
      }
      if (Object.keys(profileUpdates).length > 0) {
        await Profile.findOneAndUpdate({}, { $set: profileUpdates });
      }
    }

    res.json({
      success: true,
      message: 'Site settings updated successfully in MongoDB.',
      data: saved,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update site settings.', error });
  }
};

