// controllers/userController.js
import { User } from '../models/User';

export const createUser = (req, res) => {
    const newUser = new User(req.body.email, req.body.password);
    newUser.save();
    res.status(201).send('User registered successfully');
};

export const getUsers = (req, res) => {
    User.fetchAll(users => {
        res.status(200).json(users);
    });
};
