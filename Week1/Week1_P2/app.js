import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
const templatesDir = path.join(__dirname, 'templates');


// 홈 페이지
app.get('/', (req, res) => {
    res.sendFile(path.join(templatesDir, 'home.html'));
});

// 로그인
app.get('/login', (req, res) => {
    res.sendFile(path.join(templatesDir, 'login.html'));
});

// 회원가입
app.get('/signup', (req, res) => {
    res.send('회원가입 페이지입니다.');
});

// 게시글 목록 조회
app.get('/posts', (req, res) => {
    res.send('게시글 목록 페이지입니다.');
});

// 회원정보 수정1
app.get('/profile/edit1', (req, res) => {
    res.send('회원정보 수정 페이지1입니다.');
});

// 회원정보 수정2
app.get('/profile/edit2', (req, res) => {
    res.send('회원정보 수정 페이지2입니다.');
});

// 게시글 상세 조회
app.get('/posts/:postId', (req, res) => {
    // :postId는 게시글의 고유 ID를 나타냅니다. 실제 사용 시 req.params.postId로 접근 가능
    res.send(`게시글 ${req.params.postId}의 상세 조회 페이지입니다.`);
});

// 게시글 수정
app.get('/posts/:postId/edit', (req, res) => {
    res.send(`게시글 ${req.params.postId} 수정 페이지입니다.`);
});

// 게시글 작성
app.get('/posts/new', (req, res) => {
    res.send('게시글 작성 페이지입니다.');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
