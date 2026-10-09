"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ProfileSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Profile = mongoose_1.default.model('Profile', ProfileSchema);
