// /backend/models/Post.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsPath = path.join(__dirname, '..', '..', 'data', 'posts.json');
const indexPath = path.join(__dirname, '..', '..', 'data', 'postsIndex.json');

class Post {
    constructor({ id, title, content, author, authorId, userImagePath, postImagePath, likes, comments, views }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.authorId = authorId;
        this.userImagePath = userImagePath;
        this.postImagePath = postImagePath;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
        this.likes = likes;
        this.comments = comments;
        this.views = views;
    }

    static async create(newPost) {
        try {
            newPost.id = await this.nextId();
            const posts = await this.findAll();
            posts.push(newPost);
            await fs.promises.writeFile(postsPath, JSON.stringify(posts, null, 2), 'utf8');
            return newPost;
        } catch (err) {
            throw new Error('Failed to save Post: ' + err.message);
        }
    }

    /*
    static async nextId() {
        const posts = await this.findAll();
        const lastPost = posts[posts.length - 1];
        return lastPost ? lastPost.id + 1 : 1;
    }*/

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

    static updateById(postId, updates) {
        return this.findAll().then(posts => {
            const updatedPosts = posts.map(post => {
                if (post.id === parseInt(postId)) {
                    // 새 이미지가 없으면 기존 이미지 경로를 유지
                    if (!updates.postImagePath && post.postImagePath) {
                        updates.postImagePath = post.postImagePath;
                    }
                    return { ...post, ...updates, updatedAt: new Date().toISOString() };
                }
                return post;
            });
            return new Promise((resolve, reject) => {
                fs.writeFile(postsPath, JSON.stringify(updatedPosts, null, 2), 'utf8', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });
    }

    static async updateUserInPosts(authorId, newImagePath, newNickname) {
        try {
            const data = await fs.promises.readFile(postsPath, 'utf8');
            let posts = JSON.parse(data);
            
            // 변경이 필요한 게시물만 업데이트
            posts = posts.map(post => {
                if (post.authorId === authorId) {
                    return { 
                        ...post, 
                        userImagePath: newImagePath || post.userImagePath,  // 새 이미지 경로가 제공되면 업데이트
                        author: newNickname || post.nickname              // 새 닉네임이 제공되면 업데이트
                    };
                }
                return post;  // 변경이 필요 없는 게시물은 그대로 반환
            });
    
            // 모든 게시물을 파일에 다시 저장
            await fs.promises.writeFile(postsPath, JSON.stringify(posts, null, 2), 'utf8');
        } catch (error) {
            throw new Error('Failed to update posts details: ' + error.message);
        }
    }    
}

export default Post;