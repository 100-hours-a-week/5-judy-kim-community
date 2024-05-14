// /backend/models/User.js

import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', '..', 'data', 'users.json');
const indexPath = path.join(__dirname, '..', '..', 'data', 'usersIndex.json');

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

    static findAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    reject(new Error('Error reading users data'));
                    return;
                }
                try {
                    const users = JSON.parse(data);
                    resolve(users);
                } catch (parseErr) {
                    reject(new Error('Error parsing users data'));
                }
            });
        });
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

    static async nextId() {
        try {
            const data = await fs.promises.readFile(indexPath, 'utf8');
            const indexData = JSON.parse(data);
            const nextIndex = indexData.currentIndex + 1;

            indexData.currentIndex = nextIndex;
            await fs.promises.writeFile(indexPath, JSON.stringify(indexData, null, 2));

            return nextIndex;
        } catch (err) {
            console.error('Error reading or updating index data:', err);
            throw new Error('Failed to get next ID: ' + err.message);
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

    static async deleteById(userId) {
        const users = await this.readUsers();
        const filteredUsers = users.filter(user => user.id !== parseInt(userId));
        try {
            await fs.promises.writeFile(dataPath, JSON.stringify(filteredUsers, null, 2), 'utf8');
        } catch (err) {
            throw new Error('Error writing users data');
        }
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
            newUser.id = await this.nextId();
            users.push(newUser);
            await fs.promises.writeFile(dataPath, JSON.stringify(users, null, 2));
            return true;
        } catch (err) {
            throw new Error('Failed to save user: ' + err.message);
        }
    }

    static async updateById(userId, updates) {
        try {
            const data = await fs.promises.readFile(dataPath, 'utf8');
            let users = JSON.parse(data);
            let userFound = false;

            users = users.map(user => {
                if (user.id === userId) {
                    userFound = true;
                    return { ...user, ...updates };
                }
                return user;
            });

            if (!userFound) {
                throw new Error('User not found');
            }

            await fs.promises.writeFile(dataPath, JSON.stringify(users, null, 2));
            return users.find(user => user.id === userId);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async updatePasswordById(userId, newPassword) {
        try {
            const data = await fs.promises.readFile(dataPath, { encoding: 'utf8' });
            let users = JSON.parse(data);
            let userFound = false;
    
            users = users.map(user => {
                if (user.id === userId) {
                    userFound = true;
                    const hashedPassword = bcrypt.hashSync(newPassword, 10); // 비밀번호 해싱
                    return { ...user, password: hashedPassword };
                }
                return user;
            });
    
            if (!userFound) {
                console.error('User not found'); // 로그 추가
                throw new Error('User not found');
            }
    
            await fs.promises.writeFile(dataPath, JSON.stringify(users, null, 2)); // 업데이트된 사용자 데이터 저장
            return { message: "Password updated successfully!" };
        } catch (error) {
            console.error('Error updating password:', error); // 오류 상세 로그
            throw new Error('Failed to update password');
        }
    }
}

export default User;