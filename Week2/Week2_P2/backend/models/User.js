// /backend/models/User.js

import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', '..', 'data', 'users.json');

export class User {
    constructor({ email, password, nickname, profileImage }) {
        this.id = null;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    static async authenticate(email, password) {
        const users = await this.readUsers();
        const user = users.find(user => user.email === email);
        if (!user) return null;  // 사용자가 없으면 null 반환
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;  // 비밀번호가 맞지 않으면 null 반환
        return user;  // 검증 성공시 사용자 객체 반환
    }

    static async readUsers() {
        try {
            const data = await fs.promises.readFile(dataPath, 'utf8');
            const users = JSON.parse(data);
            // console.log("Loaded emails:", users.map(user => user.email));
            return users;
        } catch (err) {
            throw new Error('Failed to read user data');
        }
    }

    static async findByEmail(email) {
        const users = await User.readUsers();
        return users.find(user => user.email === email);
    }

    static async findById(id) {
        const users = await this.readUsers();
        return users.find(user => user.id === parseInt(id));
    }

    static async save(newUser) {
        try {
            const users = await User.readUsers();
            const userExists = users.find(user => user.email === newUser.email);
            if (userExists) {
                throw new Error('Email already exists');
            }
            const hashedPassword = await bcrypt.hash(newUser.password, 10);
            newUser.password = hashedPassword; // 비밀번호를 해시하여 저장
            newUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
            users.push(newUser);
            await fs.promises.writeFile(dataPath, JSON.stringify(users, null, 2));
            return true;
        } catch (err) {
            throw new Error('Failed to save user: ' + err.message);
        }
    }
}