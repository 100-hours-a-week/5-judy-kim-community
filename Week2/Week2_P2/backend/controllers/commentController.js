// /backend/controllers/commentController.js

import Comment from '../models/Comment.js';

export const getCommentsByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.findAllByPostId(postId);
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
