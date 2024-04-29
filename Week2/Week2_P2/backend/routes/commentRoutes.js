// /backend/routes/commentRoutes.js

import express from 'express';
import { getCommentsByPostId, deleteCommentsByPost, deleteCommentById, updateCommentById } from '../controllers/commentController.js';

const router = express.Router();

router.get('/:postId/comments', getCommentsByPostId);
router.delete('/:postId/comments', deleteCommentsByPost);
router.delete('/:commentId', deleteCommentById);
router.put('/:commentId', updateCommentById);

export default router;