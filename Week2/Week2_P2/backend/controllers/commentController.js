// /backend/controllers/commentController.js

import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

export const getCommentsByPostId = async (req, res) => {
    try { 
        const postId = req.params.postId;
        const comments = await Comment.findAllByPostId(postId);
        const commentsCount = comments.length;
        const post = await Post.findById(postId);
        post.comments = commentsCount; // 'comments' 필드가 게시글 모델에 존재한다고 가정
        await Post.updateById(postId, {comments: post.comments});
        res.status(200).json(comments);
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
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized access. Please login." });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    const { postId } = req.params;
    const { content } = req.body;
    const author = req.session.username;
    const authorId = req.session.userId;
    const imagePath = user.profileImage;
    console.log(req.body, "Author:", req.session.username, "Author ID:", req.session.userId, imagePath);
    const newCommentData = {
        postId:parseInt(postId),
        content,
        author,
        authorId,
        imagePath
    };

    try {
        const newComment = await Comment.create(newCommentData);
        res.status(201).json(newComment);
    } catch (err) {
        console.error("Error adding comment:", err.message, err.stack);
        res.status(500).send({ error: err.message });
    }
};

