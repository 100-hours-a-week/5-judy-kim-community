// backend/routes/userRoutes.js

import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import { postSignup, getUsers, getUserInfo, loginUser, logoutUser, deleteUser, checkEmailExists, checkNicknameExists, updateUser, updatePassword } from '../controllers/userController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const profileImagesFolderPath = path.join(__dirname, '..', 'profile_Images');


// 이미지를 저장할 폴더 설정
const profileImageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, profileImagesFolderPath); 
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // 파일 이름을 현재 시간으로 설정하여 중복 방지
    }
});


const profileImageUpload = multer({ 
    storage: profileImageStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB 제한
});
const router = express.Router();


router.post('/signup', profileImageUpload.single('profileImage'), postSignup);      // 회원가입 라우트
router.post('/login', loginUser);                                                   // 로그인 라우트
router.post('/logout', logoutUser);                                                 // 로그아웃 라우트
router.delete('/', deleteUser);                                                     // 회원 탈퇴 라우트
router.get('/check-email', checkEmailExists);                                       // 이메일 중복 확인 라우트
router.get('/check-nickname', checkNicknameExists);                                 // 닉네임 중복 확인 라우트
router.get('/userinfo', getUserInfo);                                               // 사용자 정보 가져오기 라우트
router.get('/', getUsers);                                                          // 모든 사용자 정보 가져오기 라우트
router.patch('/update1', profileImageUpload.single('profileImage'), updateUser);    // 사용자 정보 업데이트 라우트 (프로필 이미지 포함)
router.patch('/update2', updatePassword);                                           // 비밀번호 업데이트 라우트

export default router;
