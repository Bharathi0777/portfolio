"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileUpload = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handleFileUpload = async (req, res) => {
    try {
        const { fileName, fileData, fileType } = req.body;
        if (!fileName || !fileData) {
            res.status(400).json({
                success: false,
                message: 'Both fileName and fileData (base64 string) are required.',
            });
            return;
        }
        // Strip data URL scheme prefix if present (e.g., "data:image/png;base64,...")
        const base64Index = fileData.indexOf(';base64,');
        const base64Content = base64Index !== -1 ? fileData.slice(base64Index + 8) : fileData;
        const buffer = Buffer.from(base64Content, 'base64');
        const sanitizedExt = path_1.default.extname(fileName) || (fileType?.includes('pdf') ? '.pdf' : '.png');
        const baseName = path_1.default.basename(fileName, sanitizedExt).replace(/[^a-zA-Z0-9_-]/g, '_');
        const uniqueFileName = `${baseName}_${Date.now()}${sanitizedExt}`;
        const isRunningFromRoot = fs_1.default.existsSync(path_1.default.resolve(process.cwd(), 'backend'));
        const uploadDir = path_1.default.resolve(process.cwd(), isRunningFromRoot ? 'backend/public/uploads' : 'public/uploads');
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path_1.default.join(uploadDir, uniqueFileName);
        await fs_1.default.promises.writeFile(filePath, buffer);
        // If running from root, also ensure public/uploads copy exists for complete redundancy
        if (isRunningFromRoot) {
            const rootUploadDir = path_1.default.resolve(process.cwd(), 'public/uploads');
            if (!fs_1.default.existsSync(rootUploadDir)) {
                fs_1.default.mkdirSync(rootUploadDir, { recursive: true });
            }
            await fs_1.default.promises.copyFile(filePath, path_1.default.join(rootUploadDir, uniqueFileName));
        }
        const fileUrl = `/uploads/${uniqueFileName}`;
        res.json({
            success: true,
            message: 'File uploaded and saved successfully.',
            fileUrl,
            fileName: uniqueFileName,
        });
    }
    catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ success: false, message: 'Server error saving uploaded file.' });
    }
};
exports.handleFileUpload = handleFileUpload;
