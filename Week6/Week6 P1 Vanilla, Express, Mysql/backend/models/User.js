// backend/models/User.js

import bcrypt from 'bcrypt';
import pool from '../config/db.js';

export class User {
    constructor({ email, password, nickname, profileImage }) {
        this.id = null;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    // 사용자 인증
    static async authenticate(email, password) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
        if (!user) return null;
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;
        return user;
    }

    // 모든 사용자 정보 가져오기
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows;
    }

    // 이메일로 사용자 찾기
    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    // ID로 사용자 찾기
    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    // 사용자 삭제
    static async deleteById(userId) {
        await pool.query('DELETE FROM users WHERE id = ?', [userId]);
    }

    // 새로운 사용자 저장
    static async save(newUser) {
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (email, password, nickname, profileImage) VALUES (?, ?, ?, ?)',
            [newUser.email, hashedPassword, newUser.nickname, newUser.profileImage]
        );
        newUser.id = result.insertId;
        return newUser;
    }

    // 사용자 정보 업데이트
    static async updateById(userId, updates) {
        const setClause = [];
        const values = [];

        for (const [key, value] of Object.entries(updates)) {
            setClause.push(`${key} = ?`);
            values.push(value);
        }

        values.push(userId);

        await pool.query(`UPDATE users SET ${setClause.join(', ')} WHERE id = ?`, values);
        return this.findById(userId);
    }

    // 비밀번호 업데이트
    static async updatePasswordById(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
        return { message: '비밀번호가 성공적으로 업데이트되었습니다!' };
    }
}

export default User;
