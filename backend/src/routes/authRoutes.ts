import {Router} from 'express'
const router = Router();
import {login, register} from '../controllers/authController'
import {authMiddleware} from '../middleware'
// routes for authentication
router.post('/register',register);
router.post('/login', login);



export default router;