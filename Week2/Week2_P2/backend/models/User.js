// /backend/models/User.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', '..', 'data', 'users.json');
const imageFolderPath = path.join(__dirname, '..', '..', 'images'); //이미지 저장 경로

export class User {
    constructor({ email, password, nickname, profileImage }) {
        this.id = null;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    static async save(newUser) {
        try {
            let users = [];
            if (fs.existsSync(dataPath)) {
                const data = await fs.promises.readFile(dataPath, 'utf8');
                users = JSON.parse(data);
            }
            const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
            newUser.id = id;
            users.push(newUser);
            await fs.promises.writeFile(dataPath, JSON.stringify(users, null, 2));
            return true;
        } catch (err) {
            console.error('Save Error:', err);
            throw err;
        }
    }
}



/*
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'data', 'users.json');

export class User {
    constructor({ email, password, nickname, profileImage }) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    static async readUsers() {
        try {
            const data = await fs.promises.readFile(dataPath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            throw new Error('Failed to read user data');
        }
    }

    async save() {
        try {
            const users = await User.readUsers();
            users.push(this);
            await fs.promises.writeFile(dataPath, JSON.stringify(users, null, 2));
        } catch (err) {
            throw new Error('Failed to save user');
        }
    }

    static async findByEmail(email) {
        try {
            const users = await User.readUsers();
            return users.find(user => user.email === email);
        } catch (err) {
            throw new Error('Failed to find user by email');
        }
    }
}
*/