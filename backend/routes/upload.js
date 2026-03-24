import { Router } from 'express';
import { uploadImage, upload } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/image', protect, upload.single('image'), uploadImage);

export default router;
