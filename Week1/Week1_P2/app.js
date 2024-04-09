import express from 'express';
import ejs from 'ejs';
import nunjucks from 'nunjucks';
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

const posts = [
    { id: '1', title: "제목 1", likes: 0, comments: 0, views: 0, date: "2021-01-01", time: "00:00:00", author: "더미 작성자 1", imagePath: "/static/image/picture1.png" },
    { id: '2', title: "제목 2", likes: 10, comments: 5, views: 150, date: "2021-02-02", time: "12:00:00", author: "더미 작성자 2", imagePath: "/static/image/picture2.png" },
    { id: '3', title: "제목 3", likes: 20, comments: 10, views: 200, date: "2021-03-03", time: "14:30:00", author: "더미 작성자 3", imagePath: "/static/image/picture3.png" },
    { id: '4', title: "제목 4", likes: 5, comments: 2, views: 100, date: "2021-04-04", time: "16:45:00", author: "더미 작성자 4", imagePath: "/static/image/picture4.png" },
    { id: '5', title: "제목 5", likes: 15, comments: 8, views: 175, date: "2021-05-05", time: "18:00:00", author: "더미 작성자 5", imagePath: "/static/image/picture5.png" },
];

// 게시글 목록 조회
app.route('/posts')
  .get((req, res) => {
      res.render('posts', { href: '/', posts: posts });
  })
  .post((req, res) => {
      res.render('posts', { href: '/', posts: posts });
  });

// 게시글 상세 조회
/*
app.get('/post-contents', (req, res) => {
    const commands = [
        { id: '1', date: "2021-01-01", time: "00:00:00", author: "더미 작성자 1", imagePath: "/static/image/profile.png" },
        { id: '2', date: "2021-01-01", time: "00:00:00", author: "더미 작성자 2", imagePath: "/static/image/profile.png" },
        { id: '3', date: "2021-01-01", time: "00:00:00", author: "더미 작성자 3", imagePath: "/static/image/profile.png" },
        { id: '4', date: "2021-01-01", time: "00:00:00", author: "더미 작성자 4", imagePath: "/static/image/profile.png" },
        { id: '5', date: "2021-01-01", time: "00:00:00", author: "더미 작성자 5", imagePath: "/static/image/profile.png" },    
    ];
    res.render('post-contents', { href: '/posts', commands: commands });
});*/

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
});


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
