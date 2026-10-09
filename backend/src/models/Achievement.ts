import mongoose, { Schema } from 'mongoose';
import { IAchievement } from '../types/index.js';

const AchievementSchema = new Schema<IAchievement>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'Contest / Award',
      trim: true,
    },
    awarder: {
      type: String,
      default: '',
      trim: true,
    },
    proofUrl: {
      type: String,
      default: '',
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Achievement = mongoose.model<IAchievement>('Achievement', AchievementSchema);
