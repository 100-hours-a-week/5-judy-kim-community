// /backend/models/Post.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsPath = path.join(__dirname, '..', '..', 'data', 'posts.json');

class Post {
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

    static findById(postId) {
        return this.findAll().then(posts => posts.find(post => post.id === parseInt(postId)));
    }

    static deleteById(postId) {
        return this.findAll().then(posts => {
            const filteredPosts = posts.filter(post => post.id !== parseInt(postId));
            return new Promise((resolve, reject) => {
                fs.writeFile(postsPath, JSON.stringify(filteredPosts, null, 2), 'utf8', (err) => {
                    if (err) reject(new Error('Error writing posts data'));
                    resolve();
                });
            });
        });
    }
}

export default Post;