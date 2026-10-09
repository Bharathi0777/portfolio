import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getProfile);
router.put('/', authenticateAdmin, updateProfile);

export default router;
