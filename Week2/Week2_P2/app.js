import express from 'express';
import ejs from 'ejs';
import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'templates'));
app.use('/static', express.static(path.join(__dirname, 'static')));

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

// 홈 페이지
app.get('/', (req, res) => {
    res.render('base'); 
});

// 로그인
app.get('/login', (req, res) => {   
    res.render('login', { href: '/'}); 
});

// 회원가입
app.get('/signup', (req, res) => {   
    res.render('signup', { href: '/login'}); 
});

// 회원정보 수정1
app.get('/profile-edit1', (req, res) => {
    res.render('profile-edit1', { href: '/'}); 
});

// 회원정보 수정2
app.get('/profile-edit2', (req, res) => {
    res.render('profile-edit2', { href: '/'}); 
});

// 게시글 목록 조회
app.get('/posts', (req, res) => {
    res.render('posts');
});

// 게시글 데이터가 저장된 JSON 파일
app.get('/api/posts', (req, res) => {
    const filePath = path.join(__dirname, 'static', 'json-file', 'posts.json'); // JSON 파일 경로 지정
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('파일을 읽는 중 오류가 발생했습니다.');
            return;
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
}); 

app.get('/posts/:postId', (req, res) => {
    res.render('post-contents');
});

// 개별 게시글 조회
app.get('/api/posts/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);
    const filePath = path.join(__dirname, 'static', 'json-file', 'posts.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('파일을 읽는 중 오류가 발생했습니다.');
            return;
        }
        const posts = JSON.parse(data);
        const post = posts.find(p => p.id === postId);
        if (!post) {
            res.status(404).send('게시글을 찾을 수 없습니다.');
        } else {
            res.json(post);
        }
    });
});

// 댓글 데이터가 저장된 JSON 파일
app.get('/api/posts/:postId/comments', (req, res) => {
    const postId = req.params.postId;
    const filePath = path.join(__dirname, 'static', 'json-file', 'comments.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('댓글 데이터를 읽는 중 오류가 발생했습니다.');
            return;
        }
        const comments = JSON.parse(data);
        const postComments = comments.filter(comment => comment.postId === parseInt(postId));
        res.json(postComments);
    });
});


// 게시글 상세 조회
/*
app.get('/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).send('게시글을 찾을 수 없습니다.');
    }

    const commands = [
        { id: '1', date: "2021-01-01", time: "00:00:00", author: "더미 작성자 1", imagePath: "/static/image/profile.png" },
        { id: '2', date: "2021-01-01", time: "00:00:00", author: "더미 작성자 2", imagePath: "/static/image/profile.png" },
        { id: '3', date: "2021-01-01", time: "00:00:00", author: "더미 작성자 3", imagePath: "/static/image/profile.png" },
        { id: '4', date: "2021-01-01", time: "00:00:00", author: "더미 작성자 4", imagePath: "/static/image/profile.png" },
        { id: '5', date: "2021-01-01", time: "00:00:00", author: "더미 작성자 5", imagePath: "/static/image/profile.png" },    
    ];
    res.render('post-contents', { post: post, commands: commands, href: '/posts' });
});*/

// 게시글 수정
app.get('/post-edit', (req, res) => {
    res.render('post-edit', {href: '/post-contents'}); 
});

app.get('/posts/:postId/edit', (req, res) => {
    res.send(`게시글 ${req.params.postId} 수정 페이지입니다.`);
});

// 게시글 작성
app.get('/post-write', (req, res) => {
    res.render('post-write', {href: '/posts'}); 
});

app.get('/posts/new', (req, res) => {
    res.send('게시글 작성 페이지입니다.');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});



// API 서버
const apiApp = express();
const apiPort = 3001; 
apiApp.use('/static', express.static(path.join(__dirname, 'static')));


apiApp.get('/api/posts', (req, res) => {
    const filePath = path.join(__dirname, 'static', 'json', 'posts.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('파일 읽기에 실패');
            return;
        }
        const posts = JSON.parse(data);
        res.render('posts', { posts: posts });
    });
});  

apiApp.listen(apiPort, () => {
  console.log(`API server listening on port ${apiPort}`);
});
