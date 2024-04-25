// /backend/routes/userRoutes.js

import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

// 회원 가입을 위한 라우트 
import { postSignup, getUsers } from '../controllers/userController.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageFolderPath = path.join(__dirname, '..', '..', 'images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageFolderPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/signup', upload.single('profileImage'), postSignup);
router.get('/', getUsers);

// 이메일 인증을 위한 라우트 ------------------------------

// import { verifyEmail, sendVerificationEmail } from '../controllers/emailController.js';

// 이메일 인증 링크를 발송하는 라우트
// router.post('/send-verification-email', sendVerificationEmail);

// 이메일 인증 링크를 통해 인증을 처리하는 라우트
// router.get('/verify-email', verifyEmail);


export default router; 
