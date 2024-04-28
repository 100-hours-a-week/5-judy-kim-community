// /backend/routes/postRoutes.js

import express from 'express';
import { getPosts, getPostById } from '../controllers/postController.js';

const router = express.Router();
router.get('/', getPosts);
router.get('/:postId', getPostById);

export default router;
