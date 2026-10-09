"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const profileRoutes_js_1 = __importDefault(require("./routes/profileRoutes.js"));
const skillRoutes_js_1 = __importDefault(require("./routes/skillRoutes.js"));
const educationRoutes_js_1 = __importDefault(require("./routes/educationRoutes.js"));
const experienceRoutes_js_1 = __importDefault(require("./routes/experienceRoutes.js"));
const projectRoutes_js_1 = __importDefault(require("./routes/projectRoutes.js"));
const certificationRoutes_js_1 = __importDefault(require("./routes/certificationRoutes.js"));
const achievementRoutes_js_1 = __importDefault(require("./routes/achievementRoutes.js"));
const contactRoutes_js_1 = __importDefault(require("./routes/contactRoutes.js"));
const settingsRoutes_js_1 = __importDefault(require("./routes/settingsRoutes.js"));
const uploadRoutes_js_1 = __importDefault(require("./routes/uploadRoutes.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const app = (0, express_1.default)();
// CORS configuration
const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(null, true);
        }
    },
    credentials: true,
}));
app.use(express_1.default.json({ limit: '25mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '25mb' }));
const fs_1 = __importDefault(require("fs"));
// Static file serving for uploads - support running from root or backend directory
const candidateUploadDirs = [
    path_1.default.resolve(process.cwd(), 'public/uploads'),
    path_1.default.resolve(process.cwd(), 'backend/public/uploads'),
];
candidateUploadDirs.forEach((dir) => {
    if (fs_1.default.existsSync(dir)) {
        app.use('/uploads', express_1.default.static(dir));
    }
});
// Also ensure default upload dir is created and served
const defaultUploadDir = path_1.default.resolve(process.cwd(), fs_1.default.existsSync(path_1.default.resolve(process.cwd(), 'backend')) ? 'backend/public/uploads' : 'public/uploads');
if (!fs_1.default.existsSync(defaultUploadDir)) {
    fs_1.default.mkdirSync(defaultUploadDir, { recursive: true });
}
app.use('/uploads', express_1.default.static(defaultUploadDir));
// Health Check
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'Personal Portfolio API',
        uptime: process.uptime(),
    });
});
// API Routes
app.use('/api/auth', authRoutes_js_1.default);
app.use('/api/profile', profileRoutes_js_1.default);
app.use('/api/skills', skillRoutes_js_1.default);
app.use('/api/education', educationRoutes_js_1.default);
app.use('/api/experience', experienceRoutes_js_1.default);
app.use('/api/projects', projectRoutes_js_1.default);
app.use('/api/certifications', certificationRoutes_js_1.default);
app.use('/api/achievements', achievementRoutes_js_1.default);
app.use('/api/contact', contactRoutes_js_1.default);
app.use('/api/settings', settingsRoutes_js_1.default);
app.use('/api/upload', uploadRoutes_js_1.default);
// 404 Route handler
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: 'Requested API endpoint not found',
    });
});
// Global Error Handler
app.use(errorHandler_js_1.errorHandler);
exports.default = app;
