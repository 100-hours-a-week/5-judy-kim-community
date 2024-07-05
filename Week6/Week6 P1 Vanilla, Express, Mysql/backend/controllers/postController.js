import Post from '../models/Post.js';
import User from '../models/User.js';

// 모든 게시글 가져오기
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 특정 게시글 가져오기
export const getPostById = async (req, res) => {
    const postId = parseInt(req.params.postId);
    try {
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        } else {
            // 조회수 업데이트
            await Post.updateById(postId, { views: post.views + 1 });
            res.json(post);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 게시글 작성
export const createPost = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
    }
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        }
        const postImagePath = req.file ? `/images/${req.file.filename}` : null;
        console.log("작성자:", req.session.username, "작성자 ID:", req.session.userId);
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.session.username,
            authorId: req.session.userId,
            userImagePath: user.profileImage,
            postImagePath,
            likes: 0,
            comments: 0,
            views: 0
        });
        const { savedPost, postId } = await Post.create(newPost);
        console.log("게시글이 성공적으로 작성되었습니다.:", savedPost);
        res.status(201).json({ message: '게시글이 성공적으로 작성되었습니다.', savedPost, postId });

    } catch (err) {
        console.error('게시글 작성 중 오류 발생:', err.message, err.stack);
        res.status(500).json({ success: false, message: '게시글 작성 중 오류 발생', error: err.message });
    }
};

// 게시글 삭제
export const deletePost = async (req, res) => {
    const postId = parseInt(req.params.postId);
    try {
        await Post.deleteById(postId);
        res.status(200).json({ message: '게시글이 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '게시글 삭제 중 오류 발생', error: error.toString() });
    }
};

// 게시글 수정 페이지 가져오기
export const getEditPostPage = async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('게시글을 찾을 수 없습니다.');
        }
        res.render('edit_post', { post });
    } catch (error) {
        res.status(500).send('서버 오류가 발생했습니다.');
    }
};

// 게시글 수정
export const updatePost = async (req, res) => {
    const postId = req.params.postId;
    console.log(req.body);
    console.log(req.file);
    const { title, content } = req.body;
    try {
        let imagePath = req.file ? path.join('/images', req.file.filename) : null;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send({ success: false, message: '게시글을 찾을 수 없습니다.' });
        }
        await Post.updateById(postId, {
            title,
            content,
            postImagePath: imagePath || post.postImagePath  // 새 이미지가 없다면 기존 경로 유지
        });
        res.json({ success: true, message: '게시글이 성공적으로 업데이트되었습니다.' });
    } catch (error) {
        console.error('게시글 업데이트 중 오류 발생:', error);
        res.status(500).send({ success: false, message: '게시글 업데이트 중 오류 발생', error });
    }
};
