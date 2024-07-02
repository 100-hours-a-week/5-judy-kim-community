import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPosts, getPostById, createPost, deletePost, getEditPostPage, updatePost } from '../controllers/postController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageFolderPath = path.join(__dirname, '..', '..', 'images');

// 이미지 저장 설정
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, imageFolderPath); // 이미지를 저장할 폴더 설정
    },
    filename: function(req, file, cb) {
        const timestamp = Date.now();
        cb(null, file.fieldname + '-' + timestamp + path.extname(file.originalname)); // 파일 이름을 현재 시간으로 설정하여 중복 방지
    }
});

const upload = multer({ storage: storage });
const router = express.Router();

// 게시글 관련 라우트 설정
router.get('/', getPosts); // 모든 게시글 가져오기
router.get('/:postId', getPostById); // 특정 게시글 가져오기
router.post('/write', upload.single('postImagePath'), createPost); // 게시글 작성
router.delete('/:postId', deletePost); // 게시글 삭제
router.get('/:postId/edit', getEditPostPage); // 게시글 수정 페이지 가져오기
router.put('/:postId/update', upload.single('postImagePath'), updatePost); // 게시글 수정

export default router;
