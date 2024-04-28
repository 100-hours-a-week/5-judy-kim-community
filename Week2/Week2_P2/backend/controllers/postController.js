// /backend/controllers/userController.js

import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPostById = async (req, res) => {
    const postId = parseInt(req.params.postId);
    try {
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.json(post);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deletePost = async (req, res) => {
    const postId = parseInt(req.params.postId);
    try {
        await Post.deleteById(postId);
        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete post', error: error.toString() });
    }
};