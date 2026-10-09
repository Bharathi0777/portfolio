import mongoose, { Schema } from 'mongoose';
import { IEducation } from '../types/index.js';

const EducationSchema = new Schema<IEducation>(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    college: {
      type: String,
      trim: true,
      default: '',
    },
    institution: {
      type: String,
      trim: true,
      default: '',
    },
    university: {
      type: String,
      trim: true,
      default: '',
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    startYear: {
      type: Number,
      required: true,
    },
    endYear: {
      type: Number,
      default: 2027,
    },
    current: {
      type: Boolean,
      default: false,
    },
    score: {
      type: String,
      required: true,
      trim: true,
    },
    relevantCoursework: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
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

export const Education = mongoose.model<IEducation>('Education', EducationSchema);
