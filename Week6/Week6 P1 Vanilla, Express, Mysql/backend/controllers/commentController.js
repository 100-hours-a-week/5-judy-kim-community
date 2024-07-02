// backend/controllers/commentController.js
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

// 특정 게시글의 모든 댓글 가져오기
export const getCommentsByPostId = async (req, res, next) => {
    try { 
        const postId = req.params.postId;
        const comments = await Comment.findByPostId(postId);
        const commentsCount = comments.length;
        await Post.updateById(postId, {comments: commentsCount});
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
};

// 특정 게시글의 모든 댓글 삭제
export const deleteCommentsByPost = async (req, res, next) => {
    const postId = parseInt(req.params.postId);
    try {
        await Comment.deleteByPostId(postId);
        res.status(200).json({ message: '해당 게시글의 모든 댓글이 성공적으로 삭제되었습니다.' });
    } catch (error) {
        next(error);
    }
};

// 특정 댓글 삭제
export const deleteCommentById = async (req, res, next) => {
    const { commentId } = req.params;
    try {
        await Comment.deleteById(commentId); // Comment 모델에서 해당 ID를 사용하여 댓글 삭제
        res.json({ message: '댓글이 성공적으로 삭제되었습니다.' });
    } catch (error) {
        next(error);
    }
};

// 특정 댓글 업데이트
export const updateCommentById = async (req, res, next) => {
    const { commentId } = req.params;
    const { content } = req.body; 

    try {
        await Comment.updateById(commentId, content);
        res.json({ message: '댓글이 성공적으로 업데이트되었습니다.' });
    } catch (error) {
        next(error);
    }
};

// 새로운 댓글 추가
export const addCommentToPost = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "접근 권한이 없습니다. 로그인 해주세요." });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const { postId } = req.params;
    const { content } = req.body;
    const author = req.session.username;
    const authorId = req.session.userId;
    const imagePath = req.session.profileImage || user.profileImage;

    const newCommentData = {
        postId: parseInt(postId),
        content,
        author,
        authorId,
        imagePath
    };

    try {
        const newComment = await Comment.create(newCommentData);
        res.status(201).json(newComment);
    } catch (err) {
        next(err);
    }
};
