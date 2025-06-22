import { Router } from 'express';
const router = Router();
import { validateToken } from '../middlewares/authGuard.js';
import {
    getAllCommentsByWallpaper, getAllCommentsByUser, getNextComments,
    createComment
} from '../controllers/commentController.js';


router.get('/:id', getAllCommentsByWallpaper);
router.get('/:id', validateToken, getAllCommentsByUser);
router.post('/next', getNextComments);
router.post('/create', validateToken, createComment);


// router.post('/', validateToken, createPost);
// router.post('/:id', validateToken, updatePost);
// router.post('/:id/publish', validateToken, publishPost);
// router.delete('/:id', validateToken, deletePost);

export default router;