import { Router } from 'express';
import {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getAchievements);
router.get('/:id', getAchievementById);
router.post('/', authenticateAdmin, createAchievement);
router.put('/:id', authenticateAdmin, updateAchievement);
router.delete('/:id', authenticateAdmin, deleteAchievement);

export default router;
