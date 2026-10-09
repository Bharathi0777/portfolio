import mongoose, { Schema } from 'mongoose';
import { ISkill } from '../types/index.js';

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'DevOps & Cloud', 'Core CS', 'Tools & Other'],
      required: true,
    },
    proficiency: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
      default: 80,
    },
    iconName: {
      type: String,
      default: 'Code',
    },
    featured: {
      type: Boolean,
      default: true,
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

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);
