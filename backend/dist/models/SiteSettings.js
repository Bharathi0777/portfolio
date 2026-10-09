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
exports.SiteSettings = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const NavItemSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    label: { type: String, required: true },
    href: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, { _id: false });
const SiteSettingsSchema = new mongoose_1.Schema({
    navbar: {
        logoText: { type: String, default: 'Aarav.dev' },
        items: {
            type: [NavItemSchema],
            default: [
                { id: 'home', label: 'Home', href: '#home', isVisible: true, order: 1 },
                { id: 'about', label: 'About', href: '#about', isVisible: true, order: 2 },
                { id: 'skills', label: 'Skills', href: '#skills', isVisible: true, order: 3 },
                { id: 'education', label: 'Education', href: '#education', isVisible: true, order: 4 },
                { id: 'experience', label: 'Experience', href: '#experience', isVisible: true, order: 5 },
                { id: 'projects', label: 'Projects', href: '#projects', isVisible: true, order: 6 },
                { id: 'certifications', label: 'Certifications', href: '#certifications', isVisible: true, order: 7 },
                { id: 'achievements', label: 'Achievements', href: '#achievements', isVisible: true, order: 8 },
                { id: 'resume', label: 'Resume', href: '#resume', isVisible: true, order: 9 },
                { id: 'contact', label: 'Contact', href: '#contact', isVisible: true, order: 10 },
            ],
        },
    },
    home: {
        name: { type: String, default: 'Aarav Sharma' },
        title: { type: String, default: 'Aspiring Software Engineer & Full-Stack Developer' },
        introduction: { type: String, default: '👋 Hello World, I am' },
        description: {
            type: String,
            default: '3rd Year Information Technology Undergrad specializing in resilient web platforms, cloud computing & distributed systems.',
        },
        profilePhotoUrl: {
            type: String,
            default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        },
        resumeButtonText: { type: String, default: 'Download Resume' },
        resumeUrl: { type: String, default: '/sample-resume.pdf' },
        githubUrl: { type: String, default: 'https://github.com/aaravsharma-it' },
        linkedinUrl: { type: String, default: 'https://linkedin.com/in/aaravsharma-it' },
        otherSocials: {
            twitter: { type: String, default: 'https://x.com/aarav_dev' },
            instagram: { type: String, default: 'https://instagram.com/aarav_codes' },
            leetcode: { type: String, default: 'https://leetcode.com/aarav_codes' },
            website: { type: String, default: 'https://aaravsharma.dev' },
        },
    },
    about: {
        title: { type: String, default: 'Driven by Curiosity & Code' },
        description: {
            type: String,
            default: 'Currently in my 6th semester of B.Tech in Information Technology. My coding journey started with C++ and object-oriented design, progressing into modern web ecosystems with React, TypeScript, Node.js, and cloud deployments.',
        },
        imageUrl: {
            type: String,
            default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        },
        personalInfo: {
            type: [
                {
                    label: { type: String },
                    value: { type: String },
                },
            ],
            default: [
                { label: 'Degree', value: 'B.Tech Information Technology' },
                { label: 'College', value: 'NITK Surathkal' },
                { label: 'Year', value: '3rd Year (Batch of 2027)' },
                { label: 'CGPA', value: '8.92 / 10' },
                { label: 'Location', value: 'Bengaluru / Mangaluru, India' },
                { label: 'Email', value: 'aarav.sharma.it@example.com' },
            ],
        },
    },
    resume: {
        resumeUrl: { type: String, default: '/sample-resume.pdf' },
        fileName: { type: String, default: 'Aarav_Sharma_Resume.pdf' },
        buttonText: { type: String, default: 'Download Full Resume' },
        lastUpdated: { type: String, default: 'October 2026' },
    },
    contact: {
        email: { type: String, default: 'aarav.sharma.it@example.com' },
        phone: { type: String, default: '+91 98765 43210' },
        location: { type: String, default: 'Bengaluru, India' },
        description: {
            type: String,
            default: 'I am actively looking for Summer 2026 SDE Internship roles, hackathon collaborations, and open-source opportunities. My inbox is always open!',
        },
        github: { type: String, default: 'https://github.com/aaravsharma-it' },
        linkedin: { type: String, default: 'https://linkedin.com/in/aaravsharma-it' },
        instagram: { type: String, default: 'https://instagram.com/aarav_codes' },
        twitter: { type: String, default: 'https://x.com/aarav_dev' },
    },
    footer: {
        description: {
            type: String,
            default: '3rd-year Information Technology engineering undergrad passionate about building reliable software, web systems, and cloud infrastructure.',
        },
        copyrightText: { type: String, default: '© 2026 Aarav Sharma. All rights reserved.' },
        links: {
            type: [{ label: { type: String }, url: { type: String } }],
            default: [
                { label: 'Home', url: '#home' },
                { label: 'About', url: '#about' },
                { label: 'Projects', url: '#projects' },
                { label: 'Experience', url: '#experience' },
                { label: 'Contact', url: '#contact' },
            ],
        },
    },
}, {
    timestamps: true,
});
exports.SiteSettings = mongoose_1.default.model('SiteSettings', SiteSettingsSchema);
