// /backend/models/Comment.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commentsPath = path.join(__dirname, '..', '..', 'data', 'comments.json');

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
    
    static add(postId, content, author, imagePath) {
        return this.findAll().then(comments => {
            const newId = comments.length + 1; // Simple ID generation
            const newComment = {
                id: newId,
                postId: parseInt(postId),
                content: content,
                author: author,
                imagePath: imagePath,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            comments.push(newComment);
            return new Promise((resolve, reject) => {
                fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), 'utf8', (err) => {
                    if (err) reject(new Error('Error writing new comment to comments data'));
                    resolve(newComment);
                });
            });
        });
    }
    
}
