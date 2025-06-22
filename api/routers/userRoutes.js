import { Router } from 'express';
const router = Router();
import { validateToken } from '../middlewares/authGuard.js';
import { getAllUsers, getUserById, register, login, logout } from '../controllers/userController.js';

router.get('/', getAllUsers);
router.get('/:id', getUserById);

router.post('/register', register)
router.post('/login', login)

router.post('/logout', validateToken, logout)

export default router;