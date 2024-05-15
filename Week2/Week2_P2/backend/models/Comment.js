// /backend/models/Comment.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Post from '../models/Post.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// json-path command+/

// const commentsPath = path.join(__dirname, '..', '..', 'data', 'comments.json');
// const indexPath = path.join(__dirname, '..', '..', 'data', 'commentsIndex.json');

const commentsPath = path.join(__dirname, '..', '..', 'data', '-test-comments.json');
const indexPath = path.join(__dirname, '..', '..', 'data', '-test-commentsIndex.json');

export default class Comment {
    static findAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(commentsPath, 'utf8', (err, data) => {
                if (err) {
                    reject(new Error('Error reading comments data'));
                    return;
                }
                try {
                    const comments = JSON.parse(data);
                    resolve(comments);
                } catch (parseErr) {
                    reject(new Error('Error parsing comments data'));
                }
            });
        });
    }

    static findByPostId(postId) {
        return this.findAll().then(comments => comments.filter(comment => comment.postId === parseInt(postId)));
    }
    
    static findAllByPostId(postId) {
        return new Promise((resolve, reject) => {
            fs.readFile(commentsPath, 'utf8', (err, data) => {
                if (err) {
                    reject(new Error('Error reading comments data'));
                    return;
                }
                try {
                    const comments = JSON.parse(data);
                    const postComments = comments.filter(comment => comment.postId === parseInt(postId));
                    resolve(postComments);
                } catch (parseErr) {
                    reject(new Error('Error parsing comments data'));
                }
            });
        });
    }

    static deleteByPostId(postId) {
        return this.findAll().then(comments => {
            const filteredComments = comments.filter(comment => comment.postId !== parseInt(postId));
            return new Promise((resolve, reject) => {
                fs.writeFile(commentsPath, JSON.stringify(filteredComments, null, 2), 'utf8', (err) => {
                    if (err) reject(new Error('Error writing comments data'));
                    resolve();
                });
            });
        });
    }

    static findById(commentId) {
        return this.findAll().then(comments => comments.find(comment => comment.id === parseInt(commentId)));
    }

    static deleteById(commentId) {
        return this.findAll().then(comments => {
            const filteredComments = comments.filter(comment => comment.id !== parseInt(commentId));
            return new Promise((resolve, reject) => {
                fs.writeFile(commentsPath, JSON.stringify(filteredComments, null, 2), 'utf8', (err) => {
                    if (err) reject(new Error('Error writing comments data'));
                    resolve();
                });
            });
        });
    }

    static updateById(commentId, newContent) {
        return this.findAll().then(comments => {
            const updatedComments = comments.map(comment => {
                if (comment.id === parseInt(commentId)) {
                    return { ...comment, content: newContent, updatedAt: new Date().toISOString() };
                }
                return comment;
            });
            return new Promise((resolve, reject) => {
                fs.writeFile(commentsPath, JSON.stringify(updatedComments, null, 2), 'utf8', (err) => {
                    if (err) reject(new Error('Error writing updated comments data'));
                    resolve();
                });
            });
        });
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

    // TODO 댓글 id 생성 로직 바꾸기 (length +1이 아니라 index++로)
    static async create(newCommentData) {
        try {
            const comments = await this.findAll();
            const newId = await this.nextId();
            const post = await Post.findById(newCommentData.postId);
            if (!post) {
                throw new Error('Post not found');
            }
            const isAuthor = newCommentData.authorId === post.authorId;
            const newComment = {
                id: newId,
                ...newCommentData,
                authorIsPoster: isAuthor,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            comments.push(newComment);
            await fs.promises.writeFile(commentsPath, JSON.stringify(comments, null, 2), 'utf8');
            return newComment;
        } catch (err) {
            throw new Error('Failed to save Comment: ' + err.message);
        }
    }

    static async updateUserInComments(authorId, newImagePath, newNickname) {
        try {
            const data = await fs.promises.readFile(commentsPath, 'utf8');
            let comments = JSON.parse(data);
            
            // 변경이 필요한 댓글만 업데이트
            comments = comments.map(comment => {
                if (comment.authorId === authorId) {
                    return { 
                        ...comment, 
                        imagePath: newImagePath || comment.imagePath,    // 새 이미지 경로가 제공되면 업데이트
                        author: newNickname || comment.author            // 새 닉네임이 제공되면 업데이트
                    };
                }
                return comment;  // 변경이 필요 없는 댓글은 그대로 반환
            });
    
            // 모든 댓글을 파일에 다시 저장
            await fs.promises.writeFile(commentsPath, JSON.stringify(comments, null, 2), 'utf8');
        } catch (error) {
            throw new Error('Failed to update comments details: ' + error.message);
        }
    }
    
}
