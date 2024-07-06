import {Router} from 'express'
const router = Router();
import {allPosts, createPost, personsAllPosts} from '../controllers/postController'
import { authMiddleware } from '../middleware';
// routes for authentication


router.post('/createPost',authMiddleware, createPost);
router.get('/allPosts',authMiddleware, allPosts);
router.post('/personsAllPosts',authMiddleware, personsAllPosts);

export default router;