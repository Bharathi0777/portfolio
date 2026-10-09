import mongoose, { Schema } from 'mongoose';
import { IProfile } from '../types/index.js';

const ProfileSchema = new Schema<IProfile>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: true,
      trim: true,
    },
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    roles: {
      type: [String],
      default: ['Full Stack Developer', 'Information Technology Student', 'Cloud Enthusiast', 'Open Source Contributor'],
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    aboutStory: {
      type: String,
      required: true,
      trim: true,
    },
    careerGoals: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    resumeUrl: {
      type: String,
      default: '/sample-resume.pdf',
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '+91 98765 43210',
    },
    location: {
      type: String,
      default: 'Bengaluru, India',
    },
    collegeName: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      default: 'Information Technology',
    },
    graduationYear: {
      type: Number,
      default: 2027,
    },
    currentYear: {
      type: String,
      default: '3rd Year B.Tech / B.E.',
    },
    socialLinks: {
      github: { type: String, default: 'https://github.com' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      twitter: { type: String, default: 'https://twitter.com' },
      leetcode: { type: String, default: 'https://leetcode.com' },
      codechef: { type: String, default: 'https://codechef.com' },
      hackerrank: { type: String, default: 'https://hackerrank.com' },
    },
    stats: {
      projectsCount: { type: Number, default: 8 },
      certificationsCount: { type: Number, default: 4 },
      solvedProblemsCount: { type: Number, default: 350 },
      gpa: { type: String, default: '8.85 / 10' },
    },
    availableForHire: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
