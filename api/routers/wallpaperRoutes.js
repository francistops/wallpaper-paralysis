import { Router } from 'express';
const router = Router();

import { getWallpaperDetails } from '../controllers/wallpaperController.js';


router.get('/', getWallpaperDetails);


export default router;