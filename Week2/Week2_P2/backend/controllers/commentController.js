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

export const deleteCommentsByPost = async (req, res) => {
    const postId = parseInt(req.params.postId);
    try {
        await Comment.deleteByPostId(postId);
        res.status(200).json({ message: 'All comments for the post deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comments', error: error.toString() });
    }
};

export const deleteCommentById = async (req, res) => {
    const { commentId } = req.params;
    try {
        await Comment.deleteById(commentId); // Comment 모델에서 해당 ID를 사용하여 댓글 삭제
        res.json({ message: 'Comment deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const updateCommentById = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body; 

    try {
        await Comment.updateById(commentId, content);
        res.json({ message: 'Comment updated successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const addCommentToPost = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body; // Assuming these fields are provided in the request body.
    console.log(req.body.content);
    console.log("Received content:", req.body.content);

    try {
        const newComment = await Comment.add(postId, content);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
