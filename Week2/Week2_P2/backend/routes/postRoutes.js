// /backend/routes/postRoutes.js

import express from 'express';
import { getPosts, getPostById, deletePost } from '../controllers/postController.js';

const router = express.Router();
router.get('/', getPosts);
router.get('/:postId', getPostById);
router.delete('/:postId', deletePost);

export default router;
