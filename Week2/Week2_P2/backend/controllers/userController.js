// /backend/controllers/userController.js

import { User } from '../models/User.js';

export const postSignup = async (req, res) => {
    try {
        console.log("Received data:", req.body);
        console.log("Received image:", req.file); // 이미지 파일 정보 확인
        const profileImage = req.file ? `/images/${req.file.filename}` : null; // 이미지 파일의 경로 생성
        const newUser = new User({ ...req.body, profileImage });
        await User.save(newUser);
        console.log("User saved successfully");
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500). json({ message: 'Failed to register user', error: err.message });
    }
};


/*
export const postSignup = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const userExists = await User.findByEmail(newUser.email);
        if (userExists) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ message: err.message });
    }
};*/

export const getUsers = async (req, res) => {
    try {
        const users = await User.readUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error loading users:', err);
        res.status(500).send("Failed to load users");
    }
};
