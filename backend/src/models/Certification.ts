import mongoose, { Schema } from 'mongoose';
import { ICertification } from '../types/index.js';

const CertificationSchema = new Schema<ICertification>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
    },
    issueDate: {
      type: String,
      required: true,
      trim: true,
    },
    credentialId: {
      type: String,
      default: '',
      trim: true,
    },
    credentialUrl: {
      type: String,
      default: '',
      trim: true,
    },
    badgeImageUrl: {
      type: String,
      default: '',
    },
    skillsCovered: {
      type: [String],
      default: [],
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

export const Certification = mongoose.model<ICertification>('Certification', CertificationSchema);
