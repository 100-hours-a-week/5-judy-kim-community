// backend/models/Comment.js
import pool from '../config/db.js';
import Post from '../models/Post.js';

export default class Comment {
    // 모든 댓글 가져오기
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM comments');
        return rows;
    }

    // 특정 게시글의 댓글 가져오기
    static async findByPostId(postId) {
        const [rows] = await pool.query('SELECT * FROM comments WHERE postId = ?', [postId]);
        return rows;
    }

    // 특정 게시글의 댓글 삭제
    static async deleteByPostId(postId) {
        await pool.query('DELETE FROM comments WHERE postId = ?', [postId]);
    }

    // 특정 댓글 가져오기
    static async findById(commentId) {
        const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [commentId]);
        return rows[0];
    }

    // 특정 댓글 삭제
    static async deleteById(commentId) {
        await pool.query('DELETE FROM comments WHERE id = ?', [commentId]);
    }

    // 특정 댓글 업데이트
    static async updateById(commentId, newContent) {
        const updatedAt = new Date().toISOString();
        await pool.query('UPDATE comments SET content = ?, updatedAt = ? WHERE id = ?', [newContent, updatedAt, commentId]);
    }

    // 다음 댓글 ID 가져오기
    static async nextId() {
        const [rows] = await pool.query('SELECT MAX(id) as maxId FROM comments');
        return rows[0].maxId + 1;
    }

    // 새로운 댓글 생성
    static async create(newCommentData) {
        const post = await Post.findById(newCommentData.postId);
        if (!post) {
            throw new Error('게시글을 찾을 수 없습니다');
        }
        const isAuthor = newCommentData.authorId === post.authorId;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const [result] = await pool.query(
            'INSERT INTO comments (postId, content, author, authorId, imagePath, authorIsPoster, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [newCommentData.postId, newCommentData.content, newCommentData.author, newCommentData.authorId, newCommentData.imagePath, isAuthor, createdAt, updatedAt]
        );

        newCommentData.id = result.insertId;
        return newCommentData;
    }

    // 댓글에서 사용자 정보 업데이트
    static async updateUserInComments(authorId, newImagePath, newNickname) {
        await pool.query('UPDATE comments SET imagePath = ?, author = ? WHERE authorId = ?', [newImagePath, newNickname, authorId]);
    }
}
