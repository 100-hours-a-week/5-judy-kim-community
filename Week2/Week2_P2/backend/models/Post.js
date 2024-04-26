// /backend/models/Post.js
import fs from 'fs';
import path from 'path';

const postsPath = path.join(__dirname, '..', 'data', 'posts.json');

export default class Post {
    static async findAll() {
        const data = await fs.promises.readFile(postsPath, 'utf8');
        return JSON.parse(data);
    }

    static async findById(postId) {
        const posts = await this.findAll();
        return posts.find(post => post.id === postId);
    }
}