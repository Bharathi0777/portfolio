import { Router } from 'express';
import {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/certificationController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getCertifications);
router.get('/:id', getCertificationById);
router.post('/', authenticateAdmin, createCertification);
router.put('/:id', authenticateAdmin, updateCertification);
router.delete('/:id', authenticateAdmin, deleteCertification);

export default router;
