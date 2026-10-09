import { Router } from 'express';
import { getSiteSettings, updateSiteSettings } from '../controllers/settingsController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getSiteSettings);
router.put('/', authenticateAdmin, updateSiteSettings);

export default router;
