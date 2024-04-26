// /backend/models/Post.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsPath = path.join(__dirname, '..', 'data', 'posts.json');

export default class Post {
    static findAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(postsPath, 'utf8', (err, data) => {
                if (err) {
                    reject(new Error('Error reading posts data'));
                    return;
                }
                try {
                    const posts = JSON.parse(data);
                    resolve(posts);
                } catch (parseErr) {
                    reject(new Error('Error parsing posts data'));
                }
            });
        });
    }

    static async findById(postId) {
        try {
            const posts = await this.findAll();
            const post = posts.find(post => post.id === postId);
            return post;
        } catch (err) {
            throw new Error('Error finding post by ID');
        }
    }
}