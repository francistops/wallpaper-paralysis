import { Router } from 'express';
const router = Router();
import { validateToken } from '../middlewares/authGuard.js';
import { } from '../controllers/postController.js';


router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/next', getNextPosts);


router.post('/', validateToken, createPost);
router.post('/:id', validateToken, updatePost);
router.post('/:id/publish', validateToken, publishPost);
router.delete('/:id', validateToken, deletePost);

export default router;