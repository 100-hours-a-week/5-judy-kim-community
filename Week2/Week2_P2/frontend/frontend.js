// frontend/frontend.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const frontendPort = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'static')));
app.use('/images', express.static('images'));

nunjucks.configure(path.join(__dirname, 'templates'), {
    autoescape: true,
    express: app
}); 

// 홈 페이지
app.get('/', (req, res) => {
    res.render('base.html');
});
 
// 회원가입 페이지
app.get('/signup', (req, res) => {
    res.render('signup.html', { href: '/login' });
});

// 로그인 페이지
app.get('/login', (req, res) => {
    res.render('login.html', { href: '/' });
});

app.get('/profile-edit1', (req, res) => {
    res.render('profile-edit1.html', { href: '/' });
});

app.get('/profile-edit2', (req, res) => {
    res.render('profile-edit2.html', { href: '/' });
});

app.get('/posts', (req, res) => {
    res.render('posts.html', { href: '/login' });
});

app.get('/posts/:postId', (req, res) => {
    res.render('post-contents.html', { href: '/posts' });
});

app.get('/post-edit/:postId', (req, res) => {
    res.render('post-edit.html', { href: '/posts' });
});

app.get('/post-write', (req, res) => {
    res.render('post-write.html', { href: '/posts' });
});



app.listen(frontendPort, () => {
    console.log(`Frontend server running on http://localhost:${frontendPort}`);
});

 
