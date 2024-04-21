import app from './app';
import path from 'path';

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
