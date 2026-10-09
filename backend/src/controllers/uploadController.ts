import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const handleFileUpload = async (req: Request, res: Response): Promise<void> => {
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
    const sanitizedExt = path.extname(fileName) || (fileType?.includes('pdf') ? '.pdf' : '.png');
    const baseName = path.basename(fileName, sanitizedExt).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFileName = `${baseName}_${Date.now()}${sanitizedExt}`;

    const isRunningFromRoot = fs.existsSync(path.resolve(process.cwd(), 'backend'));
    const uploadDir = path.resolve(process.cwd(), isRunningFromRoot ? 'backend/public/uploads' : 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, uniqueFileName);
    await fs.promises.writeFile(filePath, buffer);

    // If running from root, also ensure public/uploads copy exists for complete redundancy
    if (isRunningFromRoot) {
      const rootUploadDir = path.resolve(process.cwd(), 'public/uploads');
      if (!fs.existsSync(rootUploadDir)) {
        fs.mkdirSync(rootUploadDir, { recursive: true });
      }
      await fs.promises.copyFile(filePath, path.join(rootUploadDir, uniqueFileName));
    }

    const fileUrl = `/uploads/${uniqueFileName}`;

    res.json({
      success: true,
      message: 'File uploaded and saved successfully.',
      fileUrl,
      fileName: uniqueFileName,
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ success: false, message: 'Server error saving uploaded file.' });
  }
};
