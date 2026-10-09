import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  submitContact,
  getContactMessages,
  markMessageRead,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// Rate limiter for spam protection on contact submissions: 5 messages per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many messages sent from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, submitContact);
router.get('/', authenticateAdmin, getContactMessages);
router.patch('/:id/read', authenticateAdmin, markMessageRead);
router.delete('/:id', authenticateAdmin, deleteContactMessage);

export default router;
