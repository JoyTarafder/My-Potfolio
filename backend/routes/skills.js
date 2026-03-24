import { Router } from 'express';
import { getSkills, createSkill, deleteSkill } from '../controllers/skillController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getSkills);
router.post('/', protect, createSkill);
router.delete('/:id', protect, deleteSkill);

export default router;
