// /backend/controllers/userController.js

import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const postSignup = async (req, res) => {
    try {
        const profileImage = req.file ? `/images/${req.file.filename}` : null;
        const newUser = new User({ ...req.body, profileImage });
        
        const savedUser = await User.save(newUser);
        console.log("User saved successfully:", savedUser);
        res.status(201).json({ message: '회원 가입이 완료되었습니다.', user: savedUser });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ message: err.message });
    }
};


export const getUsers = async (req, res) => {
    try {
        const users = await User.readUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error loading users:', err);
        res.status(500).send("Failed to load users");
    }
};

// 로그인
export const loginUser = async (req, res) => {
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
        console.error('로그인 중 오류 발생:', err);
        res.status(500).json({ message: '서버 내부 오류' });
    }
};

// 로그아웃
export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: '로그아웃 실패' });
        }
        res.json({ message: '로그아웃 성공' });
    });
};

// 회원 탈퇴
export const deleteUser = async (req, res) => {
    try {
        console.log(req.session.username, req.session.userId);
        await User.deleteById(req.session.userId);
        res.send({ message: '유저가 성공적으로 삭제되었습니다.' });
    } catch (err) {
        console.error('유저 삭제 실패:', err);
        res.status(500).send({ message: '유저 삭제 실패' });
    }
};

export const checkEmailExists = async (req, res) => {
    const emailToCheck = req.query.email;
    if (!emailToCheck) {
        console.error('No email provided in query');
        return res.status(400).json({ error: 'Email parameter is missing' });
    }
    try {
        const users = await User.readUsers();
        const emailExists = users.some(user => user.email === emailToCheck);
        res.json({ emailExists });
    } catch (err) {
        console.error('Error checking email:', err);
        res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
};

export const checkNicknameExists = async (req, res) => {
    const nicknameToCheck = req.query.nickname;
    if (!nicknameToCheck) {
        console.error('No nickname provided in query');
        return res.status(400).json({ error: 'nickname parameter is missing' });
    }
    try {
        const users = await User.readUsers();
        const nicknameExists = users.some(user => user.nickname === nicknameToCheck);
        res.json({ nicknameExists });
    } catch (err) {
        console.error('Error checking nickname:', err);
        res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
};

export const getUserInfo = async (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: "Unauthorized access." });
    }
    User.findById(req.session.userId)
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.json({
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            profileImage: user.profileImage
        });
    })
    .catch(err => {
        console.error('Error fetching user info:', err);
        res.status(500).json({ message: 'Internal server error' });
    });
};

// 유저 정보 업데이트
export const updateUser = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized access. Please login." });
    }
    const userId = req.session.userId; // 현재 세션의 사용자 ID
    const updates = req.body;
    if (req.file) {
        const newImagePath = req.file ? `/images/${req.file.filename}` : null;
        updates.profileImage = newImagePath;  // 이미지 경로 업데이트
    }

    console.log(updates);

    try {
        const updatedUser = await User.updateById(userId, updates);
        if (req.file || updates.nickname) {
            await Post.updateUserInPosts(userId, updates.profileImage, updates.nickname);  // 게시글 유저 정보 업데이트
            await Comment.updateUserInComments(userId, updates.profileImage, updates.nickname);  // 댓글 유저 정보 업데이트
        }
        res.json({
            message: 'User updated successfully',
            user: updatedUser
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 유저 비밀번호 업데이트
export const updatePassword = async (req, res) => { 
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized access. Please login." });
    } 
    const userId = req.session.userId;
    const { password } = req.body; 
    console.log(req.body);

    if (!password) {
        return res.status(400).json({ message: "비밀번호가 제공되지 않았습니다." });
    }
    try {
        const updatedUser = await User.updatePasswordById(userId, password);
        res.status(200).json({ message: "비밀번호가 성공적으로 업데이트되었습니다.", user: updatedUser });
    } catch (error) {
        console.error('비밀번호 업데이트 실패:', error);
        res.status(500).json({ message: "서버 오류로 인해 비밀번호를 업데이트할 수 없습니다." });
    }
};
