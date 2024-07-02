// backend/controllers/userController.js

import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

// 회원 가입 처리
export const postSignup = async (req, res, next) => {
    try {
        const profileImage = req.file ? `/images/${req.file.filename}` : null;
        const newUser = new User({ ...req.body, profileImage });

        const savedUser = await User.save(newUser);
        console.log("사용자가 성공적으로 저장되었습니다:", savedUser);
        res.status(201).json({ message: '회원 가입이 완료되었습니다.', user: savedUser });
    } catch (err) {
        next(err);
    }
};

// 모든 사용자 정보 가져오기
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

// 로그인 처리
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.authenticate(email, password);
        if (!user) {
            return res.status(401).json({ message: '로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.' });
        }
        // 세션 설정
        req.session.userId = user.id;
        req.session.username = user.nickname;
        res.json({ message: '로그인 성공', user: { id: user.id, username: user.nickname } });
    } catch (err) {
        next(err);
    }
};

// 로그아웃 처리
export const logoutUser = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        res.json({ message: '로그아웃 성공' });
    });
};

// 회원 탈퇴 처리
export const deleteUser = async (req, res, next) => {
    try {
        console.log(req.session.username, req.session.userId);
        await User.deleteById(req.session.userId);
        res.send({ message: '유저가 성공적으로 삭제되었습니다.' });
    } catch (err) {
        next(err);
    }
};

// 이메일 중복 확인
export const checkEmailExists = async (req, res, next) => {
    const emailToCheck = req.query.email;
    if (!emailToCheck) {
        return res.status(400).json({ error: '이메일 파라미터가 누락되었습니다' });
    }
    try {
        const user = await User.findByEmail(emailToCheck);
        res.json({ emailExists: !!user });
    } catch (err) {
        next(err);
    }
};

// 닉네임 중복 확인
export const checkNicknameExists = async (req, res, next) => {
    const nicknameToCheck = req.query.nickname;
    if (!nicknameToCheck) {
        return res.status(400).json({ error: '닉네임 파라미터가 누락되었습니다' });
    }
    try {
        const users = await User.findAll();
        const nicknameExists = users.some(user => user.nickname === nicknameToCheck);
        res.json({ nicknameExists });
    } catch (err) {
        next(err);
    }
};

// 사용자 정보 가져오기
export const getUserInfo = async (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: "접근 권한이 없습니다." });
    }
    try {
        const userId = req.session.userId;
        console.log(`사용자 정보를 가져옵니다: ${userId}`);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        }

        res.json({
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            profileImage: user.profileImage
        });
    } catch (err) {
        next(err);
    }
};

// 사용자 정보 업데이트
export const updateUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "접근 권한이 없습니다. 로그인 해주세요." });
    }
    const userId = req.session.userId; // 현재 세션의 사용자 ID
    const updates = req.body;
    if (req.file) {
        const newImagePath = req.file ? `/images/${req.file.filename}` : null;
        updates.profileImage = newImagePath;  // 이미지 경로 업데이트
    }

    try {
        const updatedUser = await User.updateById(userId, updates);

        // 세션 데이터 갱신
        if (updates.nickname) {
            req.session.username = updates.nickname;
        }
        if (updates.profileImage) {
            req.session.profileImage = updates.profileImage;
        }

        if (req.file || updates.nickname) {
            await Post.updateUserInPosts(userId, updates.profileImage, updates.nickname);  // 게시글 유저 정보 업데이트
            await Comment.updateUserInComments(userId, updates.profileImage, updates.nickname);  // 댓글 유저 정보 업데이트
        }
        res.json({
            message: '사용자 정보가 성공적으로 업데이트되었습니다.',
            user: updatedUser
        });

    } catch (error) {
        next(error);
    }
};

// 사용자 비밀번호 업데이트
export const updatePassword = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "접근 권한이 없습니다. 로그인 해주세요." });
    }
    const userId = req.session.userId;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: "비밀번호가 제공되지 않았습니다." });
    }
    try {
        const updatedUser = await User.updatePasswordById(userId, password);
        res.status(200).json({ message: "비밀번호가 성공적으로 업데이트되었습니다.", user: updatedUser });
    } catch (error) {
        next(error);
    }
};
