// /backend/routes/commentRoutes.js

import express from 'express';
import multer from 'multer';
import { getCommentsByPostId, deleteCommentsByPost, deleteCommentById, updateCommentById, addCommentToPost } from '../controllers/commentController.js';

const upload = multer();
const router = express.Router();

router.get('/:postId/comments', getCommentsByPostId);
router.delete('/:postId/comments', deleteCommentsByPost);
router.delete('/:commentId', deleteCommentById);
router.put('/:commentId', updateCommentById);
router.post('/:postId/comments', upload.none(), addCommentToPost);


export default router;