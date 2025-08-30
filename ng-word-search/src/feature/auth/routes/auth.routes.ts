import { Router } from 'express';
import { AuthController } from '../controllers';

const router = Router();
const authController = new AuthController();

// ===== API ROUTES (JSON Response) =====
router.post('/api/login', authController.login.bind(authController));
router.post('/api/register', authController.register.bind(authController));
router.post('/api/forgot-password', authController.forgotPassword.bind(authController));
router.get('/api/logout', authController.logout.bind(authController));

export default router;
