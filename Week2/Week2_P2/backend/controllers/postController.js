import { Post } from '../models/Post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(parseInt(req.params.postId));
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};