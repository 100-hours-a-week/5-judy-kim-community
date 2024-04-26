// /backend/routes/commentRoutes.js

import express from 'express';
import { getCommentsByPostId } from '../controllers/commentController.js';

const router = express.Router();

router.get('/:postId/comments', getCommentsByPostId);

export default router;