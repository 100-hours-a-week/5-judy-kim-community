// backend/routes/commentRoutes.js

import express from 'express';
import multer from 'multer';
import { getCommentsByPostId, deleteCommentsByPost, deleteCommentById, updateCommentById, addCommentToPost } from '../controllers/commentController.js';

const upload = multer();
const router = express.Router();

router.get('/:postId/comments', getCommentsByPostId); // 특정 게시글의 모든 댓글 가져오기 라우트
router.delete('/:postId/comments', deleteCommentsByPost); // 특정 게시글의 모든 댓글 삭제 라우트
router.delete('/:commentId', deleteCommentById); // 특정 댓글 삭제 라우트
router.put('/:commentId', updateCommentById); // 특정 댓글 업데이트 라우트
router.post('/:postId/comments', upload.none(), addCommentToPost); // 새로운 댓글 추가 라우트


export default router;
