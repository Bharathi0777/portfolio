import { Request, Response } from 'express';
import { Profile } from '../models/Profile.js';

export const getProfile = async (_req: Request, res: Response): Promise<void> => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Create a default initial profile if none exists
      profile = await Profile.create({
        fullName: 'Alex Rivera',
        tagline: 'Aspiring Software Engineer & IT Specialist',
        headline: '3rd Year Information Technology Undergrad building resilient web applications & distributed systems.',
        roles: ['Full Stack Developer', 'Information Technology Student', 'Cloud Enthusiast', 'Open Source Contributor'],
        bio: 'Passionate 3rd-year Information Technology engineering student with a deep interest in software architecture, cloud platforms, and full-stack development. Focused on building high-performance systems and user-centric digital experiences.',
        aboutStory: 'Currently in my 6th semester of Information Technology, I love transforming complex engineering problems into elegant code. Having solved 350+ DSA challenges and deployed end-to-end full stack web platforms, I am eager to apply my analytical and technical skills in fast-paced software engineering roles.',
        careerGoals: 'Aspiring to join an innovative engineering team as a Software Development Engineer (SDE) Intern / Full-Time engineer, working on scalable distributed cloud systems, modern web platforms, and automated developer tooling.',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        resumeUrl: '/sample-resume.pdf',
        email: 'alex.rivera.it@example.com',
        phone: '+91 98765 43210',
        location: 'Bengaluru, India',
        collegeName: 'National Institute of Technology & Science',
        department: 'Department of Information Technology',
        graduationYear: 2027,
        currentYear: '3rd Year B.Tech',
        socialLinks: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://x.com',
          leetcode: 'https://leetcode.com',
          codechef: 'https://codechef.com',
          hackerrank: 'https://hackerrank.com',
        },
        stats: {
          projectsCount: 8,
          certificationsCount: 4,
          solvedProblemsCount: 380,
          gpa: '8.85 / 10',
        },
        availableForHire: true,
      });
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile details.' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }

    const savedProfile = await profile.save();
    res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: savedProfile,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update profile.', error });
  }
};
