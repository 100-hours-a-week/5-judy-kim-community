// frontend/frontend.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const frontendPort = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'static')));
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
    res.render('signup.html');
});

// 로그인 페이지
app.get('/login', (req, res) => {
    res.render('login.html');
});

app.listen(frontendPort, () => {
    console.log(`Frontend server running on http://localhost:${frontendPort}`);
});

 


/*


import express from 'express';
import path from 'path';

const app = express();
const port = 8000;

const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'static')));


app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('base');
});

app.get('/login', (req, res) => {
    res.render('login', { href: '/' });
});

app.get('/signup', (req, res) => {
    res.render('signup', { href: '/login' });
});

app.get('/profile-edit1', (req, res) => {
    res.render('profile-edit1', { href: '/' });
});

app.get('/profile-edit2', (req, res) => {
    res.render('profile-edit2', { href: '/' });
});

app.get('/posts', (req, res) => {
    res.render('posts');
});

app.get('/posts/:postId', (req, res) => {
    res.render('post-contents');
});

app.get('/post-edit', (req, res) => {
    res.render('post-edit', { href: '/post-contents' });
});

app.get('/post-write', (req, res) => {
    res.render('post-write', { href: '/posts' });
});

const frontendPort = 3000;
app.listen(frontendPort, () => {
    console.log(`Frontend server running on http://localhost:${frontendPort}`);
});
*/