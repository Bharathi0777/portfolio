import { Router } from 'express';
import { handleFileUpload } from '../controllers/uploadController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// Protect upload endpoint so only authenticated admin can upload files
router.post('/', authenticateAdmin, handleFileUpload);

export default router;
