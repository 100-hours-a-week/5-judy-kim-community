// /backend/routes/postRoutes.js

import express from 'express';
import { getPosts, getPostById } from '../controllers/postController.js';

const router = express.Router();
router.get('/posts', getPosts);
router.get('/posts/:postId', getPostById);

export default router;
