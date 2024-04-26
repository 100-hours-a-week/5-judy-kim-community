// /backend/models/Comment.js

import fs from 'fs';
import path from 'path';

const commentsPath = path.join(__dirname, '..', 'data', 'comments.json');

export default class Comment {
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
}
