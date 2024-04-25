// /backend/controllers/userController.js

import { User } from '../models/User.js';

export const postSignup = async (req, res) => {
    try {
        const profileImage = req.file ? `/images/${req.file.filename}` : null;
        const newUser = new User({ ...req.body, profileImage });
        
        const savedUser = await User.save(newUser);
        console.log("User saved successfully:", savedUser);
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
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
