// /backend/routes/postRoutes.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPosts, getPostById, createPost, deletePost, getEditPostPage, updatePost } from '../controllers/postController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageFolderPath = path.join(__dirname, '..', '..', 'images');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, imageFolderPath);
    },
    filename: function(req, file, cb) {
        const timestamp = Date.now();
        const fileName = `postImage-${timestamp}-${file.originalname}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });
const router = express.Router();

// 라우터
router.get('/', getPosts);
router.get('/:postId', getPostById);
router.post('/', upload.single('postImagePath'), createPost);
router.delete('/:postId', deletePost);
router.get('/:postId/edit', getEditPostPage);
router.put('/:postId/update', upload.single('postImagePath'), updatePost);


export default router;
