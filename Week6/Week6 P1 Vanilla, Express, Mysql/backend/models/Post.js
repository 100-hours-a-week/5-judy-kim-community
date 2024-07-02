import pool from '../config/db.js';

// Post 클래스 정의
class Post {
    constructor({ id, title, content, author, authorId, userImagePath, postImagePath, likes, comments, views }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.authorId = authorId;
        this.userImagePath = userImagePath;
        this.postImagePath = postImagePath;
        this.createdAt = new Date().toISOString(); // 생성 시간
        this.updatedAt = new Date().toISOString(); // 수정 시간
        this.likes = likes;
        this.comments = comments;
        this.views = views;
    }

    // 새로운 게시글 생성
    static async create(newPost) {
        const [result] = await pool.query(
            'INSERT INTO posts (title, content, author, authorId, userImagePath, postImagePath, likes, comments, views, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [newPost.title, newPost.content, newPost.author, newPost.authorId, newPost.userImagePath, newPost.postImagePath, newPost.likes, newPost.comments, newPost.views, newPost.createdAt, newPost.updatedAt]
        );
        newPost.id = result.insertId;
        return { savedPost: newPost, postId: newPost.id };
    }

    // 모든 게시글 조회
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM posts');
        return rows;
    }

    // 특정 ID의 게시글 조회
    static async findById(postId) {
        const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [postId]);
        return rows[0];
    }

    // 특정 ID의 게시글 삭제
    static async deleteById(postId) {
        await pool.query('DELETE FROM posts WHERE id = ?', [postId]);
    }

    // 특정 ID의 게시글 업데이트
    static async updateById(postId, updates) {
        updates.updatedAt = new Date().toISOString(); // 수정 시간 갱신
        const updateKeys = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(updates);
        updateValues.push(postId);

        await pool.query(`UPDATE posts SET ${updateKeys} WHERE id = ?`, updateValues);
    }

    // 작성자 정보 업데이트 시 게시글의 작성자 정보도 업데이트
    static async updateUserInPosts(authorId, newImagePath, newNickname) {
        const [rows] = await pool.query('UPDATE posts SET userImagePath = ?, author = ? WHERE authorId = ?', [newImagePath, newNickname, authorId]);
        return rows;
    }
}

export default Post;
